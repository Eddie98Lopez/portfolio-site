import { generateMetadata } from './[slug]/page'
import { Section, SectionTitle, SectionContent } from '@/components/Section/section'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { StaggerReveal } from '@/components/stagger-reveal'
import { getPayloadClient } from '@/lib/payload'
import { ProjectCard } from '@/components/ProjectsArchive'

async function page() {
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
    <div>
      <Section>
        <SectionTitle>
          Hi I'm <br className="lg:hidden leading-[0]" />
          Eddie
        </SectionTitle>
        <SectionContent overlap={100}>
          <StaggerReveal
            preset="slower"
            className="mx-auto max-w-2xl flex flex-col items-center gap-6"
          >
            <div className="w-80 lg:w-120 aspect-5/4 relative">
              <Image
                alt=" "
                src="/api/media/file/head-1.png"
                fill
                objectPosition="center"
                className="drop-shadow-lg drop-shadow-black/50 dark:drop-shadow-black/70 dark:drop-shadow-xl object-cover"
              />
            </div>
            <h3 className="text-display-small  text-center ">
              I design brands and build the interfaces that carry them.
            </h3>
            <p className="text-headline text-center">Branding + Engineering</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="uppercase font-bold text-lg py-6 px-4 font-semibold tracking-wider"
                >
                  Get in Touch
                </Button>
              </Link>
              <Link href="/projects">
                <Button
                  size="lg"
                  className="uppercase font-bold text-lg py-6 px-4 font-semibold tracking-wider"
                  variant={'outline'}
                >
                  View Work
                </Button>
              </Link>
            </div>
          </StaggerReveal>
        </SectionContent>
      </Section>
      <Section>
        <SectionTitle>Projects</SectionTitle>
        <SectionContent overlap={20} className="flex flex-col items-center gap-6 mx-auto">
          <StaggerReveal
            preset="slower"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full container"
          >
            {projects.docs.map((project: ProjectCard) => (
              <div
                key={`project-card-${project.id}`}
                className="w-full  overflow-hidden rounded-sm"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </StaggerReveal>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button
                size="lg"
                className="uppercase font-bold text-lg py-6 px-4 font-semibold tracking-wider"
              >
                Get in Touch
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                size="lg"
                className="uppercase font-bold text-lg py-6 px-4 font-semibold tracking-wider"
                variant={'outline'}
              >
                View All Work
              </Button>
            </Link>
          </div>
        </SectionContent>
      </Section>
      <Section>
        <SectionTitle>About Me</SectionTitle>
        <SectionContent overlap={100}>
          <StaggerReveal
            preset="slower"
            className=" max-w-2xl mx-auto gap-6 flex flex-col items-center"
          >
            <div className="w-full max-w-100 aspect-1/1">
              <video autoPlay preload="auto" loop muted playsInline className="object-cover">
                <source src="/heads-10s-v2.mov" type='video/quicktime; codecs="hvc1"' />
                <source src="/heads-10s.webm" type="video/webm" />
              </video>
            </div>
            <h3 className="text-display-small text-center -mt-8">Design Engineer</h3>
            <p className="text-headline text-center">What the heck is that?</p>
            <p className="text-center">
              I take an idea from brand and interface design all the way through to production
              frontend code, without losing the intention in between. Whether you're an agency team
              that needs that gap closed or a business that wants its brand and site built right the
              first time, I'm the person who carries the whole thing end to end.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/about">
                <Button
                  variant={'link'}
                  size="lg"
                  className="underline uppercase font-bold text-lg"
                >
                  More about Eddie
                </Button>
              </Link>
            </div>
          </StaggerReveal>
        </SectionContent>
      </Section>
      <Section>
        <SectionTitle>Contact</SectionTitle>
        <SectionContent overlap={15} className="flex flex-col items-center gap-6 mx-auto">
          <h3 className="text-display-small max-w-2xl text-center">Hire Me {`:)`}</h3>
          <p className="text-headline text-center">Full-time. Part-time. Freelance.</p>
          <p className="text-xl">
            Need a designer who ships code? Grab my resume or send me an email.
          </p>
          <div className="flex justify-center items-center flex-wrap gap-4">
            <div>
              <Link
                className="flex flex-col items-center"
                href="/api/media/file/resume-oct-2026.pdf"
                download
              >
                <div className="relative aspect-1/1 w-full lg:size-100 ">
                  <Image
                    fill
                    alt="resume"
                    src={'/api/media/file/document.png'}
                    className="object-cover drop-shadow-lg  drop-shadow-black/50 "
                  />
                </div>

                <Button variant={'link'}>Download Resume</Button>
              </Link>
            </div>
            <div>
              <Link className="flex flex-col items-center" href="mailto:eduardo@lopezed.com">
                <div className="relative aspect-1/1 w-full lg:size-100 ">
                  <Image
                    fill
                    alt="envelope"
                    src={'/api/media/file/message.png'}
                    className="object-cover drop-shadow-lg  drop-shadow-black/50 object-cover scale-77"
                  />
                </div>

                <Button variant={'link'}>eduardo@lopezed.com</Button>
              </Link>
            </div>
          </div>
        </SectionContent>
      </Section>
    </div>
  )
}

export default page

export { generateMetadata }
