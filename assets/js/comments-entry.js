import { mountNativeComments } from './comments-ui.js';
import { createFirebaseAdapter } from '../../firebase/web/comments-firebase.js';

export async function startComments(root, configuration, { signal } = {}) {
  const adapter = await createFirebaseAdapter(configuration.firebase, configuration);
  let controller;
  const destroy = () => {
    controller?.destroy();
    adapter.destroy();
    signal?.removeEventListener('abort', destroy);
  };
  try {
    if (signal?.aborted) throw new DOMException('Comments initialization was canceled.', 'AbortError');
    controller = mountNativeComments(root, adapter, {
      path: root.dataset.path, title: root.dataset.title, pageSize: 20, maxLength: 4000
    });
    signal?.addEventListener('abort', destroy, { once: true });
    await controller.ready;
    if (signal?.aborted) throw new DOMException('Comments initialization was canceled.', 'AbortError');
    return { ...controller, destroy };
  } catch (error) {
    destroy();
    throw error;
  }
}
