import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isPublicPath = pathname === '/login' || pathname === '/signup';
  const Token = request.cookies.get('Token')?.value;

  if (isPublicPath && Token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!isPublicPath && !Token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/', '/profile', '/login', '/signup'],
};
