-- No FK to packs: the live catalog may be empty while fallback cards still record clicks.
create table public.pack_visits (
  id text primary key,
  pack_id uuid not null,
  pack_owner text not null,
  pack_slug text not null,
  source text not null,
  seat_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index pack_visits_pack_id_idx on public.pack_visits (pack_id);
create index pack_visits_owner_slug_idx on public.pack_visits (pack_owner, pack_slug);
create index pack_visits_created_at_idx on public.pack_visits (created_at);

alter table public.pack_visits enable row level security;
alter table public.pack_visits force row level security;

create policy pack_visits_select on public.pack_visits
  for select to anon, authenticated
  using (true);

create policy pack_visits_insert on public.pack_visits
  for insert to anon, authenticated
  with check (true);

grant select, insert on public.pack_visits to anon, authenticated;
