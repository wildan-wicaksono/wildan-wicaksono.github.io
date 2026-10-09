import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { snapshotHash, validateSnapshot, validateProductionSnapshot, reactionBaselines } from '../scripts/migration-utils.mjs';
import { applySnapshot } from '../scripts/import-comments.mjs';
import { exportDiscussions } from '../scripts/export-discussions.mjs';

const original = JSON.parse(await readFile(new URL('../migrations/github-discussions.json', import.meta.url), 'utf8'));
const clone = () => structuredClone(original);
const rehash = snapshot => { snapshot.contentSha256 = snapshotHash(snapshot.discussions); return snapshot; };

test('tampering with migration bodies fails integrity validation', () => {
  const changed = clone();
  changed.discussions[1].comments[0].body += 'tampered';
  assert.throws(() => validateSnapshot(changed), /checksum/);
});

test('missing and nonroot reply parents are refused before database access', () => {
  const changed = clone();
  changed.discussions[1].comments[1].parentId = 'github-999999';
  assert.throws(() => validateSnapshot(rehash(changed)), /reply parent/);
  changed.discussions[1].comments[1].parentId = changed.discussions[1].comments[1].id;
  assert.throws(() => validateSnapshot(rehash(changed)), /reply parent/);
});

test('duplicate IDs and mismatched reported comment totals are refused', () => {
  const changed = clone();
  changed.discussions[1].comments.push(structuredClone(changed.discussions[1].comments[0]));
  assert.throws(() => validateSnapshot(rehash(changed)), /duplicate imported ID/);
  const wrongCount = clone();
  wrongCount.discussions[1].sourceCounts.replies = 8;
  assert.throws(() => validateSnapshot(rehash(wrongCount)), /count mismatch/);
});

test('legacy confused and thumbs up retain their original meaning', () => {
  const counts = reactionBaselines([
    { content: 'CONFUSED', users: { totalCount: 4 } },
    { content: 'THUMBS_UP', users: { totalCount: 2 } },
    { content: 'LAUGH', users: { totalCount: 1 } }
  ], true);
  assert.equal(counts.legacy.confused, 4);
  assert.equal(counts.native.surprised, 0);
  assert.equal(counts.legacy.like, 2);
  assert.equal(counts.native.like, 0);
  assert.equal(counts.native.laugh, 1);
  const incorrectlyRelabeled = clone();
  incorrectlyRelabeled.discussions[1].thread.reactionCounts.surprised = 1;
  assert.throws(() => validateSnapshot(rehash(incorrectlyRelabeled)), /original GitHub baseline/);
});

test('production import refuses unverified provenance before touching Firebase', async () => {
  assert.doesNotThrow(() => validateSnapshot(original));
  assert.throws(() => validateProductionSnapshot(original), /fresh GraphQL export/);
  const partiallyVerified = clone();
  partiallyVerified.source.method = 'github-graphql';
  partiallyVerified.source.completeness.apiEditTimestamps = true;
  partiallyVerified.source.completeness.consistentVerificationPass = true;
  assert.throws(() => validateProductionSnapshot(partiallyVerified), /all upvote counts/);
  const previousHost = process.env.FIRESTORE_EMULATOR_HOST;
  delete process.env.FIRESTORE_EMULATOR_HOST;
  try {
    await assert.rejects(applySnapshot({ doc() { throw new Error('Firebase was accessed'); } }, {}, original), /fresh GraphQL export/);
  } finally {
    if (previousHost === undefined) delete process.env.FIRESTORE_EMULATOR_HOST;
    else process.env.FIRESTORE_EMULATOR_HOST = previousHost;
  }
});

