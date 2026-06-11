import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Capability Host Protocol',
  description:
    'Open protocol for capability hosts, agents, applications, and infrastructure to discover, invoke, govern, and audit AI capabilities.',
  openGraph: {
    title: 'Capability Host Protocol',
    description:
      'A shared protocol surface for governed AI capabilities: manifests, invocation safety, lifecycle, permissions, evidence, replay, and conformance.',
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
