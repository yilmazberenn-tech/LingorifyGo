create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  surname text not null check (char_length(surname) between 2 and 80),
  age smallint not null check (age between 1 and 120),
  email text not null check (char_length(email) <= 254),
  password_hash text not null,
  created_at timestamptz not null default now()
);

alter table public.users
  add column if not exists surname text not null default ''
  check (char_length(surname) <= 80);

alter table public.users
  alter column surname drop default;

alter table public.users
  add column if not exists age smallint
  check (age between 1 and 120);

create unique index if not exists users_email_lower_unique
  on public.users (lower(email));

alter table public.users enable row level security;
