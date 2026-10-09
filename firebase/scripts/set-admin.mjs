import { fileURLToPath } from 'node:url';

export async function main(argv = process.argv.slice(2)) {
  const options = { apply: false, remove: false };
  for (let index = 0; index < argv.length; index++) {
    const flag = argv[index];
    if (flag === '--apply') options.apply = true;
    else if (flag === '--remove') options.remove = true;
    else if (flag === '--project' || flag === '--uid') {
      const value = argv[++index];
      if (!value || value.startsWith('--')) throw new Error(`A value is required for ${flag}.`);
      options[flag.slice(2)] = value;
    } else throw new Error(`Unknown option: ${flag}`);
  }
  if (!/^[a-z][a-z0-9-]{4,61}[a-z0-9]$/.test(options.project || '')) throw new Error('--project must be a Firebase project ID.');
  if (!options.uid || options.uid.length > 128 || /[\/\u0000-\u001f]/.test(options.uid)) throw new Error('--uid must be an exact Firebase Authentication UID.');
  console.log(JSON.stringify({
    mode: options.apply ? 'apply' : 'dry-run', project: options.project,
    uid: options.uid, action: options.remove ? 'remove-moderator' : 'grant-moderator'
  }));
  if (!options.apply) return;
  if (process.env.FIRESTORE_EMULATOR_HOST && !/^(127\.0\.0\.1|localhost|\[::1\]):\d+$/.test(process.env.FIRESTORE_EMULATOR_HOST)) throw new Error('Only a local emulator is accepted.');
  const [{ initializeApp, applicationDefault, deleteApp }, { getFirestore, FieldValue }] = await Promise.all([
    import('firebase-admin/app'), import('firebase-admin/firestore')
  ]);
  const app = initializeApp({ projectId: options.project, ...(process.env.FIRESTORE_EMULATOR_HOST ? {} : { credential: applicationDefault() }) });
  try {
    const ref = getFirestore(app).doc(`commentAdmins/${options.uid}`);
    if (options.remove) await ref.delete();
    else await ref.set({ grantedAt: FieldValue.serverTimestamp() });
    console.log('Moderator role updated. Sign out and sign in again to refresh the site controls.');
  } finally { await deleteApp(app); }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
