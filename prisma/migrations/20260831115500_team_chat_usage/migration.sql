-- CreateTable
-- Hosted already has this table from the earlier Supabase migration. IF NOT EXISTS keeps deploy idempotent.
CREATE TABLE IF NOT EXISTS "team_chat_usage" (
    "user_id" UUID NOT NULL,
    "day" DATE NOT NULL,
    "messages" INTEGER NOT NULL DEFAULT 0,
    "tokens" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "team_chat_usage_pkey" PRIMARY KEY ("user_id","day")
);

DO $$
BEGIN
  ALTER TABLE "team_chat_usage"
    ADD CONSTRAINT "team_chat_usage_user_id_fkey"
    FOREIGN KEY ("user_id") REFERENCES auth.users ("id") ON DELETE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN NULL;
  WHEN undefined_table THEN NULL;
END $$;
