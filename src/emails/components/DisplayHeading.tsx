import { Heading } from 'react-email'
import type { ReactNode } from 'react'
import { colors, fonts } from '../theme'
import { Band } from './Band'

export function DisplayHeading({ children }: { children: ReactNode }) {
  return (
    <Band padding="16px 40px">
      <Heading
        as="h1"
        className="display-mobile"
        style={{
          margin: 0,
          fontFamily: fonts.display,
          fontSize: '96px',
          fontWeight: 700,
          lineHeight: 0.85, // unitless so it scales with the mobile font-size
          textTransform: 'uppercase',
          textAlign: 'center',
          color: colors.onInk,
        }}
      >
        {children}
      </Heading>
    </Band>
  )
}
