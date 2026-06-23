import { ogCard, ogSize, ogContentType } from './lib/og';

export const size = ogSize;
export const contentType = ogContentType;
export const alt =
  'Capability Host Protocol — see exactly what your AI agents did';

export default function Image() {
  return ogCard({
    title: 'See exactly what your AI agents did.',
    eyebrow: 'evidence for what AI agents do',
  });
}
