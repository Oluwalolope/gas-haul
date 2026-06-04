import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                     request.nextUrl.pathname.startsWith('/signup');
  
  // Checking for a mock authentication cookie
  const isAuthenticated = request.cookies.has('gashaul_auth');

  // If user is not authenticated and trying to access a protected route
  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If user is authenticated and trying to access login/signup pages, redirect to home
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Apply proxy to all routes except API routes, static files, and internal next paths
  matcher: ['/((?!api|_next|favicon.ico|sitemap.xml|robots.txt).*)'],
};
