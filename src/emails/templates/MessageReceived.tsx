import { assets } from '../assets'
import { brand } from '../brand'
import {
  Band,
  BodyText,
  BrandButton,
  BrandHeader,
  ButtonSpacer,
  DisplayHeading,
  EmailLayout,
  HeroImage,
  TransactionalFooter,
} from '../components'

export default function MessageReceived() {
  return (
    <EmailLayout preview="Got your message. I'll get back to you within 1–2 business days.">
      <BrandHeader />
      <HeroImage src={assets.envelope} alt="A sealed envelope" />
      <DisplayHeading>Thanks for reaching out!</DisplayHeading>

      <BodyText>
        I've received your message and it's landed safely in my inbox. I'll review the
        details and get back to you as soon as I can. Usually within 1–2 business days.
      </BodyText>
      <BodyText padding="8px 80px 16px">
        In the meantime, if your inquiry is urgent, feel free to reach me directly at:
      </BodyText>

      <Band padding="8px 80px 72px">
        <BrandButton href={brand.phoneHref}>{brand.phone}</BrandButton>
        <ButtonSpacer />
        <BrandButton href={`mailto:${brand.email}`}>{brand.email}</BrandButton>
      </Band>

      <TransactionalFooter />
    </EmailLayout>
  )
}
