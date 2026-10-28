-- Run once in the Supabase SQL Editor (new tables for the home hero slider).
create table if not exists hero_slides (
  id uuid primary key default gen_random_uuid(), image_url text,
  badge_en text, badge_ar text, kicker_en text, kicker_ar text,
  title_en text not null, title_ar text, sort int default 0, published boolean default true
);
alter table hero_slides enable row level security;
drop policy if exists "public read slides" on hero_slides;
drop policy if exists "admin write slides" on hero_slides;
create policy "public read slides" on hero_slides for select using (published or is_admin());
create policy "admin write slides" on hero_slides for all to authenticated using (is_admin()) with check (is_admin());

insert into hero_slides (sort, badge_en, badge_ar, kicker_en, kicker_ar, title_en, title_ar)
select * from (values
 (1,'Authentic Ayurveda','أيورفيدا أصيلة','Our philosophy','فلسفتنا','Balance & Natural Wellbeing','التوازن والعافية الطبيعية'),
 (2,'Kerala therapies','علاجات كيرالية','Our therapies','علاجاتنا','Shirodhara, Pizhichil & more','شيرودهارا وبيزيتشيل وغيرها'),
 (3,'Personal care','رعاية شخصية','Our promise','وعدنا','Care designed around you','رعاية مصممة حولك')
) v(sort, badge_en, badge_ar, kicker_en, kicker_ar, title_en, title_ar)
where not exists (select 1 from hero_slides);
