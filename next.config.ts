import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Transpile the raw @chp/ui design-system package (source-shipped TS/TSX).
  transpilePackages: ['@chp/ui'],

  // Allow local verification builds (`npm run verify`) to use a separate output
  // directory so they never clobber a running `next dev` (.next is shared and a
  // concurrent `next build` corrupts the dev server's CSS chunks). Vercel and
  // `npm run build` keep the default `.next`.
  distDir: process.env.NEXT_DIST_DIR || '.next',

  // Point agents/crawlers at the machine-readable surface via Link headers
  // (rel=service-desc for the OpenAPI, rel=describedby for the agent card).
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Link',
            value:
              '</openapi.json>; rel="service-desc"; type="application/json", </.well-known/agent-card.json>; rel="describedby"; type="application/json"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
