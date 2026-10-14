// src/lib/payload.ts
import 'server-only'
import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Media } from '@/payload-types'

export const getPayloadClient = cache(() => getPayload({ config }))

export const getMediaByFilename = cache(async (filename: string) => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
  })
  return (docs[0] as Media | undefined) ?? null
})
