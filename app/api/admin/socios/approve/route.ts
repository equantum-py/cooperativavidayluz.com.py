import { NextRequest, NextResponse } from 'next/server';
import { approveSocioFromAsociacion } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { asocId, aprobadoPor } = await request.json();

    if (!asocId) {
      return NextResponse.json({ error: 'ID de asociación requerido' }, { status: 400 });
    }

    const newSocio = approveSocioFromAsociacion(asocId, aprobadoPor || 'Admin');
    if (!newSocio) {
      return NextResponse.json({ error: 'Asociación no encontrada o ya aprobada' }, { status: 400 });
    }

    return NextResponse.json({ success: true, socio: newSocio }, { status: 200 });
  } catch (err) {
    console.error('[POST /api/admin/socios/approve]', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
