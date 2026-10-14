import type { ComponentType } from 'react'
import BrandedMessage from './templates/BrandedMessage'
import MessageReceived from './templates/MessageReceived'

/** Every template receives the message written in the admin UI (already merged with {{fields}}). */
export type FormTemplateProps = { message: string }

type TemplateEntry = {
  label: string
  /** null = send the admin message as plain, unbranded HTML */
  component: ComponentType<FormTemplateProps> | null
}

// Add a template here and it shows up in the admin dropdown.
export const formEmailTemplates = {
  none: { label: 'None (plain message)', component: null },
  brandedMessage: { label: 'Branded: your message', component: BrandedMessage },
  messageReceived: { label: 'Branded: "Thanks for reaching out"', component: MessageReceived },
} satisfies Record<string, TemplateEntry>

export type FormTemplateKey = keyof typeof formEmailTemplates

export const formTemplateOptions = Object.entries(formEmailTemplates).map(([value, t]) => ({
  label: t.label,
  value,
}))
