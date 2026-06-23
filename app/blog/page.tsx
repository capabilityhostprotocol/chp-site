import type { Metadata } from 'next';
import Nav from '../components/Nav';
import SiteFooter from '../components/SiteFooter';
import { getAllPosts, formatDate } from '../lib/blog';

export const metadata: Metadata = {
  title: 'Blog - Capability Host Protocol',
  description:
    'Writing on governing and proving what AI agents and systems do — problem education, protocol thinking, and the capabilities behind the agentic web.',
  alternates: { canonical: 'https://capabilityhostprotocol.com/blog' },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs text-zinc-500 uppercase mb-4">Blog</p>
              <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-zinc-50 max-w-3xl">
                On governing and proving what agents do.
              </h1>
            </div>
            <a
              href="/feed.xml"
              className="hidden sm:inline font-mono text-xs text-zinc-500 hover:text-zinc-300 transition-colors whitespace-nowrap"
            >
              RSS -&gt;
            </a>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-20 border-t border-zinc-800/60">
          <div className="divide-y divide-zinc-800/60">
            {posts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block py-8"
              >
                <p className="font-mono text-xs text-zinc-500 mb-2">
                  {formatDate(post.date)}
                </p>
                <h2 className="text-2xl font-semibold text-zinc-100 group-hover:text-white transition-colors mb-2 max-w-3xl">
                  {post.title}
                </h2>
                <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl">
                  {post.description}
                </p>
              </a>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
