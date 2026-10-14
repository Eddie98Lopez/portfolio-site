import type { GlobalConfig } from 'payload'

export const PricingSettings: GlobalConfig = {
  slug: 'pricing-settings',
  label: 'Pricing Settings',
  admin: {
    group: 'CRM',
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'floorRate',
          type: 'number',
          required: true,
          defaultValue: 97.5,
          min: 0,
          admin: {
            width: '50%',
            description:
              'Your minimum effective hourly rate. Product floor = est. hours × this + external costs.',
          },
        },
        {
          name: 'targetMultiplier',
          type: 'number',
          required: true,
          defaultValue: 1.3,
          min: 1,
          admin: {
            width: '50%',
            step: 0.05,
            description: 'Target price = floor × this. 1.3 means 30% above floor.',
          },
        },
      ],
    },
    {
      name: 'currency',
      type: 'select',
      defaultValue: 'USD',
      options: ['USD', 'EUR', 'GBP', 'CAD'],
    },
  ],
}
