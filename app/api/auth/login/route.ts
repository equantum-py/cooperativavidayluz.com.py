import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { comparePassword } from '@/lib/password';
import { signToken } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { ci, password } = await request.json();

    if (!ci || !password) {
      return NextResponse.json(
        { error: 'CI y contraseña son requeridos' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { ci },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'CI o contraseña inválidos' },
        { status: 401 }
      );
    }

    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { error: 'CI o contraseña inválidos' },
        { status: 401 }
      );
    }

    const token = signToken({
      id: user.id,
      ci: user.ci,
      rol: user.rol,
    });

    const response = NextResponse.json(
      {
        success: true,
        token,
        user: {
          id: user.id,
          ci: user.ci,
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
    console.error('[LOGIN_ERROR]', {
      name: error?.name,
      message: error?.message,
      code: error?.code,
      meta: error?.meta,
      stack: error?.stack,
    });

    return NextResponse.json(
      {
        error: 'Error en el servidor',
        debug: {
          name: error?.name,
          message: error?.message,
          code: error?.code,
          meta: error?.meta,
        },
      },
      { status: 500 }
    );
  }
}