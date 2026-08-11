import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import AnalyticsEvents from './components/AnalyticsEvents';
import './globals.css';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });
const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
});

export const viewport = {
  themeColor: '#05070a',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://capabilityhostprotocol.com'),
  title: 'Capability Host Protocol',
  description:
    'The open protocol for executable capability: declare, discover, invoke, govern, and evidence what people, agents, products, services, and organizations can do.',
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'Capability Host Protocol',
    description:
      'A governed boundary for executable capability. Software declares what it can do; agents and systems discover and invoke it; the host governs every invocation and turns the result into tamper-evident evidence.',
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
      alternateName: 'CHP',
      url: 'https://capabilityhostprotocol.com',
      logo: 'https://capabilityhostprotocol.com/icon.svg',
      description:
        'An open protocol for declaring, governing, and evidencing what AI agents, products, and organizations can do.',
      sameAs: [
        'https://www.wikidata.org/wiki/Q140343258',
        'https://github.com/capabilityhostprotocol',
        'https://github.com/capabilityhostprotocol/chp-core',
        'https://pypi.org/project/chp-core/',
        'https://docs.capabilityhostprotocol.com',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://capabilityhostprotocol.com/#website',
      url: 'https://capabilityhostprotocol.com',
      name: 'Capability Host Protocol',
      publisher: { '@id': 'https://capabilityhostprotocol.com/#org' },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://capabilityhostprotocol.com/ask?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://capabilityhostprotocol.com/#app',
      name: 'Capability Host Protocol (CHP)',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Cross-platform',
      url: 'https://capabilityhostprotocol.com',
      softwareHelp: 'https://docs.capabilityhostprotocol.com',
      softwareVersion: '0.9.2',
      isAccessibleForFree: true,
      license: 'https://www.apache.org/licenses/LICENSE-2.0',
      publisher: { '@id': 'https://capabilityhostprotocol.com/#org' },
      sameAs: ['https://github.com/capabilityhostprotocol/chp-core'],
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description:
        'An open protocol that turns every consequential action — by a person, an agent, a product, or a business — into a declared, governed, tamper-evidently provable event.',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${display.variable}`}
    >
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
