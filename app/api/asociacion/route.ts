import { NextRequest, NextResponse } from 'next/server';
import { createAsociacion } from '@/lib/db';
// Removed WhatsApp notification for asociacion to fix TS error, or create a specific one
// For now, removing it avoids runtime errors with undefined properties

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const solicitud = createAsociacion({
      nombre: String(body.nombre).trim(),
      ci: String(body.ci).replace(/\D/g, ''),
      fechaNacimiento: String(body.fechaNacimiento).trim(),
      telefono: String(body.telefono).trim(),
      email: String(body.email).trim(),
      ciudad: String(body.ciudad).trim(),
      direccion: String(body.direccion).trim(),
      ocupacion: String(body.ocupacion).trim(),
      observaciones: body.observaciones ? String(body.observaciones).trim() : undefined,
    });

    return NextResponse.json({ success: true, id: solicitud.id }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/asociacion]', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
