'use client'
import { motion } from 'motion/react'
import { useState } from 'react'
import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import Link from 'next/link'

import type { Page, Post } from '@/payload-types'

type CMSLinkType = {
  appearance?: 'inline' | ButtonProps['variant']
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts'
    value: Page | Post | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
}

const item = {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  height: '1.75em',
  lineHeight: '1.75em',
} as const

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const [isHovered, setIsHovered] = useState(false)
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url

  if (!href) return null

  const size = appearance === 'link' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (appearance === 'inline') {
    return (
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        <motion.li
          style={{ ...item, justifyContent: isHovered ? 'flex-end' : 'flex-start' }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <motion.span layout>
            {label && label} {children && children}
          </motion.span>
          <motion.span layout>
            {label && label} {children && children}
          </motion.span>
        </motion.li>
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link className={cn(className)} href={href || url || ''} {...newTabProps}>
        <motion.li
          style={{ ...item, justifyContent: isHovered ? 'flex-end' : 'flex-start' }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <motion.span layout>
            {label && label} {children && children}
          </motion.span>
          <motion.span layout>
            {label && label} {children && children}
          </motion.span>
        </motion.li>
      </Link>
    </Button>
  )
}
