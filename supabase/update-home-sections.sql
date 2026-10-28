-- Run once in the Supabase SQL Editor. Adds package details, journey steps, FAQs, testimonials and a section background.
alter table site_settings add column if not exists conditions_bg_url text;
alter table packages add column if not exists image_url text, add column if not exists price int,
  add column if not exists duration_en text, add column if not exists duration_ar text,
  add column if not exists features_en text[] default '{}', add column if not exists features_ar text[] default '{}',
  add column if not exists popular boolean default false;

create table if not exists journey_steps (id uuid primary key default gen_random_uuid(), title_en text not null, title_ar text, text_en text, text_ar text, sort int default 0, published boolean default true);
create table if not exists faqs (id uuid primary key default gen_random_uuid(), q_en text not null, q_ar text, a_en text, a_ar text, sort int default 0, published boolean default true);
create table if not exists testimonials (id uuid primary key default gen_random_uuid(), name text not null, role_en text, role_ar text, quote_en text not null, quote_ar text, rating int default 5, image_url text, sort int default 0, published boolean default true);

alter table journey_steps enable row level security; alter table faqs enable row level security; alter table testimonials enable row level security;
drop policy if exists "public read journey" on journey_steps; drop policy if exists "admin write journey" on journey_steps;
drop policy if exists "public read faqs" on faqs; drop policy if exists "admin write faqs" on faqs;
drop policy if exists "public read testimonials" on testimonials; drop policy if exists "admin write testimonials" on testimonials;
create policy "public read journey" on journey_steps for select using (published or is_admin());
create policy "admin write journey" on journey_steps for all to authenticated using (is_admin()) with check (is_admin());
create policy "public read faqs" on faqs for select using (published or is_admin());
create policy "admin write faqs" on faqs for all to authenticated using (is_admin()) with check (is_admin());
create policy "public read testimonials" on testimonials for select using (published or is_admin());
create policy "admin write testimonials" on testimonials for all to authenticated using (is_admin()) with check (is_admin());

insert into journey_steps (sort, title_en, title_ar, text_en, text_ar)
select * from (values
 (1,'Consultation','الاستشارة','Meet your physician to talk through your health, history and goals.','تلتقي بطبيبك لمناقشة حالتك الصحية وتاريخك وأهدافك.'),
 (2,'Assessment','التقييم','Your constitution and condition are assessed the Ayurvedic way.','يُقيَّم نمط جسمك وحالتك وفق الطريقة الأيورفيدية.'),
 (3,'Personalised plan','خطة شخصية','You receive a plan of therapies, herbal support, diet and lifestyle guidance.','تحصل على خطة تشمل العلاجات والدعم العشبي والإرشاد الغذائي ونمط الحياة.'),
 (4,'Therapy','العلاج','Your therapies are carried out as prescribed by your physician.','تُنفَّذ علاجاتك كما يصفها طبيبك.'),
 (5,'Follow-up','المتابعة','Your progress is reviewed and the plan adjusted as needed.','تُراجَع حالتك ويُعدَّل البرنامج عند الحاجة.')
) v(sort,title_en,title_ar,text_en,text_ar) where not exists (select 1 from journey_steps);

insert into faqs (sort, q_en, q_ar, a_en, a_ar)
select * from (values
 (1,'Where is Dalma Ayurvedic in Sharjah?','أين يقع دالما أيورفيدك في الشارقة؟','We are at {address}.','نحن في {address}.'),
 (2,'What Ayurvedic treatments do you offer?','ما العلاجات الأيورفيدية التي تقدمونها؟','We offer traditional Kerala therapies including Shirodhara, Pizhichil, Elakizhi, Njavara Kizhi, Podikizhi, Kativasthi, Netra Tarpanam, Nasya, Bashpa Swedana and Abhyanga, plus weight loss and stress management packages.','نقدم علاجات كيرالية تقليدية منها شيرودهارا وبيزيتشيل وإيلاكيزهي ونجافارا كيزهي وبوديكيزهي وكاتيفاستي ونيترا تاربانام وناسيا وباشبا سويدانا وأبهيانجا، إضافة إلى باقات إنقاص الوزن وإدارة التوتر.'),
 (3,'What happens at my first visit?','ماذا يحدث في زيارتي الأولى؟','You meet the physician for a consultation about your health, history and goals. Treatments are then recommended to suit you.','تلتقي بالطبيب لاستشارة حول حالتك الصحية وتاريخك وأهدافك، ثم تُوصى بالعلاجات التي تناسبك.'),
 (4,'How do I book an appointment?','كيف أحجز موعدًا؟','Call {phone}, message us on WhatsApp or use the booking page. We will confirm a time with you.','اتصل على {phone} أو راسلنا عبر واتساب أو استخدم صفحة الحجز، وسنؤكد لك الموعد.'),
 (5,'How many sessions will I need?','كم جلسة سأحتاج؟','It depends on your condition and your plan. Your physician will advise you after the consultation.','يعتمد ذلك على حالتك وخطتك. سيخبرك طبيبك بعد الاستشارة.'),
 (6,'Is Ayurvedic treatment safe with my current medicines?','هل العلاج الأيورفيدي آمن مع أدويتي الحالية؟','Please tell your physician about all medicines you take. They will advise what is suitable. Never stop prescribed medicines without medical advice.','يرجى إخبار طبيبك بجميع الأدوية التي تتناولها ليرشدك إلى ما يناسبك. ولا توقف أي دواء موصوف دون استشارة طبية.'),
 (7,'Who provides the treatment?','من يقدّم العلاج؟','Treatments are provided by well-qualified and experienced Ayurvedic physicians.','يقدّم العلاج أطباء أيورفيدا مؤهلون وذوو خبرة.')
) v(sort,q_en,q_ar,a_en,a_ar) where not exists (select 1 from faqs);

-- Sample testimonials: UNPUBLISHED. Replace with real patients' words (with permission), then tick "Published".
insert into testimonials (sort, name, role_en, role_ar, quote_en, quote_ar, rating, published)
select * from (values
 (1,'Sample name','Treatment name','اسم العلاج','Replace this sample with a real patient’s words.','استبدل هذا النص برأي مريض حقيقي.',5,false),
 (2,'Sample name','Treatment name','اسم العلاج','Replace this sample with a real patient’s words.','استبدل هذا النص برأي مريض حقيقي.',5,false),
 (3,'Sample name','Treatment name','اسم العلاج','Replace this sample with a real patient’s words.','استبدل هذا النص برأي مريض حقيقي.',5,false)
) v(sort,name,role_en,role_ar,quote_en,quote_ar,rating,published) where not exists (select 1 from testimonials);

-- Package starter details (prices and durations left empty on purpose: enter your real ones in Admin → Packages).
update packages set features_en='{"Physician consultation","Personalised therapy plan","Diet and lifestyle guidance"}', features_ar='{"استشارة الطبيب","خطة علاج شخصية","إرشاد غذائي ونمط حياة"}' where name_en='Weight loss package' and (features_en is null or features_en='{}');
update packages set features_en='{"Physician consultation","Relaxation therapies such as Shirodhara","Guidance for better sleep"}', features_ar='{"استشارة الطبيب","علاجات استرخاء مثل شيرودهارا","إرشادات لنوم أفضل"}' where name_en='Stress management package' and (features_en is null or features_en='{}');
