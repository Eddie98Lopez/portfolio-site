// src/collections/Projects/hooks/revalidateProject.ts
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'
import type { Project } from '@/payload-types'

export const revalidateProject: CollectionAfterChangeHook<Project> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      payload.logger.info(`Revalidating project: ${doc.slug}`)
      revalidatePath(`/projects/${doc.slug}`)
      revalidatePath('/projects') // listing page with your cards
      revalidatePath('/') // if cards also appear on the home page
    }
    // unpublished → clear the old page
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      revalidatePath(`/projects/${previousDoc.slug}`)
      revalidatePath('/projects')
    }
  }
  return doc
}

export const revalidateProjectDelete: CollectionAfterDeleteHook<Project> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePath(`/projects/${doc?.slug}`)
    revalidatePath('/projects')
  }
  return doc
}
