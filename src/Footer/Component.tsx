import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import { Separator } from '@/components/ui/separator'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { getPayloadClient } from '@/lib/payload'
import SocialLinksBar from '@/components/social-bar'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()
  const payload = await getPayloadClient()
  const socialLinks = (await payload.findGlobal({ slug: 'social-links' })).links
  console.log(socialLinks)

  const navItems = footerData?.navItems || []

  return (
    <div className="paper-shadow mt-auto">
      <footer className="  text-(--text-base) paper pt-8 md:pt-6 lg:pt-4">
        <div className="container py-8 gap-8 flex flex-col items-center  md:flex-row md:flex-wrap md:justify-between">
          <div className="flex flex-col lg:flex-row gap-6 items-center md:items-start lg:items-center">
            <Link className="w-auto flex flex-start" href="/">
              <Logo className="w-min size-15 fill-text-base" />
            </Link>
            <SocialLinksBar links={socialLinks} />
          </div>

          <ThemeSelector />
          <Separator className="hidden md:block bg-text-base border-text-base border" />
          <nav className="flex flex-col items-center md:flex-row gap-2 md:gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink key={i} {...link} />
            })}
          </nav>
          <Separator className="md:hidden bg-text-base border-text-base border" />
          <p className="text-xs">Lopezed LLC. @ 2026. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
