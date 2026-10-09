import { initializeApp, getApps } from 'firebase/app';
import {
  initializeAuth, indexedDBLocalPersistence, browserLocalPersistence,
  browserPopupRedirectResolver, GoogleAuthProvider, GithubAuthProvider,
  onIdTokenChanged, signInWithPopup, linkWithPopup, signOut
} from 'firebase/auth';
import {
  getFirestore, doc, collection, getDoc, getDocs, query, where,
  orderBy, startAfter, limit, serverTimestamp, increment, runTransaction, updateDoc
} from 'firebase/firestore/lite';
import {
  REACTION_KEYS, emptyCounts, emptyLegacyCounts, normalizePath,
  threadIdForPath, normalizeComment, cleanBody, millis
} from './comments-model.js';

const defaultAPI = { doc, collection, getDoc, getDocs, query, where, orderBy, startAfter, limit, serverTimestamp, increment, runTransaction, updateDoc };

export function firebaseConfigValid(config) {
  return Boolean(config && ['apiKey', 'authDomain', 'projectId', 'appId'].every(key =>
    typeof config[key] === 'string' && config[key].trim() && !/YOUR_|REPLACE_|ENTER_/i.test(config[key])));
}

function failure(code, userMessage, extra = {}) {
  return Object.assign(new Error(userMessage), { code: `comments/${code}`, userMessage, ...extra });
}

