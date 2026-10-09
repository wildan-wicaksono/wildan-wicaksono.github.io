#!/usr/bin/env node
import { writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { normalizePath, reactionBaselines, snapshotHash, validateSnapshot } from './migration-utils.mjs';

const REPOSITORY = 'wildan-wicaksono/wildan-wicaksono.github.io';
const OWNER = 'wildan-wicaksono';
const NAME = 'wildan-wicaksono.github.io';
const PAGE_INFO = 'totalCount pageInfo { hasNextPage endCursor }';
const REACTIONS = 'reactionGroups { content users { totalCount } }';
const COMMENT_FIELDS = `id databaseId body createdAt updatedAt lastEditedAt url upvoteCount isMinimized deletedAt
  author { login avatarUrl url ... on User { databaseId } }
  ${REACTIONS}`;

async function graphql(token, query, variables) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'User-Agent': 'wildan-comment-migration' },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(30000)
  });
  if (!response.ok) throw new Error(`GitHub GraphQL returned HTTP ${response.status}`);
  const result = await response.json();
  if (result.errors?.length) throw new Error(`GitHub GraphQL: ${result.errors.map(error => error.message).join('; ')}`);
  if (!result.data) throw new Error('GitHub GraphQL returned no data');
  return result.data;
}

async function connectionPages(getPage) {
  const nodes = [];
  let cursor = null;
  let totalCount = null;
  const cursors = new Set();
  do {
    const page = await getPage(cursor);
    if (!page || !Array.isArray(page.nodes) || page.nodes.some(node => !node)) throw new Error('Missing GitHub connection data');
    if (totalCount === null) totalCount = page.totalCount;
    if (totalCount !== page.totalCount) throw new Error('GitHub data changed during export. Retry to obtain a consistent snapshot.');
    nodes.push(...page.nodes);
    if (page.pageInfo.hasNextPage && !page.pageInfo.endCursor) throw new Error('GitHub reported another page without a cursor');
    cursor = page.pageInfo.hasNextPage ? page.pageInfo.endCursor : null;
    if (cursor && cursors.has(cursor)) throw new Error('Repeated GitHub pagination cursor');
    cursors.add(cursor);
  } while (cursor);
  if (nodes.length !== totalCount || new Set(nodes.map(node => node.id)).size !== nodes.length) throw new Error('GitHub pagination did not yield exactly the reported items');
  return nodes;
}

function exportComment(comment, parentId) {
  if (comment.isMinimized || comment.deletedAt || !comment.body.trim()) {
    throw new Error(`Comment ${comment.databaseId} is minimized, deleted, or empty. Preserve its moderation manually before importing.`);
  }
  if (!comment.databaseId || !comment.author?.databaseId) throw new Error(`Comment ${comment.databaseId} has no verified numeric GitHub author ID`);
  const counts = reactionBaselines(comment.reactionGroups, true);
  return {
    id: `github-${comment.databaseId}`,
    authorUid: '',
    authorName: comment.author.login,
    authorPhotoURL: comment.author.avatarUrl,
    body: comment.body,
    parentId,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    editedAt: comment.lastEditedAt,
    status: 'visible',
    upvoteCount: comment.upvoteCount,
    reactionCounts: counts.native,
    legacyUpvoteCount: comment.upvoteCount,
    legacyReactionCounts: counts.legacy,
    githubAuthorId: String(comment.author.databaseId),
    githubLogin: comment.author.login,
    sourceURL: comment.url,
    source: 'github'
  };
}

