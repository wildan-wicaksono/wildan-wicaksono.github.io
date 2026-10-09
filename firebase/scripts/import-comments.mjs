#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { emptyCounts, LEGACY_KEYS, NATIVE_KEYS, validateProductionSnapshot, validateSnapshot } from './migration-utils.mjs';

function localEmulatorHost(host = process.env.FIRESTORE_EMULATOR_HOST) {
  return /^(127\.0\.0\.1|localhost|\[::1\]):\d+$/.test(host || '');
}

function argumentsFrom(argv) {
  const result = { apply: false, emulator: false, project: null, snapshot: fileURLToPath(new URL('../migrations/github-discussions.json', import.meta.url)) };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--apply') result.apply = true;
    else if (arg === '--dry-run') result.apply = false;
    else if (arg === '--emulator') result.emulator = true;
    else if (arg === '--snapshot' || arg === '--project') {
      const value = argv[++i];
      if (!value || value.startsWith('--')) throw new Error(`Missing value for ${arg}`);
      result[arg.slice(2)] = value;
    } else if (arg === '--help') {
      console.log('Usage: node scripts/import-comments.mjs [--snapshot FILE] [--project PROJECT] [--emulator] [--apply]\nDefault: validate and print an offline dry run. Database writes require --apply.');
      process.exit(0);
    } else throw new Error(`Unknown option: ${arg}`);
  }
  return result;
}

function hasLegacyCounts(data) {
  return Object.values(data.legacyReactionCounts || {}).some(value => value !== 0);
}

export async function applySnapshot(db, Timestamp, snapshot) {
  const summary = validateSnapshot(snapshot);
  if (!localEmulatorHost()) validateProductionSnapshot(snapshot);
  const markerRef = db.doc(`commentMigrations/${snapshot.migrationId}`);
  const entries = snapshot.discussions.map(discussion => ({
    discussion,
    threadRef: db.doc(`commentThreads/${encodeURIComponent(discussion.thread.path)}`),
    commentRefs: discussion.comments.map(comment => db.doc(`commentThreads/${encodeURIComponent(discussion.thread.path)}/comments/${comment.id}`))
  }));
  if (entries.reduce((count, entry) => count + entry.commentRefs.length + 1, 1) > 400) {
    throw new Error('Snapshot exceeds the safe one-transaction migration limit. Split with a reviewed migration strategy before importing.');
  }
  return db.runTransaction(async transaction => {
    const marker = await transaction.get(markerRef);
    if (marker.exists) {
      if (marker.data().snapshotSHA256 !== snapshot.contentSha256) {
        throw new Error('This migration was already applied with a different checksum. Refusing to overwrite comments, votes, or moderation. Reconcile any new legacy data separately.');
      }
      return { mode: 'already-imported', ...summary, message: 'Existing comments, edits, moderation, and live counts were preserved without writes.' };
    }
    const refs = entries.flatMap(entry => [entry.threadRef, ...entry.commentRefs]);
    const existing = await transaction.getAll(...refs);
    let cursor = 0;
    const work = entries.map(entry => {
      const thread = existing[cursor++];
      const comments = entry.commentRefs.map(() => existing[cursor++]);
      if (comments.some(comment => comment.exists)) {
        throw new Error(`Imported comments already exist without their migration marker for ${entry.discussion.thread.path}. Refusing an ambiguous duplicate import.`);
      }
      if (thread.exists && hasLegacyCounts(thread.data())) {
        throw new Error(`Legacy thread counts already exist without their migration marker for ${entry.discussion.thread.path}. Refusing to count them twice.`);
      }
      return { ...entry, existingThread: thread };
    });
    // All reads precede all writes so the import and its public completion marker are atomic.
    for (const entry of work) {
      const { discussion, threadRef, existingThread } = entry;
      const current = existingThread.exists ? existingThread.data() : {};
      const nativeCounts = emptyCounts(NATIVE_KEYS);
      for (const key of NATIVE_KEYS) {
        const count = current.reactionCounts?.[key] ?? 0;
        if (!Number.isSafeInteger(count) || count < 0) throw new Error(`Invalid existing thread count: ${discussion.thread.path}/${key}`);
        nativeCounts[key] = count + discussion.thread.reactionCounts[key];
      }
      const threadData = {
        path: discussion.thread.path,
        createdAt: current.createdAt || Timestamp.fromDate(new Date(discussion.thread.createdAt)),
        updatedAt: current.updatedAt || Timestamp.fromDate(new Date(discussion.thread.updatedAt)),
        reactionCounts: nativeCounts,
        legacyReactionCounts: { ...emptyCounts(LEGACY_KEYS), ...discussion.thread.legacyReactionCounts }
      };
      if (existingThread.exists) transaction.update(threadRef, threadData);
      else transaction.create(threadRef, threadData);
      for (const [index, comment] of discussion.comments.entries()) {
        const { id, ...data } = comment;
        transaction.create(entry.commentRefs[index], {
          ...data,
          createdAt: Timestamp.fromDate(new Date(comment.createdAt)),
          updatedAt: Timestamp.fromDate(new Date(comment.updatedAt)),
          editedAt: comment.editedAt ? Timestamp.fromDate(new Date(comment.editedAt)) : null
        });
      }
    }
    transaction.create(markerRef, {
      migrationId: snapshot.migrationId,
      snapshotSHA256: snapshot.contentSha256,
      repository: snapshot.repository,
      capturedAt: Timestamp.fromDate(new Date(snapshot.capturedAt)),
      importedAt: Timestamp.now(),
      discussionCount: summary.discussions,
      commentCount: summary.comments,
      replyCount: summary.replies
    });
    return { mode: 'imported', ...summary };
  });
}

