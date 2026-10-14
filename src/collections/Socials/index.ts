import type { GlobalConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { revalidateSocialLinks } from './hooks/revalidateSocialLinks'

export const SocialLinks: GlobalConfig = {
  slug: 'social-links',
  label: 'Social Links',
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    group: 'Admin',
  },
  fields: [
    {
      name: 'links',
      type: 'array',
      labels: { singular: 'Link', plural: 'Links' },
      admin: {
        description: 'LinkedIn, Instagram, Facebook, etc. Drag to reorder.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'platform',
              type: 'select',
              required: true,
              options: [
                { label: 'Instagram', value: 'instagram' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'GitHub', value: 'github' },
                { label: 'Facebook', value: 'facebook' },
                { label: 'X / Twitter', value: 'x' },
                { label: 'TikTok', value: 'tiktok' },
                { label: 'YouTube', value: 'youtube' },
              ],
              admin: { width: '30%' },
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              admin: { width: '70%' },
              validate: (value: string | null | undefined) => {
                if (!value) return 'A URL is required'
                try {
                  const url = new URL(value)
                  if (!['http:', 'https:'].includes(url.protocol)) {
                    return 'URL must start with http:// or https://'
                  }
                  return true
                } catch {
                  return 'Enter a full URL, including https://'
                }
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSocialLinks],
  },
}
