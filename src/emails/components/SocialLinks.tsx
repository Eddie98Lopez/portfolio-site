import { Img, Link } from 'react-email'
import { assets } from '../assets'
import { brand } from '../brand'
import { Band } from './Band'

export function SocialLinks() {
  return (
    <Band tone="paper" padding="8px 24px">
      {brand.socials.map((social) => (
        <Link
          key={social.name}
          href={social.href}
          style={{ display: 'inline-block', padding: '0 12px' }}
        >
          <Img
            src={assets.social[social.icon]}
            width={28}
            height={28}
            alt={social.name}
            style={{ display: 'block' }}
          />
        </Link>
      ))}
    </Band>
  )
}
