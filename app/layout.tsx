import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Capability Host Protocol',
  description:
    'See what your agents and tools actually did. CHP is an open protocol for making agent, tool, and system execution visible, replayable, and ready for governance.',
  openGraph: {
    title: 'Capability Host Protocol',
    description: 'See what your agents and tools actually did.',
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
