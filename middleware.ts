import { NextRequest, NextResponse } from 'next/server';

// Protected routes that require authentication
const protectedRoutes = ['/account', '/orders', '/wishlist'];

// Auth routes that should redirect if already logged in
const authRoutes = ['/auth/login', '/auth/signup'];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const sessionToken = request.cookies.get('sessionToken')?.value;

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Check if route is auth route
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  );

  // If accessing protected route without session, redirect to login
  if (isProtectedRoute && !sessionToken) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If accessing auth routes with valid session, redirect to home
  if (isAuthRoute && sessionToken) {
    // We can't verify the token here without database access
    // So we'll let the client-side handle the redirect
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
