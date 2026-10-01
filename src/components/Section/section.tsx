import type { CSSProperties, ComponentProps, ElementType } from 'react'
import { cn } from '@/lib/utils'

/* ----------------------------------------------------------------------------
 * Section
 * Owns the title size so SectionTitle and SectionContent read the same value.
 *
 *   --section-title-size  clamp(min, fluid vw, max)
 *   --section-cap-ratio   cap height ÷ font size for the title font
 *
 * Defaults come from the Figma hero: 447.45px title in a 1728px frame,
 * trimmed to a 311px cap height (311 / 447.45 ≈ 0.695 for Mazurquica).
 * ------------------------------------------------------------------------- */

type SectionProps = ComponentProps<'section'> & {
  /** Title font size in px at `designWidth`. */
  titleSize?: number
  /** Width in px of the Figma frame the title was designed in. */
  designWidth?: number
  /** Smallest title size in px (output in rem, so it respects user font settings). */
  minTitleSize?: number
  /** Largest title size in px. Defaults to `titleSize`. */
  maxTitleSize?: number
  /** Cap height ÷ font size of the title font. */
  capRatio?: number
}

export function Section({
  titleSize = 450,
  designWidth = 1728,
  minTitleSize = 96,
  maxTitleSize,
  capRatio = 0.695,
  className,
  style,
  ...props
}: SectionProps) {
  const fluid = ((titleSize / designWidth) * 100).toFixed(4)
  const max = maxTitleSize ?? titleSize

  return (
    <section
      className={cn('relative flex flex-col items-center py-8', className)}
      style={
        {
          '--section-title-size': `clamp(${minTitleSize / 16}rem, ${fluid}vw, ${max / 16}rem)`,
          '--section-cap-ratio': capRatio,
          ...style,
        } as CSSProperties
      }
      {...props}
    />
  )
}

/* ----------------------------------------------------------------------------
 * SectionTitle
 * text-box trims the box to [cap top of line 1 → baseline of last line], so:
 *   height = capHeight + (lines − 1) × lineHeight
 * When the title wraps, everything below moves down by exactly one line-height.
 * ------------------------------------------------------------------------- */

type SectionTitleProps = ComponentProps<'h2'> & {
  as?: ElementType
}

export function SectionTitle({ as: Tag = 'h2', className, ...props }: SectionTitleProps) {
  return (
    <Tag
      className={cn(
        'relative w-full text-center font-display font-bold uppercase leading-[0.85] text-text-inverse dark:text-text-inverse/30',
        'text-[length:var(--section-title-size)]',
        '[text-box:trim-both_cap_alphabetic]',
        className,
      )}
      {...props}
    />
  )
}

/* ----------------------------------------------------------------------------
 * SectionContent
 * Pulls itself up by a percentage of the title's cap height, measured from
 * the title's last baseline. 100 = top of content aligns with the cap top
 * of a one-line title.
 * ------------------------------------------------------------------------- */

type SectionContentProps = ComponentProps<'div'> & {
  /** Percentage of the title's cap height to overlap (0–100+). */
  overlap?: number
}

export function SectionContent({ overlap = 100, className, style, ...props }: SectionContentProps) {
  return (
    <div
      className={cn(
        'relative z-10 w-full',
        'mt-[calc(var(--section-title-size)*var(--section-cap-ratio)*var(--section-overlap)*-1)]',
        'mx-auto',
        className,
      )}
      style={{ '--section-overlap': overlap / 100, ...style } as CSSProperties}
      {...props}
    />
  )
}
