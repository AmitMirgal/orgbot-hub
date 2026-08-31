-- Quota is enforced in the Next server via Prisma. Auth lives in Supabase Auth.
-- The leftover auth.users FK 503s a mix when the JWT sub is not in this database.
ALTER TABLE "team_chat_usage" DROP CONSTRAINT IF EXISTS "team_chat_usage_user_id_fkey";

ALTER TABLE "team_chat_usage" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "team_chat_usage" NO FORCE ROW LEVEL SECURITY;

DO $$
BEGIN
  REVOKE ALL ON TABLE "team_chat_usage" FROM public;
  BEGIN
    REVOKE ALL ON TABLE "team_chat_usage" FROM anon, authenticated;
  EXCEPTION
    WHEN undefined_object THEN NULL;
  END;
  BEGIN
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE "team_chat_usage" TO service_role;
  EXCEPTION
    WHEN undefined_object THEN NULL;
  END;
END $$;
