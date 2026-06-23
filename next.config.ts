import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allow local verification builds (`npm run verify`) to use a separate output
  // directory so they never clobber a running `next dev` (.next is shared and a
  // concurrent `next build` corrupts the dev server's CSS chunks). Vercel and
  // `npm run build` keep the default `.next`.
  distDir: process.env.NEXT_DIST_DIR || '.next',
};

export default nextConfig;
