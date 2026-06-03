import { NextResponse } from 'next/server';
import { getAllCreditos } from '@/lib/db';

export async function GET() {
  try {
    const creditos = getAllCreditos();
    return NextResponse.json(creditos);
  } catch (err) {
    console.error('[GET /api/admin/creditos]', err);
    return NextResponse.json({ error: 'Error al leer solicitudes' }, { status: 500 });
  }
}
