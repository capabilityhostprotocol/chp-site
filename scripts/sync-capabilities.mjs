// Extracts the static capability surface from the adapter packages and writes
// data/capabilities.json. Runs on predev/prebuild. DEPLOY-SAFE: when chp-dev is
// not a sibling (e.g. on Vercel), the committed capabilities.json is kept.
//
// Surfaces the *static capabilities we have* (declared via @capability in
// adapter source). Never surfaces live mesh nodes or served/runtime counts.

import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const ADAPTERS_ROOT = resolve(SCRIPT_DIR, '../../chp-dev/packages');
const OUT = resolve(SCRIPT_DIR, '../data/capabilities.json');
const REGISTRY = resolve(SCRIPT_DIR, '../data/adapters.json');

const log = (m) => console.log(`[sync-capabilities] ${m}`);

if (!existsSync(ADAPTERS_ROOT)) {
  log(`adapter packages not found at ${ADAPTERS_ROOT} — keeping committed capabilities.json, skipping.`);
  process.exit(0);
}

// adapter metadata (category/status/tier) from the committed registry mirror
const registry = JSON.parse(readFileSync(REGISTRY, 'utf8'));
const metaBySlug = {};
for (const a of [...(registry.official || []), ...(registry.community || [])]) {
  const slug = String(a.id || a.pypi || '').replace(/^chp-adapter-/, '');
  if (slug) metaBySlug[slug.replace(/[-_]/g, '')] = a;
}
const metaFor = (slug) => metaBySlug[slug.replace(/[-_]/g, '')] || {};

function pyFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    let s;
    try {
      s = statSync(p);
    } catch {
      continue;
    }
    if (s.isDirectory()) {
      if (name === '__pycache__' || name === 'tests' || name === 'test') continue;
      out.push(...pyFiles(p));
    } else if (name.endsWith('.py') && !name.startsWith('test_')) {
      out.push(p);
    }
  }
  return out;
}

const field = (head, key) => {
  const m = head.match(new RegExp(`${key}\\s*=\\s*["']([^"']+)["']`));
  return m ? m[1] : '';
};

const adapters = [];
const dirs = readdirSync(ADAPTERS_ROOT).filter((d) => d.startsWith('chp-adapter-'));

for (const d of dirs.sort()) {
  const dir = join(ADAPTERS_ROOT, d);
  let st;
  try {
    st = statSync(dir);
  } catch {
    continue;
  }
  if (!st.isDirectory()) continue;

  const caps = new Map(); // id -> capability
  let adapterName = '';
  let adapterId = '';

  for (const file of pyFiles(dir)) {
    const content = readFileSync(file, 'utf8');
    if (!adapterName) adapterName = field(content, 'adapter_name');
    if (!adapterId) adapterId = field(content, 'adapter_id');

    for (const chunk of content.split('@capability(').slice(1)) {
      const head = chunk.slice(0, 700);
      const id = field(head, 'id');
      if (!id || !id.startsWith('chp.adapters.')) continue; // drop test noise
      const parts = id.split('.');
      const method = parts.slice(3).join('.') || parts[parts.length - 1];
      if (!caps.has(id)) {
        caps.set(id, {
          id,
          method,
          version: field(head, 'version'),
          description: field(head, 'description'),
        });
      }
    }
  }

  if (caps.size === 0) continue;
  const slug = d.replace(/^chp-adapter-/, '');
  const meta = metaFor(slug);
  adapters.push({
    slug,
    adapterId: adapterId || `chp.adapters.${slug.replace(/-/g, '_')}`,
    name: adapterName || slug.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    pypi: meta.pypi || d,
    category: meta.category || 'other',
    status: meta.status || 'experimental',
    tier: meta.tier || 2,
    capabilities: [...caps.values()].sort((a, b) => a.id.localeCompare(b.id)),
  });
}

adapters.sort((a, b) => a.slug.localeCompare(b.slug));
const total = adapters.reduce((n, a) => n + a.capabilities.length, 0);

writeFileSync(
  OUT,
  JSON.stringify({ generated: new Date().toISOString(), adapters }, null, 2) + '\n',
);
log(`wrote capabilities.json — ${adapters.length} adapters, ${total} capabilities`);
