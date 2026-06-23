import type { Metadata } from 'next';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';
import AdapterDirectory from '../components/AdapterDirectory';
import { adapterCount, categories, officialAdapters } from '../lib/adapters';

export const metadata: Metadata = {
  title: 'Adapters - Capability Host Protocol',
  description:
    'Governed CHP adapters — every capability is evidence-wrapped, policy-checked, and replayable. Install from PyPI and discover them automatically through the host.',
};

export default function AdaptersPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
          <p className="eyebrow mb-4">
            Ecosystem
          </p>
          <h1 className="display-1 text-zinc-50 mb-6 max-w-4xl">
            Governed adapters. Every capability evidence-wrapped.
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
            {adapterCount} adapters expose real capabilities — HTTP, files,
            processes, jobs, models, code, infrastructure — behind the same
            governed boundary: policy-checked on the way in, evidence emitted on
            the way out, replayable by correlation ID. Install from PyPI and the
            host discovers them automatically.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16 border-y border-[color:var(--color-border-subtle)]">
          <AdapterDirectory adapters={officialAdapters} categories={categories} />
        </section>

        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="border border-[color:var(--color-border-subtle)] bg-[color:var(--color-surface-900)]/70 rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                Build your own adapter.
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
                Any installed package that registers a{' '}
                <code className="font-mono text-zinc-300">chp.adapters</code>{' '}
                entry point is discovered automatically — community adapters are
                first-class at runtime.
              </p>
            </div>
            <a
              href="/docs"
              className="shrink-0 text-sm text-zinc-300 hover:text-zinc-50 transition-colors"
            >
              Adapter authoring guide -&gt;
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
