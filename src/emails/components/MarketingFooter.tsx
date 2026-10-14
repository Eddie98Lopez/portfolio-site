import { brand } from '../brand'
import { FooterCompany, FooterDisclaimer, FooterLinks } from './FooterParts'
import { SocialLinks } from './SocialLinks'

type MarketingFooterProps = {
  /** Per-recipient unsubscribe link (required by CAN-SPAM / GDPR) */
  unsubscribeUrl: string
}

/**
 * For newsletters and campaigns. Uses the full postal address and always
 * includes an unsubscribe link, both legal requirements for marketing mail.
 */
export function MarketingFooter({ unsubscribeUrl }: MarketingFooterProps) {
  return (
    <>
      <FooterDisclaimer>
        You're receiving this because you subscribed to updates from {brand.name}.
      </FooterDisclaimer>
      <SocialLinks />
      <FooterCompany address={brand.postalAddress} />
      <FooterLinks
        links={[
          { label: 'Unsubscribe', href: unsubscribeUrl },
          { label: 'Privacy policy', href: brand.privacyUrl },
        ]}
      />
    </>
  )
}
