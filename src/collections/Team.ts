import type { CollectionConfig } from 'payload'

export const Team: CollectionConfig = {
  slug: 'team',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true, // Public read access
  },
  fields: [
    {
      name: 'title',
      label: 'Full Name',
      type: 'text',
      required: true,
    },
    {
      name: 'position',
      label: 'Position',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'image',
      label: 'Picture',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    /*{
      name: 'order',
      label: 'Display Order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Enter a number to control the display order. Lower numbers appear first.',
      },
      defaultValue: 1,
    },*/
  ],
}
