import type { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { createElement } from 'react'
import { render } from 'react-email'
import { SERVER_URL } from './assets'
import { formEmailTemplates, type FormTemplateKey } from './registry'

// Pull the hook type straight from the plugin so it always matches your installed version.
type BeforeEmail = NonNullable<Parameters<typeof formBuilderPlugin>[0]['beforeEmail']>

if (process.env.NODE_ENV === 'production' && SERVER_URL.includes('localhost')) {
  console.warn(
    '[emails] NEXT_PUBLIC_SERVER_URL points at localhost: images and fonts in sent emails will be broken.',
  )
}

type EmailEntry = { template?: string | null }

/**
 * Pass to formBuilderPlugin({ beforeEmail }).
 * Looks up the template picked for each email in the form's admin settings and
 * renders it. To / subject / from still come from those settings as before.
 */
export const beforeFormEmail: BeforeEmail = async (emails, { data, req }) => {
  const formRef = data?.form
  const formId = typeof formRef === 'object' && formRef !== null ? formRef.id : formRef
  if (formId == null) return emails

  const form = await req.payload.findByID({ collection: 'forms', id: formId, depth: 0, req })
  const entries = (form.emails ?? []) as EmailEntry[]

  // The plugin builds one outgoing email per entry in form.emails, in the same order.
  return Promise.all(
    emails.map(async (email, index) => {
      const key = (entries[index]?.template ?? 'none') as FormTemplateKey
      const Template = formEmailTemplates[key]?.component
      if (!Template) return email

      const element = createElement(Template, { message: email.html })
      const html = await render(element)
      const text = await render(element, { plainText: true })

      return { ...email, html, text }
    }),
  )
}
