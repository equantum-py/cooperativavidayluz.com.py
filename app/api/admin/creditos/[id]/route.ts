import { NextRequest, NextResponse } from 'next/server';
import { updateCreditoEstado, type CreditStatus } from '@/lib/db';

const VALID_ESTADOS: CreditStatus[] = ['pendiente', 'revisado', 'aprobado', 'rechazado'];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { estado } = await request.json();

    if (!VALID_ESTADOS.includes(estado)) {
      return NextResponse.json({ error: 'Estado inválido' }, { status: 400 });
    }

    const updated = updateCreditoEstado(id, estado as CreditStatus);
    if (!updated) {
      return NextResponse.json({ error: 'Solicitud no encontrada' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error('[PATCH /api/admin/creditos/:id]', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
