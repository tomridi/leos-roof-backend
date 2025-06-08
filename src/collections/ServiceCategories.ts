import type { CollectionConfig } from 'payload'

export const CatServices: CollectionConfig = {
      slug: 'catservices',
      admin: {
        useAsTitle: 'title',
        group: 'Services',
      },
      access: {
        read: () => true, // Ensure public readability
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'backgroundColor',
          label: 'Background Color',
          type: 'text',
          required: false,
        },
        {
          name: 'backgroundImage',
          label: 'Background Image',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'description',
          type: 'textarea',
          required: false,
        }
      ]
}


