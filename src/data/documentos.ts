export interface Documento {
  slug: string;
  title: string;
  description: string;
  category: 'institucional' | 'formularios' | 'cumplimiento';
  file: string;
  fileSize: string;
  updatedAt: string;
}

export const DOCUMENTOS: Documento[] = [
  {
    slug: 'estatuto-social',
    title: 'Estatuto Social de la Cooperativa',
    description: 'Documento que establece las normas y principios fundacionales de Cooperativa Vida y Luz.',
    category: 'institucional',
    file: '/documentos/estatuto-social.pdf',
    fileSize: '2.4 MB',
    updatedAt: '2025-01-15',
  },
  {
    slug: 'certificado-incoop',
    title: 'Certificado de Inscripción INCOOP (Resolución N° 125)',
    description: 'Certificado oficial de inscripción en el Instituto Nacional de Cooperativismo.',
    category: 'institucional',
    file: '/documentos/certificado-incoop.pdf',
    fileSize: '1.1 MB',
    updatedAt: '2024-12-10',
  },
  {
    slug: 'solicitud-ingreso',
    title: 'Solicitud de Ingreso',
    description: 'Formulario para solicitar la admisión como socio de la cooperativa.',
    category: 'formularios',
    file: '/documentos/solicitud-ingreso.pdf',
    fileSize: '850 KB',
    updatedAt: '2025-01-10',
  },
  {
    slug: 'solicitud-credito',
    title: 'Solicitud de Crédito',
    description: 'Formulario oficial para solicitudes de préstamos de socios.',
    category: 'formularios',
    file: '/documentos/solicitud-credito.pdf',
    fileSize: '1.2 MB',
    updatedAt: '2025-01-05',
  },
  {
    slug: 'solicitud-solidaridad',
    title: 'Solicitud de Solidaridad',
    description: 'Formulario para solicitar ayuda de solidaridad entre socios.',
    category: 'formularios',
    file: '/documentos/solicitud-solidaridad.pdf',
    fileSize: '950 KB',
    updatedAt: '2024-11-20',
  },
  {
    slug: 'identificacion-socio',
    title: 'Formulario de Identificación del Socio (Persona Física)',
    description: 'Formulario requerido para la identificación y registro de socios personas físicas.',
    category: 'formularios',
    file: '/documentos/identificacion-socio.pdf',
    fileSize: '1.5 MB',
    updatedAt: '2025-01-08',
  },
  {
    slug: 'prevencion-lavado-activos',
    title: 'Prevención de Lavado de Activos y Financiamiento del Terrorismo',
    description: 'Políticas y procedimientos de cumplimiento normativo en materia de prevención de lavado de activos.',
    category: 'cumplimiento',
    file: '/documentos/prevencion-lavado.pdf',
    fileSize: '3.2 MB',
    updatedAt: '2024-09-15',
  },
];

export const getDocumentoBySlug = (slug: string): Documento | undefined => {
  return DOCUMENTOS.find((doc) => doc.slug === slug);
};

export const getDocumentosByCategory = (category: string): Documento[] => {
  return DOCUMENTOS.filter((doc) => doc.category === category);
};

export const CATEGORIAS = [
  { id: 'institucional', name: 'Documentos Institucionales' },
  { id: 'formularios', name: 'Formularios para Socios' },
  { id: 'cumplimiento', name: 'Cumplimiento Normativo' },
] as const;
