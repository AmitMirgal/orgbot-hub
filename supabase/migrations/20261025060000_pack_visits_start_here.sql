-- Record Start Here Add-in-Grok clicks without showing counts.
-- Idempotent and additive: no rows are rewritten or dropped.

do $$
begin
  if not exists (
    select 1
    from pg_type t
    join pg_namespace n on n.oid = t.typnamespace
    where n.nspname = 'public'
      and t.typname = 'visit_source'
  ) then
    create type public.visit_source as enum (
      'add_to_grok',
      'add_every_bot',
      'desk_mix',
      'start_here'
    );
  end if;
end $$;

alter type public.visit_source add value if not exists 'start_here';

alter table public.pack_visits
  add column if not exists persona text;
