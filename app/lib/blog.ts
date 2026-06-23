import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

const BLOG_DIR = join(process.cwd(), 'content/blog');

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  content: string;
};

export function getPostSlugs(): string[] {
  if (!existsSync(BLOG_DIR)) return [];
  return readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function getPost(slug: string): BlogPost {
  const raw = readFileSync(join(BLOG_DIR, `${slug}.mdx`), 'utf8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ''),
    date: String(data.date ?? ''),
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  return getPostSlugs()
    .map(getPost)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function formatDate(iso: string): string {
  if (!iso) return '';
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
