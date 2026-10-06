import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import { Separator } from '@/components/ui/separator'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-(--text-base) paper pt-8 md:pt-6 lg:pt-4 -drop-shadow-lg">
      <div className="container py-8 gap-8 flex flex-col items-center  md:flex-row md:flex-wrap md:justify-between">
        <Link className="w-auto flex flex-start" href="/">
          <Logo className="w-min size-15 fill-text-base" />
        </Link>

        <ThemeSelector />
        <Separator className="hidden md:block" />
        <nav className="flex flex-col items-center md:flex-row gap-2 md:gap-4">
          {navItems.map(({ link }, i) => {
            return <CMSLink key={i} {...link} />
          })}
        </nav>
        <Separator className="md:hidden" />
        <p className="text-xs">Lopezed LLC. @ 2026. All rights reserved.</p>
      </div>
    </footer>
  )
}
