import type { CollectionConfig, FieldAccess, FieldHook, PayloadRequest } from 'payload'

// Internal fields (hours, costs, floor, notes) are visible to logged-in admins only
const isAuthenticated: FieldAccess = ({ req: { user } }) => Boolean(user)

const formatSlug = (val: string): string =>
  val
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')

// ---- Pricing helpers ----

type Pricing = { floorRate: number; targetMultiplier: number }

// Fetch Pricing Settings once per request instead of once per product
const getPricing = async (req: PayloadRequest): Promise<Pricing> => {
  if (!req.context.pricing) {
    const settings = await req.payload.findGlobal({
      slug: 'pricing-settings',
      depth: 0,
      req,
    })
    req.context.pricing = {
      floorRate: Number(settings?.floorRate) || 0,
      targetMultiplier: Number(settings?.targetMultiplier) || 1,
    }
  }
  return req.context.pricing as Pricing
}

// Floor = your hours at your minimum rate + anything you pay out (e.g. outsourced designer)
const floorFrom = (data: Record<string, unknown> | undefined, pricing: Pricing): number => {
  const hours = Number(data?.estHours) || 0
  const external = Number(data?.externalCost) || 0
  return Math.round(hours * pricing.floorRate + external)
}

const computeFloor: FieldHook = async ({ siblingData, req }) =>
  floorFrom(siblingData, await getPricing(req))

const computeTarget: FieldHook = async ({ siblingData, req }) => {
  const pricing = await getPricing(req)
  return Math.round(floorFrom(siblingData, pricing) * pricing.targetMultiplier)
}

// ---- Collection ----

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    group: 'CRM',
    useAsTitle: 'name',
    defaultColumns: ['name', 'service', 'type', 'estHours', 'floorPrice', 'active'],
    listSearchableFields: ['name', 'slug'],
  },
  defaultSort: 'sortOrder',
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    // ---- Sidebar ----
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
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'core',
      options: [
        { label: 'Core', value: 'core' },
        { label: 'Add-on', value: 'addon' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Uncheck to retire without deleting.',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },

    // ---- Main ----
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          description: 'Client-facing. This is what shows up in proposals.',
          fields: [
            {
              name: 'summary',
              type: 'textarea',
              admin: { description: 'One or two sentences. What it is and why it matters.' },
            },
            {
              name: 'scope',
              type: 'textarea',
              admin: { description: "What's involved: activities, sessions, revision rounds." },
            },
          ],
        },
        {
          label: 'Scope',
          fields: [
            {
              name: 'deliverables',
              type: 'array',
              labels: { singular: 'Deliverable', plural: 'Deliverables' },
              admin: { description: 'What the client walks away with.' },
              fields: [{ name: 'item', type: 'text', required: true }],
            },
            {
              name: 'exclusions',
              type: 'array',
              labels: { singular: 'Exclusion', plural: 'Exclusions' },
              admin: { description: 'What this explicitly does NOT include.' },
              fields: [{ name: 'item', type: 'text', required: true }],
            },
            {
              name: 'availableWith',
              type: 'relationship',
              relationTo: 'products',
              hasMany: true,
              filterOptions: { type: { equals: 'core' } },
              admin: {
                condition: (data) => data?.type === 'addon',
                description:
                  'Core products this add-on attaches to. Leave empty if it works with anything.',
              },
            },
          ],
        },
        {
          label: 'Pricing',
          description: 'Internal. Floor and target are calculated from Pricing Settings.',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'estHours',
                  label: 'Est. hours',
                  type: 'number',
                  min: 0,
                  access: { read: isAuthenticated },
                  admin: { width: '50%', step: 0.25 },
                },
                {
                  name: 'externalCost',
                  label: 'External cost ($)',
                  type: 'number',
                  min: 0,
                  defaultValue: 0,
                  access: { read: isAuthenticated },
                  admin: {
                    width: '50%',
                    description: 'Money you pay out: contractors, licenses, stock.',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'unit',
                  type: 'select',
                  defaultValue: 'flat',
                  options: [
                    { label: 'Flat', value: 'flat' },
                    { label: 'Per unit', value: 'each' },
                  ],
                  access: { read: isAuthenticated },
                  admin: { width: '50%' },
                },
                {
                  name: 'unitLabel',
                  type: 'text',
                  access: { read: isAuthenticated },
                  admin: {
                    width: '50%',
                    placeholder: 'interview, page, photo…',
                    condition: (_, siblingData) => siblingData?.unit === 'each',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'floorPrice',
                  label: 'Floor ($)',
                  type: 'number',
                  virtual: true,
                  access: { read: isAuthenticated },
                  admin: {
                    width: '50%',
                    readOnly: true,
                    description: 'Hours × floor rate + external cost. Never quote below this.',
                  },
                  hooks: { afterRead: [computeFloor] },
                },
                {
                  name: 'targetPrice',
                  label: 'Target ($)',
                  type: 'number',
                  virtual: true,
                  access: { read: isAuthenticated },
                  admin: {
                    width: '50%',
                    readOnly: true,
                    description: 'Floor × target multiplier. A baseline, not the quote.',
                  },
                  hooks: { afterRead: [computeTarget] },
                },
              ],
            },
          ],
        },
        {
          label: 'Internal',
          fields: [
            {
              name: 'operationalNotes',
              type: 'textarea',
              access: { read: isAuthenticated },
              admin: {
                description: 'Private: outsourcing options, gotchas, how you actually run it.',
              },
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
}
