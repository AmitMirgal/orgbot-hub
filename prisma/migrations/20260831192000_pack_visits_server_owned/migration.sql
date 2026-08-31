-- Visit totals are counted in the Next server via Prisma, not PostgREST.
ALTER TABLE "pack_visits" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "pack_visits" NO FORCE ROW LEVEL SECURITY;

DO $$
BEGIN
  REVOKE ALL ON TABLE "pack_visits" FROM public;
  BEGIN
    GRANT SELECT, INSERT ON TABLE "pack_visits" TO anon, authenticated, service_role;
  EXCEPTION
    WHEN undefined_object THEN NULL;
  END;
END $$;
