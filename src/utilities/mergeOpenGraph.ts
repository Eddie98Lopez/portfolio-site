import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  siteName: 'Eddie Lopez',
  title: 'Eddie Lopez — Design Engineer',
  description:
    'Eddie Lopez is a design engineer building thoughtful interfaces, design systems, and polished web experiences.',
  locale: 'en_US',
  images: [
    {
      url: `${getServerSideURL()}/og-image.webp`,
      width: 1200,
      height: 630,
      alt: 'Eddie Lopez — Design Engineer',
    },
  ],
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
