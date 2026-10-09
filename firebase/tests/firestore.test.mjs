import { after, before, beforeEach, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from '@firebase/rules-unit-testing';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';

const projectId = 'demo-homepage-rules';
const path = '/posts/example/';
const threadId = encodeURIComponent(path);
const threadPath = `commentThreads/${threadId}`;
const zero = () => ({ like: 0, heart: 0, laugh: 0, celebrate: 0, surprised: 0, clap: 0 });
const legacyZero = () => ({ like: 0, dislike: 0, laugh: 0, celebrate: 0, confused: 0, heart: 0, rocket: 0, eyes: 0 });
const oldTime = Timestamp.fromMillis(Date.now() - 120_000);
let environment;

function context(uid, { githubId, google = true, name = uid } = {}) {
  const identities = {};
  if (google) identities['google.com'] = [`google-${uid}`];
  if (githubId) identities['github.com'] = [githubId];
  return environment.authenticatedContext(uid, {
    name,
    picture: `https://example.test/${uid}.png`,
    email: `${uid}@example.test`,
    email_verified: true,
    firebase: { identities, sign_in_provider: google ? 'google.com' : 'github.com' },
  }).firestore();
}

const anonymous = () => environment.unauthenticatedContext().firestore();
const threadRef = (db) => doc(db, threadPath);
const commentRef = (db, id = 'root') => doc(db, `${threadPath}/comments/${id}`);

function threadData(overrides = {}) {
  return {
    path,
    createdAt: oldTime,
    updatedAt: oldTime,
    reactionCounts: zero(),
    legacyReactionCounts: legacyZero(),
    ...overrides,
  };
}

function commentData(uid = 'alice', overrides = {}) {
  return {
    authorUid: uid,
    authorName: uid,
    authorPhotoURL: `https://example.test/${uid}.png`,
    body: 'A thoughtful comment.',
    parentId: null,
    createdAt: oldTime,
    updatedAt: oldTime,
    editedAt: null,
    status: 'visible',
    upvoteCount: 0,
    reactionCounts: zero(),
    legacyUpvoteCount: 0,
    legacyReactionCounts: legacyZero(),
    githubAuthorId: '',
    githubLogin: '',
    sourceURL: '',
    source: 'native',
    ...overrides,
  };
}

async function seed(entries) {
  await environment.withSecurityRulesDisabled(async (adminContext) => {
    const db = adminContext.firestore();
    const batch = writeBatch(db);
    for (const [entryPath, value] of entries) batch.set(doc(db, entryPath), value);
    await batch.commit();
  });
}

async function createComment(db, uid, id, overrides = {}) {
  const batch = writeBatch(db);
  batch.set(commentRef(db, id), commentData(uid, {
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    ...overrides,
  }));
  batch.set(doc(db, `commentActivity/${uid}`), {
    lastCommentAt: serverTimestamp(), threadId, commentId: id,
  });
  return batch.commit();
}

async function interact(db, uid, { commentId = null, emoji = null, upvoted = false, mutate } = {}) {
  const target = commentId ? commentRef(db, commentId) : threadRef(db);
  const participation = doc(db, `${target.path}/interactions/${uid}`);
  const [targetSnapshot, interactionSnapshot] = await Promise.all([getDoc(target), getDoc(participation)]);
  const before = interactionSnapshot.exists() ? interactionSnapshot.data() : { emoji: null, upvoted: false };
  const counts = { ...targetSnapshot.data().reactionCounts };
  if (before.emoji) counts[before.emoji] -= 1;
  if (emoji) counts[emoji] += 1;
  const changes = commentId
    ? { reactionCounts: counts, upvoteCount: targetSnapshot.data().upvoteCount + Number(upvoted) - Number(before.upvoted) }
    : { reactionCounts: counts, updatedAt: serverTimestamp() };
  if (mutate) mutate(changes);
  const batch = writeBatch(db);
  batch.set(participation, { emoji, upvoted, updatedAt: serverTimestamp() });
  batch.update(target, changes);
  return batch.commit();
}

before(async () => {
  const rules = await readFile(new URL('../firestore.rules', import.meta.url), 'utf8');
  environment = await initializeTestEnvironment({ projectId, firestore: { rules } });
});

beforeEach(async () => {
  await environment.clearFirestore();
  await seed([[threadPath, threadData()], [`${threadPath}/comments/root`, commentData()]]);
});

after(async () => { await environment?.cleanup(); });

test('public read works; public list requires an explicit visibility filter and a page limit', async () => {
  const db = anonymous();
  await assertSucceeds(getDoc(threadRef(db)));
  await assertSucceeds(getDoc(commentRef(db)));
  await assertSucceeds(getDocs(query(collection(db, `${threadPath}/comments`), where('status', 'in', ['visible', 'deleted']), where('parentId', '==', null), orderBy('createdAt', 'desc'), limit(20))));
  await assertFails(getDocs(query(collection(db, `${threadPath}/comments`), limit(20))));
  await assertFails(getDocs(query(collection(db, `${threadPath}/comments`), where('status', 'in', ['visible', 'deleted']), limit(21))));
});

test('unconfigured public thread get returns missing; only authenticated Google users can create a zero thread', async () => {
  const missingPath = `commentThreads/${encodeURIComponent('/posts/new/')}`;
  assert.equal((await assertSucceeds(getDoc(doc(anonymous(), missingPath)))).exists(), false);
  const data = threadData({ path: '/posts/new/', createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  await assertFails(setDoc(doc(anonymous(), missingPath), data));
  await assertSucceeds(setDoc(doc(context('alice'), missingPath), data));
  await assertFails(setDoc(doc(context('alice'), `${missingPath}-fake`), { ...data, reactionCounts: { ...zero(), heart: 100 } }));
});

test('Google comment create is atomic with cooldown; anonymous and GitHub-only writers are refused', async () => {
  await assertFails(createComment(anonymous(), 'anon', 'anonymous'));
  await assertFails(createComment(context('github', { google: false, githubId: '198015748' }), 'github', 'github-only'));
  await assertSucceeds(createComment(context('alice'), 'alice', 'fresh'));
  await assertFails(createComment(context('alice'), 'alice', 'too-soon'));
});

test('cooldown cannot be bypassed by omitting, resetting, or pre-writing the activity record', async () => {
  const db = context('alice');
  await assertFails(setDoc(commentRef(db, 'no-activity'), commentData('alice', { createdAt: serverTimestamp(), updatedAt: serverTimestamp() })));
  await assertFails(setDoc(doc(db, 'commentActivity/alice'), { lastCommentAt: serverTimestamp(), threadId, commentId: 'fake' }));
  await assertSucceeds(createComment(db, 'alice', 'valid'));
  await assertFails(deleteDoc(doc(db, 'commentActivity/alice')));
  await assertFails(updateDoc(doc(db, 'commentActivity/alice'), { lastCommentAt: oldTime }));
});

test('a batch cannot post two comments using one activity record, even across separate threads', async () => {
  const db = context('alice');
  const otherThreadId = encodeURIComponent('/posts/other/');
  const otherThreadPath = `commentThreads/${otherThreadId}`;
  await seed([[otherThreadPath, threadData({ path: '/posts/other/' })]]);
  const batch = writeBatch(db);
  const fresh = commentData('alice', { createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  batch.set(commentRef(db, 'first'), fresh);
  batch.set(doc(db, `${otherThreadPath}/comments/second`), fresh);
  batch.set(doc(db, 'commentActivity/alice'), {
    lastCommentAt: serverTimestamp(), threadId, commentId: 'first',
  });
  await assertFails(batch.commit());
  assert.equal((await getDoc(doc(anonymous(), `${otherThreadPath}`))).exists(), true);
});

test('old activity permits another comment, whitespace fails, multiline plain text is accepted', async () => {
  const db = context('alice');
  await seed([['commentActivity/alice', { lastCommentAt: oldTime, threadId, commentId: 'root' }]]);
  await assertFails(createComment(db, 'alice', 'whitespace', { body: ' \n\t ' }));
  await assertSucceeds(createComment(db, 'alice', 'multiline', { body: 'First line.\nSecond line 😄.' }));
});

test('the 4,000-character native body boundary matches the composer limit', async () => {
  await assertSucceeds(createComment(context('alice'), 'alice', 'maximum', { body: 'x'.repeat(4000) }));
  await assertFails(createComment(context('bob'), 'bob', 'oversize', { body: 'x'.repeat(4001) }));
});

test('comment authors, source metadata, timestamps, and starting counts cannot be forged', async () => {
  const db = context('bob');
  for (const [id, overrides] of [
    ['other-uid', { authorUid: 'alice' }],
    ['other-name', { authorName: 'Wildan' }],
    ['other-photo', { authorPhotoURL: 'https://attacker.test/photo.png' }],
    ['backdated', { createdAt: oldTime }],
    ['imported', { source: 'github', githubAuthorId: '61347379', githubLogin: 'wildan-wicaksono' }],
    ['nonzero', { upvoteCount: 20 }],
    ['baseline', { legacyUpvoteCount: 20 }],
    ['extra', { admin: true }],
  ]) await assertFails(createComment(db, 'bob', id, overrides));
});

test('a reply must reference a visible root in the same thread; arbitrary depth is refused', async () => {
  await assertSucceeds(createComment(context('bob'), 'bob', 'reply', { parentId: 'root' }));
  await assertFails(createComment(context('charlie'), 'charlie', 'missing-parent', { parentId: 'missing' }));
  await assertFails(createComment(context('charlie'), 'charlie', 'nested', { parentId: 'reply' }));
  await assertFails(createComment(context('charlie'), 'charlie', 'self', { parentId: 'self' }));
});

test('owner edit marks edited time; another user and author/history mutations are refused', async () => {
  const alice = context('alice');
  const edit = { body: 'Updated answer.', updatedAt: serverTimestamp(), editedAt: serverTimestamp() };
  await assertFails(updateDoc(commentRef(context('bob')), edit));
  await assertSucceeds(updateDoc(commentRef(alice), edit));
  await assertFails(updateDoc(commentRef(alice), { ...edit, authorUid: 'bob' }));
  await assertFails(updateDoc(commentRef(alice), { ...edit, createdAt: serverTimestamp() }));
  await assertFails(updateDoc(commentRef(alice), { ...edit, body: ' ' }));
});

test('owner deletion leaves a tombstone and replies; physical or other-user deletes are refused', async () => {
  await seed([[`${threadPath}/comments/reply`, commentData('bob', { parentId: 'root' })]]);
  const tombstone = { body: '', status: 'deleted', updatedAt: serverTimestamp() };
  await assertFails(updateDoc(commentRef(context('bob')), tombstone));
  await assertFails(deleteDoc(commentRef(context('alice'))));
  await assertSucceeds(updateDoc(commentRef(context('alice')), tombstone));
  assert.equal((await getDoc(commentRef(anonymous()))).data().body, '');
  assert.equal((await getDoc(commentRef(anonymous(), 'reply'))).data().parentId, 'root');
  await assertFails(updateDoc(commentRef(context('alice')), { body: 'Restored', status: 'visible', updatedAt: serverTimestamp(), editedAt: serverTimestamp() }));
});

test('legacy ownership requires the exact verified GitHub numeric identity linked to Google', async () => {
  await seed([[`${threadPath}/comments/github-18776560`, commentData('', {
    authorName: 'nurilahmady', authorPhotoURL: 'https://avatars.githubusercontent.com/u/198015748',
    source: 'github', githubAuthorId: '198015748', githubLogin: 'nurilahmady',
    sourceURL: 'https://github.com/wildan-wicaksono/wildan-wicaksono.github.io/discussions/2#discussioncomment-18776560',
    legacyUpvoteCount: 1, upvoteCount: 1,
    reactionCounts: { ...zero(), laugh: 1 }, legacyReactionCounts: { ...legacyZero(), laugh: 1 },
  })]]);
  const id = 'github-18776560';
  const edit = { body: 'Edited by the original writer.', updatedAt: serverTimestamp(), editedAt: serverTimestamp() };
  await assertFails(updateDoc(commentRef(context('fake', { name: 'nurilahmady', githubId: '999' }), id), edit));
  await assertFails(updateDoc(commentRef(context('google', { name: 'nurilahmady' }), id), edit));
  await assertFails(updateDoc(commentRef(context('github-only', { githubId: '198015748', google: false }), id), edit));
  await assertSucceeds(updateDoc(commentRef(context('linked', { githubId: '198015748' }), id), edit));
  await assertFails(updateDoc(commentRef(context('linked', { githubId: '198015748' }), id), { authorUid: 'linked' }));
  await assertSucceeds(updateDoc(commentRef(context('linked', { githubId: '198015748' }), id), { body: '', status: 'deleted', updatedAt: serverTimestamp() }));
});

test('trusted admin can hide/show; hidden body is private and the role cannot be self-assigned', async () => {
  const admin = context('moderator');
  await assertFails(setDoc(doc(admin, 'commentAdmins/moderator'), { admin: true }));
  await seed([['commentAdmins/moderator', { provisionedBy: 'trusted-admin-sdk' }]]);
  const hide = { status: 'hidden', updatedAt: serverTimestamp() };
  await assertFails(updateDoc(commentRef(context('alice')), hide));
  await assertSucceeds(updateDoc(commentRef(admin), hide));
  await assertFails(getDoc(commentRef(anonymous())));
  await assertFails(getDoc(commentRef(context('bob'))));
  await assertSucceeds(getDoc(commentRef(context('alice'))));
  await assertSucceeds(getDoc(commentRef(admin)));
  await assertSucceeds(getDocs(query(collection(admin, `${threadPath}/comments`), where('status', '==', 'hidden'), limit(20))));
  await assertFails(updateDoc(commentRef(admin), { authorUid: 'moderator', status: 'visible', updatedAt: serverTimestamp() }));
  await assertSucceeds(updateDoc(commentRef(admin), { status: 'visible', updatedAt: serverTimestamp() }));
});

test('post reactions toggle and switch while the legacy baseline remains immutable', async () => {
  await seed([[threadPath, threadData({ reactionCounts: { ...zero(), heart: 2 }, legacyReactionCounts: { ...legacyZero(), heart: 2, confused: 1 } })]]);
  const db = context('bob');
  await assertSucceeds(interact(db, 'bob', { emoji: 'heart' }));
  assert.equal((await getDoc(threadRef(db))).data().reactionCounts.heart, 3);
  await assertSucceeds(interact(db, 'bob', { emoji: 'clap' }));
  assert.equal((await getDoc(threadRef(db))).data().reactionCounts.heart, 2);
  await assertSucceeds(interact(db, 'bob', { emoji: null }));
  assert.deepEqual((await getDoc(threadRef(db))).data().legacyReactionCounts, { ...legacyZero(), heart: 2, confused: 1 });
  await assertFails(updateDoc(threadRef(db), { legacyReactionCounts: legacyZero() }));
});

test('comment emoji and upvote can coexist, switch, and be cancelled independently', async () => {
  await seed([[`${threadPath}/comments/root`, commentData('alice', { upvoteCount: 1, legacyUpvoteCount: 1, reactionCounts: { ...zero(), laugh: 1 }, legacyReactionCounts: { ...legacyZero(), laugh: 1 } })]]);
  const db = context('bob');
  await assertSucceeds(interact(db, 'bob', { commentId: 'root', emoji: 'heart', upvoted: true }));
  assert.equal((await getDoc(commentRef(db))).data().upvoteCount, 2);
  await assertSucceeds(interact(db, 'bob', { commentId: 'root', emoji: 'laugh', upvoted: true }));
  assert.equal((await getDoc(commentRef(db))).data().reactionCounts.laugh, 2);
  await assertSucceeds(interact(db, 'bob', { commentId: 'root', emoji: 'laugh', upvoted: false }));
  await assertSucceeds(interact(db, 'bob', { commentId: 'root', emoji: null, upvoted: false }));
  const data = (await getDoc(commentRef(db))).data();
  assert.equal(data.upvoteCount, 1);
  assert.equal(data.reactionCounts.laugh, 1);
  assert.equal(data.updatedAt.toMillis(), oldTime.toMillis());
});

test('counter-only, interaction-only, copied-UID, arbitrary emoji, and forged count writes are refused', async () => {
  const db = context('bob');
  await assertFails(updateDoc(commentRef(db), { upvoteCount: 1000 }));
  await assertFails(setDoc(doc(db, `${threadPath}/comments/root/interactions/bob`), { emoji: 'heart', upvoted: true, updatedAt: serverTimestamp() }));
  await assertFails(interact(db, 'alice', { commentId: 'root', upvoted: true }));
  await assertFails(interact(db, 'bob', { commentId: 'root', emoji: 'rocket' }));
  await assertFails(interact(db, 'bob', { commentId: 'root', emoji: 'like' }));
  await assertFails(interact(db, 'bob', { commentId: 'root', upvoted: true, mutate: (changes) => { changes.upvoteCount = 100; } }));
  await assertFails(interact(db, 'bob', { emoji: 'heart', upvoted: true }));
  await assertFails(interact(db, 'bob', { emoji: 'heart', mutate: (changes) => { changes.reactionCounts.clap = 10; } }));
  await assertFails(interact(db, 'bob', { commentId: 'root', emoji: 'heart', mutate: (changes) => { changes.legacyUpvoteCount = 100; } }));
});

test('one-account one-vote is enforced on repeated writes; participation cannot be deleted to reset it', async () => {
  const db = context('bob');
  await assertSucceeds(interact(db, 'bob', { commentId: 'root', upvoted: true }));
  await assertFails(interact(db, 'bob', { commentId: 'root', upvoted: true }));
  await assertFails(interact(db, 'bob', { commentId: 'root', upvoted: true, mutate: (changes) => { changes.upvoteCount += 1; } }));
  await assertFails(deleteDoc(doc(db, `${threadPath}/comments/root/interactions/bob`)));
  assert.equal((await getDoc(commentRef(db))).data().upvoteCount, 1);
});

test('forged underflow, counter map keys, and immutable migration baselines are refused', async () => {
  const db = context('bob');
  await seed([[`${threadPath}/comments/root`, commentData('alice', {
    upvoteCount: 3, legacyUpvoteCount: 3,
    reactionCounts: { ...zero(), heart: 2 }, legacyReactionCounts: { ...legacyZero(), heart: 2 },
  })]]);
  await assertFails(interact(db, 'bob', { commentId: 'root', emoji: 'heart', mutate: (changes) => { changes.reactionCounts.heart = -1; } }));
  await assertFails(interact(db, 'bob', { commentId: 'root', upvoted: true, mutate: (changes) => { changes.upvoteCount = 2; } }));
  await assertFails(interact(db, 'bob', { commentId: 'root', emoji: 'heart', mutate: (changes) => { changes.reactionCounts.extra = 1; } }));
  await assertFails(interact(db, 'bob', { commentId: 'root', emoji: 'heart', mutate: (changes) => { changes.legacyReactionCounts = legacyZero(); } }));
  await assertSucceeds(interact(db, 'bob', { commentId: 'root', emoji: 'heart', upvoted: true }));
  await assertSucceeds(interact(db, 'bob', { commentId: 'root', emoji: null, upvoted: false }));
  const data = (await getDoc(commentRef(db))).data();
  assert.equal(data.upvoteCount, 3);
  assert.equal(data.reactionCounts.heart, 2);
});

test('interaction identities are private; hidden/deleted comments cannot gain votes', async () => {
  const bob = context('bob');
  await assertSucceeds(interact(bob, 'bob', { commentId: 'root', emoji: 'heart' }));
  await assertSucceeds(getDoc(doc(bob, `${threadPath}/comments/root/interactions/bob`)));
  await assertFails(getDoc(doc(context('alice'), `${threadPath}/comments/root/interactions/bob`)));
  await assertFails(getDocs(collection(bob, `${threadPath}/comments/root/interactions`)));
  await assertSucceeds(updateDoc(commentRef(context('alice')), { body: '', status: 'deleted', updatedAt: serverTimestamp() }));
  await assertFails(interact(bob, 'bob', { commentId: 'root', emoji: 'clap' }));
});

test('migration readiness exposes only the single public marker; its client writes are forbidden', async () => {
  const markerPath = 'commentMigrations/github-discussions-v1';
  await assertSucceeds(getDoc(doc(anonymous(), markerPath)));
  await seed([[markerPath, { snapshotSHA256: 'public-snapshot-checksum', version: 1, commentCount: 2 }]]);
  assert.equal((await assertSucceeds(getDoc(doc(anonymous(), markerPath)))).data().commentCount, 2);
  await assertFails(setDoc(doc(context('alice'), markerPath), { snapshotSHA256: 'forged' }));
  await assertFails(getDocs(collection(context('alice'), 'commentMigrations')));
});
