import { Button } from 'react-email'
import type { ReactNode } from 'react'
import { colors, fonts } from '../theme'

type BrandButtonProps = {
  href: string
  children: ReactNode
}

// React Email's Button includes the Outlook hacks that make padding render.
export function BrandButton({ href, children }: BrandButtonProps) {
  return (
    <Button
      href={href}
      className="button-mobile"
      style={{
        display: 'inline-block',
        backgroundColor: colors.buttonSurface,
        color: colors.buttonText,
        fontFamily: fonts.button,
        fontSize: '24px',
        fontWeight: 700,
        lineHeight: '24px',
        letterSpacing: '2px',
        textAlign: 'center',
        textDecoration: 'none',
        borderRadius: '4px',
        padding: '22px 32px',
      }}
    >
      {children}
    </Button>
  )
}

/** Vertical gap between stacked buttons */
export function ButtonSpacer({ size = 16 }: { size?: number }) {
  return (
    <div style={{ height: size, lineHeight: `${size}px`, fontSize: 0 }}>&nbsp;</div>
  )
}
