'use client';

import Link from 'next/link';
import { FileText } from 'lucide-react';
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
<Link href={`/documentos/${documento.slug}`}> <div className="h-full group cursor-pointer"> <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col p-6">
<div
className={`bg-gradient-to-br ${getCategoryColor(
              documento.category
            )} rounded-lg p-4 mb-4 flex items-center justify-center min-h-[80px]`}
> <FileText className="w-10 h-10 text-white" /> </div>

```
      <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {documento.title}
      </h3>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
        {documento.description}
      </p>

      <div className="flex items-center justify-between">
        <span
          className={`bg-gradient-to-r ${getCategoryColor(
            documento.category
          )} bg-clip-text text-transparent text-xs font-semibold`}
        >
          {getCategoryLabel(documento.category)}
        </span>

        <span className="text-xs text-gray-500">
          {documento.fileSize}
        </span>
      </div>
    </div>
  </div>
</Link>
);
}
