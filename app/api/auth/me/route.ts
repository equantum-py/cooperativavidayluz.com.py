import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
          const token = request.cookies.get('auth_token')?.value;

      if (!token) {
              return NextResponse.json(
                { error: 'No autorizado' },
                { status: 401 }
                      );
      }

      const payload = verifyToken(token);
          if (!payload) {
                  return NextResponse.json(
                    { error: 'Token inválido' },
                    { status: 401 }
                          );
          }

      return NextResponse.json({ user: payload }, { status: 200 });
    } catch (error) {
          return NextResponse.json(
            { error: 'Error en el servidor' },
            { status: 500 }
                );
    }
}
