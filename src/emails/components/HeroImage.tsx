import { Img } from 'react-email'
import { Band } from './Band'

type HeroImageProps = {
  src: string
  alt: string
  width?: number
  height?: number
}

export function HeroImage({ src, alt, width = 300, height = 216 }: HeroImageProps) {
  return (
    <Band padding="16px 0 32px" mobilePadding={false}>
      <Img
        src={src}
        width={width}
        height={height}
        alt={alt}
        style={{ display: 'block', margin: '0 auto', maxWidth: '100%', height: 'auto' }}
      />
    </Band>
  )
}
