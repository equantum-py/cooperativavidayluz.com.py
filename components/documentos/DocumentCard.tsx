'use client';

import Link from 'next/link';
<<<<<<< HEAD
import { Documento } from '@/src/data/documentos';
import { Download, Eye } from 'lucide-react';

interface DocumentCardProps {
    documento: Documento;
}

export default function DocumentCard({ documento }: DocumentCardProps) {
    return (
          <div className="border border-white/[0.08] rounded-lg p-6 bg-gradient-to-br from-white/[0.05] to-white/[0.02] hover:border-white/[0.16] transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
            <div className="flex items-start justify-between mb-4">
              <div className="text-3xl">📄</div>
              <span className="text-xs text-white/60 bg-white/[0.05] px-2 py-1 rounded">
      {documento.fileSize}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
      {documento.title}
            </h3>

            <p className="text-sm text-white/70 mb-4 line-clamp-2">
      {documento.description}
            </p>

            <div className="flex items-center justify-between gap-3">
              <Link
                href={`/documentos/${documento.slug}`}
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                aria-label={`Ver ${documento.title}`}
              >
                <Eye size={16} />
                Ver
              </Link>

              <a
                href={documento.file}
                download
                className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-white/[0.08] text-white hover:bg-white/[0.12] transition-colors"
                aria-label={`Descargar ${documento.title}`}
              >
                <Download size={16} />
                Descargar
              </a>
            </div>
          </div>
        );
=======
import { FileText, Download } from 'lucide-react';
import { Documento } from '@/src/data/documentos';

interface DocumentCardProps {
  documento: Documento;
}

const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'institucional':
      return 'from-blue-500 to-blue-600';
    case 'formularios':
      return 'from-green-500 to-green-600';
    case 'cumplimiento':
      return 'from-purple-500 to-purple-600';
    default:
      return 'from-gray-500 to-gray-600';
  }
};

const getCategoryLabel = (category: string): string => {
  switch (category) {
    case 'institucional':
      return 'Institucional';
    case 'formularios':
      return 'Formularios';
    case 'cumplimiento':
      return 'Cumplimiento';
    default:
      return category;
  }
};

export function DocumentCard({ documento }: DocumentCardProps) {
  return (
    <Link href={`/documentos/${documento.slug}`}>
      <div className="h-full group cursor-pointer">
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col p-6">
          <div className={`bg-gradient-to-br ${getCategoryColor(documento.category)} rounded-lg p-4 mb-4 flex items-center justify-center min-h-[80px]`}>
            <FileText className="w-10 h-10 text-white" />
          </div>

          <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {documento.title}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
            {documento.description}
          </p>

          <div className="flex items-center justify-between">
            <span className={`bg-gradient-to-r ${getCategoryColor(documento.category)} bg-clip-text text-transparent text-xs font-semibold`}>
              {getCategoryLabel(documento.category)}
            </span>
            <span className="text-xs text-gray-500">{documento.fileSize}</span>
          </div>
        </div>
      </div>
    </Link>
  );
>>>>>>> 072e8c1 (feat: centro de documentos con visor PDF y documentos institucionales)
}
