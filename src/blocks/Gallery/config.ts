import type { Block } from 'payload'

export const Gallery: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  labels: { singular: 'Gallery', plural: 'Galleries' },
  fields: [
    {
      name: 'rows',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Row', plural: 'Rows' },
      admin: {
        description:
          'Media in a row share one height and keep their original proportions. On narrow screens they wrap onto new lines.',
      },
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          hasMany: true,
          required: true,
          minRows: 1,
          maxRows: 3,
        },
      ],
    },
  ],
}
