import React from 'react'
import Image from 'next/image'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import type { ResolvedGalleryItem } from './Component'

// No 'use client' needed here: shadcn's carousel file is already a client
// component, so this wrapper can stay on the server and still pass children through.
export const GalleryCarousel: React.FC<{ items: ResolvedGalleryItem[] }> = ({ items }) => {
  const showControls = items.length > 1

  return (
    <Carousel opts={{ align: 'start' }} aria-label="Image gallery" className="relative">
      <CarouselContent>
        {items.map(({ id, media, caption }, i) => (
          <CarouselItem key={id} className="basis-[85%] sm:basis-[60%] lg:basis-[45%]">
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                <Image
                  src={media.url}
                  alt={media.alt ?? ''}
                  fill
                  sizes="(min-width: 1024px) 45vw, (min-width: 640px) 60vw, 85vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
              {caption && (
                <figcaption className="mt-2 text-sm text-muted-foreground">{caption}</figcaption>
              )}
            </figure>
          </CarouselItem>
        ))}
      </CarouselContent>

      {showControls && (
        <>
          {/* Default shadcn positions (-left-12 / -right-12) fall off-screen on mobile,
              so keep the buttons inside the images instead. */}
          <CarouselPrevious className="left-3 bg-background/80 backdrop-blur disabled:opacity-0" />
          <CarouselNext className="right-3 bg-background/80 backdrop-blur disabled:opacity-0" />
        </>
      )}
    </Carousel>
  )
}
