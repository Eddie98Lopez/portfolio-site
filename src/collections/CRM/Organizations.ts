import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

export const Organizations: CollectionConfig = {
  slug: 'organizations',
  access: {
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    group: 'CRM',
    useAsTitle: 'orgName',
    defaultColumns: ['orgName', 'city', 'state', 'primaryContact'],
  },
  fields: [
    {
      name: 'orgName', // -> column: org_name
      type: 'text',
      required: true,
      label: 'Organization Name',
    },
    // Kept flat (not grouped) so the columns line up 1:1 with the CSV.
    {
      name: 'streetAddress', // -> column: street_address
      type: 'text',
    },
    {
      type: 'row',
      fields: [
        { name: 'city', type: 'text' },
        { name: 'state', type: 'text' },
        { name: 'postalCode', type: 'text' }, // -> column: postal_code
      ],
    },
    {
      name: 'primaryContact', // -> column: primary_contact_id
      type: 'relationship',
      relationTo: 'contacts',
      admin: {
        position: 'sidebar',
        description: 'The main point of contact for this organization.',
      },
    },
    // Every contact linked to this org. This is a REAL relationship (not a
    // join): hasMany creates its own link storage (an organizations_rels
    // table) automatically. No junction collection involved.
    {
      name: 'contacts',
      type: 'relationship',
      relationTo: 'contacts',
      hasMany: true,
    },
  ],
  timestamps: true, // provides createdAt / updatedAt (maps to created_at)
}
