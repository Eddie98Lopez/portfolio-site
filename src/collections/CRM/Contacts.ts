import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

export const Contacts: CollectionConfig = {
  slug: 'contacts',
  access: {
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    group: 'CRM',
    useAsTitle: 'email',
    defaultColumns: ['firstName', 'lastName', 'email', 'phone', 'role'],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName', // -> column: first_name
          type: 'text',
          required: true,
        },
        {
          name: 'lastName', // -> column: last_name
          type: 'text',
        },
      ],
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      index: true,
      // Not `unique`: the same person can appear for more than one org.
    },
    {
      name: 'phone',
      type: 'text', // text, not number: preserves leading zeros / formatting
    },
    {
      name: 'role',
      type: 'text',
      // One role per contact. If a contact needs a different role per org,
      // you'd need the junction collection back instead.
    },
    // ── Optional reverse view ────────────────────────────────────────────────
    // To show which orgs a contact belongs to, add this back AFTER confirming
    // Organizations has a top-level `contacts` hasMany field and restarting the
    // dev server. It must reference that field by name; it stores nothing.
    //
    // {
    //   name: 'organizations',
    //   type: 'join',
    //   collection: 'organizations',
    //   on: 'contacts',
    // },
  ],
  timestamps: true, // provides createdAt / updatedAt (maps to created_at)
}
