'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/utilities/ui'

type Props = {
  src: string
  initialRatio: number
  className?: string
}

export const GalleryVideo: React.FC<Props> = ({ src, initialRatio, className }) => {
  const ref = useRef<HTMLVideoElement>(null)
  const [ar, setAr] = useState(initialRatio)

  const measure = () => {
    const v = ref.current
    if (v?.videoWidth && v.videoHeight) setAr(v.videoWidth / v.videoHeight)
  }

  // With SSR + autoPlay, metadata can load before React hydrates and attaches
  // onLoadedMetadata, so the event is missed. Check readyState on mount too.
  useEffect(() => {
    if (ref.current && ref.current.readyState >= 1) measure()
  }, [])

  return (
    <div className={className} style={{ '--ar': ar } as React.CSSProperties}>
      <video
        ref={ref}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedMetadata={measure}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  )
}
