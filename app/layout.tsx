import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import AnalyticsEvents from './components/AnalyticsEvents';
import './globals.css';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  metadataBase: new URL('https://capabilityhostprotocol.com'),
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

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://capabilityhostprotocol.com/#org',
      name: 'Capability Host Protocol',
      url: 'https://capabilityhostprotocol.com',
      description:
        'An open protocol and evidence layer for what AI agents, products, and organizations do.',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Capability Host Protocol (CHP)',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Cross-platform',
      url: 'https://capabilityhostprotocol.com',
      softwareHelp: 'https://docs.capabilityhostprotocol.com',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description:
        'An open protocol that turns every consequential action — by a person, an agent, a product, or a business — into a declared, governable, tamper-evidently provable event.',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {children}
        <Analytics />
        <AnalyticsEvents />
      </body>
    </html>
  );
}
