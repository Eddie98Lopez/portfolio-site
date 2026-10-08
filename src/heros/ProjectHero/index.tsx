import React from 'react'

import type { Project } from '@/payload-types'
import Link from 'next/link'
import ShareDialog from '@/components/ShareDialog'
import { formatDateTime } from 'src/utilities/formatDateTime'
import { Github, GlobeIcon, Figma } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const ProjectLinks = ({ links }: { links: Project['links'] }) => {
  return (
    <ul className="flex gap-2">
      {links?.map((link, i: number) => {
        return (
          <Button key={`${link.type}-${i}`}>
            <li className="flex items-center content-center">
              <Link
                href={link.url}
                className=" w-full block flex gap-2 items-center uppercase font-bold"
                target="_blank"
              >
                {link.type === 'github' && <Github className="m-auto" />}
                {link.type.includes('live') && <GlobeIcon className="m-auto" />}{' '}
                <span className="pr-1">{link.label}</span>
              </Link>
            </li>
          </Button>
        )
      })}
    </ul>
  )
}

const ProjectTechStack = ({
  technologies,
  wip,
}: {
  technologies: Project['technologies']
  wip?: boolean
}) => {
  return (
    <ul className="flex gap-2 flex-wrap items-center">
      <span className="text-xs">Technologies:</span>
      {technologies?.map((badge: string, i: number) => (
        <Badge variant="outline" key={`tech-badge-${badge}-${i}`} className="font-bold capitalize">
          {badge}
        </Badge>
      ))}
      {wip && (
        <Badge variant={'secondary'} className="font-bold">
          WIP
        </Badge>
      )}
    </ul>
  )
}

export const ProjectHero: React.FC<{
  project: Project
}> = ({ project }) => {
  const { services, heroImage, publishedAt, title, technologies, links } = project

  return (
    <div className="relative pb-8 ">
      {/* <div className="uppercase text-sm mb-6">
          {services?.map((service, index) => {
            if (typeof service === 'object' && service !== null) {
              const { name: serviceTitle } = service

              const titleToUse = serviceTitle || 'Untitled service'

              const isLast = index === services.length - 1

              return (
                <React.Fragment key={index}>
                  {titleToUse}
                  {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                </React.Fragment>
              )
            }
            return null
          })}
        </div> */}

      <div className="flex flex-col items-center md:items-start gap-4 mb-4">
        <h1 className="text-display-medium!">{title}</h1>

        <ProjectTechStack technologies={technologies} />
        {/* <time dateTime={publishedAt ?? ''} className="text-sm italic text-text-base/50">
          {formatDateTime(publishedAt ?? '')}
        </time> */}
      </div>

      <div className="border-border border-t py-4 flex flex-col flex-wrap md:flex-row justify-between items center gap-4">
        <div className="flex gap-2 items-center">
          <ProjectLinks links={links} /> <ShareDialog />
        </div>
      </div>
    </div>
  )
}
