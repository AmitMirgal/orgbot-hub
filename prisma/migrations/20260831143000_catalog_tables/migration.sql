-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL,
    "github_login" TEXT NOT NULL,
    "name" TEXT,
    "avatar_url" TEXT,
    "x_handle" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "packs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "owner_id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "github_url" TEXT,
    "official" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "topics" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "likes_count" INTEGER NOT NULL DEFAULT 0,
    "installs_count" INTEGER NOT NULL DEFAULT 0,
    "readme_md" TEXT,
    "routing_rule" TEXT NOT NULL DEFAULT 'Spawn a seat when the job repeats; random stays at the desk.',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "packs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seats" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "pack_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "job" TEXT NOT NULL,
    "repeats_when" TEXT,
    "is_desk" BOOLEAN NOT NULL DEFAULT false,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "grok_template_url" TEXT,

    CONSTRAINT "seats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "user_id" UUID NOT NULL,
    "pack_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("user_id","pack_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_github_login_key" ON "profiles"("github_login");

-- CreateIndex
CREATE UNIQUE INDEX "packs_owner_id_slug_key" ON "packs"("owner_id", "slug");

-- CreateIndex
CREATE INDEX "packs_owner_id_idx" ON "packs"("owner_id");

-- CreateIndex
CREATE INDEX "packs_official_idx" ON "packs"("official");

-- CreateIndex
CREATE INDEX "packs_featured_idx" ON "packs"("featured" DESC);

-- CreateIndex
CREATE INDEX "packs_installs_count_idx" ON "packs"("installs_count" DESC);

-- CreateIndex
CREATE INDEX "seats_pack_id_idx" ON "seats"("pack_id");

-- CreateIndex
CREATE INDEX "likes_pack_id_idx" ON "likes"("pack_id");

-- AddForeignKey
ALTER TABLE "packs" ADD CONSTRAINT "packs_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seats" ADD CONSTRAINT "seats_pack_id_fkey" FOREIGN KEY ("pack_id") REFERENCES "packs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_pack_id_fkey" FOREIGN KEY ("pack_id") REFERENCES "packs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
