import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { getPayloadClient } from '@/lib/payload'
import { Section, SectionContent, SectionTitle } from '@/components/Section/section'
import React from 'react'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayloadClient()

  const projects = await payload.find({
    collection: 'projects',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      featured: true,
    },
  })

  return (
    <div className="pb-24">
      {/* <PageClient /> */}
      <Section>
        <SectionTitle>Featured</SectionTitle>
        <SectionContent overlap={25}>
          <CollectionArchive posts={projects.docs.filter((p) => p.featured)} />
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>More Work</SectionTitle>
        <SectionContent overlap={25}>
          <CollectionArchive posts={projects.docs.filter((p) => !p.featured)} />
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>Play</SectionTitle>
        <SectionContent overlap={25}>
          <CollectionArchive posts={projects.docs.filter((p) => !p.featured)} />
        </SectionContent>
      </Section>

      {/* <div className="container">
        {projects.totalPages > 1 && projects.page && (
          <Pagination page={projects.page} totalPages={projects.totalPages} />
        )}
      </div> */}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Eddie Lopez Design Engineer Posts`,
  }
}
