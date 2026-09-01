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
),
(
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000011',
  'authenticated',
  'authenticated',
  'talsiach@orgbots.dev',
  extensions.crypt('not-a-login', extensions.gen_salt('bf')),
  now(),
  '{"provider":"github","providers":["github"]}'::jsonb,
  '{"user_name":"talsiach","preferred_username":"talsiach","full_name":"Tal Siach"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
),
(
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000012',
  'authenticated',
  'authenticated',
  'thesmitpatel@orgbots.dev',
  extensions.crypt('not-a-login', extensions.gen_salt('bf')),
  now(),
  '{"provider":"github","providers":["github"]}'::jsonb,
  '{"user_name":"thesmitpatel","preferred_username":"thesmitpatel","full_name":"Smit Patel"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
),
(
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000013',
  'authenticated',
  'authenticated',
  'dannylimanseta@orgbots.dev',
  extensions.crypt('not-a-login', extensions.gen_salt('bf')),
  now(),
  '{"provider":"github","providers":["github"]}'::jsonb,
  '{"user_name":"dannylimanseta","preferred_username":"dannylimanseta","full_name":"Danny Limanseta"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
),
(
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000014',
  'authenticated',
  'authenticated',
  'massimodeluisa@orgbots.dev',
  extensions.crypt('not-a-login', extensions.gen_salt('bf')),
  now(),
  '{"provider":"github","providers":["github"]}'::jsonb,
  '{"user_name":"massimodeluisa","preferred_username":"massimodeluisa","full_name":"Massimo De Luisa"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
),
(
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000015',
  'authenticated',
  'authenticated',
  'MaiYangAI@orgbots.dev',
  extensions.crypt('not-a-login', extensions.gen_salt('bf')),
  now(),
  '{"provider":"github","providers":["github"]}'::jsonb,
  '{"user_name":"MaiYangAI","preferred_username":"MaiYangAI","full_name":"Mai Yang"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
),
(
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000016',
  'authenticated',
  'authenticated',
  'shanemac@orgbots.dev',
  extensions.crypt('not-a-login', extensions.gen_salt('bf')),
  now(),
  '{"provider":"github","providers":["github"]}'::jsonb,
  '{"user_name":"shanemac","preferred_username":"shanemac","full_name":"Shane Mac"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
),
(
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000017',
  'authenticated',
  'authenticated',
  'a-makelky@orgbots.dev',
  extensions.crypt('not-a-login', extensions.gen_salt('bf')),
  now(),
  '{"provider":"github","providers":["github"]}'::jsonb,
  '{"user_name":"a-makelky","preferred_username":"a-makelky","full_name":"Aaron Makelky"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
),
(
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000018',
  'authenticated',
  'authenticated',
  'LeTerryBZH@orgbots.dev',
  extensions.crypt('not-a-login', extensions.gen_salt('bf')),
  now(),
  '{"provider":"github","providers":["github"]}'::jsonb,
  '{"user_name":"LeTerryBZH","preferred_username":"LeTerryBZH","full_name":"Thierry / TJM"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
),
(
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000019',
  'authenticated',
  'authenticated',
  'ahalvor@orgbots.dev',
  extensions.crypt('not-a-login', extensions.gen_salt('bf')),
  now(),
  '{"provider":"github","providers":["github"]}'::jsonb,
  '{"user_name":"ahalvor","preferred_username":"ahalvor","full_name":"Andy"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
),
(
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000020',
  'authenticated',
  'authenticated',
  'amberdawn1786@orgbots.dev',
  extensions.crypt('not-a-login', extensions.gen_salt('bf')),
  now(),
  '{"provider":"github","providers":["github"]}'::jsonb,
  '{"user_name":"amberdawn1786","preferred_username":"amberdawn1786","full_name":"Amber Dawn"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
),
(
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000021',
  'authenticated',
  'authenticated',
  'NicoChauvin74@orgbots.dev',
  extensions.crypt('not-a-login', extensions.gen_salt('bf')),
  now(),
  '{"provider":"github","providers":["github"]}'::jsonb,
  '{"user_name":"NicoChauvin74","preferred_username":"NicoChauvin74","full_name":"Nicolas Chauvin"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
),
(
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000022',
  'authenticated',
  'authenticated',
  'JordanHall_dev@orgbots.dev',
  extensions.crypt('not-a-login', extensions.gen_salt('bf')),
  now(),
  '{"provider":"github","providers":["github"]}'::jsonb,
  '{"user_name":"JordanHall_dev","preferred_username":"JordanHall_dev","full_name":"Jordan Upton"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
),
(
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000023',
  'authenticated',
  'authenticated',
  'mdafanulh@orgbots.dev',
  extensions.crypt('not-a-login', extensions.gen_salt('bf')),
  now(),
  '{"provider":"github","providers":["github"]}'::jsonb,
  '{"user_name":"mdafanulh","preferred_username":"mdafanulh","full_name":"Md / Haque"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
),
(
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000024',
  'authenticated',
  'authenticated',
  'rrrkren@orgbots.dev',
  extensions.crypt('not-a-login', extensions.gen_salt('bf')),
  now(),
  '{"provider":"github","providers":["github"]}'::jsonb,
  '{"user_name":"rrrkren","preferred_username":"rrrkren","full_name":"Eric Ren"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
),
(
  '00000000-0000-0000-0000-000000000000',
  '00000000-0000-0000-0000-000000000025',
  'authenticated',
  'authenticated',
  'billzanetti@orgbots.dev',
  extensions.crypt('not-a-login', extensions.gen_salt('bf')),
  now(),
  '{"provider":"github","providers":["github"]}'::jsonb,
  '{"user_name":"billzanetti","preferred_username":"billzanetti","full_name":"Bill Zanetti"}'::jsonb,
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
),
(
  '00000000-0000-0000-0000-000000000011',
  '00000000-0000-0000-0000-000000000011',
  jsonb_build_object(
    'sub', '00000000-0000-0000-0000-000000000011',
    'email', 'talsiach@orgbots.dev',
    'user_name', 'talsiach'
  ),
  'github',
  now(),
  now(),
  now()
),
(
  '00000000-0000-0000-0000-000000000012',
  '00000000-0000-0000-0000-000000000012',
  jsonb_build_object(
    'sub', '00000000-0000-0000-0000-000000000012',
    'email', 'thesmitpatel@orgbots.dev',
    'user_name', 'thesmitpatel'
  ),
  'github',
  now(),
  now(),
  now()
),
(
  '00000000-0000-0000-0000-000000000013',
  '00000000-0000-0000-0000-000000000013',
  jsonb_build_object(
    'sub', '00000000-0000-0000-0000-000000000013',
    'email', 'dannylimanseta@orgbots.dev',
    'user_name', 'dannylimanseta'
  ),
  'github',
  now(),
  now(),
  now()
),
(
  '00000000-0000-0000-0000-000000000014',
  '00000000-0000-0000-0000-000000000014',
  jsonb_build_object(
    'sub', '00000000-0000-0000-0000-000000000014',
    'email', 'massimodeluisa@orgbots.dev',
    'user_name', 'massimodeluisa'
  ),
  'github',
  now(),
  now(),
  now()
),
(
  '00000000-0000-0000-0000-000000000015',
  '00000000-0000-0000-0000-000000000015',
  jsonb_build_object(
    'sub', '00000000-0000-0000-0000-000000000015',
    'email', 'MaiYangAI@orgbots.dev',
    'user_name', 'MaiYangAI'
  ),
  'github',
  now(),
  now(),
  now()
),
(
  '00000000-0000-0000-0000-000000000016',
  '00000000-0000-0000-0000-000000000016',
  jsonb_build_object(
    'sub', '00000000-0000-0000-0000-000000000016',
    'email', 'shanemac@orgbots.dev',
    'user_name', 'shanemac'
  ),
  'github',
  now(),
  now(),
  now()
),
(
  '00000000-0000-0000-0000-000000000017',
  '00000000-0000-0000-0000-000000000017',
  jsonb_build_object(
    'sub', '00000000-0000-0000-0000-000000000017',
    'email', 'a-makelky@orgbots.dev',
    'user_name', 'a-makelky'
  ),
  'github',
  now(),
  now(),
  now()
),
(
  '00000000-0000-0000-0000-000000000018',
  '00000000-0000-0000-0000-000000000018',
  jsonb_build_object(
    'sub', '00000000-0000-0000-0000-000000000018',
    'email', 'LeTerryBZH@orgbots.dev',
    'user_name', 'LeTerryBZH'
  ),
  'github',
  now(),
  now(),
  now()
),
(
  '00000000-0000-0000-0000-000000000019',
  '00000000-0000-0000-0000-000000000019',
  jsonb_build_object(
    'sub', '00000000-0000-0000-0000-000000000019',
    'email', 'ahalvor@orgbots.dev',
    'user_name', 'ahalvor'
  ),
  'github',
  now(),
  now(),
  now()
),
(
  '00000000-0000-0000-0000-000000000020',
  '00000000-0000-0000-0000-000000000020',
  jsonb_build_object(
    'sub', '00000000-0000-0000-0000-000000000020',
    'email', 'amberdawn1786@orgbots.dev',
    'user_name', 'amberdawn1786'
  ),
  'github',
  now(),
  now(),
  now()
),
(
  '00000000-0000-0000-0000-000000000021',
  '00000000-0000-0000-0000-000000000021',
  jsonb_build_object(
    'sub', '00000000-0000-0000-0000-000000000021',
    'email', 'NicoChauvin74@orgbots.dev',
    'user_name', 'NicoChauvin74'
  ),
  'github',
  now(),
  now(),
  now()
),
(
  '00000000-0000-0000-0000-000000000022',
  '00000000-0000-0000-0000-000000000022',
  jsonb_build_object(
    'sub', '00000000-0000-0000-0000-000000000022',
    'email', 'JordanHall_dev@orgbots.dev',
    'user_name', 'JordanHall_dev'
  ),
  'github',
  now(),
  now(),
  now()
),
(
  '00000000-0000-0000-0000-000000000023',
  '00000000-0000-0000-0000-000000000023',
  jsonb_build_object(
    'sub', '00000000-0000-0000-0000-000000000023',
    'email', 'mdafanulh@orgbots.dev',
    'user_name', 'mdafanulh'
  ),
  'github',
  now(),
  now(),
  now()
),
(
  '00000000-0000-0000-0000-000000000024',
  '00000000-0000-0000-0000-000000000024',
  jsonb_build_object(
    'sub', '00000000-0000-0000-0000-000000000024',
    'email', 'rrrkren@orgbots.dev',
    'user_name', 'rrrkren'
  ),
  'github',
  now(),
  now(),
  now()
),
(
  '00000000-0000-0000-0000-000000000025',
  '00000000-0000-0000-0000-000000000025',
  jsonb_build_object(
    'sub', '00000000-0000-0000-0000-000000000025',
    'email', 'billzanetti@orgbots.dev',
    'user_name', 'billzanetti'
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
  ),
  (
    '00000000-0000-0000-0000-000000000011',
    'talsiach',
    'Tal Siach',
    'Talsiach',
    null
  ),
  (
    '00000000-0000-0000-0000-000000000012',
    'thesmitpatel',
    'Smit Patel',
    'thesmitpatel',
    null
  ),
  (
    '00000000-0000-0000-0000-000000000013',
    'dannylimanseta',
    'Danny Limanseta',
    'DannyLimanseta',
    null
  ),
  (
    '00000000-0000-0000-0000-000000000014',
    'massimodeluisa',
    'Massimo De Luisa',
    'massimodeluisa',
    null
  ),
  (
    '00000000-0000-0000-0000-000000000015',
    'MaiYangAI',
    'Mai Yang',
    'MaiYangAI',
    null
  ),
  (
    '00000000-0000-0000-0000-000000000016',
    'shanemac',
    'Shane Mac',
    'ShaneMac',
    'https://avatars.githubusercontent.com/u/92173063?v=4'
  ),
  (
    '00000000-0000-0000-0000-000000000017',
    'a-makelky',
    'Aaron Makelky',
    'theaaron',
    'https://avatars.githubusercontent.com/u/206495698?v=4'
  ),
  (
    '00000000-0000-0000-0000-000000000018',
    'LeTerryBZH',
    'Thierry / TJM',
    'LeTerryBZH',
    null
  ),
  (
    '00000000-0000-0000-0000-000000000019',
    'ahalvor',
    'Andy',
    'ahalvor',
    'https://avatars.githubusercontent.com/u/7927660?v=4'
  ),
  (
    '00000000-0000-0000-0000-000000000020',
    'amberdawn1786',
    'Amber Dawn',
    'amberdawn1786',
    null
  ),
  (
    '00000000-0000-0000-0000-000000000021',
    'NicoChauvin74',
    'Nicolas Chauvin',
    'NicoChauvin74',
    null
  ),
  (
    '00000000-0000-0000-0000-000000000022',
    'JordanHall_dev',
    'Jordan Upton',
    'JordanHall_dev',
    null
  ),
  (
    '00000000-0000-0000-0000-000000000023',
    'mdafanulh',
    'Md / Haque',
    'mdafanulh',
    null
  ),
  (
    '00000000-0000-0000-0000-000000000024',
    'rrrkren',
    'Eric Ren',
    'rrrkren',
    'https://avatars.githubusercontent.com/u/8688167?v=4'
  ),
  (
    '00000000-0000-0000-0000-000000000025',
    'billzanetti',
    'Bill Zanetti',
    'BillZanetti',
    'https://avatars.githubusercontent.com/u/10750672?v=4'
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
  '10000000-0000-0000-0000-000000000018',
  '10000000-0000-0000-0000-000000000019',
  '10000000-0000-0000-0000-000000000020',
  '10000000-0000-0000-0000-000000000021',
  '10000000-0000-0000-0000-000000000022',
  '10000000-0000-0000-0000-000000000023',
  '10000000-0000-0000-0000-000000000024',
  '10000000-0000-0000-0000-000000000025',
  '10000000-0000-0000-0000-000000000026',
  '10000000-0000-0000-0000-000000000027',
  '10000000-0000-0000-0000-000000000028',
  '10000000-0000-0000-0000-000000000029',
  '10000000-0000-0000-0000-000000000030',
  '10000000-0000-0000-0000-000000000031',
  '10000000-0000-0000-0000-000000000032',
  '10000000-0000-0000-0000-000000000033'
)
   or id in (
  '20000000-0000-0000-0000-000000000012',
  '20000000-0000-0000-0000-000000000013',
  '20000000-0000-0000-0000-000000000014',
  '20000000-0000-0000-0000-000000000015',
  '20000000-0000-0000-0000-000000000016',
  '20000000-0000-0000-0000-000000000017',
  '20000000-0000-0000-0000-000000000018',
  '20000000-0000-0000-0000-000000000019',
  '20000000-0000-0000-0000-000000000020',
  '20000000-0000-0000-0000-000000000021',
  '20000000-0000-0000-0000-000000000022',
  '20000000-0000-0000-0000-000000000023',
  '20000000-0000-0000-0000-000000000024',
  '20000000-0000-0000-0000-000000000025',
  '20000000-0000-0000-0000-000000000026',
  '20000000-0000-0000-0000-000000000027',
  '20000000-0000-0000-0000-000000000028',
  '20000000-0000-0000-0000-000000000029',
  '20000000-0000-0000-0000-000000000030',
  '20000000-0000-0000-0000-000000000031'
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
  'Random pitch questions stay at Pitch Deck Coach. Use It''s Britney only for Britney dance clips. Use Product Idea Stress Test only for idea and assumption testing. Use The Page only for public-page change watches. Named seats only when that job is already in this pack.',
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
    '20000000-0000-0000-0000-000000000012',
    '10000000-0000-0000-0000-000000000015',
    'Product Idea Stress Test',
    'Investigates a product or startup idea for founders. Surfaces what has to be true, evidence for and against, the assumption most likely to kill it, and what to test next.',
    null,
    false,
    2,
    'https://x.ai/bot/JeFTvcDX-7QT2evKGIb52'
  ),
  (
    '20000000-0000-0000-0000-000000000013',
    '10000000-0000-0000-0000-000000000015',
    'The Page',
    'Watches 3–5 public pages once each morning and messages only when the thing you care about actually changed. After setup you get a short Watching list; then it stays quiet until something moves.',
    null,
    false,
    3,
    'https://x.ai/bot/uFRK1GoAsiopBLPY19QCe'
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

insert into public.packs (
  id, owner_id, slug, name, description, github_url, official, featured,
  topics, likes_count, installs_count, routing_rule, readme_md
) values
(
  '10000000-0000-0000-0000-000000000019',
  '00000000-0000-0000-0000-000000000011',
  'tal',
  'Tal',
  'Public Grok Bot templates Tal Siach (@Talsiach) has shared. One pack, his roster, official Grok install per seat.',
  null,
  false,
  false,
  array['founder'],
  0,
  0,
  'Random questions stay at Blunt. Use a named seat only when that job is already in this pack.',
  $readme$Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.$readme$
),
(
  '10000000-0000-0000-0000-000000000020',
  '00000000-0000-0000-0000-000000000012',
  'smit',
  'Smit',
  'Public Grok Bot templates Smit Patel (@thesmitpatel) has shared. One pack, his roster, official Grok install per seat.',
  null,
  false,
  false,
  array['founder'],
  0,
  0,
  'Random questions stay at Commercial Taste. Use a named seat only when that job is already in this pack.',
  $readme$Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.$readme$
),
(
  '10000000-0000-0000-0000-000000000021',
  '00000000-0000-0000-0000-000000000013',
  'danny',
  'Danny',
  'Public Grok Bot templates Danny Limanseta (@DannyLimanseta) has shared. One pack, his roster, official Grok install per seat.',
  null,
  false,
  false,
  array['developer'],
  0,
  0,
  'Random questions stay at Sable: Game Art. Use a named seat only when that job is already in this pack.',
  $readme$Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.$readme$
),
(
  '10000000-0000-0000-0000-000000000022',
  '00000000-0000-0000-0000-000000000014',
  'massimo',
  'Massimo',
  'Public Grok Bot templates Massimo De Luisa (@massimodeluisa) has shared. One pack, his roster, official Grok install per seat.',
  null,
  false,
  false,
  array['developer'],
  0,
  0,
  'Random questions stay at Human Copywriter. Use a named seat only when that job is already in this pack.',
  $readme$Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.$readme$
),
(
  '10000000-0000-0000-0000-000000000023',
  '00000000-0000-0000-0000-000000000015',
  'mai',
  'Mai',
  'Public Grok Bot templates Mai Yang (@MaiYangAI) has shared. One pack, her roster, official Grok install per seat.',
  null,
  false,
  false,
  array['developer'],
  0,
  0,
  'Random questions stay at Grok Deck. Use 最值得关注的Grok Bot 推文？ only for weekday Grok Bot tweet scans. Named seats only when that job is already in this pack.',
  $readme$Third-party templates. Read before you add. Never paste a key. Only bots she published as https://x.ai/bot/… belong here. When she publishes another official link, add a seat. Do not invent unpublished bots.$readme$
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
    '20000000-0000-0000-0000-000000000014',
    '10000000-0000-0000-0000-000000000019',
    'Blunt',
    'Send a landing page URL and get a senior product-marketer memo: what works, what does not, the one thing to fix first, and a score out of 10.',
    null,
    true,
    0,
    'https://x.ai/bot/N0J32FbnVRuetJi1oJggh'
  ),
  (
    '20000000-0000-0000-0000-000000000015',
    '10000000-0000-0000-0000-000000000020',
    'Commercial Taste',
    'Business thought partner for technical founders and execs. Helps with positioning, distribution, and commercialization before the data is complete.',
    null,
    true,
    0,
    'https://x.ai/bot/vekulzIMXM8hDjkp-mDkX'
  ),
  (
    '20000000-0000-0000-0000-000000000016',
    '10000000-0000-0000-0000-000000000021',
    'Sable: Game Art',
    'Helps game developers ideate and visualize: suggests styles from real games, mocks the same idea in those looks, then produces 2D art or sprite sheets and slices them into game-ready PNGs. For 3D, asks before using Tripo3D or Meshy3D.',
    null,
    true,
    0,
    'https://x.ai/bot/oSvAMKX_ahD56ZmgwtRys'
  ),
  (
    '20000000-0000-0000-0000-000000000017',
    '10000000-0000-0000-0000-000000000022',
    'Human Copywriter',
    'A human-voice rewrite desk for email, posts, blogs, DMs, landing-page bodies, and PR. American English by default. Draft-only: you get a draft, you publish.',
    null,
    true,
    0,
    'https://x.ai/bot/JZAccYtlRFvDSU2CnMnkZ'
  ),
  (
    '20000000-0000-0000-0000-000000000018',
    '10000000-0000-0000-0000-000000000023',
    'Grok Deck',
    'Makes HTML slide decks in the Grok Bot look: paper canvas, blob faces, morphing page turns. Swap in your talk copy and present in a browser, no build.',
    null,
    true,
    0,
    'https://x.ai/bot/Ja9NzNTRz2ozzQLNfrJwI'
  ),
  (
    '20000000-0000-0000-0000-000000000019',
    '10000000-0000-0000-0000-000000000023',
    '最值得关注的Grok Bot 推文？',
    'Weekday scanner of a public Grok Bot explorer list. Only files high-quality, high-traffic original posts. Works in Chinese. Does not post.',
    null,
    false,
    1,
    'https://x.ai/bot/lFDR77qKaT3Iglzv9pUac'
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
  '10000000-0000-0000-0000-000000000024',
  '00000000-0000-0000-0000-000000000016',
  'shane',
  'Shane',
  'Public Grok Bot templates Shane Mac (@ShaneMac) has shared. One pack, his roster, official Grok install per seat.',
  null,
  false,
  false,
  array['founder'],
  0,
  0,
  'Random questions stay at Librarian. Use a named seat only when that job is already in this pack.',
  $readme$Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.$readme$
),
(
  '10000000-0000-0000-0000-000000000025',
  '00000000-0000-0000-0000-000000000017',
  'aaron',
  'Aaron',
  'Public Grok Bot templates Aaron Makelky (@theaaron) has shared. One pack, his roster, official Grok install per seat.',
  null,
  false,
  false,
  array['founder'],
  0,
  0,
  'Random questions stay at Set Up. Use Overwatch only for multi-bot workspace organization. Use CoS only for chief-of-staff work. Named seats only when that job is already in this pack.',
  $readme$Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.$readme$
),
(
  '10000000-0000-0000-0000-000000000026',
  '00000000-0000-0000-0000-000000000018',
  'thierry',
  'Thierry',
  'Public Grok Bot templates Thierry / TJM (@LeTerryBZH) has shared. One pack, his roster, official Grok install per seat.',
  null,
  false,
  false,
  array['developer'],
  0,
  0,
  'Random questions stay at 2nd Brain. Use a named seat only when that job is already in this pack.',
  $readme$Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.$readme$
),
(
  '10000000-0000-0000-0000-000000000027',
  '00000000-0000-0000-0000-000000000019',
  'andy',
  'Andy',
  'Public Grok Bot templates Andy (@ahalvor) has shared. One pack, his roster, official Grok install per seat.',
  null,
  false,
  false,
  array['founder'],
  0,
  0,
  'Random questions stay at Homeroom. Use a named seat only when that job is already in this pack.',
  $readme$Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.$readme$
),
(
  '10000000-0000-0000-0000-000000000028',
  '00000000-0000-0000-0000-000000000020',
  'amber',
  'Amber',
  'Public Grok Bot templates Amber Dawn (@amberdawn1786) has shared. One pack, her roster, official Grok install per seat.',
  null,
  false,
  false,
  array['founder'],
  0,
  0,
  'Random questions stay at Sous Chef. Use a named seat only when that job is already in this pack.',
  $readme$Third-party templates. Read before you add. Never paste a key. Only bots she published as https://x.ai/bot/… belong here. When she publishes another official link, add a seat. Do not invent unpublished bots.$readme$
),
(
  '10000000-0000-0000-0000-000000000029',
  '00000000-0000-0000-0000-000000000021',
  'nicolas',
  'Nicolas',
  'Public Grok Bot templates Nicolas Chauvin (@NicoChauvin74) has shared. One pack, his roster, official Grok install per seat.',
  null,
  false,
  false,
  array['developer'],
  0,
  0,
  'Random questions stay at BeTree. Use a named seat only when that job is already in this pack.',
  $readme$Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.$readme$
),
(
  '10000000-0000-0000-0000-000000000030',
  '00000000-0000-0000-0000-000000000022',
  'jordan',
  'Jordan',
  'Public Grok Bot templates Jordan Upton (@JordanHall_dev) has shared. One pack, his roster, official Grok install per seat.',
  null,
  false,
  false,
  array['developer'],
  0,
  0,
  'Random questions stay at Usage-pool orchestrator. Use a named seat only when that job is already in this pack.',
  $readme$Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.$readme$
),
(
  '10000000-0000-0000-0000-000000000031',
  '00000000-0000-0000-0000-000000000023',
  'md',
  'Md',
  'Public Grok Bot templates Md / Haque (@mdafanulh) has shared. One pack, his roster, official Grok install per seat.',
  null,
  false,
  false,
  array['developer'],
  0,
  0,
  'Random questions stay at Lumos. Use a named seat only when that job is already in this pack.',
  $readme$Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots.$readme$
),
(
  '10000000-0000-0000-0000-000000000032',
  '00000000-0000-0000-0000-000000000024',
  'eric-ren',
  'Eric Ren',
  'Public Grok Bot templates Eric Ren (@rrrkren) has shared. One pack, his roster, official Grok install per seat.',
  null,
  false,
  false,
  array['developer'],
  0,
  0,
  'Random questions stay at unifi AQ trmnl integration. Use a named seat only when that job is already in this pack.',
  $readme$Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. This is not Eric Zakariasson''s pack.$readme$
),
(
  '10000000-0000-0000-0000-000000000033',
  '00000000-0000-0000-0000-000000000025',
  'bill',
  'Bill',
  'Public Grok Bot templates Bill Zanetti (@BillZanetti) has shared. One pack, his roster, official Grok install per seat.',
  null,
  false,
  false,
  array['developer'],
  0,
  0,
  'Random questions stay at Grok Build. Use a named seat only when that job is already in this pack.',
  $readme$Third-party templates. Read before you add. Never paste a key. Only bots he published as https://x.ai/bot/… belong here. When he publishes another official link, add a seat. Do not invent unpublished bots. Do not add STEER; that template was not shared by Bill in this hunt.$readme$
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
    '20000000-0000-0000-0000-000000000020',
    '10000000-0000-0000-0000-000000000024',
    'Librarian',
    'Builds a personal library site from shelf photos. Catalogs books, pulls snippets, maps contradictions, and marks the ones you would hand people.',
    null,
    true,
    0,
    'https://x.ai/bot/suKVjDAR-hSr_PTBxgdRw'
  ),
  (
    '20000000-0000-0000-0000-000000000021',
    '10000000-0000-0000-0000-000000000025',
    'Set Up',
    'Walks a newcomer through building a small, intentional bot team: one chief, a few project leads, and specialists.',
    null,
    true,
    0,
    'https://x.ai/bot/BsExflSUXpW0hs21OTBzu'
  ),
  (
    '20000000-0000-0000-0000-000000000022',
    '10000000-0000-0000-0000-000000000025',
    'Overwatch',
    'Keeps a shared multi-bot workspace organized, git-backed, and portable.',
    null,
    false,
    1,
    'https://x.ai/bot/HtClSXO_AmiQoyYH9aXV9'
  ),
  (
    '20000000-0000-0000-0000-000000000023',
    '10000000-0000-0000-0000-000000000025',
    'CoS',
    'A personal chief of staff for a small specialist AI team. Coordinates calendar, projects, and inbound mail, and never sends as you unless you ask.',
    null,
    false,
    2,
    'https://x.ai/bot/eiVFbd0nIdH2gzSwHOs0D'
  ),
  (
    '20000000-0000-0000-0000-000000000024',
    '10000000-0000-0000-0000-000000000026',
    '2nd Brain',
    'A Lattice wiki compiler second brain. Files sources as raw notes, compiles short wiki pages, and answers from those pages.',
    null,
    true,
    0,
    'https://x.ai/bot/c4fYduVVic2YtbcjXquD0'
  ),
  (
    '20000000-0000-0000-0000-000000000025',
    '10000000-0000-0000-0000-000000000027',
    'Homeroom',
    'A parent helper that pulls Schoology, keeps a family homework site current, and watches school activities.',
    null,
    true,
    0,
    'https://x.ai/bot/IciOb-9jMtlkc1RJj6MQe'
  ),
  (
    '20000000-0000-0000-0000-000000000026',
    '10000000-0000-0000-0000-000000000028',
    'Sous Chef',
    'Finds recipes, builds meal plans and grocery lists, and shops when asked.',
    null,
    true,
    0,
    'https://x.ai/bot/RuCu3IpKAvrx00H0MDI0t'
  ),
  (
    '20000000-0000-0000-0000-000000000027',
    '10000000-0000-0000-0000-000000000029',
    'BeTree',
    'Compiles a multi-agent plan into a live behavior-tree graph and shared status board.',
    null,
    true,
    0,
    'https://x.ai/bot/2PSNlIROOJPj9qZlfRy0w'
  ),
  (
    '20000000-0000-0000-0000-000000000028',
    '10000000-0000-0000-0000-000000000030',
    'Usage-pool orchestrator',
    'A thin Grok Bot that hands heavy work to Cursor by default, and optionally Grok Build, Claude Code, or Codex, so those usage pools do the work.',
    null,
    true,
    0,
    'https://x.ai/bot/Nx4wpKeM_NYx577xlJFMD'
  ),
  (
    '20000000-0000-0000-0000-000000000029',
    '10000000-0000-0000-0000-000000000031',
    'Lumos',
    'Technical educator that uses the Feynman technique: one daily-life analogy and one example.',
    null,
    true,
    0,
    'https://x.ai/bot/SwTxLoOaIwDqTSvhTIhrK'
  ),
  (
    '20000000-0000-0000-0000-000000000030',
    '10000000-0000-0000-0000-000000000032',
    'unifi AQ trmnl integration',
    'Builds and maintains a TRMNL private plugin for UniFi Protect UP-AirQuality sensor data.',
    null,
    true,
    0,
    'https://x.ai/bot/NU02qQ9iahZtAM0i0x1KT'
  ),
  (
    '20000000-0000-0000-0000-000000000031',
    '10000000-0000-0000-0000-000000000033',
    'Grok Build',
    'Runs the real Grok Build CLI for apps, code, and deep research at maximum effort on an agent computer.',
    null,
    true,
    0,
    'https://x.ai/bot/eydijdzrfgtnmlnUyPSI-'
  )
on conflict (id) do update
  set pack_id = excluded.pack_id,
      name = excluded.name,
      job = excluded.job,
      repeats_when = excluded.repeats_when,
      is_desk = excluded.is_desk,
      sort_order = excluded.sort_order,
      grok_template_url = excluded.grok_template_url;
