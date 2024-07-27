import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Allow access to the homepage if not signed in
  if (!token && url.pathname === '/') {
    return NextResponse.next();
  }

  // Redirect to login page if not signed in and trying to access any other route
  if (!token && url.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow access to the login page if not signed in
  if (!token && url.pathname === '/login') {
    return NextResponse.next();
  }

  // Allow access to all other routes if signed in
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