function mockGraphQL({ changedSecondPass = false } = {}) {
  const seen = new Set();
  let pass = 0;
  const enumKeys = { like: 'THUMBS_UP', dislike: 'THUMBS_DOWN', laugh: 'LAUGH', celebrate: 'HOORAY', confused: 'CONFUSED', heart: 'HEART', rocket: 'ROCKET', eyes: 'EYES' };
  const reactions = counts => Object.entries(counts).filter(([, count]) => count).map(([key, count]) => ({ content: enumKeys[key], users: { totalCount: count } }));
  const commentNode = comment => ({
    id: `DC_${comment.id.slice(7)}`, databaseId: Number(comment.id.slice(7)), body: comment.body,
    createdAt: comment.createdAt, updatedAt: comment.updatedAt, lastEditedAt: comment.editedAt,
    url: comment.sourceURL, upvoteCount: comment.upvoteCount, isMinimized: false, deletedAt: null,
    author: { login: comment.githubLogin, avatarUrl: comment.authorPhotoURL, url: `https://github.com/${comment.githubLogin}`, databaseId: Number(comment.githubAuthorId) },
    reactionGroups: reactions(comment.legacyReactionCounts)
  });
  const root = commentNode(original.discussions[1].comments[0]);
  const root2 = { ...structuredClone(root), id: 'DC_19999999', databaseId: 19999999, body: 'Another root', url: `${original.discussions[1].sourceURL}#discussioncomment-19999999` };
  const reply = commentNode(original.discussions[1].comments[1]);
  const reply2 = { ...structuredClone(reply), id: 'DC_18826964', databaseId: 18826964, body: 'Another reply', url: `${original.discussions[1].sourceURL}#discussioncomment-18826964` };
  const discussions = original.discussions.map(d => ({
    id: `D_${d.githubDatabaseId}`, number: d.number, databaseId: Number(d.githubDatabaseId), title: d.thread.path.slice(1),
    url: d.sourceURL, createdAt: d.thread.createdAt, updatedAt: d.thread.updatedAt, upvoteCount: d.sourceCounts.postUpvotes,
    reactionGroups: reactions(d.thread.legacyReactionCounts)
  }));
  const page = (nodes, totalCount, next = null) => ({ nodes, totalCount, pageInfo: { hasNextPage: !!next, endCursor: next } });
  return {
    seen,
    fetch: async (url, options) => {
      assert.equal(url, 'https://api.github.com/graphql');
      const { query, variables } = JSON.parse(options.body);
      let data;
      if (query.includes('discussions(first:100')) {
        if (!variables.cursor) pass++;
        seen.add(`discussions:${variables.cursor}`);
        data = { repository: { discussions: variables.cursor ? page([discussions[1]], 2) : page([discussions[0]], 2, 'D1') } };
      } else if (query.includes('comments(first:100')) {
        seen.add(`comments:${variables.cursor}`);
        const first = structuredClone(root);
        if (changedSecondPass && pass === 2) first.body += ' edited during export';
        data = { repository: { discussion: { comments: variables.number === 1 ? page([], 0) : variables.cursor ? page([root2], 2) : page([first], 2, 'C1') } } };
      } else if (query.includes('replies(first:100')) {
        seen.add(`replies:${variables.cursor}`);
        data = { node: { replies: variables.id === root.id ? variables.cursor ? page([reply2], 2) : page([reply], 2, 'R1') : page([], 0) } };
      } else throw new Error('Unexpected GraphQL query');
      return { ok: true, json: async () => ({ data }) };
    }
  };
}

test('exporter paginates all three connection types and verifies a second full read', async () => {
  const oldFetch = globalThis.fetch;
  const mock = mockGraphQL();
  globalThis.fetch = mock.fetch;
  try {
    const snapshot = await exportDiscussions('test-token');
    assert.deepEqual(validateSnapshot(snapshot), { discussions: 2, comments: 2, replies: 2, checksum: snapshot.contentSha256 });
    assert.equal(snapshot.source.completeness.consistentVerificationPass, true);
    assert.equal(snapshot.source.completeness.apiUpvoteCounts, true);
    assert.deepEqual(validateProductionSnapshot(snapshot), validateSnapshot(snapshot));
    for (const key of ['discussions:D1', 'comments:C1', 'replies:R1']) assert.equal(mock.seen.has(key), true);
    assert.equal(snapshot.discussions[1].comments.find(c => c.id === 'github-18826964').parentId, 'github-18776560');
  } finally { globalThis.fetch = oldFetch; }
});

test('exporter refuses a mid-export edit even when all pagination totals stay unchanged', async () => {
  const oldFetch = globalThis.fetch;
  globalThis.fetch = mockGraphQL({ changedSecondPass: true }).fetch;
  try { await assert.rejects(exportDiscussions('test-token'), /changed between verification passes/); }
  finally { globalThis.fetch = oldFetch; }
});

