import { ogCard, ogSize, ogContentType } from '../../lib/og';
import { getPostSlugs, getPost } from '../../lib/blog';

export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Capability Host Protocol';

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  return ogCard({ title: post.title, eyebrow: 'Writing' });
}
