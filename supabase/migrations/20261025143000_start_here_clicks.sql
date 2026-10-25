-- Category picks are not pack visits. There is no pack id on this table.
create table if not exists public.start_here_clicks (
  id text primary key,
  category text not null,
  user_id uuid,
  created_at timestamptz not null default now()
);

create index if not exists start_here_clicks_category_idx
  on public.start_here_clicks (category);

-- Counted in the Next server via Prisma, not PostgREST.
alter table public.start_here_clicks disable row level security;
alter table public.start_here_clicks no force row level security;

do $$
begin
  revoke all on table public.start_here_clicks from public;
  begin
    grant select, insert on table public.start_here_clicks to anon, authenticated, service_role;
  exception
    when undefined_object then null;
  end;
end $$;