export async function main(argv = process.argv.slice(2)) {
  const options = argumentsFrom(argv);
  const snapshot = JSON.parse(await readFile(options.snapshot, 'utf8'));
  const summary = validateSnapshot(snapshot);
  console.log(JSON.stringify({
    mode: options.apply ? 'apply-requested' : 'dry-run',
    snapshot: options.snapshot,
    ...summary,
    targets: snapshot.discussions.map(discussion => ({ path: discussion.thread.path, threadId: encodeURIComponent(discussion.thread.path), comments: discussion.comments.map(c => c.id) }))
  }, null, 2));
  if (!options.apply) {
    console.log('Validation passed. No database connection or write was made.');
    return;
  }
  if (options.emulator) {
    process.env.FIRESTORE_EMULATOR_HOST ||= '127.0.0.1:8080';
    if (!/^(127\.0\.0\.1|localhost|\[::1\]):\d+$/.test(process.env.FIRESTORE_EMULATOR_HOST)) throw new Error('--emulator accepts only a local emulator host');
    options.project ||= 'demo-comments';
  }
  if (process.env.FIRESTORE_EMULATOR_HOST && !localEmulatorHost()) throw new Error('Only a loopback Firestore emulator host is supported by this importer');
  if (!localEmulatorHost()) validateProductionSnapshot(snapshot);
  if (!options.project) throw new Error('--project is required when applying to a real Firebase project');
  const [{ initializeApp, applicationDefault, deleteApp }, { getFirestore, Timestamp }] = await Promise.all([
    import('firebase-admin/app'), import('firebase-admin/firestore')
  ]);
  const app = initializeApp({ projectId: options.project, ...(process.env.FIRESTORE_EMULATOR_HOST ? {} : { credential: applicationDefault() }) });
  try {
    const result = await applySnapshot(getFirestore(app), Timestamp, snapshot);
    console.log(JSON.stringify({ project: options.project, emulator: process.env.FIRESTORE_EMULATOR_HOST || null, ...result }, null, 2));
  } finally {
    await deleteApp(app);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch(error => { console.error(`Migration failed: ${error.message}`); process.exitCode = 1; });
}
