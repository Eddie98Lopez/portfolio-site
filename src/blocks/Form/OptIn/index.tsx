import type { Block } from 'payload'

export const OptIn: Block = {
  slug: 'optIn',
  labels: { singular: 'Opt-In', plural: 'Opt-Ins' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Name',
          defaultValue: 'marketingStatus',
          required: true,
          admin: { readOnly: true, width: '50%' },
          hooks: { beforeValidate: [() => 'marketingStatus'] },
        },
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Yes, send me marketing emails',
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
        {
          name: 'defaultValue',
          type: 'checkbox',
          label: 'Checked by default',
          defaultValue: false,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'required',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
