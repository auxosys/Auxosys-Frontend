import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Subdomain rewrites are handled natively by next.config.mjs `rewrites`

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|site.webmanifest|.*\\\\.svg|.*\\\\.png|.*\\\\.jpg|.*\\\\.jpeg|.*\\\\.gif).*)'],
};
