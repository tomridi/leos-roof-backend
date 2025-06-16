import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services" ADD COLUMN "order" numeric DEFAULT 1;
  ALTER TABLE "team" ADD COLUMN "order" numeric DEFAULT 1;
  ALTER TABLE "locations" ADD COLUMN "order" numeric DEFAULT 1;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services" DROP COLUMN IF EXISTS "order";
  ALTER TABLE "team" DROP COLUMN IF EXISTS "order";
  ALTER TABLE "locations" DROP COLUMN IF EXISTS "order";`)
}