export async function exportDiscussions(token, verifyConsistency = true) {
  const discussions = await connectionPages(async cursor => {
    const data = await graphql(token, `query($owner:String!,$name:String!,$cursor:String) {
      repository(owner:$owner,name:$name) { discussions(first:100,after:$cursor) {
        ${PAGE_INFO} nodes { id number databaseId title url createdAt updatedAt upvoteCount ${REACTIONS} }
      } }
    }`, { owner: OWNER, name: NAME, cursor });
    return data.repository?.discussions;
  });
  const records = [];
  for (const discussion of discussions.sort((a, b) => a.number - b.number)) {
    if (!/^(?:\/)?(?:posts|portfolio)\//.test(discussion.title)) {
      throw new Error(`Discussion #${discussion.number} is not a recognized giscus pathname. Review its mapping rather than guessing.`);
    }
    const roots = await connectionPages(async cursor => {
      const data = await graphql(token, `query($owner:String!,$name:String!,$number:Int!,$cursor:String) {
        repository(owner:$owner,name:$name) { discussion(number:$number) { comments(first:100,after:$cursor) {
          ${PAGE_INFO} nodes { ${COMMENT_FIELDS} }
        } } }
      }`, { owner: OWNER, name: NAME, number: discussion.number, cursor });
      return data.repository?.discussion?.comments;
    });
    const comments = [];
    for (const root of roots) {
      const rootId = `github-${root.databaseId}`;
      comments.push(exportComment(root, null));
      const replies = await connectionPages(async cursor => {
        const data = await graphql(token, `query($id:ID!,$cursor:String) {
          node(id:$id) { ... on DiscussionComment { replies(first:100,after:$cursor) {
            ${PAGE_INFO} nodes { ${COMMENT_FIELDS} }
          } } }
        }`, { id: root.id, cursor });
        return data.node?.replies;
      });
      for (const reply of replies) comments.push(exportComment(reply, rootId));
    }
    comments.sort((a, b) => a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id));
    const counts = reactionBaselines(discussion.reactionGroups);
    records.push({
      number: discussion.number,
      githubDatabaseId: String(discussion.databaseId),
      sourceURL: discussion.url,
      sourceCounts: { topLevelComments: roots.length, replies: comments.length - roots.length, postUpvotes: discussion.upvoteCount },
      thread: { path: normalizePath(discussion.title), createdAt: discussion.createdAt, updatedAt: discussion.updatedAt, reactionCounts: counts.native, legacyReactionCounts: counts.legacy },
      comments
    });
  }
  const snapshot = {
    schemaVersion: 1,
    migrationId: 'github-discussions-v1',
    repository: REPOSITORY,
    capturedAt: new Date().toISOString(),
    source: {
      method: 'github-graphql',
      discussionListURL: `https://github.com/${REPOSITORY}/discussions`,
      completeness: { allListedDiscussions: true, allVisibleCommentBodies: true, allVisibleReplies: true, aggregateReactions: true, voterIdentities: false, apiEditTimestamps: true, apiUpvoteCounts: true },
      limitations: ['Historical vote/reaction totals are preserved as immutable baselines. Individual voters are not imported or assigned to Google accounts.', 'Export fully paginates discussions, comments, and replies. A count change during pagination aborts instead of silently producing an incomplete file.'],
      capturedDiscussionNumbers: records.map(record => record.number)
    },
    discussions: records,
    contentSha256: snapshotHash(records)
  };
  validateSnapshot(snapshot);
  if (verifyConsistency) {
    // A count-only check cannot detect an edit during reply traversal. A second
    // complete read compares bodies, author IDs, dates, and reaction baselines too.
    const verification = await exportDiscussions(token, false);
    if (verification.contentSha256 !== snapshot.contentSha256) {
      throw new Error('GitHub data changed between verification passes. Retry before cutover; no snapshot was written.');
    }
    snapshot.capturedAt = verification.capturedAt;
    snapshot.source.completeness.consistentVerificationPass = true;
    snapshot.source.limitations.push('Two independent complete reads matched before writing. Check GitHub again at cutover for comments submitted after the final read.');
  }
  return snapshot;
}

async function main() {
  let output = fileURLToPath(new URL('../migrations/github-discussions.json', import.meta.url));
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--output' && args[i + 1] && !args[i + 1].startsWith('--')) output = args[++i];
    else if (args[i] === '--help') {
      console.log('Usage: node scripts/export-discussions.mjs [--output FILE]\nUses GH_TOKEN, GITHUB_TOKEN, or an existing gh CLI login. Only reads GitHub; writes a local snapshot.');
      return;
    } else throw new Error(`Unknown or incomplete option: ${args[i]}`);
  }
  let token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
  if (!token) {
    try { token = execFileSync('gh', ['auth', 'token'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); }
    catch { throw new Error('Set GH_TOKEN/GITHUB_TOKEN with Discussions read access, or authenticate gh CLI before exporting'); }
  }
  const snapshot = await exportDiscussions(token);
  await writeFile(output, `${JSON.stringify(snapshot, null, 2)}\n`, { mode: 0o644 });
  console.log(JSON.stringify({ output, ...validateSnapshot(snapshot), snapshotSHA256: snapshot.contentSha256 }, null, 2));
  console.log('Before first cutover, update the expected migration checksum in _data/native_comments.yml to match this export.');
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch(error => { console.error(`Export failed: ${error.message}`); process.exitCode = 1; });
}
