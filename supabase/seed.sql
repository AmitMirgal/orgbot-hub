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
  '00000000-0000-0000-0000-000000000003',
  'authenticated',
  'authenticated',
  'kristaletz@orgbots.dev',
  extensions.crypt('not-a-login', extensions.gen_salt('bf')),
  now(),
  '{"provider":"github","providers":["github"]}'::jsonb,
  '{"user_name":"kristaletz","preferred_username":"kristaletz","full_name":"Krista Letz"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
),
(
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000004',
  'authenticated',
  'authenticated',
  'ericzakariasson@orgbots.dev',
  extensions.crypt('not-a-login', extensions.gen_salt('bf')),
  now(),
  '{"provider":"github","providers":["github"]}'::jsonb,
  '{"user_name":"ericzakariasson","preferred_username":"ericzakariasson","full_name":"Eric Zakariasson"}'::jsonb,
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
),
(
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000006',
  'authenticated',
  'authenticated',
  'gnurio@orgbots.dev',
  extensions.crypt('not-a-login', extensions.gen_salt('bf')),
  now(),
  '{"provider":"github","providers":["github"]}'::jsonb,
  '{"user_name":"gnurio","preferred_username":"gnurio","full_name":"George Nurijanian"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
),
(
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000007',
  'authenticated',
  'authenticated',
  'hnshah@orgbots.dev',
  extensions.crypt('not-a-login', extensions.gen_salt('bf')),
  now(),
  '{"provider":"github","providers":["github"]}'::jsonb,
  '{"user_name":"hnshah","preferred_username":"hnshah","full_name":"Hiten Shah"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
),
(
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000008',
  'authenticated',
  'authenticated',
  'BradShannon@orgbots.dev',
  extensions.crypt('not-a-login', extensions.gen_salt('bf')),
  now(),
  '{"provider":"github","providers":["github"]}'::jsonb,
  '{"user_name":"BradShannon","preferred_username":"BradShannon","full_name":"Brad Shannon"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
),
(
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000009',
  'authenticated',
  'authenticated',
  'farzyness@orgbots.dev',
  extensions.crypt('not-a-login', extensions.gen_salt('bf')),
  now(),
  '{"provider":"github","providers":["github"]}'::jsonb,
  '{"user_name":"farzyness","preferred_username":"farzyness","full_name":"Farzad"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
),
(
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000010',
  'authenticated',
  'authenticated',
  'cjblev@orgbots.dev',
  extensions.crypt('not-a-login', extensions.gen_salt('bf')),
  now(),
  '{"provider":"github","providers":["github"]}'::jsonb,
  '{"user_name":"cjblev","preferred_username":"cjblev","full_name":"Corey"}'::jsonb,
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
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000003',
  jsonb_build_object(
    'sub', '00000000-0000-0000-0000-000000000003',
    'email', 'kristaletz@orgbots.dev',
    'user_name', 'kristaletz'
  ),
  'github',
  now(),
  now(),
  now()
),
(
  '00000000-0000-0000-0000-000000000004',
  '00000000-0000-0000-0000-000000000004',
  jsonb_build_object(
    'sub', '00000000-0000-0000-0000-000000000004',
    'email', 'ericzakariasson@orgbots.dev',
    'user_name', 'ericzakariasson'
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
),
(
  '00000000-0000-0000-0000-000000000006',
  '00000000-0000-0000-0000-000000000006',
  jsonb_build_object(
    'sub', '00000000-0000-0000-0000-000000000006',
    'email', 'gnurio@orgbots.dev',
    'user_name', 'gnurio'
  ),
  'github',
  now(),
  now(),
  now()
),
(
  '00000000-0000-0000-0000-000000000007',
  '00000000-0000-0000-0000-000000000007',
  jsonb_build_object(
    'sub', '00000000-0000-0000-0000-000000000007',
    'email', 'hnshah@orgbots.dev',
    'user_name', 'hnshah'
  ),
  'github',
  now(),
  now(),
  now()
),
(
  '00000000-0000-0000-0000-000000000008',
  '00000000-0000-0000-0000-000000000008',
  jsonb_build_object(
    'sub', '00000000-0000-0000-0000-000000000008',
    'email', 'BradShannon@orgbots.dev',
    'user_name', 'BradShannon'
  ),
  'github',
  now(),
  now(),
  now()
),
(
  '00000000-0000-0000-0000-000000000009',
  '00000000-0000-0000-0000-000000000009',
  jsonb_build_object(
    'sub', '00000000-0000-0000-0000-000000000009',
    'email', 'farzyness@orgbots.dev',
    'user_name', 'farzyness'
  ),
  'github',
  now(),
  now(),
  now()
),
(
  '00000000-0000-0000-0000-000000000010',
  '00000000-0000-0000-0000-000000000010',
  jsonb_build_object(
    'sub', '00000000-0000-0000-0000-000000000010',
    'email', 'cjblev@orgbots.dev',
    'user_name', 'cjblev'
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
    '00000000-0000-0000-0000-000000000003',
    'kristaletz',
    'Krista Letz',
    'kristaletz',
    'https://avatars.githubusercontent.com/u/225127725?v=4'
  ),
  (
    '00000000-0000-0000-0000-000000000004',
    'ericzakariasson',
    'Eric Zakariasson',
    'ericzakariasson',
    'https://avatars.githubusercontent.com/u/25622412?v=4'
  ),
  (
    '00000000-0000-0000-0000-000000000005',
    'naoufalelh',
    'Naoufal El hassnaoui',
    'naoufal_elh',
    'https://avatars.githubusercontent.com/u/10200999?v=4'
  ),
  (
    '00000000-0000-0000-0000-000000000006',
    'gnurio',
    'George Nurijanian',
    'nurijanian',
    'https://avatars.githubusercontent.com/u/6743730?v=4'
  ),
  (
    '00000000-0000-0000-0000-000000000007',
    'hnshah',
    'Hiten Shah',
    'hnshah',
    'https://avatars.githubusercontent.com/u/3155200?v=4'
  ),
  (
    '00000000-0000-0000-0000-000000000008',
    'BradShannon',
    'Brad Shannon',
    'bradshannon',
    'https://avatars.githubusercontent.com/u/3514881?v=4'
  ),
  (
    '00000000-0000-0000-0000-000000000009',
    'farzyness',
    'Farzad',
    'farzyness',
    'https://avatars.githubusercontent.com/u/253716664?v=4'
  ),
  (
    '00000000-0000-0000-0000-000000000010',
    'cjblev',
    'Corey',
    'cjblev',
    null
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
  '10000000-0000-0000-0000-000000000011',
  '10000000-0000-0000-0000-000000000012',
  '10000000-0000-0000-0000-000000000013',
  '10000000-0000-0000-0000-000000000014',
  '10000000-0000-0000-0000-000000000015',
  '10000000-0000-0000-0000-000000000016',
  '10000000-0000-0000-0000-000000000017',
  '10000000-0000-0000-0000-000000000018'
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
  '10000000-0000-0000-0000-000000000011',
  '00000000-0000-0000-0000-000000000003',
  'krista',
  'Krista',
  'Public Grok Bot templates Krista Letz (@kristaletz) has shared. One pack, her roster, official Grok install per seat.',
  null,
  false,
  false,
  array['founder'],
  0,
  0,
  'Random GTM questions stay at PG. Use Echo only for call-to-slides. Named seats only when that job is already in this pack.',
  $readme$Third-party templates. Read before you add. Never paste a key. Only bots she published as https://x.ai/bot/… belong here. When she publishes another official link, add a seat. Do not invent unpublished Chief of Staff or Salesforce bots.$readme$
),
(
  '10000000-0000-0000-0000-000000000012',
  '00000000-0000-0000-0000-000000000004',
  'eric',
  'Eric',
  'Public Grok Bot templates Eric Zakariasson (@ericzakariasson) has shared. One pack, his roster, official Grok install per seat.',
  null,
  false,
  false,
  array['developer'],
  0,
  0,
  'Random questions stay at Projects Manager. Use a named seat only when that job is already in this pack.',
  $readme$Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished Coder, Writer, or Researcher bots from his guide.$readme$
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
    '20000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000011',
    'PG',
    'Prospecting bot that researches accounts, watches recent podcasts and webinars for personal hooks, and can optionally sign into X or LinkedIn to find recent posts. Builds a contact spreadsheet and drafts outreach from CRM and meeting notes.',
    null,
    true,
    0,
    'https://x.ai/bot/fcJJMM58AdXSTBdW3xWyW'
  ),
  (
    '20000000-0000-0000-0000-000000000003',
    '10000000-0000-0000-0000-000000000011',
    'Echo',
    'Turns a customer call into slides from customer context. Works with Figma or Google Slides, and Granola or Gong notes.',
    null,
    false,
    1,
    'https://x.ai/bot/ph5mcXqVy2p176Br7BJYi'
  ),
  (
    '20000000-0000-0000-0000-000000000004',
    '10000000-0000-0000-0000-000000000012',
    'Projects Manager',
    'A Grok Bot projects manager. Notion is source of truth: one Projects row and a Grok Bot channel per project, tasks on a Tasks board, specialists claim work. The user decides. Agents execute. Does not do specialist work.',
    null,
    true,
    0,
    'https://x.ai/bot/FU-Ev6_Ju4lFGWwWRD0GD'
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

insert into public.packs (
  id, owner_id, slug, name, description, github_url, official, featured,
  topics, likes_count, installs_count, routing_rule, readme_md
) values
(
  '10000000-0000-0000-0000-000000000014',
  '00000000-0000-0000-0000-000000000006',
  'george',
  'George',
  'Public Grok Bot templates George Nurijanian (@nurijanian) has shared. One pack, his roster, official Grok install per seat.',
  null,
  false,
  false,
  array['founder'],
  0,
  0,
  'Random questions stay at AI PM OS. Use a named seat only when that job is already in this pack.',
  $readme$Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. This sample is not the full paid AI PM OS.$readme$
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
    '20000000-0000-0000-0000-000000000006',
    '10000000-0000-0000-0000-000000000014',
    'AI PM OS',
    'A sample of the AI PM OS for product managers. Default recipe is Problem First. Also has Make Requirements Great and Decisions. Does not include the full 243-skill paid OS.',
    null,
    true,
    0,
    'https://x.ai/bot/9dtfHw4LHmwc5uBC-a9vj'
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
  '10000000-0000-0000-0000-000000000015',
  '00000000-0000-0000-0000-000000000007',
  'hiten',
  'Hiten',
  'Public Grok Bot templates Hiten Shah (@hnshah) has shared. One pack, his roster, official Grok install per seat.',
  null,
  false,
  false,
  array['founder'],
  0,
  0,
  'Random pitch questions stay at Pitch Deck Coach. Use It''s Britney only for Britney dance clips. Named seats only when that job is already in this pack.',
  $readme$Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Do not add Box Inspector; that template is by SuddenlyJon.$readme$
),
(
  '10000000-0000-0000-0000-000000000016',
  '00000000-0000-0000-0000-000000000008',
  'brad',
  'Brad',
  'Public Grok Bot templates Brad Shannon (@bradshannon) has shared. One pack, his roster, official Grok install per seat.',
  null,
  false,
  false,
  array['developer'],
  0,
  0,
  'Random questions stay at Bouncer. Use a named seat only when that job is already in this pack.',
  $readme$Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.$readme$
),
(
  '10000000-0000-0000-0000-000000000017',
  '00000000-0000-0000-0000-000000000009',
  'farzad',
  'Farzad',
  'Public Grok Bot templates Farzad (@farzyness) has shared. One pack, his roster, official Grok install per seat.',
  null,
  false,
  false,
  array['developer'],
  0,
  0,
  'Random questions stay at Claudey. Use a named seat only when that job is already in this pack.',
  $readme$Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.$readme$
),
(
  '10000000-0000-0000-0000-000000000018',
  '00000000-0000-0000-0000-000000000010',
  'corey',
  'Corey',
  'Public Grok Bot templates Corey (@cjblev) has shared. One pack, his roster, official Grok install per seat.',
  null,
  false,
  false,
  array['developer'],
  0,
  0,
  'Random questions stay at Steward. Use a named seat only when that job is already in this pack.',
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
    '20000000-0000-0000-0000-000000000007',
    '10000000-0000-0000-0000-000000000015',
    'Pitch Deck Coach',
    'Reviews a pitch deck and reports what an investor is likely to understand, believe, question, and remember, then helps strengthen the story, evidence, and slides.',
    null,
    true,
    0,
    'https://x.ai/bot/mqVPHm0oB3WPsnxbU1qB9'
  ),
  (
    '20000000-0000-0000-0000-000000000008',
    '10000000-0000-0000-0000-000000000015',
    'It''s Britney',
    'Sends random Britney Spears internet dance clips, timed to significant hours of the day.',
    null,
    false,
    1,
    'https://x.ai/bot/pNLwpHs8rmtMzAkUi-Zu2'
  ),
  (
    '20000000-0000-0000-0000-000000000009',
    '10000000-0000-0000-0000-000000000016',
    'Bouncer',
    'Reviews a public Grok Bot share link or pasted config before you add it. Quotes findings and returns CLEAN, WARN, or BLOCK-recommended, and does not add, install, spend, or post.',
    null,
    true,
    0,
    'https://x.ai/bot/cGcG0msqfz7o7J3QMLhbE'
  ),
  (
    '20000000-0000-0000-0000-000000000010',
    '10000000-0000-0000-0000-000000000017',
    'Claudey',
    'Runs Anthropic Claude Code for frontend, UI, and architecture work. Defaults to Opus, reports a PR as soon as the CLI exits, and keeps Fable for rare invention only.',
    null,
    true,
    0,
    'https://x.ai/bot/OR72i4SNc0_F1IzbCfg-D'
  ),
  (
    '20000000-0000-0000-0000-000000000011',
    '10000000-0000-0000-0000-000000000018',
    'Steward',
    'Watches Cursor usage for a Grok Bot fleet. Names which bot spent, and how to keep the same output for less.',
    null,
    true,
    0,
    'https://x.ai/bot/VMwfgQlHkYfFkbPYDWzAA'
  )
on conflict (id) do update
  set pack_id = excluded.pack_id,
      name = excluded.name,
      job = excluded.job,
      repeats_when = excluded.repeats_when,
      is_desk = excluded.is_desk,
      sort_order = excluded.sort_order,
      grok_template_url = excluded.grok_template_url;
