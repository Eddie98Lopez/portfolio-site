import type { DataFromCollectionSlug } from 'payload'
import type { Config } from 'src/payload-types'
import { getPayloadClient } from '@/lib/payload'
import { unstable_cache } from 'next/cache'

type Collection = keyof Config['collections']

async function getDocument<T extends Collection>(collection: T, slug: string, depth = 0) {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection,
    depth,
    limit: 1,
    pagination: false,
    where: { slug: { equals: slug } },
  })

  return (result.docs[0] ?? null) as DataFromCollectionSlug<T> | null
}

export const getCachedDocument = <T extends Collection>(collection: T, slug: string, depth = 1) =>
  unstable_cache(
    async () => getDocument(collection, slug, depth),
    [collection, slug, String(depth)],
    {
      tags: [`${collection}_${slug}`],
    },
  )
