import { NextRequest, NextResponse } from 'next/server';
import { createCredito } from '@/lib/db';
import { sendCreditNotification } from '@/lib/email';
import { sendWhatsAppNotification } from '@/lib/whatsapp';

const CUOTAS_VALIDAS = [6, 12, 18, 24, 36];

function serverValidate(b: Record<string, unknown>): string | null {
  if (!b.nombre || typeof b.nombre !== 'string' || b.nombre.trim().length < 5)
    return 'Nombre inválido';
  if (!b.ci || !/^\d{5,8}$/.test(String(b.ci).replace(/\D/g, '')))
    return 'Cédula inválida';
  const tel = String(b.telefono ?? '').replace(/[\s\-\(\)]/g, '');
  if (!tel || !/^(\+?595|0)9\d{7,9}$/.test(tel))
    return 'Teléfono inválido';
  if (!b.direccion || !b.barrio) return 'Dirección requerida';
  const monto = Number(b.monto);
  if (!monto || monto < 500_000 || monto > 200_000_000)
    return 'Monto fuera de rango (Gs. 500.000 — 200.000.000)';
  if (!b.tipoPrestamo) return 'Tipo de préstamo requerido';
  if (!CUOTAS_VALIDAS.includes(Number(b.cuotas))) return 'Número de cuotas inválido';
  if (!b.destino || typeof b.destino !== 'string' || b.destino.trim().length < 10)
    return 'Descripción del destino muy corta (mín. 10 caracteres)';
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validationError = serverValidate(body);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const solicitud = createCredito({
      nombre: String(body.nombre).trim(),
      ci: String(body.ci).replace(/\D/g, ''),
      telefono: String(body.telefono).trim(),
      direccion: String(body.direccion).trim(),
      barrio: String(body.barrio).trim(),
      monto: Number(body.monto),
      tipoPrestamo: String(body.tipoPrestamo),
      cuotas: Number(body.cuotas),
      destino: String(body.destino).trim(),
      referencia: body.referencia ? String(body.referencia).trim() : undefined,
    });

    // Notificaciones en background — no bloquean la respuesta
    Promise.all([
      sendCreditNotification(solicitud),
      sendWhatsAppNotification(solicitud),
    ]).catch((err) => console.error('[Notifications]', err));

    return NextResponse.json({ success: true, id: solicitud.id }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/credito/solicitud]', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