const localEmulator = /^(127\.0\.0\.1|localhost|\[::1\]):\d+$/.test(process.env.FIRESTORE_EMULATOR_HOST || '');
test('migration transaction preserves native state and cannot replay a changed snapshot', { skip: !localEmulator }, async t => {
  const [{ initializeApp, deleteApp }, { getFirestore, Timestamp }] = await Promise.all([
    import('firebase-admin/app'), import('firebase-admin/firestore')
  ]);
  const app = initializeApp({ projectId: 'demo-migration-tests' }, `migration-${process.pid}`);
  const db = getFirestore(app);
  const threadRef = db.doc(`commentThreads/${encodeURIComponent(original.discussions[1].thread.path)}`);
  const rootRef = threadRef.collection('comments').doc('github-18776560');
  const replyRef = threadRef.collection('comments').doc('github-18826963');
  const markerRef = db.doc('commentMigrations/github-discussions-v1');
  const cleanup = async () => {
    await db.recursiveDelete(db.collection('commentThreads'));
    await db.recursiveDelete(db.collection('commentMigrations'));
  };
  try {
    await cleanup();
    const nativeThread = structuredClone(original.discussions[1].thread);
    nativeThread.createdAt = Timestamp.fromDate(new Date('2026-01-01T00:00:00Z'));
    nativeThread.updatedAt = nativeThread.createdAt;
    nativeThread.reactionCounts.heart = 7;
    nativeThread.legacyReactionCounts.confused = 0;
    await threadRef.create(nativeThread);

    await t.test('first import adds original counts exactly once and retains native reactions', async () => {
      const result = await applySnapshot(db, Timestamp, original);
      assert.equal(result.mode, 'imported');
      const thread = (await threadRef.get()).data();
      assert.equal(thread.reactionCounts.heart, 7);
      assert.equal(thread.reactionCounts.surprised, 0);
      assert.equal(thread.legacyReactionCounts.confused, 1);
      assert.equal(thread.createdAt.toDate().toISOString(), '2026-01-01T00:00:00.000Z');
      const root = (await rootRef.get()).data();
      assert.equal(root.githubAuthorId, '198015748');
      assert.equal(root.reactionCounts.laugh, 1);
      assert.equal(root.upvoteCount, 1);
      assert.equal((await replyRef.get()).data().parentId, 'github-18776560');
      assert.equal((await markerRef.get()).data().snapshotSHA256, original.contentSha256);
    });

    await t.test('identical rerun preserves edited bodies, moderation, and live counts', async () => {
      await rootRef.update({ body: 'Edited after migration', status: 'hidden', upvoteCount: 9, 'reactionCounts.laugh': 5, editedAt: Timestamp.now() });
      await threadRef.update({ 'reactionCounts.heart': 11 });
      const beforeMarker = (await markerRef.get()).data();
      const result = await applySnapshot(db, Timestamp, original);
      assert.equal(result.mode, 'already-imported');
      const root = (await rootRef.get()).data();
      assert.equal(root.body, 'Edited after migration');
      assert.equal(root.status, 'hidden');
      assert.equal(root.upvoteCount, 9);
      assert.equal(root.reactionCounts.laugh, 5);
      assert.equal((await threadRef.get()).data().reactionCounts.heart, 11);
      assert.deepEqual((await markerRef.get()).data(), beforeMarker);
    });

    await t.test('changed legacy snapshot is refused without disturbing live data', async () => {
      const changed = clone();
      changed.discussions[1].comments[0].body += ' a later GitHub edit';
      rehash(changed);
      await assert.rejects(applySnapshot(db, Timestamp, changed), /different checksum/);
      assert.equal((await rootRef.get()).data().body, 'Edited after migration');
      assert.equal((await markerRef.get()).data().snapshotSHA256, original.contentSha256);
    });

    await t.test('missing completion marker never causes duplicate baseline import', async () => {
      await markerRef.delete();
      await assert.rejects(applySnapshot(db, Timestamp, original), /without their migration marker/);
      assert.equal((await rootRef.get()).data().reactionCounts.laugh, 5);
      assert.equal((await markerRef.get()).exists, false);
    });
  } finally {
    await cleanup();
    await deleteApp(app);
  }
});
