import type { Block } from 'payload'

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
      name: 'height',
      type: 'select',
      defaultValue: 'md',
      admin: {
        description: 'Height of each tile. Images are cropped to fill.',
        condition: (_, siblingData) =>
          siblingData?.layout === 'grid' || siblingData?.layout === 'twoColumn',
      },
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
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
            // Span only applies to grid and two-column layouts.
            condition: (data, siblingData, { blockData }) =>
              blockData?.layout === 'grid' || blockData?.layout === 'twoColumn',
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
