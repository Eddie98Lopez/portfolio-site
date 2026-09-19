import type { Block } from 'payload'

/**
 * Gallery block
 * -------------
 * The stock `MediaBlock` in the website template holds ONE upload. This block
 * holds many, plus the layout knobs your frontend needs to render a grid.
 *
 * Payload only stores the values below — the actual grid is drawn by your
 * React component that maps this block to markup (see the note in the chat
 * reply for an example that reads `layout` / `columns` / `span`).
 */
export const Gallery: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  labels: {
    singular: 'Gallery',
    plural: 'Galleries',
  },
  fields: [
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Two column', value: 'twoColumn' },
        { label: 'Masonry', value: 'masonry' },
        { label: 'Carousel', value: 'carousel' },
      ],
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      admin: {
        description: 'Columns on desktop. Ignored for two-column and carousel.',
        condition: (_, siblingData) =>
          siblingData?.layout === 'grid' || siblingData?.layout === 'masonry',
      },
      options: [
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Image', plural: 'Images' },
      admin: {
        description: 'Drag to reorder. Order here is the order rendered.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
        {
          // Per-image override so one image can dominate a grid row.
          name: 'span',
          type: 'select',
          defaultValue: '1',
          admin: {
            description: 'How many grid columns this image occupies.',
            width: '50%',
          },
          options: [
            { label: '1 column', value: '1' },
            { label: '2 columns', value: '2' },
            { label: 'Full width', value: 'full' },
          ],
        },
      ],
    },
  ],
}
