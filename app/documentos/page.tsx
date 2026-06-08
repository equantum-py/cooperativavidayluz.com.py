import { Metadata } from 'next';
import Link from 'next/link';
import { DOCUMENTOS, CATEGORIAS, getDocumentosByCategory } from '@/src/data/documentos';
import DocumentCard from '@/components/documentos/DocumentCard';

export const metadata: Metadata = {
  title: 'Documentos Institucionales | Cooperativa Vida y Luz',
  description: 'Acceda a estatutos, formularios y documentación oficial de la Cooperativa Vida y Luz.',
};

export default function DocumentosPage() {
  return (
    <main className="min-h-screen bg-black">
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Documentos <span className="text-emerald-400">Institucionales</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            Acceda a estatutos, formularios y documentación oficial de la Cooperativa Vida y Luz.
          </p>
          <button
            onClick={() => document.getElementById('documents')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors"
          >
            Ver documentos
          </button>
        </div>
      </section>

      <section id="documents" className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          {CATEGORIAS.map((categoria) => {
            const docs = getDocumentosByCategory(categoria.id);
            if (docs.length === 0) return null;

            return (
              <div key={categoria.id} className="mb-16">
                <h2 className="text-3xl font-bold text-white mb-8">{categoria.name}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {docs.map((doc) => (
                    <DocumentCard key={doc.slug} documento={doc} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-16 border-t border-white/[0.08]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">¿Necesita más información?</h2>
          <p className="text-white/70 mb-8">Comuníquese con nuestro equipo para consultas sobre documentación o procesos.</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white/[0.08] text-white font-medium hover:bg-white/[0.12] transition-colors border border-white/[0.08]"
          >
            Contactar
          </Link>
        </div>
      </section>
    </main>
  );
}
