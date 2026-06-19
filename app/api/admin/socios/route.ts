import { NextResponse } from 'next/server';
import { getAllSocios } from '@/lib/db';

export async function GET() {
  const socios = getAllSocios();
  return NextResponse.json(socios);
}
