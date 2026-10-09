# Migrating the existing giscus comments

The committed `migrations/github-discussions.json` is a public, versioned source snapshot. It is not evidence that a Firebase import has already happened. Original GitHub discussions stay intact. This initial HTML snapshot is usable for backup, offline validation, and emulator tests; production import requires the API-verified GraphQL refresh described below.

The snapshot captured on 2026-10-09 contains both public repository discussions:

| Discussion | Article | Top-level comments | Replies | Historical counts |
| --- | --- | ---: | ---: | --- |
| [#1](https://github.com/wildan-wicaksono/wildan-wicaksono.github.io/discussions/1) | Cerita di Balik The Art of Olympiad Geometry | 0 | 0 | None |
| [#2](https://github.com/wildan-wicaksono/wildan-wicaksono.github.io/discussions/2) | Menjalani Bagianku, Melepaskan Sisanya | 1 | 1 | Post: 😕 × 1. Comment: 😄 × 1 and one upvote. |

Comment `github-18776560` belongs to GitHub user ID `198015748` (`nurilahmady`); its reply `github-18826963` belongs to GitHub user ID `61347379` (`wildan-wicaksono`). Names, source links, exact text, original UTC dates, and the parent/reply relationship are preserved.

## What the snapshot preserves

Native reaction totals use `like`, `heart`, `laugh`, `celebrate`, `surprised`, and `clap`. The immutable original GitHub baseline also records `dislike`, `confused`, `rocket`, and `eyes`. A historical 😕 stays 😕; it is never relabeled as 😮. Historical 👍 on comments remains a separate read-only count and is never added to actual upvotes.

The initial source was read-only public GitHub HTML, because the connected GitHub fetch tool does not expose Discussions. The discussion list and both discussions had no remaining pagination or unrendered comment/reply fragments. Both existing bodies are plain paragraphs, so their text is preserved without markup loss. Public HTML does not expose API edit timestamps or individual voters; these limitations and source HTML checksums are recorded in the file. The GraphQL refresh below replaces the timestamp limitation with exact API values.

GitHub numeric user IDs, rather than names or email addresses, determine ownership. A commenter can link their original GitHub account to their Google-authenticated Firebase account to regain edit/delete rights. Old reactions and votes are aggregate baselines; the importer never invents Google-account owners for them.

## Refresh and validate before the first cutover

Run from the `firebase` directory with Node 22 or newer. An authenticated `gh` CLI login or a `GH_TOKEN`/`GITHUB_TOKEN` with Discussions read access is needed for export. Do not commit credentials or service account keys.

```bash
npm ci
node scripts/export-discussions.mjs
node scripts/import-comments.mjs
```

The exporter uses GitHub GraphQL reads and fully paginates discussions, top-level comments, and replies. It performs a second complete export and compares bodies, author IDs, timestamps, counts, and reactions before writing. It refuses inconsistent reads, missing numeric author IDs, unfamiliar article mappings, or deleted/minimized comments needing a reviewed treatment. It writes only a local snapshot. The importer defaults to an offline dry run and makes no database connection.

Production `--apply` refuses HTML provenance, missing verified API timestamps/upvote counts, or a missing second matching export pass before connecting to Firebase. This prevents the initial snapshot's unknown edit timestamps and unverified reply-vote baseline from being marked as a completed migration. A loopback emulator still accepts the initial snapshot for testing.

Review the new snapshot and update the expected migration checksum in `_data/native_comments.yml` to the printed `snapshotSHA256`. The checksum is the lowercase SHA-256 of the UTF-8 bytes from `JSON.stringify(snapshot.discussions)`; it is also stored in `contentSha256`. Canonical article paths have both a leading and trailing slash.

The first HTML snapshot's checksum is `7382be3ba6a525259d4525e4a426d68bf2da977d032a41422eefb7cf1134fcc1`. A refreshed GraphQL snapshot normally has a different checksum. Refresh as close to cutover as practical, and check GitHub again afterward for comments submitted during the change window. Avoid leaving giscus and the new editor accepting comments at the same time.

## Test the import locally

Use a local Firestore emulator. This writes only to its local demo project:

```bash
FIRESTORE_EMULATOR_HOST=127.0.0.1:8088 node scripts/import-comments.mjs --emulator --project demo-comments --apply
FIRESTORE_EMULATOR_HOST=127.0.0.1:8088 node scripts/import-comments.mjs --emulator --project demo-comments --apply
```

The second run must report `already-imported`. The migration tests also verify preservation of post-import edits, hidden comments, native reactions, and live upvotes; reject corrupted snapshots and missing reply parents; and refuse changed snapshots after a completed import.

## Apply once to Firebase

Set up Firebase Authentication, Firestore, its rules, and the site's Firebase configuration using the main setup instructions. Authenticate the Admin SDK through Application Default Credentials in the trusted operator environment. Then run:

```bash
node scripts/import-comments.mjs --project YOUR_FIREBASE_PROJECT_ID --apply
```

The Admin SDK runs outside client security rules. The script imports all target comments and baseline counts together in one Firestore transaction, then creates the completion marker at `commentMigrations/github-discussions-v1`. That marker contains public metadata only: the snapshot checksum, counts, repository, and capture/import times. Client rules allow a direct read of this one marker and deny client writes.

The site replaces giscus only after Firebase initializes and this marker matches the checksum configured in the site. A failed, incomplete, or mismatched import therefore leaves giscus available.

## Safe reruns and later reconciliation

- The same migration ID and checksum are a no-op: the importer does not rewrite bodies, restore deleted comments, reverse moderation, or reset live counts.
- A completed migration with a different checksum is refused. Do not delete the marker to force a rerun; reconcile later GitHub comments or edits with a separately reviewed incremental migration.
- Existing imported target IDs without the completion marker are refused to avoid ambiguous ownership or double-counted historical reactions.
- A first import can add historical counts to an existing native thread without changing its native comments, current reaction totals, or original creation date.
- Stable IDs and the encoded canonical pathname keep replies in the same thread on every run. The current small snapshot fits one atomic transaction. Larger exports beyond 400 target writes are refused pending a reviewed batching strategy.

After cutover, check both migrated comments and their reply link, visible historical counts, Google sign-in, and original-author account linking. Keep the snapshot and original GitHub discussions as the migration record.