/** Shared operations; dependency injection is used only by Emulator tests. */
export function createDataAdapter({ db, identityProvider }, settings = {}, api = defaultAPI) {
  let roleCache = null;
  const roleFor = async identity => {
    if (!identity?.uid) return null;
    const key = `${identity.uid}:${identity.claims?.iat || ''}`;
    let admin;
    if (!roleCache || roleCache.key !== key || Date.now() - roleCache.at > 60000) {
      const role = await api.getDoc(api.doc(db, 'commentAdmins', identity.uid));
      admin = role.exists();
      roleCache = { key, at: Date.now(), admin };
    } else admin = roleCache.admin;
    const identities = identity.claims?.firebase?.identities || {};
    return {
      ...identity,
      displayName: identity.claims?.name || identity.displayName || 'Pembaca',
      photoURL: identity.claims?.picture || identity.photoURL || '',
      googleLinked: Boolean(identities['google.com']?.length),
      githubLinked: Boolean(identities['github.com']?.length),
      githubLinkAvailable: Boolean(settings.githubLinkEnabled),
      canModerate: admin
    };
  };
  const viewer = async () => roleFor(await identityProvider.get());
  const signedViewer = async () => {
    const user = await viewer();
    if (!user?.googleLinked) throw failure('sign-in-required', 'Masuk dengan Google untuk menyimpan perubahan.');
    return user;
  };
  const threadRef = path => api.doc(db, 'commentThreads', threadIdForPath(path));
  const commentRef = (path, id) => {
    if (typeof id !== 'string' || !id || id.includes('/')) throw new Error('Invalid comment ID.');
    return api.doc(threadRef(path), 'comments', id);
  };
  const interactionAt = async (ref, user) => {
    if (!user?.uid) return {};
    const result = await api.getDoc(api.doc(ref, 'interactions', user.uid));
    return result.exists() ? result.data() : {};
  };
  const readComment = async (path, id, knownViewer) => {
    const user = knownViewer === undefined ? await viewer() : knownViewer;
    const ref = commentRef(path, id);
    const result = await api.getDoc(ref);
    if (!result.exists()) throw failure('not-found', 'Komentar ini sudah tidak tersedia.');
    const interaction = await interactionAt(ref, user);
    return normalizeComment(id, result.data(), user, settings, interaction);
  };
  async function ensureThread(path) {
    const ref = threadRef(path);
    const existing = await api.getDoc(ref);
    if (existing.exists()) return ref;
    await api.runTransaction(db, async transaction => {
      const result = await transaction.get(ref);
      if (!result.exists()) transaction.set(ref, {
        path: normalizePath(path), reactionCounts: emptyCounts(), legacyReactionCounts: emptyLegacyCounts(),
        createdAt: api.serverTimestamp(), updatedAt: api.serverTimestamp()
      });
    });
    return ref;
  }
  async function getPost({ path }) {
    const user = await viewer();
    const ref = threadRef(path);
    const result = await api.getDoc(ref);
    const data = result.exists() ? result.data() : {};
    const own = result.exists() ? await interactionAt(ref, user) : {};
    return {
      reactions: data.reactionCounts || emptyCounts(),
      legacyReactions: data.legacyReactionCounts || emptyLegacyCounts(),
      viewerReaction: own.emoji || null, rootCount: null
    };
  }
  async function list({ path, sort = 'newest', parentId = null, cursor = null, limit: size = 20, includeHidden = false }) {
    const user = await viewer();
    const pageSize = Math.min(20, Math.max(1, Number(size) || 20));
    const clauses = [
      api.where('parentId', '==', parentId),
      api.where('status', 'in', includeHidden && user?.canModerate
        ? ['visible', 'deleted', 'hidden'] : ['visible', 'deleted'])
    ];
    if (sort === 'popular' && parentId === null) clauses.push(api.orderBy('upvoteCount', 'desc'));
    clauses.push(api.orderBy('createdAt', parentId !== null || sort === 'oldest' ? 'asc' : 'desc'));
    if (cursor) clauses.push(api.startAfter(cursor));
    clauses.push(api.limit(pageSize));
    const results = await api.getDocs(api.query(api.collection(threadRef(path), 'comments'), ...clauses));
    const items = await Promise.all(results.docs.map(async result => normalizeComment(
      result.id, result.data(), user, settings, await interactionAt(result.ref, user)
    )));
    return { items, nextCursor: results.size === pageSize ? results.docs.at(-1) : null };
  }
  async function mutateInteraction({ path, id = null, emoji, active }) {
    const user = await signedViewer();
    if (emoji !== undefined && (emoji !== null && (!REACTION_KEYS.includes(emoji) || (id && emoji === 'like')))) {
      throw failure('invalid-reaction', 'Reaksi tersebut tidak tersedia.');
    }
    if (active !== undefined && typeof active !== 'boolean') throw new Error('A vote must be boolean.');
    const target = id ? commentRef(path, id) : await ensureThread(path);
    const own = api.doc(target, 'interactions', user.uid);
    const interactionState = snapshot => snapshot.exists()
      ? { emoji: snapshot.data().emoji, upvoted: snapshot.data().upvoted }
      : { emoji: null, upvoted: false };
    let observed;
    const update = () => api.runTransaction(db, async transaction => {
      const [result, interaction] = await Promise.all([transaction.get(target), transaction.get(own)]);
      if (!result.exists() || (id && result.data().status !== 'visible')) {
        throw failure('unavailable', 'Komentar ini sudah tidak tersedia untuk diberi reaksi.');
      }
      const before = interactionState(interaction);
      observed = before;
      const after = {
        emoji: emoji === undefined ? before.emoji : emoji,
        upvoted: id ? (active === undefined ? before.upvoted : active) : false,
        updatedAt: api.serverTimestamp()
      };
      if (before.emoji === after.emoji && before.upvoted === after.upvoted) return;
      const change = {};
      // Transforms validate against the current server aggregate under contention.
      // Rules still require the exact delta of this account's interaction record.
      if (before.emoji !== after.emoji) {
        if (before.emoji) change[`reactionCounts.${before.emoji}`] = api.increment(-1);
        if (after.emoji) change[`reactionCounts.${after.emoji}`] = api.increment(1);
      }
      if (id && before.upvoted !== after.upvoted) change.upvoteCount = api.increment(Number(after.upvoted) - Number(before.upvoted));
      if (!id) change.updatedAt = api.serverTimestamp();
      transaction.set(own, after);
      transaction.update(target, change);
    });
    for (let attempt = 0; ; attempt++) {
      observed = undefined;
      try {
        await update();
        break;
      } catch (error) {
        // A second tab can change our own record after a transaction read. Rules
        // may reject its stale delta before the SDK observes the version conflict.
        // Retry only when that record demonstrably changed; other denials surface.
        if (error.code !== 'permission-denied' || attempt >= 2 || !observed) throw error;
        const latest = interactionState(await api.getDoc(own));
        if (latest.emoji === observed.emoji && latest.upvoted === observed.upvoted) throw error;
      }
    }
    return id ? readComment(path, id, user) : getPost({ path });
  }
  const adapter = {
    subscribeAuth(callback) {
      let active = true;
      let generation = 0;
      const unsubscribe = identityProvider.subscribe(identity => {
        const version = ++generation;
        roleFor(identity).then(user => {
          if (active && version === generation) callback(user);
        }).catch(error => {
          if (!active || version !== generation) return;
          console.error('Comment authentication could not be restored.', error.code || error.message);
          callback(null);
        });
      });
      return () => { active = false; generation++; unsubscribe(); };
    },
    async signInGoogle() { roleCache = null; await identityProvider.signInGoogle(); return viewer(); },
    async signOut() { roleCache = null; await identityProvider.signOut(); },
    async linkGitHub() {
      if (!settings.githubLinkEnabled) throw failure('link-disabled', 'Penghubungan akun GitHub belum tersedia.');
      // The provider checks the current account synchronously before opening its popup.
      await identityProvider.linkGitHub();
      roleCache = null;
      return viewer();
    },
    getPost,
    listComments: params => list({ ...params, parentId: null }),
    listReplies: params => list({ ...params, parentId: params.rootId, sort: 'oldest' }),
    async addComment({ path, body, parentId = null, rootId = null }) {
      const user = await signedViewer();
      body = cleanBody(body);
      parentId = rootId || parentId;
      const thread = await ensureThread(path);
      const ref = api.doc(api.collection(thread, 'comments'));
      const activityRef = api.doc(db, 'commentActivity', user.uid);
      await api.runTransaction(db, async transaction => {
        const activity = await transaction.get(activityRef);
        if (activity.exists()) {
          const remaining = millis(activity.data().lastCommentAt) + 30000 - Date.now();
          if (remaining > 0) throw failure('cooldown', `Tunggu ${Math.ceil(remaining / 1000)} detik sebelum mengirim komentar berikutnya.`, { retryAfter: remaining });
        }
        if (parentId) {
          const parent = await transaction.get(commentRef(path, parentId));
          if (!parent.exists() || parent.data().parentId !== null || parent.data().status !== 'visible') {
            throw failure('invalid-parent', 'Percakapan ini sudah tidak menerima balasan baru.');
          }
        }
        transaction.set(ref, {
          authorUid: user.uid, authorName: user.claims?.name || '', authorPhotoURL: user.claims?.picture || '',
          body, parentId, createdAt: api.serverTimestamp(), updatedAt: api.serverTimestamp(), editedAt: null,
          status: 'visible', upvoteCount: 0, reactionCounts: emptyCounts(), legacyUpvoteCount: 0,
          legacyReactionCounts: emptyLegacyCounts(), githubAuthorId: '', githubLogin: '', sourceURL: '', source: 'native'
        });
        transaction.set(activityRef, { lastCommentAt: api.serverTimestamp(), threadId: thread.id, commentId: ref.id });
      });
      return readComment(path, ref.id, user);
    },
    async editComment({ path, id, body }) {
      const user = await signedViewer();
      const before = await readComment(path, id, user);
      if (!before.canEdit) throw failure('not-owner', 'Hanya pemilik komentar yang dapat mengeditnya.');
      body = cleanBody(body);
      if (body !== before.body) await api.updateDoc(commentRef(path, id), {
        body, updatedAt: api.serverTimestamp(), editedAt: api.serverTimestamp()
      });
      return readComment(path, id, user);
    },
    async deleteComment({ path, id }) {
      const user = await signedViewer();
      const before = await readComment(path, id, user);
      if (!before.canDelete) throw failure('not-owner', 'Hanya pemilik komentar yang dapat menghapusnya.');
      await api.updateDoc(commentRef(path, id), { body: '', status: 'deleted', updatedAt: api.serverTimestamp() });
      return readComment(path, id, user);
    },
    async setHidden({ path, id, hidden }) {
      const user = await signedViewer();
      if (!user.canModerate) throw failure('not-moderator', 'Hanya moderator yang dapat melakukan ini.');
      if (typeof hidden !== 'boolean') throw new Error('Visibility must be boolean.');
      const ref = commentRef(path, id);
      const before = await readComment(path, id, user);
      if (before.deleted) throw failure('unavailable', 'Komentar ini sudah dihapus oleh penulisnya.');
      if (before.hidden !== hidden) await api.updateDoc(ref, { status: hidden ? 'hidden' : 'visible', updatedAt: api.serverTimestamp() });
      return readComment(path, id, user);
    },
    reactPost: params => mutateInteraction(params),
    reactComment: params => mutateInteraction(params),
    vote: params => mutateInteraction(params),
    async verifyMigration() {
      if (!settings.migrationId || !settings.expectedSnapshotSHA256) throw failure('migration-not-configured', 'Migrasi komentar belum disiapkan.');
      const marker = await api.getDoc(api.doc(db, 'commentMigrations', settings.migrationId));
      if (!marker.exists() || marker.data().snapshotSHA256 !== settings.expectedSnapshotSHA256) {
        throw failure('migration-not-ready', 'Komentar lama belum selesai dipindahkan.');
      }
    }
  };
  return adapter;
}

