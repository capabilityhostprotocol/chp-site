import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Capability Host Protocol',
  description:
    'The open protocol for hosted capability: expose, discover, invoke, compose, and govern what people, agents, products, services, processes, and organizations can do.',
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'Capability Host Protocol',
    description:
      'Host what the world can do. CHP turns abilities across people, agents, products, services, processes, and organizations into composable, governable capabilities.',
    url: 'https://capabilityhostprotocol.com',
    siteName: 'Capability Host Protocol',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
