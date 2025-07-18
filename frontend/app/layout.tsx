import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SAMASS - Massage & Relax',
  description: 'Massages professionnels et huiles par Sammy Ly (SAMASS).',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}