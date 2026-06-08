import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Capability Host Protocol',
  description:
    'Open protocol for governed agent execution. Local-first SQLite evidence, vector retrieval, cross-host composition. Zero mandatory deps. Apache-2.0.',
  openGraph: {
    title: 'Capability Host Protocol',
    description:
      'The governed capability platform for production AI agents. Evidence, replay, RAG, safety, compliance — all in one open protocol.',
    url: 'https://capabilityhostprotocol.com',
    siteName: 'Capability Host Protocol',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="bg-zinc-950 text-zinc-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
