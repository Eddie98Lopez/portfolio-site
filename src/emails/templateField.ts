import type { Field } from 'payload'
import { formTemplateOptions } from './registry'

const templateField: Field = {
  name: 'template',
  type: 'select',
  label: 'Email template',
  defaultValue: 'none',
  options: formTemplateOptions,
  admin: {
    description:
      '"Your message" wraps the message below in the brand design. Other branded templates use their own copy and ignore the message.',
  },
}

/**
 * Adds the template dropdown to each entry of the form's "emails" array.
 * Searches nested tabs/rows/collapsibles so it works whatever the plugin's layout.
 */
export function withEmailTemplateField(fields: Field[]): Field[] {
  return fields.map((field) => {
    if (field.type === 'array' && field.name === 'emails') {
      return { ...field, fields: [templateField, ...field.fields] }
    }
    if (field.type === 'tabs') {
      return {
        ...field,
        tabs: field.tabs.map((tab) => ({ ...tab, fields: withEmailTemplateField(tab.fields) })),
      }
    }
    if ('fields' in field && Array.isArray(field.fields)) {
      return { ...field, fields: withEmailTemplateField(field.fields) } as Field
    }
    return field
  })
}
