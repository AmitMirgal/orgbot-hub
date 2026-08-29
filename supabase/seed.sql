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
),
(
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000005',
  'authenticated',
  'authenticated',
  'naoufalelh@orgbots.dev',
  extensions.crypt('not-a-login', extensions.gen_salt('bf')),
  now(),
  '{"provider":"github","providers":["github"]}'::jsonb,
  '{"user_name":"naoufalelh","preferred_username":"naoufalelh","full_name":"Naoufal El hassnaoui"}'::jsonb,
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
),
(
  '00000000-0000-0000-0000-000000000005',
  '00000000-0000-0000-0000-000000000005',
  jsonb_build_object(
    'sub', '00000000-0000-0000-0000-000000000005',
    'email', 'naoufalelh@orgbots.dev',
    'user_name', 'naoufalelh'
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
  ('00000000-0000-0000-0000-000000000002', 'poteto', 'Lauren Tan', 'poteto', null),
  (
    '00000000-0000-0000-0000-000000000005',
    'naoufalelh',
    'Naoufal El hassnaoui',
    'naoufal_elh',
    'https://avatars.githubusercontent.com/u/10200999?v=4'
  )
on conflict (id) do update
  set github_login = excluded.github_login,
      name = excluded.name,
      x_handle = excluded.x_handle,
      avatar_url = excluded.avatar_url;

delete from public.likes
where pack_id in (
  '10000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000003'
);
delete from public.seats
where pack_id in (
  '10000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000003',
  '10000000-0000-0000-0000-000000000010',
  '10000000-0000-0000-0000-000000000013'
);
delete from public.packs
where id in (
  '10000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000003'
);

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
  )
on conflict (id) do update
  set pack_id = excluded.pack_id,
      name = excluded.name,
      job = excluded.job,
      repeats_when = excluded.repeats_when,
      is_desk = excluded.is_desk,
      sort_order = excluded.sort_order,
      grok_template_url = excluded.grok_template_url;

insert into public.packs (
  id, owner_id, slug, name, description, github_url, official, featured,
  topics, likes_count, installs_count, routing_rule, readme_md
) values
(
  '10000000-0000-0000-0000-000000000013',
  '00000000-0000-0000-0000-000000000005',
  'nao',
  'Nao',
  'Public Grok Bot templates Nao (@naoufal_elh) has shared. One pack, his roster, official Grok install per seat.',
  null,
  false,
  false,
  array['developer'],
  0,
  0,
  'Random questions stay at Rutin. Use a named seat only when that job is already in this pack.',
  $readme$Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.$readme$
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

insert into public.seats (
  id, pack_id, name, job, repeats_when, is_desk, sort_order, grok_template_url
) values
  (
    '20000000-0000-0000-0000-000000000005',
    '10000000-0000-0000-0000-000000000013',
    'Rutin',
    'A Monday-morning optimizer that scans every bot''s routines and proposes schedule fixes, including how many runs you save each week if you apply them. On first chat it runs that scan immediately, waits for your okay, then applies only what you approve.',
    null,
    true,
    0,
    'https://x.ai/bot/o4gWkNGmffEaVtOhaEsA7'
  )
on conflict (id) do update
  set pack_id = excluded.pack_id,
      name = excluded.name,
      job = excluded.job,
      repeats_when = excluded.repeats_when,
      is_desk = excluded.is_desk,
      sort_order = excluded.sort_order,
      grok_template_url = excluded.grok_template_url;
