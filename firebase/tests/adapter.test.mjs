import { after, before, beforeEach, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { setImmediate as nextTurn } from 'node:timers/promises';
import { initializeTestEnvironment } from '@firebase/rules-unit-testing';
import * as firestore from 'firebase/firestore';
import { initializeApp, deleteApp } from 'firebase/app';
import { getFirestore as getLiteFirestore, connectFirestoreEmulator as connectLiteEmulator } from 'firebase/firestore/lite';
import { createDataAdapter, firebaseConfigValid } from '../web/comments-firebase.js';
import { emptyCounts, emptyLegacyCounts, threadIdForPath } from '../web/comments-model.js';

const projectId = 'demo-homepage-adapter';
const path = '/posts/adapter-example/';
const threadId = threadIdForPath(path);
const threadPath = `commentThreads/${threadId}`;
const oldTime = firestore.Timestamp.fromMillis(Date.now() - 120_000);
const defaults = {
  ownerUid: 'alice', ownerGithubId: '61347379', githubLinkEnabled: true,
  migrationId: 'github-discussions-v1', expectedSnapshotSHA256: 'reviewed-snapshot-sha',
};
let environment;

function claimsFor(uid, { githubId, name = uid, google = true } = {}) {
  const identities = {};
  if (google) identities['google.com'] = [`google-${uid}`];
  if (githubId) identities['github.com'] = [String(githubId)];
  return {
    name,
    picture: `https://example.test/${uid}.png`,
    email: `${uid}@example.test`, email_verified: true,
    firebase: { identities, sign_in_provider: google ? 'google.com' : 'github.com' },
  };
}

function fakeIdentityProvider(initial, options = {}) {
  let identity = initial;
  const listeners = new Set();
  const publish = next => {
    identity = next;
    for (const callback of listeners) callback(identity);
  };
  return {
    get: async () => identity,
    subscribe(callback) { listeners.add(callback); callback(identity); return () => listeners.delete(callback); },
    async signInGoogle() { publish(initial); return identity; },
    async signOut() { publish(null); },
    async linkGitHub() {
      const claims = {
        ...identity.claims,
        firebase: {
          ...identity.claims.firebase,
          identities: { ...identity.claims.firebase.identities, 'github.com': [String(options.linkedGithubId || '198015748')] },
        },
      };
      publish({ ...identity, claims });
    },
    emit: publish,
  };
}

function userAdapter(uid, options = {}) {
  const claims = claimsFor(uid, options);
  const db = environment.authenticatedContext(uid, claims).firestore();
  const identity = { uid, displayName: claims.name, photoURL: claims.picture, claims };
  const provider = fakeIdentityProvider(identity, options);
  return {
    db, provider,
    adapter: createDataAdapter({ db, identityProvider: provider }, { ...defaults, ...options.settings }, firestore),
  };
}

function anonymousAdapter(settings = {}) {
  const db = environment.unauthenticatedContext().firestore();
  const provider = fakeIdentityProvider(null);
  return { db, provider, adapter: createDataAdapter({ db, identityProvider: provider }, { ...defaults, ...settings }, firestore) };
}

function thread(overrides = {}) {
  return {
    path, createdAt: oldTime, updatedAt: oldTime,
    reactionCounts: emptyCounts(), legacyReactionCounts: emptyLegacyCounts(), ...overrides,
  };
}

function comment(uid = 'alice', overrides = {}) {
  return {
    authorUid: uid, authorName: uid, authorPhotoURL: `https://example.test/${uid}.png`,
    body: 'Existing comment.', parentId: null,
    createdAt: oldTime, updatedAt: oldTime, editedAt: null,
    status: 'visible', upvoteCount: 0, reactionCounts: emptyCounts(),
    legacyUpvoteCount: 0, legacyReactionCounts: emptyLegacyCounts(),
    githubAuthorId: '', githubLogin: '', sourceURL: '', source: 'native', ...overrides,
  };
}

async function seed(entries) {
  await environment.withSecurityRulesDisabled(async context => {
    const db = context.firestore();
    const batch = firestore.writeBatch(db);
    for (const [entryPath, data] of entries) batch.set(firestore.doc(db, entryPath), data);
    await batch.commit();
  });
}

async function savedComment(id) {
  const result = await firestore.getDoc(firestore.doc(environment.unauthenticatedContext().firestore(), `${threadPath}/comments/${id}`));
  return result.data();
}

function deferred() {
  let resolve;
  const promise = new Promise(done => { resolve = done; });
  return { promise, resolve };
}

before(async () => {
  environment = await initializeTestEnvironment({
    projectId,
    firestore: { rules: await readFile(new URL('../firestore.rules', import.meta.url), 'utf8') },
  });
});

beforeEach(async () => {
  await environment.clearFirestore();
  await seed([[threadPath, thread()], [`${threadPath}/comments/root`, comment()]]);
});

after(async () => { await environment?.cleanup(); });

test('adapter creates a missing thread and native comment atomically, preserving multiline text and profile', async () => {
  const { adapter, db } = userAdapter('alice');
  const newPath = '/posts/first-native/';
  const created = await adapter.addComment({ path: newPath, body: '  First line.\nSecond line 😄.  ' });
  assert.equal(created.body, 'First line.\nSecond line 😄.');
  assert.equal(created.authorUid, 'alice');
  assert.equal(created.displayName, 'alice');
  assert.equal(created.photoURL, 'https://example.test/alice.png');
  assert.equal(created.parentId, null);
  assert.equal(created.source, 'native');
  assert.equal(created.canEdit, true);
  assert.equal(created.isAuthor, true);
  assert.ok(created.createdAt.toMillis() > oldTime.toMillis());
  const target = await firestore.getDoc(firestore.doc(db, 'commentThreads', threadIdForPath(newPath)));
  assert.equal(target.data().path, newPath);
  const activity = await firestore.getDoc(firestore.doc(db, 'commentActivity/alice'));
  assert.equal(activity.data().commentId, created.id);
  assert.equal(activity.data().threadId, target.id);
  assert.deepEqual(created.reactions, emptyCounts());
});

test('adapter cooldown applies globally across posts and exposes a useful retry interval', async () => {
  const { adapter } = userAdapter('alice');
  await adapter.addComment({ path, body: 'First comment.' });
  await assert.rejects(adapter.addComment({ path: '/posts/elsewhere/', body: 'Too soon.' }), error => {
    assert.equal(error.code, 'comments/cooldown');
    assert.ok(error.retryAfter > 0 && error.retryAfter <= 30000);
    return true;
  });
});

test('adapter validates blank/oversize text and requires a linked Google account before writing', async () => {
  const { adapter } = userAdapter('alice');
  await assert.rejects(adapter.addComment({ path, body: ' \n\t ' }), error => /1–4.000/.test(error.userMessage));
  await assert.rejects(adapter.addComment({ path, body: 'x'.repeat(4001) }), error => /1–4.000/.test(error.userMessage));
  await assert.rejects(anonymousAdapter().adapter.addComment({ path, body: 'Anonymous' }), { code: 'comments/sign-in-required' });
  await assert.rejects(userAdapter('github-only', { google: false, githubId: '198015748' }).adapter.reactPost({ path, emoji: 'heart' }), { code: 'comments/sign-in-required' });
});

test('adapter adds a chronological root reply and refuses missing/deep/hidden parents', async () => {
  const { adapter } = userAdapter('bob');
  const reply = await adapter.addComment({ path, rootId: 'root', parentId: 'ignored-ui-reply-target', body: 'A reply.' });
  assert.equal(reply.parentId, 'root');
  assert.equal(reply.rootId, 'root');
  const replies = await adapter.listReplies({ path, rootId: 'root' });
  assert.deepEqual(replies.items.map(item => item.id), [reply.id]);
  const charlie = userAdapter('charlie').adapter;
  await assert.rejects(charlie.addComment({ path, parentId: 'missing', body: 'A reply.' }));
  await assert.rejects(charlie.addComment({ path, parentId: reply.id, body: 'Deep reply.' }), { code: 'comments/invalid-parent' });
  await seed([[`${threadPath}/comments/hidden-root`, comment('alice', { status: 'hidden' })]]);
  await assert.rejects(charlie.addComment({ path, parentId: 'hidden-root', body: 'Hidden reply.' }));
});

test('post reaction method switches/toggles one selection and retains original reaction baselines', async () => {
  await seed([[threadPath, thread({
    reactionCounts: { ...emptyCounts(), heart: 2 },
    legacyReactionCounts: { ...emptyLegacyCounts(), heart: 2, confused: 1 },
  })]]);
  const { adapter } = userAdapter('bob');
  const selected = await adapter.reactPost({ path, emoji: 'heart' });
  assert.equal(selected.reactions.heart, 3);
  assert.equal(selected.viewerReaction, 'heart');
  const switched = await adapter.reactPost({ path, emoji: 'clap' });
  assert.equal(switched.reactions.heart, 2);
  assert.equal(switched.reactions.clap, 1);
  const repeated = await adapter.reactPost({ path, emoji: 'clap' });
  assert.equal(repeated.reactions.clap, 1);
  const cancelled = await adapter.reactPost({ path, emoji: null });
  assert.equal(cancelled.reactions.clap, 0);
  assert.equal(cancelled.viewerReaction, null);
  assert.equal(cancelled.legacyReactions.confused, 1);
  assert.equal(cancelled.legacyReactions.heart, 2);
});

test('comment/reply emoji and upvote operations coexist, are idempotent, and never erase old counts', async () => {
  await seed([[`${threadPath}/comments/root`, comment('alice', {
    upvoteCount: 2, legacyUpvoteCount: 2,
    reactionCounts: { ...emptyCounts(), laugh: 1 },
    legacyReactionCounts: { ...emptyLegacyCounts(), laugh: 1, like: 4 },
  })]]);
  const { adapter } = userAdapter('bob');
  const voted = await adapter.vote({ path, id: 'root', active: true });
  assert.equal(voted.upvotes, 3);
  assert.equal(voted.viewerUpvoted, true);
  const reacted = await adapter.reactComment({ path, id: 'root', emoji: 'heart' });
  assert.equal(reacted.viewerUpvoted, true);
  assert.equal(reacted.reactions.heart, 1);
  assert.equal(reacted.reactions.laugh, 1);
  assert.equal((await adapter.vote({ path, id: 'root', active: true })).upvotes, 3);
  const switched = await adapter.reactComment({ path, id: 'root', emoji: 'laugh' });
  assert.equal(switched.reactions.heart, 0);
  assert.equal(switched.reactions.laugh, 2);
  const unvoted = await adapter.vote({ path, id: 'root', active: false });
  assert.equal(unvoted.upvotes, 2);
  assert.equal(unvoted.viewerReaction, 'laugh');
  const cancelled = await adapter.reactComment({ path, id: 'root', emoji: null });
  assert.equal(cancelled.reactions.laugh, 1);
  assert.equal(cancelled.legacyReactions.like, 4);
  assert.equal(cancelled.upvotes, 2); // GitHub thumbs-up is not an upvote.
  assert.equal(cancelled.updatedAt.toMillis(), oldTime.toMillis());
  await assert.rejects(adapter.reactComment({ path, id: 'root', emoji: 'like' }), { code: 'comments/invalid-reaction' });
  await assert.rejects(adapter.reactComment({ path, id: 'root', emoji: 'rocket' }), { code: 'comments/invalid-reaction' });
});

test('concurrent votes from separate accounts use transactions without lost increments', async () => {
  const bob = userAdapter('bob').adapter;
  const charlie = userAdapter('charlie').adapter;
  await Promise.all([
    bob.vote({ path, id: 'root', active: true }),
    charlie.vote({ path, id: 'root', active: true }),
  ]);
  assert.equal((await savedComment('root')).upvoteCount, 2);
  await Promise.all([
    bob.vote({ path, id: 'root', active: true }),
    bob.vote({ path, id: 'root', active: true }),
  ]);
  assert.equal((await savedComment('root')).upvoteCount, 2);
});

test('simultaneous duplicate requests from one account settle into one vote and one cancellation', async () => {
  const firstTab = userAdapter('bob').adapter;
  const secondTab = userAdapter('bob').adapter;
  await Promise.all([
    firstTab.vote({ path, id: 'root', active: true }),
    secondTab.vote({ path, id: 'root', active: true }),
  ]);
  assert.equal((await savedComment('root')).upvoteCount, 1);
  await Promise.all([
    firstTab.vote({ path, id: 'root', active: false }),
    secondTab.vote({ path, id: 'root', active: false }),
  ]);
  assert.equal((await savedComment('root')).upvoteCount, 0);
});

test('a same-account emoji click and upvote can race without replacing each other', async () => {
  const { adapter } = userAdapter('bob');
  await Promise.all([
    adapter.reactComment({ path, id: 'root', emoji: 'heart' }),
    adapter.vote({ path, id: 'root', active: true }),
  ]);
  const data = await savedComment('root');
  assert.equal(data.reactionCounts.heart, 1);
  assert.equal(data.upvoteCount, 1);
  const item = (await adapter.listComments({ path })).items.find(comment => comment.id === 'root');
  assert.equal(item.viewerReaction, 'heart');
  assert.equal(item.viewerUpvoted, true);
});

test('owner edit returns edited capabilities; deleting a root preserves its reply and disallows further engagement', async () => {
  await seed([[`${threadPath}/comments/reply`, comment('bob', { parentId: 'root' })]]);
  const alice = userAdapter('alice').adapter;
  const bob = userAdapter('bob').adapter;
  await assert.rejects(bob.editComment({ path, id: 'root', body: 'Forged edit' }), { code: 'comments/not-owner' });
  await assert.rejects(bob.deleteComment({ path, id: 'root' }), { code: 'comments/not-owner' });
  const edited = await alice.editComment({ path, id: 'root', body: '  Edited response.  ' });
  assert.equal(edited.body, 'Edited response.');
  assert.equal(edited.edited, true);
  assert.equal(edited.canEdit, true);
  const deleted = await alice.deleteComment({ path, id: 'root' });
  assert.equal(deleted.deleted, true);
  assert.equal(deleted.body, '');
  assert.equal(deleted.canDelete, false);
  assert.equal(deleted.canEdit, false);
  assert.equal((await anonymousAdapter().adapter.listReplies({ path, rootId: 'root' })).items[0].id, 'reply');
  await assert.rejects(bob.vote({ path, id: 'root', active: true }), { code: 'comments/unavailable' });
  await assert.rejects(alice.editComment({ path, id: 'root', body: 'Restore' }), { code: 'comments/not-owner' });
});

test('legacy comment ownership requires verified GitHub numeric ID; matching display name cannot claim it', async () => {
  await seed([[`${threadPath}/comments/github-18776560`, comment('', {
    source: 'github', authorName: 'nurilahmady', authorPhotoURL: 'https://avatars.githubusercontent.com/u/198015748',
    githubAuthorId: '198015748', githubLogin: 'nurilahmady',
    sourceURL: 'https://github.com/wildan-wicaksono/wildan-wicaksono.github.io/discussions/2#discussioncomment-18776560',
    upvoteCount: 1, legacyUpvoteCount: 1,
    reactionCounts: { ...emptyCounts(), laugh: 1 }, legacyReactionCounts: { ...emptyLegacyCounts(), laugh: 1 },
  })]]);
  const id = 'github-18776560';
  const unrelated = userAdapter('imposter', { name: 'nurilahmady', githubId: '999' }).adapter;
  const imposterView = (await unrelated.listComments({ path })).items.find(item => item.id === id);
  assert.equal(imposterView.canEdit, false);
  await assert.rejects(unrelated.editComment({ path, id, body: 'Fake claim.' }), { code: 'comments/not-owner' });
  const linked = userAdapter('original', { githubId: '198015748' }).adapter;
  const originalView = (await linked.listComments({ path })).items.find(item => item.id === id);
  assert.equal(originalView.canEdit, true);
  assert.equal(originalView.imported, true);
  assert.equal(originalView.isAuthor, false);
  const edited = await linked.editComment({ path, id, body: 'The original writer edited this.' });
  assert.equal(edited.authorUid, '');
  assert.equal(edited.githubAuthorId, '198015748');
  assert.equal(edited.upvotes, 1);
  assert.equal(edited.reactions.laugh, 1);
  assert.equal((await linked.deleteComment({ path, id })).deleted, true);
});

test('trusted role enables moderation while unrelated users cannot hide or expose hidden bodies', async () => {
  await seed([['commentAdmins/moderator', { trusted: true }]]);
  const moderator = userAdapter('moderator').adapter;
  const bob = userAdapter('bob').adapter;
  await assert.rejects(bob.setHidden({ path, id: 'root', hidden: true }), { code: 'comments/not-moderator' });
  const hidden = await moderator.setHidden({ path, id: 'root', hidden: true });
  assert.equal(hidden.hidden, true);
  assert.equal(hidden.canModerate, true);
  assert.equal((await anonymousAdapter().adapter.listComments({ path })).items.length, 0);
  assert.equal((await bob.listComments({ path, includeHidden: true })).items.length, 0);
  const adminView = await moderator.listComments({ path, includeHidden: true });
  assert.equal(adminView.items[0].body, 'Existing comment.');
  assert.equal(adminView.items[0].canEdit, false);
  assert.equal((await moderator.setHidden({ path, id: 'root', hidden: false })).hidden, false);
  await moderator.setHidden({ path, id: 'root', hidden: true });
  assert.equal((await userAdapter('alice').adapter.deleteComment({ path, id: 'root' })).deleted, true);
  await assert.rejects(moderator.setHidden({ path, id: 'root', hidden: false }), { code: 'comments/unavailable' });
});

test('root pagination and sorting remain deterministic; replies stay chronological and hidden results stay admin-only', async () => {
  await environment.clearFirestore();
  await seed([
    [threadPath, thread()],
    ...[
      ['a', 1000, 0], ['b', 2000, 5], ['c', 3000, 10], ['d', 4000, 5],
    ].map(([id, ms, votes]) => [`${threadPath}/comments/${id}`, comment('alice', { createdAt: firestore.Timestamp.fromMillis(ms), upvoteCount: votes, legacyUpvoteCount: votes })]),
    [`${threadPath}/comments/hidden`, comment('alice', { status: 'hidden', createdAt: firestore.Timestamp.fromMillis(5000) })],
    [`${threadPath}/comments/reply-later`, comment('bob', { parentId: 'a', createdAt: firestore.Timestamp.fromMillis(2200) })],
    [`${threadPath}/comments/reply-earlier`, comment('bob', { parentId: 'a', createdAt: firestore.Timestamp.fromMillis(2100) })],
    ['commentAdmins/moderator', { trusted: true }],
  ]);
  const reader = anonymousAdapter().adapter;
  const first = await reader.listComments({ path, sort: 'oldest', limit: 2 });
  assert.deepEqual(first.items.map(item => item.id), ['a', 'b']);
  assert.ok(first.nextCursor);
  const second = await reader.listComments({ path, sort: 'oldest', limit: 2, cursor: first.nextCursor });
  assert.deepEqual(second.items.map(item => item.id), ['c', 'd']);
  const last = await reader.listComments({ path, sort: 'oldest', limit: 2, cursor: second.nextCursor });
  assert.equal(last.nextCursor, null);
  assert.deepEqual((await reader.listComments({ path })).items.map(item => item.id), ['d', 'c', 'b', 'a']);
  assert.deepEqual((await reader.listComments({ path, sort: 'popular' })).items.map(item => item.id), ['c', 'd', 'b', 'a']);
  assert.deepEqual((await reader.listReplies({ path, rootId: 'a' })).items.map(item => item.id), ['reply-earlier', 'reply-later']);
  const admin = await userAdapter('moderator').adapter.listComments({ path, includeHidden: true });
  assert.equal(admin.items[0].id, 'hidden');
  assert.equal(admin.items.length, 5);
});

test('author badges are established by verified native/GitHub identities, never display names', async () => {
  await seed([
    [`${threadPath}/comments/imposter`, comment('bob', { authorName: 'Wildan Bagus Wicaksono' })],
    [`${threadPath}/comments/github-owner`, comment('', { source: 'github', githubAuthorId: '61347379', githubLogin: 'wildan-wicaksono', authorName: 'wildan-wicaksono' })],
  ]);
  const comments = (await anonymousAdapter().adapter.listComments({ path })).items;
  assert.equal(comments.find(item => item.id === 'root').isAuthor, true);
  assert.equal(comments.find(item => item.id === 'github-owner').isAuthor, true);
  assert.equal(comments.find(item => item.id === 'imposter').isAuthor, false);
});

test('migration gate accepts only the reviewed import marker and rejects absent/mismatched configuration', async () => {
  const reader = anonymousAdapter().adapter;
  await assert.rejects(reader.verifyMigration(), { code: 'comments/migration-not-ready' });
  await seed([['commentMigrations/github-discussions-v1', { snapshotSHA256: 'different-snapshot', commentCount: 2 }]]);
  await assert.rejects(reader.verifyMigration(), { code: 'comments/migration-not-ready' });
  await seed([['commentMigrations/github-discussions-v1', { snapshotSHA256: defaults.expectedSnapshotSHA256, commentCount: 2 }]]);
  await reader.verifyMigration();
  await assert.rejects(anonymousAdapter({ expectedSnapshotSHA256: '' }).adapter.verifyMigration(), { code: 'comments/migration-not-configured' });
  assert.equal(firebaseConfigValid({ apiKey: '', authDomain: '', projectId: '', appId: '' }), false);
  assert.equal(firebaseConfigValid({ apiKey: 'YOUR_API_KEY', authDomain: 'test.firebaseapp.com', projectId: 'test', appId: 'test-app' }), false);
  assert.equal(firebaseConfigValid({ apiKey: 'public-web-key', authDomain: 'test.firebaseapp.com', projectId: 'test', appId: 'test-app' }), true);
});

test('production Firestore Lite API executes comments, engagement, edits, cursor queries, and migration reads', async () => {
  const app = initializeApp({ projectId, apiKey: 'emulator-only', appId: 'emulator-adapter-test' }, 'adapter-production-lite');
  const db = getLiteFirestore(app);
  const emulator = process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8088';
  const separator = emulator.lastIndexOf(':');
  const uid = 'lite-user';
  const claims = claimsFor(uid);
  connectLiteEmulator(db, emulator.slice(0, separator), Number(emulator.slice(separator + 1)), {
    mockUserToken: { ...claims, sub: uid, user_id: uid },
  });
  const provider = fakeIdentityProvider({ uid, claims });
  const adapter = createDataAdapter({ db, identityProvider: provider }, defaults);
  try {
    const created = await adapter.addComment({ path, body: 'Created through the actual Lite API.' });
    assert.equal(created.canEdit, true);
    assert.equal((await adapter.vote({ path, id: created.id, active: true })).upvotes, 1);
    assert.equal((await adapter.reactComment({ path, id: created.id, emoji: 'heart' })).viewerReaction, 'heart');
    assert.equal((await adapter.reactPost({ path, emoji: 'clap' })).reactions.clap, 1);
    const page = await adapter.listComments({ path, sort: 'oldest', limit: 1 });
    assert.equal(page.items[0].id, 'root');
    const next = await adapter.listComments({ path, sort: 'oldest', limit: 1, cursor: page.nextCursor });
    assert.equal(next.items[0].id, created.id);
    assert.equal((await adapter.editComment({ path, id: created.id, body: 'Edited through Lite.' })).edited, true);
    assert.equal((await adapter.deleteComment({ path, id: created.id })).deleted, true);
    await seed([['commentMigrations/github-discussions-v1', { snapshotSHA256: defaults.expectedSnapshotSHA256 }]]);
    await adapter.verifyMigration();
  } finally {
    await deleteApp(app);
  }
});

test('auth subscription ignores an old user role read completing after logout', async () => {
  const initial = { uid: 'alice', claims: claimsFor('alice') };
  const provider = fakeIdentityProvider(initial);
  const gate = deferred();
  const api = {
    ...firestore,
    getDoc: async ref => ref.path.startsWith('commentAdmins/')
      ? gate.promise : firestore.getDoc(ref),
  };
  const adapter = createDataAdapter({ db: environment.authenticatedContext('alice', initial.claims).firestore(), identityProvider: provider }, defaults, api);
  const observed = [];
  const unsubscribe = adapter.subscribeAuth(value => observed.push(value));
  provider.emit(null);
  await nextTurn();
  assert.equal(observed.at(-1), null);
  gate.resolve({ exists: () => false });
  await nextTurn();
  await nextTurn();
  assert.deepEqual(observed, [null]);
  unsubscribe();
});

test('unsubscribing blocks an already-pending role read from delivering a callback', async () => {
  const initial = { uid: 'alice', claims: claimsFor('alice') };
  const provider = fakeIdentityProvider(initial);
  const gate = deferred();
  const api = { ...firestore, getDoc: async () => gate.promise };
  const adapter = createDataAdapter({ db: environment.authenticatedContext('alice', initial.claims).firestore(), identityProvider: provider }, defaults, api);
  const observed = [];
  const unsubscribe = adapter.subscribeAuth(value => observed.push(value));
  unsubscribe();
  gate.resolve({ exists: () => false });
  await nextTurn();
  await nextTurn();
  assert.deepEqual(observed, []);
});
