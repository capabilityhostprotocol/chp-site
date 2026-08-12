import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import Nav from '../../components/Nav';
import SiteFooter from '../../components/SiteFooter';
import Figure from '../../components/motif/Figure';
import Callout from '../../components/motif/Callout';
import PullQuote from '../../components/motif/PullQuote';
import CompareTable from '../../components/motif/CompareTable';
import EvidenceChain from '../../components/motif/EvidenceChain';
import EvidenceArtifact from '../../components/motif/EvidenceArtifact';
import EvidenceContractDiagram from '../../components/EvidenceContractDiagram';
import LifecycleDiagram from '../../components/motif/LifecycleDiagram';
import {
  TelemetryVsEvidenceTable,
  AgenticStackTable,
  LogsVsEvidenceTable,
  DiscoveryFilesTable,
  ClaimDenialArtifact,
} from '../../components/motif/BlogFigures';
import { getPostSlugs, getPost, formatDate } from '../../lib/blog';

type Params = { params: Promise<{ slug: string }> };
const BASE = 'https://capabilityhostprotocol.com';

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  if (!getPostSlugs().includes(slug)) return {};
  const post = getPost(slug);
  return {
    title: `${post.title} - Capability Host Protocol`,
    description: post.description,
    alternates: { canonical: `${BASE}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `${BASE}/blog/${slug}`,
      publishedTime: post.date,
    },
  };
}

const mdxComponents = {
  h2: (p: object) => <h2 className="text-2xl font-semibold text-zinc-100 mt-12 mb-4" {...p} />,
  h3: (p: object) => <h3 className="text-xl font-semibold text-zinc-100 mt-8 mb-3" {...p} />,
  p: (p: object) => <p className="text-zinc-300 leading-relaxed mb-5" {...p} />,
  ul: (p: object) => <ul className="list-disc pl-6 space-y-2 mb-5 text-zinc-300" {...p} />,
  ol: (p: object) => <ol className="list-decimal pl-6 space-y-2 mb-5 text-zinc-300" {...p} />,
  li: (p: object) => <li className="leading-relaxed" {...p} />,
  a: (p: object) => (
    <a className="text-zinc-100 underline underline-offset-4 hover:text-white" {...p} />
  ),
  blockquote: (p: object) => (
    <blockquote className="border-l-2 border-zinc-700 pl-4 italic text-zinc-400 my-6" {...p} />
  ),
  code: (p: object) => (
    <code className="font-mono text-sm text-zinc-200 bg-zinc-900 rounded px-1.5 py-0.5" {...p} />
  ),
  strong: (p: object) => <strong className="text-zinc-100 font-semibold" {...p} />,
  // Visual-aid components — usable inline in any post's MDX.
  Figure,
  Callout,
  PullQuote,
  CompareTable,
  EvidenceChain,
  EvidenceArtifact,
  EvidenceContractDiagram,
  LifecycleDiagram,
  TelemetryVsEvidenceTable,
  AgenticStackTable,
  LogsVsEvidenceTable,
  DiscoveryFilesTable,
  ClaimDenialArtifact,
};

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  if (!getPostSlugs().includes(slug)) notFound();
  const post = getPost(slug);
  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
  });

  const author = post.author
    ? { '@type': 'Person', name: post.author }
    : { '@type': 'Organization', name: 'Capability Host Protocol' };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url: `${BASE}/blog/${slug}`,
    author,
    publisher: { '@type': 'Organization', name: 'Capability Host Protocol' },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${BASE}/blog/${slug}` },
    ],
  };

  return (
    <div className="min-h-screen">
      {[jsonLd, breadcrumbLd].map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      <Nav />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <a
          href="/blog"
          className="font-mono text-xs text-zinc-400 hover:text-zinc-300 transition-colors"
        >
          &lt;- Blog
        </a>
        <p className="font-mono text-xs text-zinc-400 mt-6 mb-3">
          {formatDate(post.date)} · {post.author ?? 'Capability Host Protocol'}
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-zinc-50 mb-10">
          {post.title}
        </h1>
        <article>{content}</article>

        <div className="mt-16 pt-8 border-t border-zinc-800/60 flex flex-wrap gap-3">
          <a
            href="/design-partners"
            className="bg-zinc-100 text-zinc-950 border border-zinc-100 rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-white transition-colors"
          >
            Become a design partner
          </a>
          <a
            href="https://docs.capabilityhostprotocol.com"
            className="border border-zinc-700 rounded-lg px-4 py-2.5 text-sm text-zinc-300 hover:text-zinc-50 hover:border-zinc-500 transition-colors"
          >
            Read the docs
          </a>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
