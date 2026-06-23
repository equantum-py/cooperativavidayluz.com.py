import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rutas públicas
  const publicPaths = ['/', '/login', '/historia', '/hazte-socio', '/credito'];
  if (publicPaths.some(path => pathname === path || pathname.startsWith(path + '/'))) {
    return NextResponse.next();
  }

  // Obtener token
  const token = request.cookies.get('auth_token')?.value;

  // Si no hay token, redirigir a login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Verificar token
  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Protección de rutas de admin
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const allowedRoles = ['superadmin', 'gerencia'];
    if (!allowedRoles.includes(payload.rol)) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/portal/:path*',
    '/documentos/:path*',
    '/credito/solicitud',
  ],
};