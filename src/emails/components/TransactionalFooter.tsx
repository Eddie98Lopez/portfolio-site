import { brand } from '../brand'
import { FooterCompany, FooterDisclaimer, FooterLinks } from './FooterParts'
import { SocialLinks } from './SocialLinks'

/**
 * For one-to-one emails triggered by an action (form confirmations,
 * password resets, receipts). No unsubscribe link: people can't opt out
 * of emails they asked for, and a dead unsubscribe link erodes trust.
 */
export function TransactionalFooter() {
  return (
    <>
      <FooterDisclaimer />
      <SocialLinks />
      <FooterCompany />
      <FooterLinks links={[{ label: 'Privacy policy', href: brand.privacyUrl }]} />
    </>
  )
}
