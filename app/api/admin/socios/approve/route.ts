import { NextRequest, NextResponse } from 'next/server';
import { approveSocioFromAsociacion } from '@/lib/db';
import { logAudit } from '@/lib/audit';
import { verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth_token')?.value;
    const payload = token ? verifyToken(token) : null;

    const { asocId, aprobadoPor } = await request.json();

    if (!asocId) {
      return NextResponse.json({ error: 'ID de asociación requerido' }, { status: 400 });
    }

    const newSocio = approveSocioFromAsociacion(asocId, aprobadoPor || 'Admin');
    if (!newSocio) {
      return NextResponse.json({ error: 'Asociación no encontrada o ya aprobada' }, { status: 400 });
    }

    // Log auditoría
    if (payload) {
      logAudit(
        payload.id.toString(),
        payload.email,
        'APPROVE',
        'Socio',
        newSocio.id,
        { asocId, numeroSocio: newSocio.numeroSocio, nombre: newSocio.nombre }
      );
    }

    return NextResponse.json({ success: true, socio: newSocio }, { status: 200 });
  } catch (err) {
    console.error('[POST /api/admin/socios/approve]', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
