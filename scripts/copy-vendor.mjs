import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'dist', 'vendor');
await mkdir(out, { recursive: true });
await copyFile(resolve(root, 'node_modules/gif.js.optimized/dist/gif.js'), resolve(out, 'gif.js'));
await copyFile(resolve(root, 'node_modules/gif.js.optimized/dist/gif.worker.js'), resolve(out, 'gif.worker.js'));
console.log('GIF encoder copied to dist/vendor');
