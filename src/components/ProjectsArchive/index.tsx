import { cn } from '@/utilities/ui'
import React from 'react'

import type { Project } from '@/payload-types'
import { Media } from '@/components/Media'
import Link from 'next/link'

type ProjectCard = Pick<Project, 'id' | 'title' | 'slug' | 'meta' | 'featured'>
type Props = {
  projects: ProjectCard[]
}

export const ProjectCard = ({ project }: { project: ProjectCard }) => {
  const { slug, meta, title } = project || {}
  const { description, image: metaImage } = meta || {}
  return (
    <Link
      className="flex flex-col border border-border rounded-lg group overflow-hidden bg-card hover:cursor-pointer"
      href={`/projects/${project.slug}`}
    >
      <div className="relative w-full overflow-hidden transition-all transition-500">
        {!metaImage && <div className="dark:text-(--text-inverse)">No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media
            resource={metaImage}
            size="33vw"
            className="transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        )}
      </div>
      <div className="p-4 text-base dark:text-(--text-inverse)">
        <h3 className="font-bold ">{title}</h3>
        <p className="text-sm">{meta?.description}</p>
      </div>
    </Link>
  )
}

export const ProjectsArchive: React.FC<Props> = (props: Props) => {
  const { projects } = props

  return (
    <div className={cn('container')}>
      <div>
        <ul className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {projects?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <li className="col-span-4" key={index}>
                  <ProjectCard project={result} />
                </li>
              )
            }

            return null
          })}
        </ul>
      </div>
    </div>
  )
}
