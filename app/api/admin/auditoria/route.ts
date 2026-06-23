import { NextRequest, NextResponse } from 'next/server';
import { getAuditLog } from '@/lib/audit';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filter = {
      usuarioId: searchParams.get('usuarioId') || undefined,
      entidad: searchParams.get('entidad') || undefined,
      accion: searchParams.get('accion') || undefined,
      desde: searchParams.get('desde') || undefined,
      hasta: searchParams.get('hasta') || undefined,
    };

    const entries = getAuditLog(filter);

    return NextResponse.json({
      total: entries.length,
      data: entries.slice(0, 100), // Return last 100
    });
  } catch (error) {
    console.error('[GET /api/admin/auditoria]', error);
    return NextResponse.json(
      { error: 'Error al obtener auditoría' },
      { status: 500 }
    );
  }
}
