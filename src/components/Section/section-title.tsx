'use client'

import {
  Children,
  Fragment,
  type CSSProperties,
  type ComponentProps,
  type ElementType,
} from 'react'
import { motion, stagger, useReducedMotion, type Variants } from 'motion/react'
import { cn } from '@/lib/utils'

/* ----------------------------------------------------------------------------
 * SectionTitle
 * text-box trims the box to [cap top of line 1 → baseline of last line], so:
 *   height = capHeight + (lines − 1) × lineHeight
 * When the title wraps, everything below moves down by exactly one line-height.
 *
 * String children are split into letters that fade in and rise from below,
 * staggered, the first time the title scrolls into view. Words are kept
 * together (nowrap) so the title still only wraps between words. Screen
 * readers get the plain text; the animated letters are aria-hidden.
 * Non-string children render without animation.
 * ------------------------------------------------------------------------- */

type SectionTitleProps = ComponentProps<'h2'> & {
  as?: ElementType
  /** Set false to render the title without the letter animation. */
  animate?: boolean
  /** Seconds between each letter starting. */
  stagger?: number
  /** Seconds before the first letter starts. */
  delay?: number
  /** Seconds each letter takes to settle. */
  duration?: number
  /** How far below its resting spot each letter starts, in em. */
  rise?: number
}

const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const

export function SectionTitle({
  as: Tag = 'span',
  animate = true,
  stagger: step = 0.035,
  delay = 0,
  duration = 0.7,
  rise = 0.35,
  className,
  children,
  ...props
}: SectionTitleProps) {
  const reduceMotion = useReducedMotion()

  const classes = cn(
    'block relative w-full text-center font-display font-bold uppercase text-text-inverse dark:text-text-inverse',
    'text-[length:var(--section-title-size)]',
    '[text-box:trim-both_cap_alphabetic]',
    'leading-[0.85]',
    className,
  )

  const parts = Children.toArray(children)
  const hasText = parts.some((p) => typeof p === 'string' || typeof p === 'number')

  if (!animate || !hasText) {
    return (
      <Tag className={classes} {...props}>
        {children}
      </Tag>
    )
  }

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { delayChildren: stagger(step, { startDelay: delay }) },
    },
  }

  const letter: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? '0em' : `${rise}em` },
    visible: {
      opacity: 1,
      y: '0em',
      transition: { duration: reduceMotion ? 0.3 : duration, ease: EASE_OUT_QUINT },
    },
  }

  // Plain text for screen readers: elements like <br> become a space.
  const label = parts
    .map((p) => (typeof p === 'string' || typeof p === 'number' ? String(p) : ' '))
    .join('')
    .replace(/\s+/g, ' ')
    .trim()

  // Strings are split into words and letters; elements (<br>, icons, …)
  // pass through untouched, in place.
  const content = parts.map((part, p) => {
    if (typeof part !== 'string' && typeof part !== 'number') return part

    return (
      <Fragment key={`t${p}`}>
        {String(part)
          .split(/(\s+)/)
          .map((token, t) =>
            token === '' ? null : /^\s+$/.test(token) ? (
              ' '
            ) : (
              <span key={t} className="inline-block whitespace-nowrap">
                {Array.from(token).map((char, c) => (
                  <motion.span
                    key={c}
                    className="inline-block will-change-transform"
                    variants={letter}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ),
          )}
      </Fragment>
    )
  })

  return (
    <Tag className={classes} {...props}>
      <span className="sr-only">{label}</span>
      <motion.span
        aria-hidden
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={container}
      >
        {content}
      </motion.span>
    </Tag>
  )
}
