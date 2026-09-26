// Brand + contact info used across templates. Fill in the TODOs.

export const brand = {
  name: 'Eddie Lopez',
  company: 'Lopezed LLC',
  location: 'Fresno, CA',
  // CAN-SPAM requires a real postal address (a PO box is fine) in MARKETING emails.
  postalAddress: 'TODO: street or PO box, Fresno, CA 937XX',
  phone: '559-360-5316',
  phoneHref: 'tel:+15593605316',
  email: 'eduardo@lopezed.com',
  privacyUrl: 'https://lopezed.com/privacy', // TODO: confirm
  socials: [
    { name: 'Instagram', href: 'https://instagram.com/TODO', icon: 'instagram' },
    { name: 'Facebook', href: 'https://facebook.com/TODO', icon: 'facebook' },
  ],
} as const

export type SocialIcon = (typeof brand.socials)[number]['icon']
