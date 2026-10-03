import React from 'react'
import Image from 'next/image'

import type { GalleryBlock as GalleryBlockProps, Media } from '@/payload-types'
import { cn } from '@/utilities/ui'

import { GalleryCarousel } from './GalleryCarousel'

type Columns = '2' | '3' | '4'
type Span = '1' | '2' | 'full'
type Height = 'sm' | 'md' | 'lg'

// focalX / focalY exist on Media when the upload collection has `focalPoint: true`.
type MediaWithUrl = Media & { url: string; focalX?: number | null; focalY?: number | null }

export type ResolvedGalleryItem = {
  id: string
  media: MediaWithUrl
  caption?: string | null
  span: Span
}

// Tailwind needs literal class names, so map select values to full strings.
const gridCols: Record<Columns, string> = {
  '2': 'sm:grid-cols-2',
  '3': 'sm:grid-cols-2 lg:grid-cols-3',
  '4': 'sm:grid-cols-2 lg:grid-cols-4',
}

const masonryCols: Record<Columns, string> = {
  '2': 'sm:columns-2',
  '3': 'sm:columns-2 lg:columns-3',
  '4': 'sm:columns-2 lg:columns-4',
}

const spanClass: Record<Span, string> = {
  '1': '',
  '2': 'sm:col-span-2',
  full: 'col-span-full',
}

// Each row is as tall as its tallest image, but never shorter than the minimum.
const rowHeight: Record<Height, string> = {
  sm: 'auto-rows-[minmax(12rem,auto)]',
  md: 'auto-rows-[minmax(16rem,auto)]',
  lg: 'auto-rows-[minmax(20rem,auto)]',
}

function resolveItems(items: GalleryBlockProps['items']): ResolvedGalleryItem[] {
  return (items ?? []).flatMap((item, i) => {
    const media = item.image
    // Skip unpopulated relations (depth 0) or media without a URL.
    if (!media || typeof media !== 'object' || !media.url) return []
    return [
      {
        id: item.id ?? String(i),
        media: media as MediaWithUrl,
        caption: item.caption,
        span: (item.span ?? '1') as Span,
      },
    ]
  })
}

// Keeps the subject in frame when an image is cropped.
function focalPosition(media: MediaWithUrl): string | undefined {
  if (media.focalX == null || media.focalY == null) return undefined
  return `${media.focalX}% ${media.focalY}%`
}

// Rough `sizes` hint so Next serves an appropriately sized file.
function sizesFor(columns: Columns, span: Span): string {
  if (span === 'full') return '100vw'
  const n = Number(columns)
  const lg = Math.min(100, Math.round((100 / n) * (span === '2' ? 2 : 1)))
  const sm = span === '2' ? 100 : 50
  return `(min-width: 1024px) ${lg}vw, (min-width: 640px) ${sm}vw, 100vw`
}

// Renders nothing for null, empty, or whitespace-only captions.
const Caption: React.FC<{ text?: string | null; className?: string }> = ({ text, className }) => {
  const trimmed = text?.trim()
  if (!trimmed) return null
  return <p className={cn('m-0 text-sm', className)}>{trimmed}</p>
}

export const GalleryBlock: React.FC<GalleryBlockProps & { className?: string }> = ({
  layout,
  columns,
  height,
  items,
  className,
}) => {
  const resolved = resolveItems(items)
  if (resolved.length === 0) return null

  const mode = layout ?? 'grid'
  const cols = (columns ?? '3') as Columns

  if (mode === 'carousel') {
    return (
      <div className={cn('container not-prose', className)}>
        <GalleryCarousel items={resolved} />
      </div>
    )
  }

  if (mode === 'masonry') {
    // CSS columns keep each image at its natural aspect ratio.
    // Per-image span is ignored here; columns can't span cleanly without breaking order.
    return (
      <div className={cn(' not-prose', className)}>
        <div className={cn('columns-1 gap-4', masonryCols[cols])}>
          {resolved.map(({ id, media, caption }) => (
            <div key={id} className="mb-4 break-inside-avoid">
              <Image
                src={media.url}
                alt={media.alt ?? ''}
                width={media.width ?? 1200}
                height={media.height ?? 800}
                sizes={sizesFor(cols, '1')}
                className="h-auto w-full rounded-lg"
              />
              <Caption text={caption} className="mt-2 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // grid + twoColumn
  const effectiveCols: Columns = mode === 'twoColumn' ? '2' : cols
  const rows = rowHeight[(height ?? 'md') as Height]

  return (
    <div className={cn(' not-prose', className)}>
      {/*
        The tallest image in a row sets the row height (with a minimum).
        Tiles stretch to the row; shorter images fill their tile with object-cover.
      */}
      <div className={cn('grid grid-cols-1 gap-4', gridCols[effectiveCols], rows)}>
        {resolved.map(({ id, media, caption, span }) => (
          <div key={id} className={cn('relative overflow-hidden rounded-lg', spanClass[span])}>
            <Image
              src={media.url}
              alt={media.alt ?? ''}
              width={media.width ?? 1200}
              height={media.height ?? 800}
              sizes={sizesFor(effectiveCols, span)}
              className="h-full w-full object-cover"
              style={{ objectPosition: focalPosition(media) }}
            />
            <Caption
              text={caption}
              className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2 pt-6 text-white"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
