'use client'

import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import type { Header } from '@/payload-types'
import { CMSLink } from '@/components/Link'

import { usePathname } from 'next/navigation'

type NavItems = Partial<Header['navItems']>

export function MobileNav({ navItems }: { navItems: NavItems }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const [prevPathname, setPrevPathname] = useState(pathname)
  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger aria-label="open menu" className="flex flex-col gap-1.5">
        <Menu />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="z-5000 data-[side=right]:w-full data-[side=right]:sm:max-w-none border-none p-8 place-content-center"
      >
        <ul className="flex flex-col gap-4 text-center text-black">
          {navItems?.map((item, i) => {
            return (
              <li key={i}>
                <CMSLink
                  {...item?.link}
                  appearance="link"
                  className="uppercase font-bold text-3xl"
                />
              </li>
            )
          })}
        </ul>
      </SheetContent>
    </Sheet>
  )
}
