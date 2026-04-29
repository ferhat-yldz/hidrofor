create table if not exists public.admin_content (
  file text primary key,
  published jsonb not null,
  draft jsonb null,
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_backups (
  id uuid primary key default gen_random_uuid(),
  label text null,
  snapshot jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_auth_state (
  id int primary key,
  password_hash text not null,
  salt text not null,
  session_version int not null default 1,
  updated_at timestamptz not null default now()
);

alter table public.admin_content enable row level security;
alter table public.admin_backups enable row level security;
alter table public.admin_auth_state enable row level security;

-- Service role ile yazildigi icin anon/authenticated policy gerekmiyor.

insert into public.admin_auth_state (id, password_hash, salt, session_version)
values (1, '', '', 1)
on conflict (id) do nothing;
