import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Download, FileIcon, Calendar } from 'lucide-react';
import { getDocumentoBySlug, DOCUMENTOS } from '@/src/data/documentos';
import { DocumentViewer } from '@/components/documentos/DocumentViewer';

interface DocumentDetailPageProps {
  params: Promise<{ slug: string }>;  
}

export async function generateStaticParams() {
  return DOCUMENTOS.map((doc) => ({
    slug: doc.slug,
  }));
}

export async function generateMetadata({ params }: DocumentDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const document = DOCUMENTOS.find((doc) => doc.slug === resolvedParams.slug);

  if (!document) {
    return {
      title: 'Documento no encontrado',
    };
  }

  return {
    title: document.title,
    description: document.description,
  };
}

export default async function DocumentDetailPage({ params }: DocumentDetailPageProps) {
  const resolvedParams = await params;
  const documento = DOCUMENTOS.find((doc) => doc.slug === resolvedParams.slug);

  if (!documento) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Documento no encontrado</h1>
          <p className="text-gray-600 mb-8">El documento que buscas no existe</p>
          <Link href="/documentos" className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
            <ArrowLeft className="w-4 h-4" />
            Volver a documentos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/documentos" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-8 font-semibold">
          <ArrowLeft className="w-4 h-4" />
          Volver a documentos
        </Link>
        <DocumentViewer documento={documento} />
      </div>
    </div>
  );
}
