# Comment database contract

This feature uses Google Firebase Authentication and Cloud Firestore directly from
the static blog. The checked-in Rules enforce authorization, field validation,
comment cooldowns, and paired reaction counters. It does not require Cloud
Functions or a billing-plan upgrade.

## Paths and fields

The thread ID is `encodeURIComponent(normalized pathname)`. A normalized pathname
starts and ends with `/` and does not include query parameters or fragments.
The UI must use the same canonical path for comments, reactions, and migration.

`commentThreads/{threadId}`:

| Field | Meaning |
| --- | --- |
| `path` | Canonical blog pathname; immutable after creation |
| `createdAt`, `updatedAt` | Firestore timestamps |
| `reactionCounts` | Current native six-key totals, including overlapping imported baseline reactions |
| `legacyReactionCounts` | Immutable raw GitHub eight-key reaction baseline |

Native reaction keys are `like`, `heart`, `laugh`, `celebrate`, `surprised`,
`clap`. Raw GitHub keys are `like`, `dislike`, `laugh`, `celebrate`, `confused`,
`heart`, `rocket`, `eyes`. All map keys are present even when the count is zero.
Unsupported historical emoji retain their original meaning. They are displayed
as read-only history where applicable and do not become a different new emoji.

`commentThreads/{threadId}/comments/{commentId}`:

| Field | Meaning |
| --- | --- |
| `authorUid` | Firebase UID for native comments; empty string for imported comments |
| `authorName`, `authorPhotoURL` | Public profile snapshot; native creates match the Firebase token's `name`/`picture`, falling back to empty strings |
| `body` | Plain text, 1–4,000 characters; blank text is refused |
| `parentId` | `null` for a root; root comment ID for a reply |
| `createdAt`, `updatedAt`, `editedAt` | Creation, last text/moderation change, and text-edit time; `editedAt` starts at `null` |
| `status` | `visible`, `deleted`, or `hidden` |
| `upvoteCount`, `reactionCounts` | Current totals, including supported baseline values; comment `like` remains zero |
| `legacyUpvoteCount`, `legacyReactionCounts` | Immutable original GitHub upvotes and reactions; GitHub thumbs-up reactions are not converted into upvotes |
| `githubAuthorId`, `githubLogin`, `sourceURL` | Immutable migration identity/reference; empty strings for native comments |
| `source` | `native` or `github`; clients can create only `native` comments |

The native reply model has one level, matching GitHub Discussions. A reply must
reference a visible root in the same thread. The UI can show who is being replied
to, while replies retain this stable root parent.

## Authentication and legacy ownership

Native writing and engagement require a Google identity linked to the Firebase
account. Authentication persistence is handled separately by the browser adapter.
The blog's author badge uses the configured owner Firebase UID and the actual
Firebase/GitHub identity, never a display name supplied in a comment.

The author of an imported comment can edit/delete it after linking their original
GitHub account to the Google Firebase account. Rules compare the original numeric
`githubAuthorId` with the verified Firebase token's
`firebase.identities['github.com']` list. Matching names, email addresses, avatar
URLs, or client-supplied provider IDs never establish ownership. There is no
client-writable legacy ownership claim or reassignment.

`commentAdmins/{uid}` is provisioned by the trusted Admin SDK. Its existence
grants moderation access. The client can get its own role document, but cannot
write any role document or list roles. An admin can hide/unhide any comment. The
moderation path cannot rewrite authors, migration baselines, or text history.

## Atomic writes

Each target has `interactions/{uid}` with exactly:

```js
{ emoji: null, upvoted: false, updatedAt: serverTimestamp() }
```

`emoji` is a native reaction key or `null`. Posts accept all six and require
`upvoted: false`; comments/replies accept the five emoji excluding `like`, with an
independent Boolean upvote. Empty engagement is kept as a record after toggling
off; deleting the record to reset votes is forbidden.

Every engagement change uses one transaction for the current user's interaction
record and the target's totals. Subtract the old emoji, add the new emoji, and
adjust upvotes by `Number(newUpvoted) - Number(oldUpvoted)`. Rules independently
check these exact deltas and reject unpaired writes, other-user records, duplicate
votes, noninteger/negative counts, and changes to imported baselines.

