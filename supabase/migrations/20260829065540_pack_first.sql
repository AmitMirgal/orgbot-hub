create extension if not exists pg_trgm;

alter table public.profiles
  add column if not exists x_handle text;

alter table public.packs
  add column if not exists featured boolean not null default false;

alter table public.packs
  add column if not exists installs_count integer not null default 0;

alter table public.packs
  add column if not exists routing_rule text not null
    default 'Spawn a seat when the job repeats; random stays at the desk.';

update public.packs
  set installs_count = clones_count
  where installs_count = 0
    and clones_count > 0;

update public.packs
  set routing_rule = rule
  where routing_rule = 'Spawn a seat when the job repeats; random stays at the desk.'
    and rule is not null
    and rule <> '';

alter table public.seats
  add column if not exists grok_template_url text;

create index if not exists packs_featured_idx on public.packs (featured desc);
create index if not exists packs_installs_count_idx on public.packs (installs_count desc);
create index if not exists packs_name_trgm_idx on public.packs using gin (name gin_trgm_ops);
create index if not exists packs_description_trgm_idx on public.packs using gin (description gin_trgm_ops);
create index if not exists seats_name_trgm_idx on public.seats using gin (name gin_trgm_ops);

create or replace function public.increment_installs(p_pack_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.packs
    set installs_count = installs_count + 1,
        clones_count = clones_count + 1,
        updated_at = now()
    where id = p_pack_id;
$$;

create or replace function public.increment_clones(p_pack_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.packs
    set installs_count = installs_count + 1,
        clones_count = clones_count + 1,
        updated_at = now()
    where id = p_pack_id;
$$;

revoke all on function public.increment_installs(uuid) from public;
grant execute on function public.increment_installs(uuid) to anon, authenticated;
revoke all on function public.increment_clones(uuid) from public;
grant execute on function public.increment_clones(uuid) to anon, authenticated;
