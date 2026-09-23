import type { Block } from 'payload'

export const FirstName: Block = {
  slug: 'firstName',
  labels: { singular: 'First Name', plural: 'First Name Fields' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          defaultValue: 'firstName',
          required: true,
          admin: { readOnly: true, width: '50%' },
          hooks: { beforeValidate: [() => 'firstName'] },
        },
        {
          name: 'label',
          type: 'text',
          defaultValue: 'First Name',
          localized: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'width',
          type: 'number',
          label: 'Field Width (percentage)',
          admin: { width: '50%' },
        },
        { name: 'defaultValue', type: 'text', localized: true, admin: { width: '50%' } },
      ],
    },
    {
      name: 'required',
      type: 'checkbox',
      required: true,
      admin: { readOnly: true },
      defaultValue: true,
    },
  ],
}
