import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // If the request is for the verify subdomain
  if (hostname === 'verify.auxosys.com' || hostname.startsWith('verify.localhost')) {
    // Rewrite all paths to /verify/...
    // Avoid double-rewriting if it somehow already starts with /verify
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
