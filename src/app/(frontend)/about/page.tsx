import React from 'react'
import { Section, SectionTitle, SectionContent } from '@/components/Section/section'
import { timeline_events } from '@/lib/timeline'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import ScrollTextLines from '@/components/ui/animated/scroll-text-lines'
import { StaggerReveal } from '@/components/stagger-reveal'

function AboutPage() {
  return (
    <div>
      <Section>
        <SectionTitle>About Me</SectionTitle>
        <SectionContent overlap={50} className="container">
          <StaggerReveal
            preset="slower"
            className="max-w-3xl text-center flex flex-col gap-6 mx-auto"
          >
            <div className="bg-gray-200 aspect-16/9 max-w-xl w-full mx-auto border">
              <video
                autoPlay
                playsInline
                loop
                muted
                className="w-full h-full object-cover object-center grayscale-50 drop-shadow-md"
              >
                <source src="/api/media/file/hero.mp4" type="video/mp4"></source>
              </video>
            </div>
            <h2 className="text-display-small">I design Therefore I am</h2>
            <p className="text-headline">Design engineer based in Fresno, CA.</p>
            <p>
              I studied illustration. Then, in 2020, I watched a startup agency build every site on
              WordPress themes and decided I wanted real control. So I learned to code. Since then
              I've designed for a print shop, gone from graphic designer to web developer at a
              marketing agency, and interned as a software engineer at Cultivated here in Fresno.
              The stack grew with me: React, Next.js, Tailwind, Payload CMS, Supabase, Stripe,
              Docker. Now I do both at once: I take a brand and build the component system a team
              can keep growing. Off the clock, I'm on a Sierra trail or in a Barnes & Noble.
            </p>
          </StaggerReveal>
        </SectionContent>
      </Section>
      <Section>
        <SectionTitle>Skills</SectionTitle>
        <SectionContent className=" !max-w-[unset] " overlap={25}>
          <ScrollTextLines />
        </SectionContent>
      </Section>
      <Section>
        <SectionTitle>Timeline</SectionTitle>
        <SectionContent overlap={25} className="container">
          <StaggerReveal>
            {' '}
            <div className="max-w-3xl text-center flex flex-col gap-6 mx-auto">
              <h2 className="text-display-small">Experience & Education</h2>
            </div>
            <div className="relative isolate mt-8 mx-auto w-full lg:w-fit space-y-8 lg:space-y-2">
              <div className="absolute top-0 bottom-0 w-1 -z-1 bg-text-subtle left-[calc(1rem-0.125rem)] lg:left-[calc(30rem+2rem+1rem-0.125rem)]" />
              {[...timeline_events].reverse().map((event) => (
                <div
                  key={`timeline_event-${event.id}`}
                  className="grid grid-cols-[auto_1fr] lg:grid-cols-[30rem_2rem_1fr] items-center gap-x-4 gap-y-4 lg:gap-x-8"
                >
                  <div className="col-span-2 lg:col-span-1 relative w-full aspect-5/3 overflow-hidden drop-shadow-md drop-shadow-black/30">
                    <Image
                      src={event.img_src}
                      alt={event.organization}
                      fill
                      sizes="(min-width: 1024px) 30rem, 100vw"
                      className="object-cover"
                    />
                  </div>

                  {/* column 1 on mobile, column 2 on lg */}
                  <div className="size-8 shrink-0 bg-text-base rounded-full" />

                  {/* column 2 on mobile, column 3 on lg */}
                  <div className="flex flex-col gap-4 w-full">
                    <p className="text-headline">{event.organization}</p>
                    <div className="space-y-2">
                      {event.entries.map((entry) => (
                        <div
                          key={`${event.id}-${entry.role}`}
                          className="border-l-2 border-l-text-subtle px-4 py-1"
                        >
                          <p className="text-xs italic">
                            {entry.year_start} - {entry.year_end}
                          </p>
                          <p className="font-bold capitalize text-lg">{entry.role}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full p-4 mt-8 flex justify-center">
              <Link href="/api/media/file/resume-oct-2026.pdf" download={true}>
                {' '}
                <Button
                  className="uppercase text-lg py-6 px-4 font-semibold tracking-wider"
                  size={'lg'}
                >
                  Download Resume
                </Button>
              </Link>
            </div>
          </StaggerReveal>
        </SectionContent>
      </Section>
      {/* <Section>
        <SectionTitle>Bookworm</SectionTitle>
        <SectionContent className="container" overlap={25}>
          <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="text-display-small">Favorite Books</h2>
          </div>
        </SectionContent>
      </Section> */}
    </div>
  )
}

export default AboutPage
