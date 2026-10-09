/* Plain-text, accessible comment UI. Firebase access lives in the adapter. */
const POST_REACTIONS = [
  ["like", "👍", "Suka"], ["heart", "❤️", "Suka sekali"],
  ["laugh", "😄", "Senang"], ["celebrate", "🎉", "Merayakan"],
  ["surprised", "😮", "Terkejut"], ["clap", "👏", "Apresiasi"]
];
const COMMENT_REACTIONS = POST_REACTIONS.filter(([key]) => key !== "like");
const LEGACY_REACTIONS = [["dislike", "👎", "Tidak suka"], ["confused", "😕", "Bingung"], ["eyes", "👀", "Memperhatikan"]];
const DATE_FORMAT = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" });

function node(tag, className, text, attributes = {}) {
  const result = document.createElement(tag);
  if (className) result.className = className;
  if (text !== undefined && text !== null) result.textContent = text;
  Object.entries(attributes).forEach(([key, value]) => result.setAttribute(key, String(value)));
  return result;
}

function button(text, action, key, className = "nc-button") {
  const result = node("button", className, text, { type: "button", "data-focus-key": key });
  result.addEventListener("click", action);
  return result;
}

function timestamp(value) {
  if (!value) return 0;
  if (typeof value.toMillis === "function") return value.toMillis();
  if (typeof value === "number") return value;
  if (value.seconds !== undefined) return Number(value.seconds) * 1000;
  return Number(new Date(value)) || 0;
}

function safeURL(value) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : null;
  } catch { return null; }
}

function count(value) {
  return Number.isFinite(Number(value)) ? Math.max(0, Number(value)) : 0;
}

function normalize(comment) {
  return {
    ...comment,
    displayName: comment.displayName || comment.authorName || "Pembaca",
    photoURL: comment.photoURL || comment.authorPhotoURL || "",
    deleted: comment.deleted || comment.status === "deleted",
    hidden: comment.hidden || comment.status === "hidden",
    edited: Boolean(comment.edited || comment.editedAt),
    imported: comment.imported || comment.source === "github",
    reactions: comment.reactions || comment.reactionCounts || {},
    legacyReactions: comment.legacyReactions || comment.legacyReactionCounts || {},
    upvotes: count(comment.upvotes ?? comment.upvoteCount)
  };
}

function errorMessage(error) {
  if (error?.userMessage) return error.userMessage;
  const code = String(error?.code || "");
  if (/popup-closed|cancelled-popup|account-exists-with-different-credential/.test(code)) {
    return code.includes("account-exists")
      ? "Akun ini sudah menggunakan metode masuk lain. Masuk dengan akun Google yang sama, lalu hubungkan GitHub."
      : "Proses masuk dibatalkan. Komentarmu belum berubah.";
  }
  if (/popup-blocked/.test(code)) return "Browser memblokir jendela masuk. Izinkan pop-up untuk situs ini, lalu coba lagi.";
  if (/network|unavailable/.test(code)) return "Koneksi sedang bermasalah. Periksa internetmu, lalu coba lagi.";
  if (/cooldown|too-many-requests|resource-exhausted/.test(code)) return "Tunggu sebentar sebelum mengirim lagi, lalu coba ulang.";
  if (/permission-denied/.test(code)) return "Perubahan belum tersimpan. Pastikan kamu masuk dengan akun pemilik komentar, lalu coba lagi.";
  return "Belum berhasil. Coba lagi sebentar; tulisanmu tetap tersimpan di kolom ini.";
}

/**
 * Adapter methods: subscribeAuth, signInGoogle, signOut, linkGitHub, getPost,
 * listComments, listReplies, addComment, editComment, deleteComment, setHidden,
 * reactPost, reactComment, vote. All data mutations are enforced server-side.
 */
