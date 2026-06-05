import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rutas públicas
  if (pathname === '/' || pathname === '/login') {
    return NextResponse.next();
  }

  // Rutas protegidas
  if (pathname === '/portal' || pathname.startsWith('/portal/')) {
    const token = request.cookies.get('auth_token')?.value;

    console.log('MIDDLEWARE TOKEN:', !!token);

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/portal', '/portal/:path*'],
};