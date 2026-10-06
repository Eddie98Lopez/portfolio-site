import { generateMetadata } from './[slug]/page'
import { Section, SectionTitle, SectionContent } from '@/components/Section/section'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { StaggerReveal } from '@/components/stagger-reveal'

function page() {
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
            <div className="size-60 bg-blue-500"></div>
            <h3 className="text-display-small  text-center">
              I design brands and build the interfaces that carry them.
            </h3>
            <p className="text-headline text-center">Strategy. Branding. Engineering.</p>
            <div className="flex items-center gap-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="uppercase font-bold text-lg py-6 px-4 font-semibold tracking-wider"
                >
                  Get in Touch
                </Button>
              </Link>
              <Link href="/work">
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
          <StaggerReveal preset="slower" className="grid grid-cols-3 gap-4 w-full container">
            <div className="w-full aspect-1/1 bg-white border-gray-500 rounded-sm"></div>
            <div className="w-full aspect-1/1 bg-white border-gray-500 rounded-sm"></div>
            <div className="w-full aspect-1/1 bg-white border-gray-500 rounded-sm"></div>
            <div className="w-full aspect-1/1 bg-white border-gray-500 rounded-sm"></div>
            <div className="w-full aspect-1/1 bg-white border-gray-500 rounded-sm"></div>
            <div className="w-full aspect-1/1 bg-white border-gray-500 rounded-sm"></div>
          </StaggerReveal>
          <div className="flex items-center gap-4">
            <Button
              size="lg"
              className="uppercase font-bold text-lg py-6 px-4 font-semibold tracking-wider"
            >
              Get in Touch
            </Button>{' '}
            <Button
              size="lg"
              className="uppercase font-bold text-lg py-6 px-4 font-semibold tracking-wider"
              variant={'outline'}
            >
              View all Work
            </Button>
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
            <div className="size-100 lg:size-150">
              <Image
                alt=" "
                src="/api/media/file/head-1.png"
                fill
                className="drop-shadow-lg drop-shadow-black/50 dark:drop-shadow-black/70 dark:drop-shadow-xl"
              />
            </div>
            <h3 className="text-display-small text-center -mt-16">Design Engineer</h3>
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
          <div className="aspect-video w-full bg-white border-border max-w-5xl"></div>
        </SectionContent>
      </Section>
    </div>
  )
}

export default page

export { generateMetadata }
