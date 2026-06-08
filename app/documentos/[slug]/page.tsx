import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDocumentoBySlug, DOCUMENTOS } from '@/src/data/documentos';
import PDFViewer from '@/components/documentos/DocumentViewer';
import { ChevronLeft, Download } from 'lucide-react';

interface DocumentDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return DOCUMENTOS.map((doc) => ({
    slug: doc.slug,
  }));
}

export async function generateMetadata({
  params,
}: DocumentDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const documento = getDocumentoBySlug(slug);

  if (!documento) {
    return {
      title: 'Documento no encontrado',
    };
  }

  return {
    title: `${documento.title} | Cooperativa Vida y Luz`,
    description: documento.description,
  };
}

export default async function DocumentDetailPage({
  params,
}: DocumentDetailPageProps) {
  const { slug } = await params;
  const documento = getDocumentoBySlug(slug);

  if (!documento) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black">
      <div className="border-b border-white/[0.08] bg-gradient-to-b from-white/5 to-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/documentos"
            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-6 transition-colors"
          >
            <ChevronLeft size={18} />
            Volver a documentos
          </Link>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
                {documento.title}
              </h1>
              <p className="text-lg text-white/70 mb-4">{documento.description}</p>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="inline-block px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm font-medium">
                  📄 {documento.fileSize}
                </span>
                <span className="text-sm text-white/60">
                  Actualizado: {new Date(documento.updatedAt).toLocaleDateString('es-PY')}
                </span>
              </div>
            </div>

            <a
              href={documento.file}
              download
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors whitespace-nowrap"
            >
              <Download size={20} />
              Descargar PDF
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-black rounded-lg overflow-hidden border border-white/[0.08]">
          <PDFViewer fileUrl={documento.file} title={documento.title} />
        </div>

        <div className="mt-12 p-8 rounded-lg bg-gradient-to-r from-white/[0.05] to-white/[0.02] border border-white/[0.08]">
          <h2 className="text-xl font-bold text-white mb-4">Descargar documento</h2>
          <p className="text-white/70 mb-6">
            Si tienes problemas para ver el documento en línea, puedes descargarlo directamente.
          </p>
          <a
            href={documento.file}
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/[0.08] text-white font-medium hover:bg-white/[0.12] transition-colors border border-white/[0.08]"
          >
            <Download size={20} />
            Descargar {documento.title}
          </a>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Otros documentos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DOCUMENTOS.filter((doc) => doc.slug !== slug)
              .slice(0, 3)
              .map((doc) => (
                <Link
                  key={doc.slug}
                  href={`/documentos/${doc.slug}`}
                  className="p-4 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] transition-colors border border-white/[0.08] hover:border-white/[0.16]"
                >
                  <div className="text-2xl mb-2">📄</div>
                  <h3 className="text-sm font-semibold text-white mb-1 line-clamp-2">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-white/60">{doc.fileSize}</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
