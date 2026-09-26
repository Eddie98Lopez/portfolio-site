import { Img } from 'react-email'
import { assets } from '../assets'
import { brand } from '../brand'
import { Band } from './Band'

export function BrandHeader() {
  return (
    <Band padding="48px 24px">
      <Img
        src={assets.logo}
        width={75}
        height={71}
        alt={brand.name}
        style={{ display: 'block', margin: '0 auto' }}
      />
    </Band>
  )
}
