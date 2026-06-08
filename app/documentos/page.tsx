import { Metadata } from 'next';
import Link from 'next/link';
import { Search, FileIcon } from 'lucide-react';
import { DOCUMENTOS, DOCUMENT_CATEGORIES } from '@/src/data/documentos';
import { DocumentCard } from '@/components/documentos/DocumentCard';

export const metadata: Metadata = {
  title: 'Centro de Documentos | Cooperativa Vida y Luz',
  description: 'Accede a todos los documentos institucionales de la cooperativa',
};

export default function DocumentosPage() {
  const categories = DOCUMENT_CATEGORIES;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Centro de Documentos</h1>
          <p className="text-xl text-gray-600 mb-8">Accede a todos los documentos institucionales, formularios y documentos de cumplimiento de la Cooperativa Vida y Luz.</p>
        </div>

        {categories.map((category) => {
          const categoryDocs = DOCUMENTOS.filter((doc) => doc.category === category.id);
          
          if (categoryDocs.length === 0) return null;

          return (
            <div key={category.id} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100">
                  <FileIcon className="w-6 h-6 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{category.label}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryDocs.map((doc) => (
                  <DocumentCard key={doc.slug} documento={doc} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
