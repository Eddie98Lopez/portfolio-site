import React from 'react'
import { Section, SectionContent, SectionTitle } from '@/components/Section/section'
import { FormBlock } from '@/blocks/Form/Component'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getPayloadClient } from '@/lib/payload'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { StaggerReveal } from '@/components/stagger-reveal'
import Image from 'next/image'

async function ContactPage() {
  const payload = await getPayloadClient()

  const form = await payload.findByID({
    collection: 'forms',
    id: '1', // copy from the URL when editing the form in the admin
  })
  return (
    <div>
      <Section>
        <SectionTitle>Contact</SectionTitle>
        <SectionContent overlap={15}>
          <StaggerReveal preset="slower" className="mx-auto w-full flex flex-col gap-6">
            {/* <div className="relative mx-auto w-full max-w-150 min-w-120 aspect-5/2">
              <Image
                src={'/api/media/file/open-sign.png'}
                fill
                alt="open sign"

                className="drop-shadow-lg object-cover drop-shadow-black/30 dark:drop-shadow-black/70 dark:drop-shadow-xl"
              />
            </div> */}
            <h3 className="text-display-small max-w-2xl mx-auto text-center">Get in touch</h3>
            <p className="text-headline text-center">Call me, beep me, if you wanna reach me.</p>
            <p className="mx-auto  max-w-2xl text-center">
              I'm looking for my next role, full-time, part-time, or contract, on a team that needs
              someone who can design the brand and build the interface. Email is the fastest way to
              reach me.
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
            {/* <div className="lg:max-w-5xl mx-auto">
              <FormBlock form={form as unknown as FormType} enableIntro={false} />
            </div> */}
          </StaggerReveal>
        </SectionContent>
      </Section>
    </div>
  )
}

export default ContactPage
