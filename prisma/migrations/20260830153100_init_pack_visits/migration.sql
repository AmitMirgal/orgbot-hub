-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "visit_source" AS ENUM ('add_to_grok', 'add_every_bot', 'desk_mix');

-- CreateTable
CREATE TABLE "pack_visits" (
    "id" TEXT NOT NULL,
    "pack_id" UUID NOT NULL,
    "pack_owner" TEXT NOT NULL,
    "pack_slug" TEXT NOT NULL,
    "source" "visit_source" NOT NULL,
    "seat_name" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "pack_visits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "pack_visits_pack_id_idx" ON "pack_visits"("pack_id");

-- CreateIndex
CREATE INDEX "pack_visits_owner_slug_idx" ON "pack_visits"("pack_owner", "pack_slug");

-- CreateIndex
CREATE INDEX "pack_visits_created_at_idx" ON "pack_visits"("created_at");
