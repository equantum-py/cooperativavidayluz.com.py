import { NextRequest, NextResponse } from 'next/server';
import { validateUserPassword } from '@/lib/users';
import { signToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    const user = await validateUserPassword(email, password);

    if (!user) {
      return NextResponse.json(
        { error: 'Email o contraseña inválidos' },
        { status: 401 }
      );
    }

    const token = signToken({
      id: parseInt(user.id, 36),
      email: user.email,
      rol: user.rol,
    });

    const response = NextResponse.json(
      {
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          nombre: user.nombre,
          rol: user.rol,
          estado: user.estado,
        },
      },
      { status: 200 }
    );

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60,
    });

    return response;
  } catch (error: any) {
    console.error('[LOGIN_ERROR]', error);

    return NextResponse.json(
      {
        error: 'Error en el servidor',
      },
      { status: 500 }
    );
  }
}