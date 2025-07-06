import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// This middleware does nothing but pass the request through.
// It can be used as a placeholder for future authentication logic.
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  // We can add protected paths here later, e.g., '/admin/:path*'
  matcher: [],
}; 