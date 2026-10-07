import React from 'react'
import { Section, SectionTitle, SectionContent } from '@/components/Section/section'
import { timeline_events } from '@/lib/timeline'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

function AboutPage() {
  return (
    <div>
      <Section>
        <SectionTitle>About Me</SectionTitle>
        <SectionContent overlap={70} className="container">
          <div className="max-w-3xl text-center flex flex-col gap-6 mx-auto">
            <div className="bg-gray-200 aspect-16/9 max-w-xl w-full mx-auto border">
              <video
                autoPlay
                playsInline
                loop
                muted
                className="w-full h-full object-cover object-center grayscale drop-shadow-md"
              >
                <source src="/api/media/file/hero.mp4" type="video/mp4"></source>
              </video>
            </div>
            <h2 className="text-display-small">I design Therefore I am</h2>
            <p className="text-headline">Story time ...</p>
            <p>
              Aww shucks, I’m blushing! Hi, my name is Eddie (or Eduardo). Once upon a time I was a
              graphic designer but decided I’d make my life even harder and become a software
              engineer too. Now I help businesses and founders bring their ideas to life: From
              branding to production.{' '}
            </p>
          </div>
        </SectionContent>
      </Section>
      <Section>
        <SectionTitle>Timeline</SectionTitle>
        <SectionContent overlap={25} className="container">
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
                <div className="col-span-2 lg:col-span-1 relative w-full aspect-5/3 overflow-hidden drop-shadow-sm">
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
            <Button
              className="uppercase text-lg py-6 px-4 font-semibold tracking-wider"
              size={'lg'}
            >
              Download Resume
            </Button>
          </div>
        </SectionContent>
      </Section>
    </div>
  )
}

export default AboutPage
