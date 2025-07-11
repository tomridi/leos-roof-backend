import type { CollectionConfig } from 'payload'
import path from 'path'

// Determine the local upload directory based on the environment
const localUploadDir = path.resolve(process.cwd(), 'media') // Use process.cwd() for local development
// This will resolve to <your_project_root>/media

const staticUploadDir = process.env.PAYLOAD_UPLOAD_DIR
  ? process.env.PAYLOAD_UPLOAD_DIR
  : localUploadDir // Fallback to the correctly resolved local path

console.log('Payload CMS Static Upload Directory:', staticUploadDir) // <--- ADD THIS LOG

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: staticUploadDir, // Folder where your uploaded files will be stored
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
