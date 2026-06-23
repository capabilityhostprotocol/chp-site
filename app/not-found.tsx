import type { Metadata } from 'next';
import Nav from './components/Nav';
import SiteFooter from './components/SiteFooter';

export const metadata: Metadata = {
  title: 'Not found — Capability Host Protocol',
  robots: { index: false, follow: true },
};

const LINKS = [
  ['How it works', '/how-it-works'],
  ['Use cases', '/use-cases'],
  ['Blog', '/blog'],
  ['Glossary', '/glossary'],
  ['Docs', 'https://docs.capabilityhostprotocol.com'],
];

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="max-w-6xl mx-auto px-6 pt-24 pb-28 md:pt-36 md:pb-36">
        <p className="eyebrow mb-5">
          execution_denied · code=capability_not_found
        </p>
        <h1 className="display-1 text-zinc-50 mb-6 max-w-3xl">
          No record at this path.
        </h1>
        <p className="lede max-w-2xl text-zinc-400 mb-10">
          That page doesn&apos;t exist — but every action that does leaves one
          here. Pick up the trace:
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="/"
            className="bg-zinc-100 text-zinc-950 border border-zinc-100 rounded-lg px-5 py-3 text-sm font-medium hover:bg-white transition-colors"
          >
            Back to home
          </a>
          {LINKS.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="border border-zinc-700 rounded-lg px-5 py-3 text-sm text-zinc-300 hover:text-zinc-50 hover:border-zinc-500 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
