create table public.team_chat_usage (
  user_id uuid not null references auth.users (id) on delete cascade,
  day date not null,
  messages int not null default 0,
  tokens int not null default 0,
  primary key (user_id, day)
);

alter table public.team_chat_usage enable row level security;
alter table public.team_chat_usage force row level security;

create policy team_chat_usage_select_own on public.team_chat_usage
  for select
  to authenticated
  using (user_id = (select auth.uid()));

revoke all on public.team_chat_usage from public, anon;
grant select on public.team_chat_usage to authenticated;

create or replace function public.team_chat_quota()
returns jsonb
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
declare
  uid uuid := auth.uid();
  today date := (timezone('utc', now()))::date;
  used_messages int := 0;
  used_tokens int := 0;
  reset_at timestamptz := ((timezone('utc', now()))::date + 1)::timestamp at time zone 'utc';
begin
  if uid is null then
    return jsonb_build_object(
      'allowed', false,
      'messages', 0,
      'tokens', 0,
      'limit_messages', 20,
      'limit_tokens', 50000,
      'remaining_messages', 0,
      'remaining_tokens', 0,
      'reset_at', reset_at
    );
  end if;

  select coalesce(u.messages, 0), coalesce(u.tokens, 0)
    into used_messages, used_tokens
  from public.team_chat_usage u
  where u.user_id = uid and u.day = today;

  return jsonb_build_object(
    'allowed', used_messages < 20 and used_tokens < 50000,
    'messages', used_messages,
    'tokens', used_tokens,
    'limit_messages', 20,
    'limit_tokens', 50000,
    'remaining_messages', greatest(20 - used_messages, 0),
    'remaining_tokens', greatest(50000 - used_tokens, 0),
    'reset_at', reset_at
  );
end;
$$;

create or replace function public.consume_team_chat_turn(p_tokens int)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  uid uuid := auth.uid();
  today date := (timezone('utc', now()))::date;
  add_tokens int := greatest(coalesce(p_tokens, 0), 0);
  used_messages int;
  used_tokens int;
  reset_at timestamptz := ((timezone('utc', now()))::date + 1)::timestamp at time zone 'utc';
begin
  if uid is null then
    return jsonb_build_object(
      'allowed', false,
      'messages', 0,
      'tokens', 0,
      'limit_messages', 20,
      'limit_tokens', 50000,
      'remaining_messages', 0,
      'remaining_tokens', 0,
      'reset_at', reset_at
    );
  end if;

  insert into public.team_chat_usage (user_id, day)
  values (uid, today)
  on conflict (user_id, day) do nothing;

  select u.messages, u.tokens
    into used_messages, used_tokens
  from public.team_chat_usage u
  where u.user_id = uid and u.day = today
  for update;

  if used_messages >= 20 or used_tokens + add_tokens > 50000 then
    return jsonb_build_object(
      'allowed', false,
      'messages', used_messages,
      'tokens', used_tokens,
      'limit_messages', 20,
      'limit_tokens', 50000,
      'remaining_messages', greatest(20 - used_messages, 0),
      'remaining_tokens', greatest(50000 - used_tokens, 0),
      'reset_at', reset_at
    );
  end if;

  update public.team_chat_usage
  set messages = used_messages + 1,
      tokens = used_tokens + add_tokens
  where user_id = uid and day = today
  returning messages, tokens into used_messages, used_tokens;

  return jsonb_build_object(
    'allowed', true,
    'messages', used_messages,
    'tokens', used_tokens,
    'limit_messages', 20,
    'limit_tokens', 50000,
    'remaining_messages', greatest(20 - used_messages, 0),
    'remaining_tokens', greatest(50000 - used_tokens, 0),
    'reset_at', reset_at
  );
end;
$$;

create or replace function public.refund_team_chat_turn(p_tokens int)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  uid uuid := auth.uid();
  today date := (timezone('utc', now()))::date;
  refund_tokens int := greatest(coalesce(p_tokens, 0), 0);
  used_messages int;
  used_tokens int;
  reset_at timestamptz := ((timezone('utc', now()))::date + 1)::timestamp at time zone 'utc';
begin
  if uid is null then
    return public.team_chat_quota();
  end if;

  update public.team_chat_usage
  set messages = greatest(messages - 1, 0),
      tokens = greatest(tokens - refund_tokens, 0)
  where user_id = uid and day = today
  returning messages, tokens into used_messages, used_tokens;

  if not found then
    return public.team_chat_quota();
  end if;

  return jsonb_build_object(
    'allowed', used_messages < 20 and used_tokens < 50000,
    'messages', used_messages,
    'tokens', used_tokens,
    'limit_messages', 20,
    'limit_tokens', 50000,
    'remaining_messages', greatest(20 - used_messages, 0),
    'remaining_tokens', greatest(50000 - used_tokens, 0),
    'reset_at', reset_at
  );
end;
$$;

revoke all on function public.team_chat_quota() from public, anon;
revoke all on function public.consume_team_chat_turn(int) from public, anon;
revoke all on function public.refund_team_chat_turn(int) from public, anon;
grant execute on function public.team_chat_quota() to authenticated, service_role;
grant execute on function public.consume_team_chat_turn(int) to authenticated, service_role;
grant execute on function public.refund_team_chat_turn(int) to authenticated, service_role;
