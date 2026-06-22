// Sync the adapter catalog from the chp-dev source of truth into this repo.
//
// `registry/adapters.json` lives in the sibling chp-dev repo (the canonical
// catalog). This copies it to `data/adapters.json`, which is committed and is
// what the build actually imports. In deployment (e.g. Vercel) the sibling
// repo is absent — that's fine: we keep the committed copy and warn, never
// fail the build.

import { copyFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = resolve(here, '../../chp-dev/registry/adapters.json');
const dest = resolve(here, '../data/adapters.json');

if (!existsSync(source)) {
  console.warn(
    `[sync-adapters] source not found at ${source} — using committed data/adapters.json`,
  );
  process.exit(0);
}

copyFileSync(source, dest);
console.log(`[sync-adapters] copied ${source} -> ${dest}`);
