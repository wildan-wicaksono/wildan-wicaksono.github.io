export const REACTION_KEYS = ['like', 'heart', 'laugh', 'celebrate', 'surprised', 'clap'];
export const LEGACY_KEYS = ['like', 'dislike', 'laugh', 'celebrate', 'confused', 'heart', 'rocket', 'eyes'];
export const emptyCounts = () => Object.fromEntries(REACTION_KEYS.map(key => [key, 0]));
export const emptyLegacyCounts = () => Object.fromEntries(LEGACY_KEYS.map(key => [key, 0]));

export function normalizePath(value) {
  if (typeof value !== 'string' || !/^\/[^?#\\\u0000-\u001f]*$/.test(value)) {
    throw new Error('A canonical page pathname is required.');
  }
  let path = value.replace(/\/{2,}/g, '/');
  if (path.split('/').some(part => part === '.' || part === '..')) throw new Error('Invalid pathname.');
  if (!path.endsWith('/') && !/\.[a-z0-9]+$/i.test(path)) path += '/';
  if (encodeURIComponent(path).length > 1400) throw new Error('Pathname is too long.');
  return path;
}

export const threadIdForPath = value => encodeURIComponent(normalizePath(value));
export const millis = value => value?.toMillis?.() ?? (value?.seconds ? value.seconds * 1000 : Number(new Date(value)) || 0);

export function safeHTTPS(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : '';
  } catch { return ''; }
}

export function ownsComment(data, viewer) {
  if (!viewer?.uid) return false;
  if (data.authorUid === viewer.uid) return true;
  const githubIds = viewer.claims?.firebase?.identities?.['github.com'] || [];
  return data.source === 'github' && Boolean(data.githubAuthorId)
    && githubIds.includes(data.githubAuthorId);
}

export function normalizeComment(id, data, viewer, settings = {}, interaction = {}) {
  const owned = ownsComment(data, viewer);
  const writable = Boolean(viewer?.googleLinked);
  return {
    id, ...data,
    displayName: data.authorName || 'Pembaca',
    photoURL: safeHTTPS(data.authorPhotoURL),
    rootId: data.parentId || id,
    edited: Boolean(data.editedAt),
    deleted: data.status === 'deleted',
    hidden: data.status === 'hidden',
    imported: data.source === 'github',
    sourceURL: safeHTTPS(data.sourceURL),
    upvotes: data.upvoteCount || 0,
    reactions: data.reactionCounts || emptyCounts(),
    legacyReactions: data.legacyReactionCounts || emptyLegacyCounts(),
    viewerReaction: interaction.emoji || null,
    viewerUpvoted: Boolean(interaction.upvoted),
    replyCount: null,
    canEdit: writable && owned && data.status === 'visible',
    canDelete: writable && owned && ['visible', 'hidden'].includes(data.status),
    canModerate: Boolean(viewer?.canModerate) && ['visible', 'hidden'].includes(data.status),
    isAuthor: Boolean(settings.ownerUid && data.authorUid === settings.ownerUid)
      || Boolean(data.source === 'github' && settings.ownerGithubId && data.githubAuthorId === String(settings.ownerGithubId))
  };
}

export function changedCounts(counts, before, after) {
  const result = { ...counts };
  if (before) result[before] -= 1;
  if (after) result[after] += 1;
  return result;
}

export function cleanBody(value) {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > 4000) {
    const error = new Error('Invalid comment text.');
    error.userMessage = 'Tulis komentar sepanjang 1–4.000 karakter.';
    throw error;
  }
  return value.trim();
}
