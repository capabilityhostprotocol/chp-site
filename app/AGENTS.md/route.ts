import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const revalidate = false;

// Serve the repo AGENTS.md at /AGENTS.md so agents can discover it over HTTP.
// Read at build; falls back to a pointer if unavailable.
const BODY = (() => {
  try {
    return readFileSync(join(process.cwd(), 'AGENTS.md'), 'utf8');
  } catch {
    return '# AGENTS.md\n\nCapability Host Protocol — see https://capabilityhostprotocol.com/developers and https://github.com/capabilityhostprotocol/chp-core';
  }
})();

export function GET() {
  return new Response(BODY, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
