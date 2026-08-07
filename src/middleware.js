import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Subdomain rewrites are handled natively by next.config.mjs `rewrites`
  // Wait, actually next.config.mjs host rewrites are flaky on Vercel Edge.
  // We MUST do it in middleware, and remove it from next.config.mjs!
  if (hostname === 'verify.auxosys.com' || hostname.startsWith('verify.localhost')) {
    if (!url.pathname.startsWith('/verify')) {
      const newUrl = new URL(`/verify${url.pathname === '/' ? '' : url.pathname}`, request.url);
      newUrl.search = url.search;
      return NextResponse.rewrite(newUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|site.webmanifest|.*\\\\.svg|.*\\\\.png|.*\\\\.jpg|.*\\\\.jpeg|.*\\\\.gif).*)'],
};
