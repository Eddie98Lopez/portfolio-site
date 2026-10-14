import { colors, fonts } from '../theme'
import { Band, BrandHeader, EmailLayout, TransactionalFooter } from '../components'

type BrandedMessageProps = {
  /** HTML from the form's Message field in the admin UI */
  message?: string
}

const PREVIEW_MESSAGE =
  '<p>Hi Alex,</p><p>This is what a message written in the Payload admin looks like inside the brand design.</p><p>Talk soon,<br/>Eddie</p>'

const toPreviewText = (html: string) =>
  html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 110)

export default function BrandedMessage({ message = PREVIEW_MESSAGE }: BrandedMessageProps) {
  return (
    <EmailLayout preview={toPreviewText(message)}>
      <BrandHeader />
      <Band padding="16px 80px 72px">
        <div
          className="body-mobile rich-text"
          style={{
            fontFamily: fonts.body,
            fontSize: '18px',
            lineHeight: '28px',
            textAlign: 'center',
            color: colors.onInk,
          }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </Band>
      <TransactionalFooter />
    </EmailLayout>
  )
}
