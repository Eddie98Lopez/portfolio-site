import { Body, Container, Head, Html, Preview } from 'react-email'
import type { ReactNode } from 'react'
import { assets } from '../assets'
import { colors, layout } from '../theme'

type EmailLayoutProps = {
  /** Grey preview line shown in the inbox list */
  preview: string
  children: ReactNode
}

// Media queries use !important so they beat the inline styles.
// Clients that ignore <style> (some Outlook versions) just get the desktop layout.
const headCss = `
@font-face {
  font-family: 'Mazurquica';
  src: url('${assets.fonts.mazurquicaBold}') format('woff2');
  font-weight: 700;
  font-style: normal;
}
@font-face {
  font-family: 'IBM Plex Mono';
  src: url('${assets.fonts.plexMonoRegular}') format('woff2');
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: 'PT Mono';
  src: url('${assets.fonts.ptMonoBold}') format('woff2');
  font-weight: 700;
  font-style: normal;
}

.rich-text p { margin: 0 0 20px; }
.rich-text p:last-child { margin-bottom: 0; }
.rich-text a { color: ${colors.onInk}; text-decoration: underline; }

@media only screen and (max-width: 600px) {
  .px-mobile { padding-left: 24px !important; padding-right: 24px !important; }
  .display-mobile { font-size: 56px !important; }
  .body-mobile { font-size: 16px !important; line-height: 26px !important; }
  .button-mobile {
    font-size: 18px !important;
    letter-spacing: 1px !important;
    padding: 18px 20px !important;
  }
}
`

export function EmailLayout({ preview, children }: EmailLayoutProps) {
  return (
    <Html lang="en">
      <Head>
        {/* Design already mixes dark + light bands; ask clients not to auto-invert it */}
        <meta name="color-scheme" content="light only" />
        <meta name="supported-color-schemes" content="light only" />
        <style>{headCss}</style>
      </Head>
      <Preview>{preview}</Preview>
      <Body
        style={{
          backgroundColor: colors.canvas,
          margin: 0,
          padding: '0 0 48px',
          WebkitTextSizeAdjust: '100%',
        }}
      >
        <Container style={{ width: '100%', maxWidth: layout.width, margin: '0 auto' }}>
          {children}
        </Container>
      </Body>
    </Html>
  )
}
