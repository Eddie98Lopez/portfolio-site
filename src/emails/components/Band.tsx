import { Column, Row, Section } from 'react-email'
import type { ReactNode } from 'react'
import { colors } from '../theme'

type BandProps = {
  children: ReactNode
  /** CSS padding shorthand, e.g. '32px 80px' */
  padding: string
  tone?: 'ink' | 'paper'
  /** Shrink side padding to 24px on phones */
  mobilePadding?: boolean
}

/**
 * A full-width horizontal strip of the email. Every section in the design
 * is one of these, stacked. Padding sits on the <td> (via Column) because
 * Outlook ignores padding on <table>.
 */
export function Band({ children, padding, tone = 'ink', mobilePadding = true }: BandProps) {
  return (
    <Section style={{ backgroundColor: tone === 'ink' ? colors.ink : colors.paper }}>
      <Row>
        <Column
          align="center"
          className={mobilePadding ? 'px-mobile' : undefined}
          style={{ padding }}
        >
          {children}
        </Column>
      </Row>
    </Section>
  )
}
