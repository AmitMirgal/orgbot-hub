-- Align pack_visits.source with the Prisma VisitSource enum.
do $$
begin
  if not exists (
    select 1
    from pg_type
    where typname = 'visit_source'
      and typnamespace = 'public'::regnamespace
  ) then
    create type public.visit_source as enum (
      'add_to_grok',
      'add_every_bot',
      'desk_mix'
    );
  end if;
end $$;

alter table public.pack_visits
  alter column source type public.visit_source
  using source::public.visit_source;
