import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DocsPageView from '../../components/DocsPageView';
import Nav from '../../components/Nav';
import SiteFooter from '../../components/SiteFooter';
import { DOC_PAGES, getDocsPage } from '../../lib/docs-content';

type DocsRoutePageProps = {
  params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
  return DOC_PAGES.map((page) => ({
    slug: page.slug.split('/'),
  }));
}

export async function generateMetadata({
  params,
}: DocsRoutePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getDocsPage(slug.join('/'));

  if (!page) {
    return {
      title: 'Docs - Capability Host Protocol',
    };
  }

  return {
    title: `${page.title} - CHP Docs`,
    description: page.summary,
  };
}

export default async function DocsRoutePage({ params }: DocsRoutePageProps) {
  const { slug } = await params;
  const page = getDocsPage(slug.join('/'));

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <DocsPageView page={page} />
      </main>
      <SiteFooter />
    </div>
  );
}
