import type { CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Banner } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { Gallery } from '../../blocks/Gallery/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { slugField } from 'payload' // match whatever import your Posts file uses

/**
 * Single source of truth for tech tags. Exported so your frontend can map a
 * value -> icon/label without duplicating the list. Using a `select` (rather
 * than free text) keeps values consistent ("Next.js" never drifts to "nextjs")
 * and makes filtering/faceting trivial. If you'd rather let editors type any
 * tech freely, swap the `technologies` field to `type: 'text', hasMany: true`.
 */
export const TECHNOLOGY_OPTIONS = [
  { label: 'Wix / Velo', value: 'wix-velo' },
  { label: 'Next.js', value: 'nextjs' },
  { label: 'React', value: 'react' },
  { label: 'Tailwind CSS', value: 'tailwind' },
  { label: 'shadcn/ui', value: 'shadcn' },
  { label: 'Supabase', value: 'supabase' },
  { label: 'Stripe.js', value: 'stripe' },
  { label: 'Payload', value: 'payload' },
  { label: 'Figma', value: 'figma' },
]

export const Projects: CollectionConfig<'projects'> = {
  slug: 'projects',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // Fields hydrated whenever a project is referenced elsewhere (e.g. related
  // projects, or a listing grid). Keep it lean — this runs on every populate.
  defaultPopulate: {
    title: true,
    slug: true,
    shortDescription: true,
    technologies: true,
    heroImage: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'client', 'year', 'featured', 'updatedAt'],
    group: 'Content',
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'projects',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'projects',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        // ---------------------------------------------------------------- CONTENT
        {
          label: 'Content',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              // Maps to your CSV `short_description`. Used on cards and as a
              // fallback for the SEO description generator below.
              name: 'shortDescription',
              type: 'textarea',
              admin: {
                description: 'One or two sentences for project cards / listing previews.',
              },
            },
            {
              // Maps to your CSV `description`. Note: CSV values are plain text;
              // Lexical stores structured JSON, so an import must convert text
              // -> Lexical nodes (see chat reply).
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    BlocksFeature({ blocks: [Banner, Code, MediaBlock, Gallery] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: false,
              required: true,
            },
          ],
        },
        // ------------------------------------------------------------------- META
        {
          label: 'Meta',
          fields: [
            {
              name: 'relatedProjects',
              type: 'relationship',
              hasMany: true,
              relationTo: 'projects',
              filterOptions: ({ id }) => {
                // Don't let a project relate to itself.
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
            },
            {
              // The client is an Organization (see Organizations collection).
              name: 'client',
              type: 'relationship',
              relationTo: 'organizations',
              hasMany: false,
            },
            {
              // Optional specific person at the client org. Filtered so the
              // dropdown only shows contacts belonging to the selected client.
              name: 'clientContact',
              type: 'relationship',
              relationTo: 'contacts',
              hasMany: false,
              admin: {
                description: 'Optional. Limited to contacts at the selected client.',
              },
              filterOptions: ({ data }) => {
                if (data?.client) {
                  return { organization: { equals: data.client } }
                }
                return true
              },
            },
            {
              name: 'technologies',
              type: 'select',
              hasMany: true,
              options: TECHNOLOGY_OPTIONS,
            },
            {
              // Associated links: live demo, repo(s), design file, etc.
              // A project can have zero, one, or many. `type` drives the icon
              // and default label on the frontend; `label` overrides it.
              name: 'links',
              type: 'array',
              labels: { singular: 'Link', plural: 'Links' },
              admin: {
                description: 'Live demo, GitHub, Figma, etc. Drag to reorder.',
              },
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  required: true,
                  defaultValue: 'live',
                  options: [
                    { label: 'Live demo', value: 'live' },
                    { label: 'GitHub', value: 'github' },
                    { label: 'Figma', value: 'figma' },
                    { label: 'Case study', value: 'caseStudy' },
                    { label: 'Other', value: 'other' },
                  ],
                  admin: { width: '30%' },
                },
                {
                  name: 'label',
                  type: 'text',
                  admin: {
                    width: '30%',
                    description: 'Optional. e.g. "Frontend repo". Falls back to the type.',
                  },
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                  admin: { width: '40%' },
                  validate: (value: string | null | undefined) => {
                    if (!value) return 'A URL is required'
                    try {
                      new URL(value)
                      return true
                    } catch {
                      return 'Enter a full URL, including https://'
                    }
                  },
                },
              ],
            },
            // ------- SERVICES (stubbed until the Services collection exists) -------
            // Once you build `services`, uncomment:
            {
              name: 'services',
              type: 'relationship',
              relationTo: 'services',
              hasMany: true,
            },
          ],
        },
        // -------------------------------------------------------------------- SEO
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),

            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    // ------------------------------------------------------------------- SIDEBAR
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      // Maps to your CSV `year`.
      name: 'year',
      type: 'number',
      min: 2000,
      max: 2100,
      admin: {
        position: 'sidebar',
        step: 1,
        description: 'Year the project shipped.',
      },
    },
    {
      // Maps to your CSV `wip`. IMPORTANT: this is the real-world status of the
      // *project*, not the CMS draft/published state. A project can be fully
      // published on your site while still flagged WIP (e.g. Esti-Calc).
      name: 'wip',
      type: 'checkbox',
      label: 'Work in progress',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description:
          'The project itself is still being built. Different from draft/published below.',
      },
    },
    {
      // Maps to your CSV `featured`.
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Surface on the homepage / featured lists.',
      },
    },
    slugField(),
  ],
  hooks: {
    // Mirror your Posts revalidate hooks here once project routes exist:
    // afterChange: [revalidateProject],
    // afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
