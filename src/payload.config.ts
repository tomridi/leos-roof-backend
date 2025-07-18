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
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  cors: [
    process.env.FRONTEND_URL, // This is `string | undefined`
    'http://localhost:3000',
    'http://localhost:4321',
  ].filter((url): url is string => typeof url === 'string' && url.length > 0),

  csrf: [
    process.env.FRONTEND_URL, // This is `string | undefined`
    'http://localhost:3000',
    'http://localhost:4321',
    process.env.PAYLOAD_PUBLIC_SERVER_URL,
  ].filter((url): url is string => typeof url === 'string' && url.length > 0),
})
