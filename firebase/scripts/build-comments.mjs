import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { mkdir, readdir, unlink } from 'node:fs/promises';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../..');
const outdir = resolve(root, 'assets/js/comments');
await mkdir(outdir, { recursive: true });
// This directory contains generated comments bundles only.
for (const name of await readdir(outdir)) {
  if (/^(app|chunk-.*)\.js(\.LEGAL\.txt)?$/.test(name)) await unlink(resolve(outdir, name));
}
const result = await build({
  entryPoints: { app: resolve(root, 'assets/js/comments-entry.js') },
  outdir,
  bundle: true,
  minify: true,
  splitting: true,
  format: 'esm',
  target: ['es2020'],
  nodePaths: [resolve(root, 'firebase/node_modules')],
  legalComments: 'linked',
  metafile: true
});
for (const [file, data] of Object.entries(result.metafile.outputs)) {
  console.log(`${file}: ${(data.bytes / 1024).toFixed(1)} KiB`);
}
