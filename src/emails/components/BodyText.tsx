import { Text } from 'react-email'
import type { ReactNode } from 'react'
import { colors, fonts } from '../theme'
import { Band } from './Band'

type BodyTextProps = {
  children: ReactNode
  /** Band padding; defaults to the design's main paragraph spacing */
  padding?: string
}

export function BodyText({ children, padding = '32px 80px' }: BodyTextProps) {
  return (
    <Band padding={padding}>
      <Text
        className="body-mobile"
        style={{
          margin: 0,
          fontFamily: fonts.body,
          fontSize: '18px',
          lineHeight: '28px',
          textAlign: 'center',
          color: colors.onInk,
        }}
      >
        {children}
      </Text>
    </Band>
  )
}
