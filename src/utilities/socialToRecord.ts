import { cache } from 'react'
import { getPayloadClient } from '../lib/payload'

export type SocialPlatform = 'github' | 'linkedin' | 'instagram' | 'facebook'

type SocialItem = {
  id?: string | null
  platform?: string | null
  url?: string | null
}

export type SocialRecord = Partial<Record<SocialPlatform, string>>

/**
 * Converts the socials global array:
 *   [{ platform: 'github', url: '...' }, ...]
 * into the SITE.social shape:
 *   { github: '...', linkedin: '...', ... }
 *
 * Skips entries without a platform or url. If a platform appears twice, the first one wins.
 */
export const socialsToRecord = (items?: SocialItem[] | null): SocialRecord => {
  if (!items?.length) return {}

  return items.reduce<SocialRecord>((acc, { platform, url }) => {
    const key = platform?.trim().toLowerCase() as SocialPlatform | undefined
    const href = url?.trim()

    if (key && href && !acc[key]) acc[key] = href
    return acc
  }, {})
}

/**
 * Fetches the social-links global and returns it in the SITE.social shape.
 * Wrapped in React cache() so calling it from both generateMetadata and a
 * layout/page in the same request only hits the database once.
 */
export const getSocialLinks = cache(async (): Promise<SocialRecord> => {
  const payload = await getPayloadClient()
  const { links } = await payload.findGlobal({ slug: 'social-links' })
  return socialsToRecord(links)
})
