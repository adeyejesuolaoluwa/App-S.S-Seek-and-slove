-- S.S. PostgreSQL schema
-- Apply with a managed PostgreSQL migration tool in deployment.

create extension if not exists "pgcrypto";

create type user_role as enum ('USER', 'ADMIN');
create type project_status as enum ('DRAFT', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED');
create type order_status as enum ('PENDING', 'PAID', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');
create type customization_status as enum ('REVIEW', 'AWAITING_PAYMENT', 'IN_PROGRESS', 'COMPLETED', 'DECLINED');

create table users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  display_name text,
  role user_role not null default 'USER',
  auth_provider text not null default 'passwordless',
  trial_started_at timestamptz,
  trial_ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  name text not null,
  product_type text not null,
  description text not null,
  purpose text not null,
  audience text not null,
  design_preferences text,
  features text,
  preferred_colors text,
  status project_status not null default 'DRAFT',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index projects_user_updated_idx on projects(user_id, updated_at desc);

create table lessons (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null,
  content jsonb not null default '{}'::jsonb,
  duration_minutes integer not null check (duration_minutes > 0),
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table learning_progress (
  user_id uuid not null references users(id) on delete cascade,
  lesson_id uuid not null references lessons(id) on delete cascade,
  completed_at timestamptz,
  progress_percent integer not null default 0 check (progress_percent between 0 and 100),
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null,
  price_cents integer not null check (price_cents >= 0),
  currency text not null default 'usd',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid not null references users(id),
  product_id uuid references products(id),
  plan_name text not null,
  amount_cents integer not null check (amount_cents >= 0),
  currency text not null default 'usd',
  payment_provider text not null default 'stripe',
  provider_session_id text unique,
  status order_status not null default 'PENDING',
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index orders_user_created_idx on orders(user_id, created_at desc);

create table customization_requests (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  user_id uuid not null references users(id),
  category text not null,
  details text not null,
  estimated_amount_cents integer,
  status customization_status not null default 'REVIEW',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  status text not null default 'NEW',
  created_at timestamptz not null default now()
);

create table notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  title text not null,
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);
create index notifications_user_unread_idx on notifications(user_id, created_at desc) where read_at is null;

create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references users(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index audit_logs_created_idx on audit_logs(created_at desc);