export function mountNativeComments(root, adapter, config = {}) {
  if (!root || !adapter) throw new Error("Comment root and adapter are required.");
  const path = config.path || root.dataset.path;
  const pageSize = Math.min(50, Math.max(1, Number(config.pageSize) || 20));
  const maxLength = Math.min(10000, Math.max(1, Number(config.maxLength) || 4000));
  const state = {
    user: null, post: null, roots: [], cursor: null, sort: "newest", includeHidden: false,
    replies: new Map(), forms: new Map(), busy: new Set(), pendingDeletes: new Set(),
    loaded: false, destroyed: false, loading: true, lastSent: 0, refreshVersion: 0
  };
  let unsubscribe = () => {};
  let countdownTimer = null;
  let authTask = Promise.resolve();

  root.classList.add("native-comments");
  root.setAttribute("aria-label", "Reaksi dan komentar");
  const postSection = node("section", "nc-post", null, { "aria-labelledby": "nc-post-title" });
  postSection.append(node("h3", "nc-section-title", "Bagaimana menurutmu?", { id: "nc-post-title" }));
  const postReactions = node("div", "nc-reactions nc-reactions--post");
  const postHint = node("p", "nc-muted nc-post-hint", "Pilih reaksi untuk tulisan ini.");
  postSection.append(postReactions, postHint);
  const header = node("div", "nc-heading");
  header.append(node("h3", "nc-section-title", "Percakapan", { id: "nc-comments-title" }));
  const tools = node("div", "nc-tools");
  const sortLabel = node("label", "nc-sort-label", "Urutan", { for: "nc-sort" });
  const sort = node("select", "nc-select", null, { id: "nc-sort", "data-focus-key": "sort" });
  [["newest", "Terbaru"], ["oldest", "Terlama"], ["popular", "Terpopuler"]].forEach(([value, label]) => sort.append(node("option", "", label, { value })));
  sort.addEventListener("change", () => {
    state.sort = sort.value;
    refresh().catch(reportError);
  });
  const refreshButton = button("↻ Segarkan", () => refresh().catch(reportError), "refresh", "nc-button nc-button--quiet");
  refreshButton.setAttribute("aria-label", "Segarkan komentar dan reaksi");
  tools.append(sortLabel, sort, refreshButton);
  header.append(tools);
  const auth = node("div", "nc-auth");
  const moderatorOptions = node("div", "nc-moderator-options");
  const composer = node("div", "nc-composer");
  const status = node("p", "nc-status", "Memuat komentar…", { role: "status", "aria-live": "polite", "aria-atomic": "true" });
  const commentsList = node("div", "nc-list", null, { "aria-labelledby": "nc-comments-title" });
  const pagination = node("div", "nc-pagination");
  root.replaceChildren(postSection, header, auth, moderatorOptions, composer, status, commentsList, pagination);

  function setMessage(message = "", error = false) {
    if (state.destroyed) return;
    status.textContent = message;
    status.classList.toggle("nc-status--error", error);
  }
  function reportError(error) { setMessage(errorMessage(error), true); }

  function preserveFocus(render) {
    const active = document.activeElement;
    const key = root.contains(active) ? active.dataset.focusKey : null;
    const selection = active?.selectionStart !== undefined ? [active.selectionStart, active.selectionEnd] : null;
    render();
    if (!key) return;
    const replacement = [...root.querySelectorAll("[data-focus-key]")].find(item => item.dataset.focusKey === key);
    if (replacement && !replacement.disabled) {
      replacement.focus({ preventScroll: true });
      if (selection && replacement.setSelectionRange) replacement.setSelectionRange(...selection);
    }
  }

  function focusControl(key) {
    const target = [...root.querySelectorAll("[data-focus-key]")].find(item => item.dataset.focusKey === key);
    if (!target || target.disabled) return false;
    target.focus({ preventScroll: true });
    return true;
  }

  async function act(key, operation) {
    if (state.busy.has(key) || state.destroyed) return;
    const initiatorKey = root.contains(document.activeElement) ? document.activeElement.dataset.focusKey : null;
    state.busy.add(key);
    updateBusy();
    try { return await operation(); }
    catch (error) { reportError(error); }
    finally {
      state.busy.delete(key);
      if (!state.destroyed) {
        updateBusy();
        if (initiatorKey && document.activeElement === document.body) {
          if (!focusControl(initiatorKey) && initiatorKey === "sign-in") focusControl("root:input");
          if (initiatorKey === "link-github") focusControl("sign-out");
        }
      }
    }
  }

  function updateBusy() {
    root.querySelectorAll("[data-operation]").forEach(item => {
      const key = item.dataset.operation;
      const cooldown = item.closest('.nc-form[data-new-comment]') && item.type === "submit" && Date.now() - state.lastSent < 30000;
      item.disabled = state.busy.has(key) || (key === "auth" && state.loading) || item.dataset.unavailable === "true" || Boolean(cooldown);
      item.setAttribute("aria-busy", state.busy.has(key) ? "true" : "false");
    });
    refreshButton.disabled = state.loading;
    sort.disabled = state.loading;
  }

  async function ensureSignedIn() {
    if (state.user) { await authTask; return Boolean(state.user); }
    const user = await adapter.signInGoogle();
    if (user && !state.user) await authChanged(user);
    await authTask;
    return Boolean(state.user);
  }

  function reactionRow(data, target) {
    const row = node("div", "nc-reactions", null, { role: "group", "aria-label": target === "post" ? "Reaksi tulisan" : "Reaksi komentar" });
    const reactions = data?.reactions || data?.reactionCounts || {};
    const selected = data?.viewerReaction || null;
    (target === "post" ? POST_REACTIONS : COMMENT_REACTIONS).forEach(([key, emoji, label]) => {
      const operation = `reaction:${target}`;
      const reactionButton = button("", () => act(operation, async () => {
        if (!await ensureSignedIn()) return;
        const current = target === "post" ? state.post : findComment(target);
        const next = current?.viewerReaction === key ? null : key;
        const updated = target === "post"
          ? await adapter.reactPost({ path, emoji: next })
          : await adapter.reactComment({ path, id: target, emoji: next });
        if (target === "post") { state.post = updated; renderPost(); }
        else updateComment(updated);
        setMessage(next ? "Reaksimu tersimpan." : "Reaksimu dibatalkan.");
      }), `${target}:reaction:${key}`, "nc-reaction");
      reactionButton.dataset.operation = operation;
      reactionButton.setAttribute("aria-label", `${label}: ${count(reactions[key])} reaksi${selected === key ? ", dipilih" : ""}`);
      reactionButton.setAttribute("aria-pressed", String(selected === key));
      reactionButton.title = state.user ? label : `Masuk dengan Google untuk memberi reaksi ${label.toLowerCase()}`;
      reactionButton.append(node("span", "nc-emoji", emoji, { "aria-hidden": "true" }), node("span", "nc-reaction-count", data ? count(reactions[key]) : "…", { "aria-hidden": "true" }));
      reactionButton.dataset.unavailable = String(!data);
      reactionButton.disabled = !data || state.busy.has(operation);
      row.append(reactionButton);
    });
    const legacy = data?.legacyReactions || data?.legacyReactionCounts || {};
    (target === "post" ? LEGACY_REACTIONS : [["like", "👍", "Suka"], ...LEGACY_REACTIONS]).forEach(([key, emoji, label]) => {
      if (!count(legacy[key])) return;
      const chip = node("span", "nc-legacy-reaction", `${emoji} ${count(legacy[key])}`, { title: `${label}: reaksi lama dari GitHub`, "aria-label": `${label}, ${count(legacy[key])} reaksi lama dari GitHub` });
      row.append(chip);
    });
    return row;
  }

  function renderPost() {
    preserveFocus(() => postReactions.replaceChildren(reactionRow(state.post, "post")));
    postHint.textContent = state.user ? "Satu reaksi per akun. Klik lagi untuk membatalkan." : "Masuk dengan Google untuk memberi reaksi atau ikut berkomentar.";
  }

  function avatar(name, photoURL) {
    const url = safeURL(photoURL);
    if (!url) return node("span", "nc-avatar nc-avatar--initial", Array.from(name || "P")[0].toUpperCase(), { "aria-hidden": "true" });
    const image = node("img", "nc-avatar", null, { src: url, alt: "", width: "32", height: "32", loading: "lazy", referrerpolicy: "no-referrer" });
    image.addEventListener("error", () => image.replaceWith(avatar(name, "")), { once: true });
    return image;
  }

  function renderAuth() {
    preserveFocus(() => {
      auth.replaceChildren();
      if (state.user) {
        const identity = node("div", "nc-identity");
        identity.append(avatar(state.user.displayName, state.user.photoURL), node("span", "nc-auth-name", state.user.displayName || "Pembaca"));
        const signOut = button("Keluar", () => act("auth", () => adapter.signOut()), "sign-out", "nc-button nc-button--quiet");
        signOut.dataset.operation = "auth";
        auth.append(identity, signOut);
      } else {
        auth.append(node("p", "nc-muted", "Semua orang bisa membaca. Masuk untuk ikut berbincang."));
        const login = button("Masuk dengan Google", () => act("auth", ensureSignedIn), "sign-in", "nc-button nc-button--google");
        login.dataset.operation = "auth";
        auth.append(login);
      }
      if (state.user && !state.user.githubLinked && state.user.githubLinkAvailable !== false && typeof adapter.linkGitHub === "function" && state.roots.some(item => item.imported)) {
        const legacy = node("div", "nc-link-account");
        legacy.append(node("span", "nc-muted", "Pernah berkomentar lewat GitHub? "));
        const link = button("Hubungkan akun GitHub", () => act("auth", async () => {
          await adapter.linkGitHub();
          await refresh();
          setMessage("Akun GitHub terhubung. Komentar lamamu bisa dikelola dengan akun ini.");
        }), "link-github", "nc-button nc-button--text");
        link.dataset.operation = "auth";
        legacy.append(link);
        auth.append(legacy);
      }
      moderatorOptions.replaceChildren();
      if (state.user?.canModerate) {
        const label = node("label", "nc-checkbox-label");
        const input = node("input", "", null, { type: "checkbox", "data-focus-key": "hidden-toggle" });
        input.checked = state.includeHidden;
        input.addEventListener("change", () => {
          state.includeHidden = input.checked;
          state.replies.clear();
          refresh().catch(reportError);
        });
        label.append(input, document.createTextNode("Tampilkan komentar tersembunyi"));
        moderatorOptions.append(label);
      }
    });
    updateBusy();
  }

  function formState(key, defaults = {}) {
    if (!state.forms.has(key)) state.forms.set(key, { body: "", ...defaults });
    return state.forms.get(key);
  }

  function makeComposer(key, options = {}) {
    const draft = formState(key, { body: options.body || "" });
    const form = node("form", "nc-form");
    const label = node("label", "nc-form-label", options.label || "Tulis komentar", { for: `nc-input-${key}` });
    const textarea = node("textarea", "nc-textarea", null, {
      id: `nc-input-${key}`, rows: "3", maxlength: maxLength, required: "required",
      placeholder: options.reply ? "Tulis balasanmu…" : "Bagikan tanggapanmu…", "data-focus-key": `${key}:input`
    });
    textarea.value = draft.body;
    textarea.addEventListener("input", () => { draft.body = textarea.value; });
    const help = node("p", "nc-form-help", "Teks biasa dan emoji didukung. Alamat emailmu tidak ditampilkan.", { id: `nc-help-${key}` });
    textarea.setAttribute("aria-describedby", `nc-help-${key}`);
    const actions = node("div", "nc-form-actions");
    const submit = node("button", "nc-button nc-button--primary", options.edit ? "Simpan perubahan" : options.reply ? "Kirim balasan" : "Kirim komentar", { type: "submit", "data-operation": `send:${key}`, "data-focus-key": `${key}:submit` });
    actions.append(submit);
    if (options.cancel) actions.append(button("Batal", options.cancel, `${key}:cancel`, "nc-button nc-button--quiet"));
    const cooldown = node("span", "nc-cooldown", "", { "aria-live": "off" });
    actions.append(cooldown);
    form.append(label, textarea, help, actions);
    if (!options.edit) form.dataset.newComment = "true";
    form.addEventListener("submit", event => {
      event.preventDefault();
      act(`send:${key}`, async () => {
        const body = textarea.value.trim();
        if (!body) { textarea.focus(); return; }
        if (body.length > maxLength) { setMessage(`Komentar maksimal ${maxLength} karakter.`, true); return; }
        if (options.reply && !canReplyTo(findComment(options.parentId), options.rootId)) {
          setMessage("Komentar ini sudah dihapus atau disembunyikan. Balasan baru belum bisa dikirim.", true);
          return;
        }
        if (!options.edit && Date.now() - state.lastSent < 30000) {
          setMessage("Beri jeda 30 detik antar komentar atau balasan.", true);
          return;
        }
        if (!await ensureSignedIn()) return;
        if (options.reply && !canReplyTo(findComment(options.parentId), options.rootId)) {
          setMessage("Komentar ini sudah dihapus atau disembunyikan. Balasan baru belum bisa dikirim.", true);
          return;
        }
        const updated = options.edit
          ? await adapter.editComment({ path, id: options.id, body })
          : await adapter.addComment({ path, body, parentId: options.parentId || null, rootId: options.rootId || null });
        if (options.edit) {
          state.forms.delete(key);
          updateComment(updated);
          focusControl(`${options.id}:edit`);
          setMessage("Perubahan komentarmu tersimpan.");
        } else {
          state.lastSent = Date.now();
          draft.body = "";
          textarea.value = "";
          if (options.reply) {
            state.forms.delete(key);
            const replies = state.replies.get(options.rootId) || { items: [], cursor: null, loaded: false, loading: false };
            replies.locallyAdded = mergeComments(replies.locallyAdded || [], [updated]);
            replies.items = mergeComments(replies.items, [updated]).sort(oldestFirst);
            state.replies.set(options.rootId, replies);
            const parent = state.roots.find(item => item.id === options.rootId);
            if (parent?.replyCount !== undefined && parent.replyCount !== null) parent.replyCount = count(parent.replyCount) + 1;
          } else {
            state.roots = mergeComments(state.roots, [updated]);
          }
          renderComments();
          if (options.reply) focusControl(`${options.parentId}:reply`);
          tickCooldown();
          setMessage(options.reply ? "Balasanmu terkirim." : "Komentarmu terkirim.");
        }
      });
    });
    return form;
  }

  function tickCooldown() {
    if (state.destroyed) return;
    const remaining = Math.ceil((30000 - (Date.now() - state.lastSent)) / 1000);
    root.querySelectorAll(".nc-form[data-new-comment] .nc-cooldown").forEach(item => { item.textContent = remaining > 0 ? `Bisa mengirim lagi dalam ${remaining} dtk` : ""; });
    root.querySelectorAll(".nc-form[data-new-comment] button[type=submit]").forEach(item => { item.disabled = remaining > 0 || state.busy.has(item.dataset.operation); });
    if (countdownTimer) window.clearTimeout(countdownTimer);
    countdownTimer = remaining > 0 ? window.setTimeout(tickCooldown, 1000) : null;
  }

  function renderComposer() {
    preserveFocus(() => composer.replaceChildren(makeComposer("root", { label: "Tulis komentar" })));
    tickCooldown();
  }

  function mergeComments(existing, incoming) {
    const comments = new Map(existing.map(item => [item.id, item]));
    incoming.forEach(item => { if (item?.id) comments.set(item.id, normalize(item)); });
    return [...comments.values()];
  }

  function oldestFirst(a, b) { return timestamp(a.createdAt) - timestamp(b.createdAt) || String(a.id).localeCompare(String(b.id)); }
  function rootOrder(a, b) {
    if (state.sort === "popular") return count(b.upvotes) - count(a.upvotes) || oldestFirst(b, a);
    return state.sort === "oldest" ? oldestFirst(a, b) : oldestFirst(b, a);
  }

  function findComment(id) {
    const own = state.roots.find(item => item.id === id);
    if (own) return own;
    for (const replies of state.replies.values()) {
      const reply = replies.items.find(item => item.id === id);
      if (reply) return reply;
    }
    return null;
  }

  function updateComment(comment) {
    if (!comment?.id) return;
    const updated = normalize(comment);
    state.roots = state.roots.map(item => item.id === updated.id ? updated : item);
    for (const replies of state.replies.values()) {
      replies.items = replies.items.map(item => item.id === updated.id ? updated : item);
      if (replies.locallyAdded) replies.locallyAdded = replies.locallyAdded.map(item => item.id === updated.id ? updated : item);
    }
    renderComments();
  }

  function canReplyTo(comment, rootId) {
    const threadRoot = findComment(rootId);
    return Boolean(comment && threadRoot && !comment.deleted && !comment.hidden && !threadRoot.deleted && !threadRoot.hidden);
  }

  function openReply(comment, rootId) {
    if (!canReplyTo(comment, rootId)) return;
    const key = `reply-${comment.id}`;
    formState(key, { parentId: comment.id, rootId, label: `Balas ${comment.displayName}` });
    renderComments();
    focusControl(`${key}:input`);
  }

  function commentArticle(comment, rootId, isReply = false) {
    const canReply = canReplyTo(comment, rootId);
    const article = node("article", `nc-comment${isReply ? " nc-comment--reply" : ""}${comment.hidden ? " nc-comment--hidden" : ""}`, null, { id: `comment-${comment.id}` });
    const metadata = node("header", "nc-comment-header", null, { tabindex: "-1", "data-focus-key": `${comment.id}:header` });
    metadata.append(avatar(comment.deleted ? "?" : comment.displayName, comment.deleted ? "" : comment.photoURL));
    const identity = node("div", "nc-comment-identity");
    const author = node("div", "nc-comment-author", comment.deleted ? "Komentar dihapus" : comment.displayName);
    if (comment.isAuthor && !comment.deleted) author.append(node("span", "nc-author-badge", "Penulis"));
    identity.append(author);
    const dateRow = node("div", "nc-comment-meta");
    const ms = timestamp(comment.createdAt);
    const date = ms ? DATE_FORMAT.format(ms) : "";
    const sourceURL = safeURL(comment.sourceURL);
    const time = node("time", "", date, ms ? { datetime: new Date(ms).toISOString() } : {});
    if (sourceURL) {
      const link = node("a", "nc-source-link", null, { href: sourceURL, target: "_blank", rel: "noopener noreferrer", title: "Lihat komentar asli di GitHub" });
      link.append(time);
      dateRow.append(link);
    } else dateRow.append(time);
    if (comment.edited) dateRow.append(node("span", "", " · diedit"));
    if (comment.imported) dateRow.append(node("span", "nc-imported", " · dari GitHub"));
    identity.append(dateRow);
    metadata.append(identity);
    article.append(metadata);
    const editKey = `edit-${comment.id}`;
    if (state.forms.has(editKey) && comment.canEdit && !comment.deleted && !comment.hidden) {
      article.append(makeComposer(editKey, {
        id: comment.id, edit: true, label: "Edit komentarmu", body: comment.body,
        cancel: () => { state.forms.delete(editKey); renderComments(); focusControl(`${comment.id}:edit`); }
      }));
    } else {
      const body = comment.deleted ? "Komentar ini telah dihapus." : comment.hidden ? "Komentar ini disembunyikan oleh moderator." : comment.body || "";
      article.append(node("p", comment.deleted || comment.hidden ? "nc-comment-body nc-placeholder" : "nc-comment-body", body));
      if (comment.hidden && comment.canModerate && comment.body) article.append(node("p", "nc-comment-body nc-moderator-preview", comment.body));
    }
    const actions = node("div", "nc-comment-actions");
    if (!comment.deleted && !comment.hidden) {
      const operation = `vote:${comment.id}`;
      const vote = button(`▲ ${count(comment.upvotes)}`, () => act(operation, async () => {
        if (!await ensureSignedIn()) return;
        const current = findComment(comment.id);
        updateComment(await adapter.vote({ path, id: comment.id, active: !current?.viewerUpvoted }));
        setMessage(current?.viewerUpvoted ? "Upvote dibatalkan." : "Upvote tersimpan.");
      }), `${comment.id}:vote`, "nc-vote");
      vote.setAttribute("aria-label", `Upvote, ${count(comment.upvotes)} suara`);
      vote.setAttribute("aria-pressed", String(Boolean(comment.viewerUpvoted)));
      vote.dataset.operation = operation;
      vote.title = "Satu upvote per akun. Klik lagi untuk membatalkan.";
      actions.append(vote, reactionRow(comment, comment.id));
    }
    const textual = node("div", "nc-comment-controls");
    if (canReply) textual.append(button("Balas", () => openReply(comment, rootId), `${comment.id}:reply`, "nc-button nc-button--text"));
    if (comment.canEdit && !comment.deleted && !comment.hidden) textual.append(button("Edit", () => {
      formState(editKey, { body: comment.body });
      renderComments();
      focusControl(`${editKey}:input`);
    }, `${comment.id}:edit`, "nc-button nc-button--text"));
    if (comment.canDelete && !comment.deleted) textual.append(button("Hapus", () => {
      state.pendingDeletes.add(comment.id);
      renderComments();
      focusControl(`${comment.id}:confirm-delete`);
    }, `${comment.id}:delete`, "nc-button nc-button--text"));
    if (comment.canModerate && !comment.deleted) {
      const operation = `moderate:${comment.id}`;
      const moderate = button(comment.hidden ? "Tampilkan" : "Sembunyikan", () => act(operation, async () => {
        const updated = await adapter.setHidden({ path, id: comment.id, hidden: !comment.hidden });
        updateComment(updated);
        setMessage(comment.hidden ? "Komentar ditampilkan kembali." : "Komentar disembunyikan; balasannya tetap ada.");
      }), `${comment.id}:moderate`, "nc-button nc-button--text");
      moderate.dataset.operation = operation;
      textual.append(moderate);
    }
    if (actions.childNodes.length) article.append(actions);
    article.append(textual);
    if (state.pendingDeletes.has(comment.id)) {
      const confirm = node("div", "nc-confirm");
      confirm.append(node("p", "", "Hapus komentar ini? Balasannya tetap ada."));
      const operation = `delete:${comment.id}`;
      const remove = button("Ya, hapus", () => act(operation, async () => {
        const updated = await adapter.deleteComment({ path, id: comment.id });
        state.pendingDeletes.delete(comment.id);
        updateComment(updated);
        focusControl(`${comment.id}:header`);
        setMessage("Komentarmu dihapus.");
      }), `${comment.id}:confirm-delete`, "nc-button nc-button--danger");
      remove.dataset.operation = operation;
      remove.dataset.confirmId = comment.id;
      confirm.append(remove, button("Batal", () => {
        state.pendingDeletes.delete(comment.id);
        renderComments();
        focusControl(`${comment.id}:delete`);
      }, `${comment.id}:cancel-delete`, "nc-button nc-button--quiet"));
      article.append(confirm);
    }
    const replyKey = `reply-${comment.id}`;
    if (state.forms.has(replyKey) && canReply) article.append(makeComposer(replyKey, {
      reply: true, rootId, parentId: comment.id, label: `Balas ${comment.displayName}`,
      cancel: () => { state.forms.delete(replyKey); renderComments(); focusControl(`${comment.id}:reply`); }
    }));
    return article;
  }

  async function loadReplies(rootId, nextPage = false) {
    const version = state.refreshVersion;
    const initiatorKey = root.contains(document.activeElement) ? document.activeElement.dataset.focusKey : null;
    const previous = state.replies.get(rootId) || { items: [], cursor: null, loaded: false, loading: false };
    if (previous.loading) return;
    previous.loading = true;
    state.replies.set(rootId, previous);
    renderComments();
    try {
      const result = await adapter.listReplies({ path, rootId, cursor: nextPage ? previous.cursor : null, limit: pageSize, includeHidden: state.includeHidden });
      if (state.destroyed || version !== state.refreshVersion) return;
      previous.items = mergeComments(mergeComments(nextPage ? previous.items : [], previous.locallyAdded || []), result.items || []).sort(oldestFirst);
      previous.cursor = result.nextCursor || null;
      previous.loaded = true;
      setMessage("");
    } catch (error) { reportError(error); }
    finally {
      previous.loading = false;
      renderComments();
      if (initiatorKey && document.activeElement === document.body) {
        if (!focusControl(initiatorKey) && previous.items[0]) focusControl(`${previous.items[0].id}:header`);
      }
    }
  }

  function renderComments() {
    preserveFocus(() => {
      commentsList.replaceChildren();
      if (!state.loaded) {
        commentsList.append(node("p", "nc-muted nc-empty", state.loading ? "Memuat percakapan…" : "Komentar belum dapat dimuat. Klik Segarkan untuk mencoba lagi."));
      } else if (!state.roots.length) {
        commentsList.append(node("p", "nc-muted nc-empty", "Belum ada komentar. Kamu bisa membuka percakapan pertama."));
      }
      [...state.roots].sort(rootOrder).forEach(comment => {
        const thread = node("div", "nc-thread");
        thread.append(commentArticle(comment, comment.id));
        const replies = state.replies.get(comment.id);
        if (replies?.items.length) {
          const replyList = node("div", "nc-replies", null, { "aria-label": `Balasan untuk ${comment.displayName}` });
          replies.items.forEach(reply => replyList.append(commentArticle(reply, comment.id, true)));
          thread.append(replyList);
        }
        if (replies?.loaded && !replies.items.length) thread.append(node("p", "nc-muted nc-reply-empty", "Belum ada balasan."));
        if (replies?.loading) thread.append(node("p", "nc-muted nc-reply-empty", "Memuat balasan…"));
        else if (!replies?.loaded && comment.replyCount !== 0) {
          thread.append(button(comment.replyCount ? `Lihat ${count(comment.replyCount)} balasan` : "Lihat balasan", () => loadReplies(comment.id), `${comment.id}:load-replies`, "nc-button nc-button--replies"));
        } else if (replies?.cursor) {
          thread.append(button("Muat balasan lainnya", () => loadReplies(comment.id, true), `${comment.id}:more-replies`, "nc-button nc-button--replies"));
        }
        commentsList.append(thread);
      });
      pagination.replaceChildren();
      if (state.cursor) {
        const more = button("Muat komentar lainnya", () => act("more", async () => {
          const version = state.refreshVersion;
          const result = await adapter.listComments({ path, sort: state.sort, cursor: state.cursor, limit: pageSize, includeHidden: state.includeHidden });
          if (state.destroyed || version !== state.refreshVersion) return;
          state.roots = mergeComments(state.roots, result.items || []);
          state.cursor = result.nextCursor || null;
          renderComments();
          renderAuth();
          if (!state.cursor && result.items?.[0] && document.activeElement === document.body) focusControl(`${result.items[0].id}:header`);
          setMessage("");
        }), "more", "nc-button nc-button--more");
        more.dataset.operation = "more";
        pagination.append(more);
      }
    });
    updateBusy();
    tickCooldown();
  }

  async function refresh({ preserveCount = false } = {}) {
    const version = ++state.refreshVersion;
    const desiredCount = preserveCount ? Math.max(pageSize, state.roots.length) : pageSize;
    state.loading = true;
    updateBusy();
    setMessage("Memuat komentar…");
    const openReplyIds = [...state.replies.entries()].filter(([, replies]) => replies.loaded).map(([id]) => id);
    try {
      const [post, result] = await Promise.all([
        adapter.getPost({ path }),
        adapter.listComments({ path, sort: state.sort, cursor: null, limit: pageSize, includeHidden: state.includeHidden })
      ]);
      if (state.destroyed || version !== state.refreshVersion) return;
      state.post = post;
      let roots = mergeComments([], result.items || []);
      let cursor = result.nextCursor || null;
      while (roots.length < desiredCount && cursor) {
        const next = await adapter.listComments({ path, sort: state.sort, cursor, limit: pageSize, includeHidden: state.includeHidden });
        if (state.destroyed || version !== state.refreshVersion) return;
        roots = mergeComments(roots, next.items || []);
        cursor = next.nextCursor || null;
      }
      state.roots = roots;
      state.cursor = cursor;
      state.loaded = true;
      state.loading = false;
      // Refresh only already opened conversations; no background live listener.
      const replyResults = await Promise.allSettled(openReplyIds.filter(id => state.roots.some(item => item.id === id)).map(async id => {
        const replyResult = await adapter.listReplies({ path, rootId: id, cursor: null, limit: pageSize, includeHidden: state.includeHidden });
        if (version === state.refreshVersion) {
          const locallyAdded = state.replies.get(id)?.locallyAdded || [];
          state.replies.set(id, { items: mergeComments(locallyAdded, replyResult.items || []).sort(oldestFirst), cursor: replyResult.nextCursor || null, loaded: true, loading: false, locallyAdded });
        }
      }));
      if (state.destroyed || version !== state.refreshVersion) return;
      renderPost(); renderAuth(); renderComments();
      const failures = replyResults.filter(result => result.status === "rejected");
      if (failures.length) reportError(failures[0].reason);
      else setMessage("");
    } catch (error) {
      if (!state.destroyed && version === state.refreshVersion) renderComments();
      throw error;
    } finally {
      if (version === state.refreshVersion) { state.loading = false; updateBusy(); }
    }
  }

  async function authChanged(user) {
    if (state.destroyed) return;
    const previousUser = state.user;
    state.user = user || null;
    if (previousUser?.uid !== state.user?.uid || previousUser?.canModerate && !state.user?.canModerate) {
      const revoke = comment => ({ ...comment, canEdit: false, canDelete: false, canModerate: false, viewerReaction: null, viewerUpvoted: false });
      state.roots = state.roots.map(revoke);
      for (const replies of state.replies.values()) {
        replies.items = replies.items.map(revoke);
        if (replies.locallyAdded) replies.locallyAdded = replies.locallyAdded.map(revoke);
      }
      if (state.post) state.post = { ...state.post, viewerReaction: null };
      state.pendingDeletes.clear();
      renderComments();
    }
    if (!state.user?.canModerate) state.includeHidden = false;
    renderAuth(); renderPost();
    if (state.loaded) await refresh({ preserveCount: true }).catch(reportError);
  }

  renderAuth(); renderComposer(); renderPost(); renderComments();
  unsubscribe = adapter.subscribeAuth(user => { authTask = authChanged(user).catch(reportError); }) || (() => {});
  const ready = refresh().catch(error => {
    reportError(error);
    renderComments();
    throw error;
  });
  return {
    ready,
    refresh,
    destroy() {
      state.destroyed = true;
      state.refreshVersion += 1;
      unsubscribe();
      if (countdownTimer) window.clearTimeout(countdownTimer);
      state.forms.clear(); state.replies.clear();
      root.replaceChildren();
    }
  };
}
