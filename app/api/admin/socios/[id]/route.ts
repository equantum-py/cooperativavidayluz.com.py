import { NextRequest, NextResponse } from 'next/server';
import { getSocioById } from '@/lib/db';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const socio = getSocioById(resolvedParams.id);
  if (!socio) {
    return NextResponse.json({ error: 'Socio no encontrado' }, { status: 404 });
  }
  return NextResponse.json(socio);
}
