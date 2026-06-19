import { NextResponse } from 'next/server';
import { getAllSocios, getAllAsociaciones, getAllCreditos } from '@/lib/db';

export async function GET() {
  const socios = getAllSocios();
  const asociaciones = getAllAsociaciones();
  const creditos = getAllCreditos();

  const activos = socios.filter(s => s.estado === 'Activo').length;
  const pendientes = asociaciones.filter(a => a.estado === 'pendiente');
  
  const creditosActivos = creditos.filter(c => c.estado === 'aprobado').length;
  // Mock numbers for those not implemented yet
  const aportesPendientes = Math.floor(socios.length * 0.3); 
  const preaprobados = Math.floor(socios.length * 0.1);

  return NextResponse.json({
    stats: {
      activos,
      pendientes: pendientes.length,
      creditosActivos,
      aportesPendientes,
      preaprobados
    },
    pendientes: pendientes.slice(0, 5) // Return only top 5 pending
  });
}
