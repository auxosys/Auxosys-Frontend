import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // If the request is for the verify subdomain
  if (hostname === 'verify.auxosys.com' || hostname.startsWith('verify.localhost')) {
    // Only rewrite the root path '/' to '/verify'
    if (url.pathname === '/') {
      return NextResponse.rewrite(new URL('/verify', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
