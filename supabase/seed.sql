insert into auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) values (
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000001',
  'authenticated',
  'authenticated',
  'examples@orgbots.dev',
  extensions.crypt('not-a-login', extensions.gen_salt('bf')),
  now(),
  '{"provider":"github","providers":["github"]}'::jsonb,
  '{"user_name":"examples","preferred_username":"examples","full_name":"examples"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
)
on conflict (id) do nothing;

insert into auth.identities (
  provider_id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
) values (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  jsonb_build_object(
    'sub', '00000000-0000-0000-0000-000000000001',
    'email', 'examples@orgbots.dev',
    'user_name', 'examples'
  ),
  'github',
  now(),
  now(),
  now()
)
on conflict (provider_id, provider) do nothing;

insert into public.profiles (id, github_login, name)
values (
  '00000000-0000-0000-0000-000000000001',
  'examples',
  'examples'
)
on conflict (id) do update
  set github_login = excluded.github_login,
      name = excluded.name;

insert into public.packs (
  id, owner_id, slug, name, description, github_url, license, official,
  topics, runtimes, likes_count, clones_count, rule, readme_md
) values
(
  '10000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  'founder-desk',
  'Founder desk',
  'A one-person company split into a front desk and named seats.',
  null,
  'MIT',
  true,
  array['founder', 'ops', 'example'],
  array['claude-code', 'cursor'],
  24,
  128,
  'spawn a seat when the job repeats; random stays at the desk',
  $readme$
# Founder desk

A roster for a one-person company. The desk is the default. Seats exist because those jobs kept coming back.

## Routing

Random questions stay at Front Desk. Fundraising, product, hiring, and ops each have a seat. Do not spawn a fifth seat for a one-off.

## Seats

| Seat | Job |
| --- | --- |
| Front Desk | Route inbound. Hold the rest. |
| Fundraising | Raise, update, decline. |
| Product | What ships next. |
| Hiring | Who joins. |
| Ops | What keeps the lights on. |

## Clone

```
npx orgbots add examples/founder-desk
```

Packs are files. There is no hosted runtime here.
$readme$
),
(
  '10000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  'clinic-qa',
  'Clinic QA desk',
  'A triage desk for a clinic-style QA loop. Intake stays named. Random stays at triage.',
  null,
  'MIT',
  false,
  array['health', 'qa', 'example'],
  array['claude-code'],
  11,
  47,
  'spawn a seat when the job repeats; random stays at the desk',
  $readme$
# Clinic QA desk

A roster for a clinic-style quality loop. Triage is the desk. Seats exist for intake, reconstruction, QA, and follow-up because those jobs repeat.

## Routing

A random question stays at Triage. A defect that keeps returning goes to QA. Do not let Follow-up become the whole company.

## Clone

```
npx orgbots add examples/clinic-qa
```
$readme$
),
(
  '10000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000001',
  'stencil',
  'Empty stencil',
  'A blank roster. Desk only, plus one seat you are expected to replace.',
  null,
  'MIT',
  false,
  array['starter', 'example'],
  array['cursor'],
  3,
  12,
  'spawn a seat when the job repeats; random stays at the desk',
  $readme$
# Empty stencil

Start here. The desk is real. The seat is a reminder, not a personality.

Delete First seat when you know the repeating job. Do not fill the roster in advance.

```
npx orgbots add examples/stencil
```
$readme$
)
on conflict (id) do nothing;

delete from public.seats
where pack_id in (
  '10000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000003'
);

insert into public.seats (pack_id, name, job, repeats_when, is_desk, sort_order) values
  ('10000000-0000-0000-0000-000000000001', 'Front Desk', 'Route inbound work. Hold anything that is not already a repeating job.', null, true, 0),
  ('10000000-0000-0000-0000-000000000001', 'Fundraising', 'Investor updates, round narrative, and inbound from funds.', 'the same raise question comes back twice', false, 1),
  ('10000000-0000-0000-0000-000000000001', 'Product', 'Spec the next slice, cut scope, write the changelog.', 'a product decision keeps returning', false, 2),
  ('10000000-0000-0000-0000-000000000001', 'Hiring', 'Scorecards, outreach, and interview loops.', 'hiring is no longer a one-off', false, 3),
  ('10000000-0000-0000-0000-000000000001', 'Ops', 'Billing, vendors, and the calendar nobody owns.', 'the same operational mess repeats', false, 4),
  ('10000000-0000-0000-0000-000000000002', 'Triage', 'Sort inbound reports. Keep one-off questions. Hand repeating failure modes to a seat.', null, true, 0),
  ('10000000-0000-0000-0000-000000000002', 'Intake', 'Capture the report with the same fields every time.', 'every new ticket needs the same form', false, 1),
  ('10000000-0000-0000-0000-000000000002', 'Chart review', 'Reconstruct what happened from the log and the chart.', 'reconstruction is a standing job', false, 2),
  ('10000000-0000-0000-0000-000000000002', 'QA', 'Reproduce, grade severity, write the regression note.', 'the same class of defect returns', false, 3),
  ('10000000-0000-0000-0000-000000000002', 'Follow-up', 'Close the loop with the reporter in plain language.', 'status updates are themselves a job', false, 4),
  ('10000000-0000-0000-0000-000000000003', 'Front Desk', 'Hold every question until a job has repeated enough to earn a seat.', null, true, 0),
  ('10000000-0000-0000-0000-000000000003', 'First seat', 'Replace this the moment the same job comes back twice.', 'you notice you are answering the same thing again', false, 1);
