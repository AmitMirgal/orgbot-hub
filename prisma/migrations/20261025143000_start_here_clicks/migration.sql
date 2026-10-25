-- Category picks are not pack visits. There is no pack id on this table.
CREATE TABLE "start_here_clicks" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "user_id" UUID,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "start_here_clicks_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "start_here_clicks_category_idx" ON "start_here_clicks"("category");

-- Counted in the Next server via Prisma, not PostgREST.
ALTER TABLE "start_here_clicks" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "start_here_clicks" NO FORCE ROW LEVEL SECURITY;

DO $$
BEGIN
  REVOKE ALL ON TABLE "start_here_clicks" FROM public;
  BEGIN
    GRANT SELECT, INSERT ON TABLE "start_here_clicks" TO anon, authenticated, service_role;
  EXCEPTION
    WHEN undefined_object THEN NULL;
  END;
END $$;
