import { createHash } from 'node:crypto';

export const NATIVE_KEYS = ['like', 'heart', 'laugh', 'celebrate', 'surprised', 'clap'];
export const LEGACY_KEYS = ['like', 'dislike', 'laugh', 'celebrate', 'confused', 'heart', 'rocket', 'eyes'];
export const LEGACY_CONTENT = {
  THUMBS_UP: 'like', THUMBS_DOWN: 'dislike', LAUGH: 'laugh', HOORAY: 'celebrate',
  CONFUSED: 'confused', HEART: 'heart', ROCKET: 'rocket', EYES: 'eyes'
};
const COMMENT_KEYS = ['id', 'authorUid', 'authorName', 'authorPhotoURL', 'body', 'parentId', 'createdAt', 'updatedAt', 'editedAt', 'status', 'upvoteCount', 'reactionCounts', 'legacyUpvoteCount', 'legacyReactionCounts', 'githubAuthorId', 'githubLogin', 'sourceURL', 'source'];

export function emptyCounts(keys) {
  return Object.fromEntries(keys.map(key => [key, 0]));
}

export function normalizePath(path) {
  if (typeof path !== 'string' || !path.trim() || /[?#\\\s]/u.test(path)) {
    throw new Error(`Invalid article pathname: ${JSON.stringify(path)}`);
  }
  return `/${path.replace(/^\/+|\/+$/g, '')}/`;
}

export function snapshotHash(discussions) {
  return createHash('sha256').update(JSON.stringify(discussions)).digest('hex');
}

function checkCounts(value, keys, label) {
  if (!value || Array.isArray(value) || Object.keys(value).sort().join() !== [...keys].sort().join()) {
    throw new Error(`${label} must contain exactly: ${keys.join(', ')}`);
  }
  for (const key of keys) {
    if (!Number.isSafeInteger(value[key]) || value[key] < 0) throw new Error(`${label}.${key} must be a nonnegative integer`);
  }
}

function checkDate(value, label, nullable = false) {
  if (nullable && value === null) return;
  if (typeof value !== 'string' || !/^\d{4}-\d\d-\d\dT/.test(value) || !Number.isFinite(Date.parse(value))) {
    throw new Error(`${label} must be an ISO timestamp`);
  }
}

function checkBaseline(native, legacy, isComment, label) {
  for (const key of NATIVE_KEYS) {
    const expected = key === 'surprised' || key === 'clap' || (isComment && key === 'like') ? 0 : legacy[key];
    if (native[key] !== expected) throw new Error(`${label}: native ${key} does not match the original GitHub baseline`);
  }
}

function checkFields(value, keys, label) {
  if (Object.keys(value).sort().join() !== [...keys].sort().join()) throw new Error(`${label} contains missing or unexpected document fields`);
}

export function validateSnapshot(snapshot) {
  if (snapshot.schemaVersion !== 1 || snapshot.migrationId !== 'github-discussions-v1') throw new Error('Unsupported migration version');
  if (snapshot.repository !== 'wildan-wicaksono/wildan-wicaksono.github.io') throw new Error('Unexpected migration repository');
  if (!Array.isArray(snapshot.discussions) || !snapshot.discussions.length) throw new Error('No discussions in snapshot');
  if (snapshot.contentSha256 !== snapshotHash(snapshot.discussions)) throw new Error('Snapshot checksum does not match its discussion data');
  checkDate(snapshot.capturedAt, 'capturedAt');
  for (const key of ['allListedDiscussions', 'allVisibleCommentBodies', 'allVisibleReplies', 'aggregateReactions']) {
    if (snapshot.source?.completeness?.[key] !== true) throw new Error(`Incomplete snapshot: ${key}`);
  }
  const paths = new Set();
  const numbers = new Set();
  let roots = 0;
  let replies = 0;
  for (const discussion of snapshot.discussions) {
    const path = discussion.thread?.path;
    if (normalizePath(path) !== path || paths.has(path)) throw new Error(`Noncanonical or duplicate pathname: ${path}`);
    checkFields(discussion.thread, ['path', 'createdAt', 'updatedAt', 'reactionCounts', 'legacyReactionCounts'], path);
    paths.add(path);
    if (!Number.isSafeInteger(discussion.number) || discussion.number < 1 || numbers.has(discussion.number)) throw new Error('Invalid or duplicate discussion number');
    numbers.add(discussion.number);
    if (discussion.sourceURL !== `https://github.com/${snapshot.repository}/discussions/${discussion.number}`) throw new Error('Unexpected discussion source URL');
    checkDate(discussion.thread.createdAt, `${path}.createdAt`);
    checkDate(discussion.thread.updatedAt, `${path}.updatedAt`);
    checkCounts(discussion.thread.reactionCounts, NATIVE_KEYS, `${path}.reactionCounts`);
    checkCounts(discussion.thread.legacyReactionCounts, LEGACY_KEYS, `${path}.legacyReactionCounts`);
    checkBaseline(discussion.thread.reactionCounts, discussion.thread.legacyReactionCounts, false, path);
    if (!Array.isArray(discussion.comments)) throw new Error(`Missing comments list: ${path}`);
    const ids = new Set();
    for (const comment of discussion.comments) {
      checkFields(comment, COMMENT_KEYS, comment.id || 'comment');
      if (!/^github-\d+$/.test(comment.id) || ids.has(comment.id)) throw new Error(`Invalid or duplicate imported ID: ${comment.id}`);
      ids.add(comment.id);
      if (typeof comment.body !== 'string' || !comment.body.trim()) throw new Error(`Empty comment: ${comment.id}`);
      if (typeof comment.authorName !== 'string' || !comment.authorName.trim()) throw new Error(`Missing author: ${comment.id}`);
      if (comment.authorUid !== '' || !/^\d+$/.test(comment.githubAuthorId) || typeof comment.githubLogin !== 'string' || !comment.githubLogin) throw new Error(`Unverifiable GitHub author: ${comment.id}`);
      if (comment.source !== 'github' || comment.status !== 'visible') throw new Error(`Unexpected imported comment state: ${comment.id}`);
      if (comment.sourceURL !== `${discussion.sourceURL}#discussioncomment-${comment.id.slice(7)}`) throw new Error(`Source URL mismatch: ${comment.id}`);
      for (const key of ['createdAt', 'updatedAt']) checkDate(comment[key], `${comment.id}.${key}`);
      checkDate(comment.editedAt, `${comment.id}.editedAt`, true);
      checkCounts(comment.reactionCounts, NATIVE_KEYS, `${comment.id}.reactionCounts`);
      checkCounts(comment.legacyReactionCounts, LEGACY_KEYS, `${comment.id}.legacyReactionCounts`);
      checkBaseline(comment.reactionCounts, comment.legacyReactionCounts, true, comment.id);
      if (!Number.isSafeInteger(comment.upvoteCount) || comment.upvoteCount < 0 || comment.upvoteCount !== comment.legacyUpvoteCount) throw new Error(`Invalid imported vote baseline: ${comment.id}`);
    }
    for (const comment of discussion.comments) {
      if (comment.parentId === null) roots++;
      else {
        const parent = discussion.comments.find(candidate => candidate.id === comment.parentId);
        if (!parent || parent.parentId !== null || parent.id === comment.id) throw new Error(`Missing or nonroot reply parent: ${comment.id}`);
        replies++;
      }
    }
    if (discussion.sourceCounts.topLevelComments !== discussion.comments.filter(c => c.parentId === null).length || discussion.sourceCounts.replies !== discussion.comments.filter(c => c.parentId !== null).length) {
      throw new Error(`Comment count mismatch: ${path}`);
    }
  }
  if (snapshot.source.capturedDiscussionNumbers?.length !== numbers.size || snapshot.source.capturedDiscussionNumbers.some(n => !numbers.has(n))) throw new Error('Discussion list completeness mismatch');
  return { discussions: paths.size, comments: roots, replies, checksum: snapshot.contentSha256 };
}

export function validateProductionSnapshot(snapshot) {
  const summary = validateSnapshot(snapshot);
  if (snapshot.source.method !== 'github-graphql' ||
      snapshot.source.completeness.apiEditTimestamps !== true ||
      snapshot.source.completeness.apiUpvoteCounts !== true ||
      snapshot.source.completeness.consistentVerificationPass !== true) {
    throw new Error('Production imports require a fresh GraphQL export with verified edit timestamps, all upvote counts, and two matching complete reads. Run scripts/export-discussions.mjs, review the refreshed snapshot, and update the expected site checksum before applying.');
  }
  return summary;
}

export function reactionBaselines(groups, isComment = false) {
  const legacy = emptyCounts(LEGACY_KEYS);
  const native = emptyCounts(NATIVE_KEYS);
  for (const group of groups || []) {
    const key = LEGACY_CONTENT[group.content];
    if (!key) throw new Error(`Unsupported GitHub reaction content: ${group.content}`);
    legacy[key] = group.users.totalCount;
    if (NATIVE_KEYS.includes(key) && !(isComment && key === 'like')) native[key] = group.users.totalCount;
  }
  return { native, legacy };
}
