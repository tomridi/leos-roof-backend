import type { CollectionConfig } from 'payload'
import { rebuildAfterChange, rebuildAfterDelete } from '../hooks/globalRebuildHook'

export const Locations: CollectionConfig = {
  slug: 'locations',
  admin: {
    useAsTitle: 'title',
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
      name: 'thumbnail',
      label: 'Thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'This image will be used as the thumbnail for the location page.',
      },
    },
    {
      name: 'introMain',
      label: 'Intro Higlighted',
      type: 'text',
      required: false,
    },
    {
      name: 'intro',
      label: 'Intro',
      type: 'richText',
      required: false,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'do',
      label: 'Does',
      type: 'richText',
      required: true,
    },
    {
      name: 'dont',
      label: 'Donts',
      type: 'richText',
      required: true,
    },
    {
      name: 'coverImage',
      label: 'Cover Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'order',
      label: 'Display Order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Enter a number to control the display order. Lower numbers appear first.',
      },
      defaultValue: 1,
    },
    {
      name: 'gallery', // This will be the name of your gallery field
      type: 'array',
      label: 'Image Gallery',
      minRows: 0, // Allow empty galleries
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
      fields: [
        {
          name: 'image', // This will hold the reference to an uploaded image
          type: 'upload',
          relationTo: 'media', // Crucial: links to your Media collection
          required: true,
          // You can add filterOptions here if you want to only show specific media files
          // filterOptions: {
          //   mimeType: { contains: 'image' },
          // },
        },
        {
          name: 'caption', // Optional: A caption for each individual image in the gallery
          type: 'text',
          localized: true, // If you want captions to be translatable
        },
        // You can add more fields per image, e.g., 'link', 'credit', etc.
      ],
    },
  ],
}
