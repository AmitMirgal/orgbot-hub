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
) values
(
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
),
(
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000002',
  'authenticated',
  'authenticated',
  'poteto@orgbots.dev',
  extensions.crypt('not-a-login', extensions.gen_salt('bf')),
  now(),
  '{"provider":"github","providers":["github"]}'::jsonb,
  '{"user_name":"poteto","preferred_username":"poteto","full_name":"Lauren Tan"}'::jsonb,
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
) values
(
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
),
(
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000002',
  jsonb_build_object(
    'sub', '00000000-0000-0000-0000-000000000002',
    'email', 'poteto@orgbots.dev',
    'user_name', 'poteto'
  ),
  'github',
  now(),
  now(),
  now()
)
on conflict (provider_id, provider) do nothing;

insert into public.profiles (id, github_login, name, x_handle, avatar_url)
values
  ('00000000-0000-0000-0000-000000000001', 'examples', 'examples', null, null),
  ('00000000-0000-0000-0000-000000000002', 'poteto', 'Lauren Tan', 'poteto', null)
on conflict (id) do update
  set github_login = excluded.github_login,
      name = excluded.name,
      x_handle = excluded.x_handle,
      avatar_url = excluded.avatar_url;

delete from public.likes
where pack_id = '10000000-0000-0000-0000-000000000001';
delete from public.seats
where pack_id = '10000000-0000-0000-0000-000000000001';
delete from public.packs
where id = '10000000-0000-0000-0000-000000000001';

insert into public.packs (
  id, owner_id, slug, name, description, github_url, official, featured,
  topics, likes_count, installs_count, routing_rule, readme_md
) values
(
  '10000000-0000-0000-0000-000000000010',
  '00000000-0000-0000-0000-000000000002',
  'lauren',
  'Lauren',
  'Public Grok Bot templates Lauren Tan (@poteto) has shared. One pack, her roster, official Grok install per seat.',
  null,
  false,
  true,
  array['founder', 'developer'],
  0,
  0,
  'Random and “make me a bot” stay at Dr Eggbot. Use a named seat only when that job is already in this pack.',
  $readme$Third-party templates. Read before you add. Never paste a key. Only bots she published as https://x.ai/bot/… belong here. When she publishes another official link, add a seat. Do not invent unpublished Eng/PM/recruiter bots.$readme$
),
(
  '10000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  'clinic-qa',
  'Clinic QA desk',
  'A triage desk for a clinic-style QA loop. Intake stays named. Random stays at triage. No patient records. No clinic secrets.',
  null,
  false,
  false,
  array['clinic'],
  0,
  0,
  'Spawn a seat when the job repeats; random stays at the desk.',
  $readme$Stencil only. Front desk plus QA-style seats. Do not put PHI here. Do not invent a live https://x.ai/bot/… link until you publish one.$readme$
),
(
  '10000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000001',
  'stencil',
  'Empty stencil',
  'A blank roster. Desk plus one untitled seat you replace when a job repeats.',
  null,
  false,
  false,
  array['founder'],
  0,
  0,
  'Spawn a seat when the job repeats; random stays at the desk.',
  $readme$Start here. The desk is real. The untitled seat is a reminder, not a personality. Add an official https://x.ai/bot/… link before anyone can install.$readme$
)
on conflict (id) do update
  set owner_id = excluded.owner_id,
      slug = excluded.slug,
      name = excluded.name,
      description = excluded.description,
      official = excluded.official,
      featured = excluded.featured,
      topics = excluded.topics,
      routing_rule = excluded.routing_rule,
      readme_md = excluded.readme_md;

delete from public.seats
where pack_id in (
  '10000000-0000-0000-0000-000000000010',
  '10000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000003'
);

insert into public.seats (
  id, pack_id, name, job, repeats_when, is_desk, sort_order, grok_template_url
) values
  (
    '20000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000010',
    'Dr Eggbot',
    'Builds other Grok bots after a short interview. Coding bots get her stack conventions.',
    null,
    true,
    0,
    'https://x.ai/bot/93gOz3op1UQdBdbekQFLK'
  ),
  (
    '20000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000010',
    'point peddler',
    'Credit-card and airline points. One job: how to book.',
    'the same booking question comes back',
    false,
    1,
    'https://x.ai/bot/PFD95widaEeqjkYLLUZmD'
  ),
  (
    '20000000-0000-0000-0000-000000000011',
    '10000000-0000-0000-0000-000000000002',
    'Triage',
    'Sort inbound reports. Keep one-off questions. Hand repeating failure modes to a seat.',
    null,
    true,
    0,
    null
  ),
  (
    '20000000-0000-0000-0000-000000000012',
    '10000000-0000-0000-0000-000000000002',
    'Intake',
    'Capture the report with the same fields every time.',
    'every new ticket needs the same form',
    false,
    1,
    null
  ),
  (
    '20000000-0000-0000-0000-000000000013',
    '10000000-0000-0000-0000-000000000002',
    'QA',
    'Reproduce, grade severity, write the regression note.',
    'the same class of defect returns',
    false,
    2,
    null
  ),
  (
    '20000000-0000-0000-0000-000000000014',
    '10000000-0000-0000-0000-000000000002',
    'Follow-up',
    'Close the loop with the reporter in plain language.',
    'status updates are themselves a job',
    false,
    3,
    null
  ),
  (
    '20000000-0000-0000-0000-000000000021',
    '10000000-0000-0000-0000-000000000003',
    'Front desk',
    'Hold every question until a job has repeated enough to earn a seat.',
    null,
    true,
    0,
    null
  ),
  (
    '20000000-0000-0000-0000-000000000022',
    '10000000-0000-0000-0000-000000000003',
    'Untitled seat',
    'Replace this the moment the same job comes back twice.',
    'you notice you are answering the same thing again',
    false,
    1,
    null
  )
on conflict (id) do update
  set pack_id = excluded.pack_id,
      name = excluded.name,
      job = excluded.job,
      repeats_when = excluded.repeats_when,
      is_desk = excluded.is_desk,
      sort_order = excluded.sort_order,
      grok_template_url = excluded.grok_template_url;
