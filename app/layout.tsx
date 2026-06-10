import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import WhatsAppButton from '@/components/landing/WhatsAppButton';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cooperativavidayluz.com.py'),
  title: 'Cooperativa Vida & Luz | La cooperativa más moderna y confiable del Paraguay',
  description:
    'Cooperativa paraguaya moderna con ahorro, créditos, beneficios, educación financiera y portal digital para socios.',
  keywords: ['cooperativa Paraguay', 'Vida y Luz', 'ahorro', 'créditos', 'socios', 'educación financiera'],
  openGraph: {
    title: 'Cooperativa Vida & Luz',
    description: 'Crecemos contigo, construimos futuro juntos.',
    url: 'https://cooperativavidayluz.com.py',
    siteName: 'Cooperativa Vida & Luz',
    locale: 'es_PY',
    type: 'website',
  },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0F8F4F',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es-PY" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} bg-light font-sans text-dark antialiased`}>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
