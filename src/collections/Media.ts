import type { CollectionConfig } from 'payload'
import path from 'path'

const staticUploadDir = process.env.PAYLOAD_UPLOAD_DIR
  ? process.env.PAYLOAD_UPLOAD_DIR
  : path.resolve(__dirname, 'media') // Default to a relative path locally

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'media', // Folder where your uploaded files will be stored
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'center',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'center',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined, // undefined will maintain aspect ratio
        position: 'center',
      },
      {
        name: 'large',
        width: 1400,
        height: undefined, // undefined will maintain aspect ratio
      },
    ],
    adminThumbnail: 'thumbnail', // Which image size to use for the admin panel thumbnail
    mimeTypes: ['image/*'], // Restrict uploads to image files
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
