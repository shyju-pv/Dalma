-- Run once in the Supabase SQL Editor.
alter table packages add column if not exists suitable_en text, add column if not exists suitable_ar text;

-- Remove duplicate packages (happens if seed.sql was run twice), then prevent it from happening again.
-- (Keeps the oldest copy. If you edited the newer copy, delete the other one in Admin instead.)
delete from packages a using packages b where a.ctid > b.ctid and a.name_en = b.name_en;
create unique index if not exists packages_name_en_key on packages (name_en);

update packages set suitable_en='Weight management and a healthy lifestyle', suitable_ar='إدارة الوزن ونمط حياة صحي' where name_en='Weight loss package' and suitable_en is null;
update packages set suitable_en='Stress, poor sleep and mental fatigue', suitable_ar='التوتر وقلة النوم والإرهاق الذهني' where name_en='Stress management package' and suitable_en is null;
