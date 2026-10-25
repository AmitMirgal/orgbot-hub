-- AlterEnum
ALTER TYPE "visit_source" ADD VALUE IF NOT EXISTS 'start_here';

-- AlterTable
ALTER TABLE "pack_visits" ADD COLUMN IF NOT EXISTS "persona" TEXT;
