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
    // in your Contacts collection's fields array
    {
      name: 'marketingStatus',
      type: 'select',
      required: true,
      defaultValue: 'never_subscribed',
      options: [
        { label: 'Never subscribed', value: 'never_subscribed' },
        { label: 'Pending (awaiting confirmation)', value: 'pending' },
        { label: 'Subscribed', value: 'subscribed' },
        { label: 'Unsubscribed', value: 'unsubscribed' },
        { label: 'Cleaned (bounced)', value: 'cleaned' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'consentedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'When the contact opted in to marketing emails.',
      },
    },
    {
      name: 'consentSource',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Where the opt-in came from, e.g. the form name.',
      },
    },
    {
      name: 'tags',
      type: 'text',
      hasMany: true,
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
