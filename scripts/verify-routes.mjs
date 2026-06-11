const baseUrl = process.env.CHP_SITE_BASE_URL || 'http://127.0.0.1:3000';

const routes = [
  '/',
  '/map',
  '/protocol',
  '/docs',
  '/examples',
  '/implementers',
  '/conformance',
  '/quickstart',
  '/icon.svg',
];

const requiredText = {
  '/': ['Host what the world can do.', 'Map your first capability'],
  '/map': [
    'Map a real-world ability',
    'Protocol readiness',
    'CHP notation',
    'manifest.json',
    'outcome.json',
  ],
};

const failures = [];

for (const route of routes) {
  const url = new URL(route, baseUrl);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      failures.push(`${route} returned ${response.status}`);
      continue;
    }

    const expected = requiredText[route];
    if (expected) {
      const body = await response.text();
      for (const text of expected) {
        if (!body.includes(text)) {
          failures.push(`${route} did not include "${text}"`);
        }
      }
    }
  } catch (error) {
    failures.push(`${route} failed: ${error.message}`);
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Verified ${routes.length} routes from ${baseUrl}`);