export async function createFirebaseAdapter(config, settings = {}) {
  if (!firebaseConfigValid(config)) throw failure('missing-config', 'Konfigurasi komentar belum tersedia.');
  const appName = 'wildan-comments';
  const app = getApps().find(item => item.name === appName) || initializeApp(config, appName);
  const auth = initializeAuth(app, {
    persistence: [indexedDBLocalPersistence, browserLocalPersistence],
    popupRedirectResolver: browserPopupRedirectResolver
  });
  const db = getFirestore(app);
  const callbacks = new Set();
  let publication = 0;
  let disposed = false;
  const current = async () => {
    await auth.authStateReady();
    for (;;) {
      const user = auth.currentUser;
      if (!user) return null;
      const token = await user.getIdTokenResult();
      if (auth.currentUser === user) {
        return { uid: user.uid, displayName: user.displayName, photoURL: user.photoURL, claims: token.claims };
      }
    }
  };
  const publish = async () => {
    const version = ++publication;
    const identity = await current();
    if (disposed || version !== publication) return;
    for (const callback of callbacks) callback(identity);
  };
  const stopAuth = onIdTokenChanged(auth, () => publish().catch(error => console.error('Could not restore comments login.', error.code)));
  const identityProvider = {
    get: current,
    subscribe(callback) {
      callbacks.add(callback);
      const version = publication;
      current().then(identity => {
        if (!disposed && callbacks.has(callback) && version === publication) callback(identity);
      }).catch(() => {
        if (!disposed && callbacks.has(callback) && version === publication) callback(null);
      });
      return () => callbacks.delete(callback);
    },
    signInGoogle() {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      return signInWithPopup(auth, provider);
    },
    async signOut() { await signOut(auth); },
    async linkGitHub() {
      const user = auth.currentUser;
      if (!user || !user.providerData.some(provider => provider.providerId === 'google.com')) {
        throw failure('sign-in-required', 'Masuk dengan Google sebelum menghubungkan GitHub.');
      }
      await linkWithPopup(user, new GithubAuthProvider());
      await user.getIdToken(true);
      await publish();
    },
    destroy() {
      disposed = true;
      publication++;
      callbacks.clear();
      stopAuth();
    }
  };
  const adapter = createDataAdapter({ db, identityProvider }, settings);
  adapter.destroy = () => identityProvider.destroy();
  try {
    await adapter.verifyMigration();
  } catch (error) {
    adapter.destroy();
    throw error;
  }
  return adapter;
}
