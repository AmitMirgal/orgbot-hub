-- Visit totals are counted in the Next server via Prisma, not PostgREST.
alter table public.pack_visits disable row level security;
alter table public.pack_visits no force row level security;

do $$
begin
  revoke all on table public.pack_visits from public;
  begin
    grant select, insert on table public.pack_visits to anon, authenticated, service_role;
  exception
    when undefined_object then null;
  end;
end $$;
