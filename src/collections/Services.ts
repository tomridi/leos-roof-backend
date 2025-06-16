import type { CollectionConfig } from 'payload'
import { rebuildAfterChange, rebuildAfterDelete } from '../hooks/globalRebuildHook'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    group: 'Services',
  },
  access: {
    read: () => true, // Ensure public readability
  },
  fields: [
    {
      name: 'serviceCategory',
      label: 'Service Category',
      type: 'relationship',
      relationTo: 'catservices',
      required: true,
      hasMany: false, // Assuming each service belongs to one category
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'svgIconCode',
      label: 'SVG Icon Code',
      type: 'code',
      localized: false,
      required: true,
      admin: {
        language: 'svg',
        description: 'Paste the full SVG code here, e.g., <svg viewBox="0 0 24 24">...</svg>',
      },
    },
    {
      name: 'content01',
      label: 'Content Block #1',
      type: 'richText',
      required: true,
    },
    {
      name: 'coverImage',
      label: 'Cover Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'This image will be used as the cover for the service page.',
      },
    },
    {
      name: 'content02',
      label: 'Content Block #2',
      type: 'richText',
      required: false,
    },
    {
      name: 'callToActionHighlighted',
      label: 'Call to Action Highlighted',
      type: 'text',
      required: false,
    },
    {
      name: 'callToAction',
      label: 'Call to Action',
      type: 'textarea',
      required: false,
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
