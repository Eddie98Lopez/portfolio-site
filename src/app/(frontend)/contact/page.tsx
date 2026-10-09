import React from 'react'
import { Section, SectionContent, SectionTitle } from '@/components/Section/section'
import { FormBlock } from '@/blocks/Form/Component'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { StaggerReveal } from '@/components/stagger-reveal'
import Image from 'next/image'

async function ContactPage() {
  const payload = await getPayload({ config: configPromise })

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
            <div className="lg:max-w-5xl mx-auto">
              <FormBlock form={form as unknown as FormType} enableIntro={false} />
            </div>
          </StaggerReveal>
        </SectionContent>
      </Section>
    </div>
  )
}

export default ContactPage