Aggregate writes use server-side `increment(delta)` transforms on the changed
fields, rather than replacing totals computed from an older client snapshot.
This keeps the exact Rules checks valid when other accounts engage at the same
time. Transactions still read the target and current account record before
writing, and retry from fresh state when concurrent requests contend.

Post transactions update `reactionCounts` and `updatedAt`. Comment/reply
transactions update only `reactionCounts` and `upvoteCount`; they do not change
text-edit timestamps. Read all required documents before writing in a transaction.

New comments use an atomic transaction containing the comment and
`commentActivity/{uid}`:

```js
{
  lastCommentAt: serverTimestamp(),
  threadId,
  commentId
}
```

Both sides verify the reciprocal write and the server's request time. The global
per-account cooldown is 30 seconds and applies across posts and replies. Activity
records cannot be deleted/reset by the client. UI-only timers are insufficient.

Own edits update `body`, `updatedAt`, and `editedAt` using server timestamps. Own
deletions write `{ body: '', status: 'deleted', updatedAt: serverTimestamp() }`.
They keep `editedAt` and preserve child replies. Physical client deletion and
restoring tombstones are forbidden. Moderation writes only `status` and
`updatedAt`. Users can delete their own hidden comment; they cannot unhide it.

Deleted records are never rendered publicly: no author, date, deleted message,
or empty card remains. A deleted root is retained only as an internal routing key;
its surviving replies load automatically and appear without the removed parent.
The client skips reply pages containing only deleted records so later surviving
replies remain reachable. This is content erasure with an internal tombstone,
not physical removal of Firestore documents or their interaction subcollections.

Comment text remains text content, with MathJax 3 rendering LaTeX only in comment
bodies and optional composer previews. Inline `$...$` and `\\(...\\)` and display
`$$...$$` and `\\[...\\]` delimiters are supported. The `ui/safe` extension filters
unsafe TeX attributes; user HTML is never parsed. Typesetting is serialized and
cleared whenever comment or preview DOM is replaced.

## Reads, sorting, and pagination

Public comment queries must include `where('status', 'in', ['visible', 'deleted'])`
and a limit at most 20. Roots use `where('parentId', '==', null)`; replies use the
root ID. Read-time Rules do not filter hidden documents out of an unsafe query.
Admins can query hidden comments with the same page limit. Hidden bodies are
available only to the moderator and the original owner. Public get of a thread
is allowed, including a missing thread before the first signed-in interaction.

Use `orderBy('createdAt', 'desc')` for newest, ascending for oldest, and
`orderBy('upvoteCount', 'desc'), orderBy('createdAt', 'desc')` for popularity.
Use Firestore document snapshot cursors (`startAfter(lastSnapshot)`), rather
than offsets. Reset pagination after changing sort; deduplicate results by ID
because votes can change a popular comment's position between pages. The
checked-in indexes cover these collection queries. Replies remain chronological.

Interaction documents are readable only by their own UID, never publicly
queryable. The UI uses aggregate counts rather than downloading voters.
Role/activity/migration namespaces contain no publicly exposed private profiles.
Do not put emails, OAuth access tokens, service-account keys, or admin credentials
in comment documents or frontend configuration.

## Migration readiness and production activation

The only public migration read is
`commentMigrations/github-discussions-v1`. It contains public version/checksum
and import-count metadata. Clients cannot write it or list migration ledgers.
The frontend checks `snapshotSHA256` against the reviewed snapshot before
cutover. Missing/mismatched metadata keeps the existing giscus fallback.

An actual Firebase project must enable Google authentication, authorize
`wildan-wicaksono.github.io`, deploy these Rules/indexes, import the snapshot,
and configure the public Firebase web-app settings. GitHub linking additionally
needs the GitHub auth provider/OAuth app with the Firebase callback URL.
Provision the moderator UID through the Admin SDK. Public Firebase web-app
configuration is not an admin credential; Admin SDK keys must remain outside
the repository and browser bundle. Do not activate against an empty/unsecured
database or deploy production writes using emulator credentials.

Run the adversarial Rules tests through the Firestore Emulator. The test project
is `demo-homepage-rules`, separate from adapter and migration test data. The tests
check successful workflows as well as malicious/unpaired writes and private
read boundaries.
