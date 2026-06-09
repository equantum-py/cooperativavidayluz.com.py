'use client';

import Link from 'next/link';
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
}</div>
