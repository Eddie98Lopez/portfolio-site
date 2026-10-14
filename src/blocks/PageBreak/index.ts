// src/blocks/Form/PageBreak.ts
import type { Block } from 'payload'

export const PageBreak: Block = {
  slug: 'pageBreak',
  labels: { singular: 'Page / Step', plural: 'Pages / Steps' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Heading shown at the top of this step.' },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: { description: 'Optional intro text for this step.' },
    },
  ],
}
