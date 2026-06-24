import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Markdown content negotiation: agents that request the homepage with
// `Accept: text/markdown` get the markdown rendition at /index.md.
export function middleware(req: NextRequest) {
  const accept = req.headers.get('accept') ?? '';
  if (req.nextUrl.pathname === '/' && accept.includes('text/markdown')) {
    return NextResponse.rewrite(new URL('/index.md', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
