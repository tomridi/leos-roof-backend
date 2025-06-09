// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { migrations } from './migrations'

import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

import { CatServices } from './collections/ServiceCategories'
import { Services } from './collections/Services'
import { Team } from './collections/Team'
import { Locations } from './collections/Locations'
import Galleries from './collections/Galleries'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  collections: [Users, Media, CatServices, Services, Team, Locations, Galleries],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    migrationDir: './src/migrations', // Make sure this is correctly set
    prodMigrations: migrations, // <-- THIS IS KEY FOR PRODUCTION
  }),
  webhooks: {
    // Add a webhook here for your Astro frontend
    // Make sure to add this block if it doesn't exist
    // You can replace process.env.ASTRO_FRONTEND_BUILD_HOOK with your actual URL or another env var
    'afterChange': async ({ req, doc, collection, global }) => {
        if (collection && ['posts', 'pages', 'services'].includes(collection.slug)) { // Adjust slugs for your relevant collections
            try {
                const response = await fetch(process.env.ASTRO_FRONTEND_BUILD_HOOK, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // You can send a body if Render's webhook expects it, though often not needed
                    body: JSON.stringify({ event: 'content_updated', collection: collection.slug, id: doc.id })
                });
                if (response.ok) {
                    console.log(`Render build hook triggered successfully for ${collection.slug} update.`);
                } else {
                    console.error(`Failed to trigger Render build hook for ${collection.slug} update. Status: ${response.status}`);
                    const errorText = await response.text();
                    console.error(`Render build hook error response: ${errorText}`);
                }
            } catch (error) {
                console.error('Error sending Render build hook:', error);
            }
        }
    },
  },
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  cors: [
    'http://localhost:4321', // Allow requests from your Astro frontend
    // You might also add other origins if your frontend runs on different URLs
    // e.g., 'http://127.0.0.1:4321', if Astro sometimes uses that
  ],
})
