import { Link, Text } from 'react-email'
import type { ReactNode } from 'react'
import { brand } from '../brand'
import { colors, fonts } from '../theme'
import { Band } from './Band'

const smallText = {
  margin: 0,
  fontFamily: fonts.body,
  fontSize: '10.2px',
  lineHeight: '20px',
  letterSpacing: '0.1px',
  textAlign: 'center' as const,
  color: colors.muted,
}

export const DEFAULT_DISCLAIMER =
  'This message and its contents are intended only for the named recipient and may include confidential information. If you received it in error, please delete it and notify the sender.'

export function FooterDisclaimer({ children = DEFAULT_DISCLAIMER }: { children?: ReactNode }) {
  return (
    <Band tone="paper" padding="64px 72px 16px">
      <Text style={smallText}>{children}</Text>
    </Band>
  )
}

export function FooterCompany({ address }: { address?: string }) {
  return (
    <Band tone="paper" padding="16px 24px 4px">
      <Text style={smallText}>
        {brand.company} | {address ?? brand.location}
        <br />© {new Date().getFullYear()} {brand.company}. All rights reserved.
      </Text>
    </Band>
  )
}

export type FooterLink = { label: string; href: string }

export function FooterLinks({ links }: { links: FooterLink[] }) {
  return (
    <Band tone="paper" padding="8px 24px 64px">
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          style={{
            display: 'inline-block',
            padding: '0 8px',
            fontFamily: fonts.link,
            fontSize: '13px',
            lineHeight: '32px',
            color: colors.muted,
            textDecoration: 'underline',
          }}
        >
          {link.label}
        </Link>
      ))}
    </Band>
  )
}
