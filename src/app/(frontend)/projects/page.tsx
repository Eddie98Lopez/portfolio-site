import type { Metadata } from 'next/types'
import { ProjectsArchive } from '@/components/ProjectsArchive'
import { getPayloadClient } from '@/lib/payload'
import { Section, SectionContent, SectionTitle } from '@/components/Section'
import { generateMeta } from '@/utilities/generateMeta'
import { getCachedDocument } from '@/utilities/getDocument'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCachedDocument('pages', 'projects')()
  return generateMeta({ doc: page })
}

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
          <ProjectsArchive projects={projects.docs.filter((p) => p.featured)} />
        </SectionContent>
      </Section>

      {/* <Section>
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
      </Section> */}

      {/* <div className="container">
        {projects.totalPages > 1 && projects.page && (
          <Pagination page={projects.page} totalPages={projects.totalPages} />
        )}
      </div> */}
    </div>
  )
}
