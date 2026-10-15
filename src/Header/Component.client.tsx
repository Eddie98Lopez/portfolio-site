'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'motion/react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { cn } from '@/utilities/ui' // or wherever cn lives in your template

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, 'change', (current) => {
    const previous = scrollY.getPrevious() ?? 0
    setHidden(current > previous && current > 150)
    setScrolled(current > 10)
  })

  useEffect(() => {
    setHeaderTheme(null)
    setHidden(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Only force the hero's theme while sitting on top of the hero
  const forcedTheme = !scrolled ? headerTheme : null

  return (
    <motion.header
      className={cn(
        'sticky top-0 z-20 w-full transition-colors duration-300',
        scrolled && 'bg-background/50 backdrop-blur-md border-b border-border',
      )}
      {...(forcedTheme ? { 'data-theme': forcedTheme } : {})}
      animate={{ y: hidden ? '-100%' : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div
        className={cn('container py-10 transition-all flex justify-between', scrolled && 'py-5')}
      >
        <Link href="/">
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>
        <HeaderNav data={data} />
      </div>
    </motion.header>
  )
}
