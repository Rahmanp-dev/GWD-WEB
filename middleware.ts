
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // Allow requests to the login page and auth API
  if (pathname.startsWith('/admin/login') || pathname.startsWith('/api/admin/auth')) {
    return NextResponse.next();
  }

  // If no token, redirect to login
  if (!token && pathname.startsWith('/admin')) {
    const loginUrl = new URL('/admin/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
