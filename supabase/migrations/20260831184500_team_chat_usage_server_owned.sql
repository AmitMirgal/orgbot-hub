-- Quota is enforced in the Next server via Prisma. Auth lives in Supabase Auth.
-- The leftover auth.users FK 503s a mix when the JWT sub is not in this database.
alter table public.team_chat_usage drop constraint if exists team_chat_usage_user_id_fkey;

alter table public.team_chat_usage disable row level security;
alter table public.team_chat_usage no force row level security;

do $$
begin
  revoke all on table public.team_chat_usage from public;
  begin
    revoke all on table public.team_chat_usage from anon, authenticated;
  exception
    when undefined_object then null;
  end;
  begin
    grant select, insert, update, delete on table public.team_chat_usage to service_role;
  exception
    when undefined_object then null;
  end;
end $$;
