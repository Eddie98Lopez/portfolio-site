import React from 'react'
import Image from 'next/image'
import { GalleryVideo } from './GalleryVideo'

import type { GalleryBlock as Props, Media } from '@/payload-types'
import { cn } from '@/utilities/ui'

type Item = Media & { url: string }

// Skips unpopulated relations (depth 0) and media without a URL.
const isItem = (m: unknown): m is Item =>
  typeof m === 'object' && m !== null && Boolean((m as Media).url)

// Payload only stores width/height for images, so videos fall back to 16:9
// unless you record their dimensions on the media doc.
const ratio = (m: Media) => (m.width && m.height ? m.width / m.height : 16 / 9)

// One gap for both directions so stacked and side-by-side spacing always match.
const gap = 'gap-3 sm:gap-4 lg:gap-6'

export const GalleryBlock: React.FC<Props & { className?: string }> = ({ rows, className }) => {
  const resolved = (rows ?? [])
    .map((row, i) => ({ id: row.id ?? String(i), items: (row.media ?? []).filter(isItem) }))
    .filter((row) => row.items.length > 0)

  if (resolved.length === 0) return null

  const itemClass =
    'relative aspect-[var(--ar)] w-full min-w-0 overflow-hidden rounded-lg md:w-auto md:[flex:var(--ar)_1_0%]'

  return (
    <div className={cn('not-prose flex flex-col', gap, className)}>
      {resolved.map(({ id, items }) => {
        const total = items.reduce((sum, m) => sum + ratio(m), 0)

        return (
          // Below md: one column, every item full width.
          // md and up: side by side, all items in the row at one shared height.
          <div key={id} className={cn('flex flex-col md:flex-row drop-shadow-lg', gap)}>
            {items.map((m) => {
              const ar = ratio(m)

              return m.mimeType?.startsWith('video/') ? (
                <GalleryVideo key={m.id} src={m.url} initialRatio={ar} className={itemClass} />
              ) : (
                <div key={m.id} className={itemClass} style={{ '--ar': ar } as React.CSSProperties}>
                  <Image
                    src={m.url}
                    alt={m.alt ?? ''}
                    fill
                    sizes={`(min-width: 768px) ${Math.round((ar / total) * 100)}vw, 100vw`}
                    className="object-cover"
                  />
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
