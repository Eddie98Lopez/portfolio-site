import type { CollectionConfig } from 'payload'

const formatSlug = (val: string): string =>
  val
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    group: 'CRM',
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Auto-generated from the name if left blank.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (typeof value === 'string' && value.length > 0) return formatSlug(value)
            if (typeof data?.name === 'string') return formatSlug(data.name)
            return value
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    // Uncomment once Projects has a `services` relationship (hasMany):
    // {
    //   name: 'projects',
    //   type: 'join',
    //   collection: 'projects',
    //   on: 'services',
    // },
  ],
}
