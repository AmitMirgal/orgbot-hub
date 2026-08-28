create schema if not exists private;

revoke all on schema private from public;
grant usage on schema private to postgres, service_role;

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  github_login text not null unique,
  name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.packs (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  slug text not null,
  name text not null,
  description text not null,
  github_url text,
  license text,
  official boolean not null default false,
  topics text[] not null default '{}'::text[],
  runtimes text[] not null default '{}'::text[],
  likes_count integer not null default 0,
  clones_count integer not null default 0,
  readme_md text,
  rule text not null default 'spawn a seat when the job repeats; random stays at the desk',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, slug)
);

create table public.seats (
  id uuid primary key default gen_random_uuid(),
  pack_id uuid not null references public.packs (id) on delete cascade,
  name text not null,
  job text not null,
  repeats_when text,
  is_desk boolean not null default false,
  sort_order integer not null default 0
);

create table public.likes (
  user_id uuid not null references public.profiles (id) on delete cascade,
  pack_id uuid not null references public.packs (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, pack_id)
);

create index packs_owner_id_idx on public.packs (owner_id);
create index packs_official_idx on public.packs (official);
create index packs_clones_count_idx on public.packs (clones_count desc);
create index packs_topics_idx on public.packs using gin (topics);
create index seats_pack_id_idx on public.seats (pack_id);
create index likes_pack_id_idx on public.likes (pack_id);

alter table public.profiles enable row level security;
alter table public.packs enable row level security;
alter table public.seats enable row level security;
alter table public.likes enable row level security;
alter table public.profiles force row level security;
alter table public.packs force row level security;
alter table public.seats force row level security;
alter table public.likes force row level security;

create policy profiles_select on public.profiles
  for select to anon, authenticated
  using (true);

create policy profiles_insert_own on public.profiles
  for insert to authenticated
  with check (id = auth.uid());

create policy profiles_update_own on public.profiles
  for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

create policy packs_select on public.packs
  for select to anon, authenticated
  using (true);

create policy packs_insert_own on public.packs
  for insert to authenticated
  with check (owner_id = auth.uid());

create policy packs_update_own on public.packs
  for update to authenticated
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy packs_delete_own on public.packs
  for delete to authenticated
  using (owner_id = auth.uid());

create policy seats_select on public.seats
  for select to anon, authenticated
  using (true);

create policy seats_insert_own on public.seats
  for insert to authenticated
  with check (
    exists (
      select 1 from public.packs
      where packs.id = seats.pack_id
        and packs.owner_id = auth.uid()
    )
  );

create policy seats_update_own on public.seats
  for update to authenticated
  using (
    exists (
      select 1 from public.packs
      where packs.id = seats.pack_id
        and packs.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.packs
      where packs.id = seats.pack_id
        and packs.owner_id = auth.uid()
    )
  );

create policy seats_delete_own on public.seats
  for delete to authenticated
  using (
    exists (
      select 1 from public.packs
      where packs.id = seats.pack_id
        and packs.owner_id = auth.uid()
    )
  );

create policy likes_select on public.likes
  for select to anon, authenticated
  using (true);

create policy likes_insert_own on public.likes
  for insert to authenticated
  with check (user_id = auth.uid());

create policy likes_delete_own on public.likes
  for delete to authenticated
  using (user_id = auth.uid());

create function private.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  login text;
begin
  login := coalesce(
    new.raw_user_meta_data->>'user_name',
    new.raw_user_meta_data->>'preferred_username',
    new.raw_user_meta_data->>'login',
    split_part(coalesce(new.email, 'user'), '@', 1)
  );

  insert into public.profiles (id, github_login, name, avatar_url)
  values (
    new.id,
    login,
    coalesce(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name',
      login
    ),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do update
    set
      github_login = excluded.github_login,
      name = excluded.name,
      avatar_url = excluded.avatar_url,
      updated_at = now();

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function private.handle_new_user();

create function private.touch_likes_count()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    update public.packs
      set likes_count = likes_count + 1, updated_at = now()
      where id = new.pack_id;
    return new;
  elsif tg_op = 'DELETE' then
    update public.packs
      set likes_count = greatest(likes_count - 1, 0), updated_at = now()
      where id = old.pack_id;
    return old;
  end if;
  return null;
end;
$$;

create trigger likes_count_insert
  after insert on public.likes
  for each row execute function private.touch_likes_count();

create trigger likes_count_delete
  after delete on public.likes
  for each row execute function private.touch_likes_count();

create function public.increment_clones(p_pack_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.packs
    set clones_count = clones_count + 1, updated_at = now()
    where id = p_pack_id;
$$;

revoke all on function public.increment_clones(uuid) from public;
grant execute on function public.increment_clones(uuid) to anon, authenticated;
