-- Run this first in Supabase: SQL Editor > New query > paste > Run.
create table if not exists admins (user_id uuid primary key references auth.users on delete cascade);

create or replace function is_admin() returns boolean
language sql security definer stable set search_path = public as
$$ select exists (select 1 from admins where user_id = auth.uid()) $$;

create table if not exists site_settings (
  id int primary key default 1 check (id = 1),
  phone text, mobile text, whatsapp text, email text, facebook text, instagram text, po_box text,
  address_en text, address_ar text, landmark_en text, landmark_ar text
);
create table if not exists content (key text primary key, en text, ar text);
create table if not exists treatments (
  id uuid primary key default gen_random_uuid(), slug text unique not null,
  name_en text not null, name_ar text, subtitle_en text, subtitle_ar text, summary_en text, summary_ar text,
  benefits_en text[] default '{}', benefits_ar text[] default '{}', image_url text,
  sort int default 0, published boolean default true
);
create table if not exists packages (
  id uuid primary key default gen_random_uuid(),
  name_en text not null, name_ar text, tag_en text, tag_ar text, text_en text, text_ar text,
  sort int default 0, published boolean default true
);
create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(), slug text unique not null,
  category_en text, category_ar text, title_en text not null, title_ar text, tagline_en text, tagline_ar text,
  excerpt_en text, excerpt_ar text, body_en text, body_ar text, cover_url text,
  minutes int default 4, published_at date default current_date, published boolean default true
);

alter table admins enable row level security;
alter table site_settings enable row level security;
alter table content enable row level security;
alter table treatments enable row level security;
alter table packages enable row level security;
alter table blog_posts enable row level security;

create policy "admin sees own row" on admins for select to authenticated using (user_id = auth.uid());
create policy "public read settings" on site_settings for select using (true);
create policy "admin write settings" on site_settings for all to authenticated using (is_admin()) with check (is_admin());
create policy "public read content" on content for select using (true);
create policy "admin write content" on content for all to authenticated using (is_admin()) with check (is_admin());
create policy "public read treatments" on treatments for select using (published or is_admin());
create policy "admin write treatments" on treatments for all to authenticated using (is_admin()) with check (is_admin());
create policy "public read packages" on packages for select using (published or is_admin());
create policy "admin write packages" on packages for all to authenticated using (is_admin()) with check (is_admin());
create policy "public read posts" on blog_posts for select using (published or is_admin());
create policy "admin write posts" on blog_posts for all to authenticated using (is_admin()) with check (is_admin());

insert into storage.buckets (id, name, public) values ('media', 'media', true) on conflict (id) do nothing;
create policy "admin manages media" on storage.objects for all to authenticated
  using (bucket_id = 'media' and is_admin()) with check (bucket_id = 'media' and is_admin());

-- After creating your first user (Authentication > Users > Add user), make them an admin:
--   insert into admins (user_id) select id from auth.users where email = 'YOU@EXAMPLE.COM';
