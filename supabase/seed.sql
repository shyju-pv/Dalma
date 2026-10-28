-- Run after schema.sql. Starter content in English and Arabic (have both reviewed before launch).
insert into site_settings (id, phone, mobile, whatsapp, email, facebook, po_box, address_en, address_ar, landmark_en, landmark_ar) values
 (1, '+97165510666', '+971509678737', '971509678737', 'mail@dalmaayurvedic.com', 'https://www.facebook.com/ayurdalma/', '77302',
  'Al Zamil Building, Al Zahra Square, Sharjah, UAE', 'مبنى الزامل، ساحة الزهراء، الشارقة، الإمارات', 'Near Al Zahra Hospital', 'بالقرب من مستشفى الزهراء')
on conflict (id) do nothing;

insert into treatments (slug, sort, name_en, name_ar, subtitle_en, subtitle_ar, summary_en, summary_ar, benefits_en, benefits_ar) values
('shirodhara',1,'Shirodhara','شيرودهارا','Head and relaxation therapy','علاج الرأس والاسترخاء','A steady stream of warm medicated oil or liquid is poured over the forehead. It is traditionally used to calm the mind and support sleep.','يُسكب تيار هادئ ومستمر من الزيت أو السائل الطبي الدافئ على الجبهة. يُستخدم تقليديًا لتهدئة العقل ودعم النوم.','{"Stress management","Sleep wellness","Mental calm"}','{"إدارة التوتر","نوم هادئ","صفاء ذهني"}'),
('pizhichil',2,'Pizhichil','بيزيتشيل','Full-body oil therapy','علاج زيتي للجسم كله','Warm medicated oil is squeezed over the body from cloth pads while the body is gently massaged, a classic Kerala therapy for muscles and joints.','يُعصر زيت طبي دافئ فوق الجسم من قطع قماش مع تدليك لطيف، وهو علاج كيرالي كلاسيكي للعضلات والمفاصل.','{"Joint comfort","Muscle relaxation","Rejuvenation"}','{"راحة المفاصل","استرخاء العضلات","التجديد"}'),
('elakizhi',3,'Elakizhi','إيلاكيزهي','Herbal leaf poultice','كمادات الأوراق العشبية','Bundles of herbal leaves are heated in oil and applied to the body in a rhythmic massage to ease pain and stiffness.','تُسخَّن حزم من الأوراق العشبية في الزيت وتُطبَّق على الجسم بتدليك إيقاعي لتخفيف الألم والتيبس.','{"Stiffness relief","Pain comfort"}','{"تخفيف التيبس","راحة من الألم"}'),
('njavara-kizhi',4,'Njavara Kizhi','نجافارا كيزهي','Medicated rice therapy','علاج الأرز الطبي','Boluses of Njavara rice cooked in milk and herbal decoction are applied over the body to nourish and strengthen.','تُطبَّق كرات من أرز نجافارا المطبوخ بالحليب ومغلي الأعشاب على الجسم للتغذية والتقوية.','{"Strength","Muscle nourishment","Joint support"}','{"القوة","تغذية العضلات","دعم المفاصل"}'),
('podikizhi',5,'Podikizhi','بوديكيزهي','Herbal powder poultice','كمادات مسحوق الأعشاب','Warm boluses of herbal powder are applied to the body to ease pain, swelling and stiffness.','تُطبَّق كرات دافئة من مسحوق الأعشاب على الجسم لتخفيف الألم والتورم والتيبس.','{"Pain comfort","Stiffness relief"}','{"راحة من الألم","تخفيف التيبس"}'),
('kativasthi',6,'Kativasthi','كاتيفاستي','Lower back therapy','علاج أسفل الظهر','Warm medicated oil is held over the lower back in a ring of dough, traditionally used for back discomfort.','يُحبس زيت طبي دافئ فوق أسفل الظهر داخل حلقة من العجين، ويُستخدم تقليديًا لآلام الظهر.','{"Back comfort","Spine care"}','{"راحة الظهر","العناية بالعمود الفقري"}'),
('netra-tarpanam',7,'Netra Tarpanam','نيترا تاربانام','Eye therapy','علاج العين','Medicated ghee is held around the eyes in a ring of dough to soothe and refresh tired eyes.','يُحبس سمن طبي حول العينين داخل حلقة من العجين لتهدئة العيون المتعبة وإنعاشها.','{"Eye comfort","Reduced strain"}','{"راحة العين","تقليل الإجهاد"}'),
('nasya',8,'Nasya','ناسيا','Nasal therapy','العلاج الأنفي','Medicated oils are administered through the nose to support the head and neck region.','تُعطى زيوت طبية عبر الأنف لدعم منطقة الرأس والرقبة.','{"Head and neck care","Sinus comfort"}','{"العناية بالرأس والرقبة","راحة الجيوب الأنفية"}'),
('bashpa-swedana',9,'Bashpa Swedana','باشبا سويدانا','Herbal steam bath','حمام البخار العشبي','A warming herbal steam that induces sweating, often combined with oil therapy to ease stiffness.','بخار عشبي دافئ يحفّز التعرق، ويُدمج غالبًا مع العلاج بالزيوت لتخفيف التيبس.','{"Stiffness relief","Circulation","Relaxation"}','{"تخفيف التيبس","تنشيط الدورة الدموية","الاسترخاء"}'),
('abhyanga',10,'Abhyanga','أبهيانجا','Oil massage','تدليك بالزيوت','A full-body massage with warm medicated oil to relax muscles and support circulation.','تدليك للجسم كله بزيت طبي دافئ لإرخاء العضلات ودعم الدورة الدموية.','{"Relaxation","Circulation","Skin nourishment"}','{"الاسترخاء","الدورة الدموية","تغذية البشرة"}')
on conflict (slug) do nothing;

insert into packages (sort, name_en, name_ar, tag_en, tag_ar, text_en, text_ar) values
(1,'Weight loss package','باقة إنقاص الوزن','Slimming programme','برنامج التنحيف','A structured programme of therapies and guidance for healthy weight management.','برنامج منظم من العلاجات والإرشادات لإدارة الوزن بشكل صحي.'),
(2,'Stress management package','باقة إدارة التوتر','Mind and body calm','هدوء العقل والجسد','Relaxation therapies such as Shirodhara, designed to ease stress and support sleep.','علاجات استرخاء مثل شيرودهارا، مصممة لتخفيف التوتر ودعم النوم.');

insert into blog_posts (slug, published_at, minutes, category_en, category_ar, title_en, title_ar, tagline_en, tagline_ar, excerpt_en, excerpt_ar, body_en, body_ar) values
('understanding-ayurveda','2026-10-20',5,'Ayurveda','الأيورفيدا','Understanding Ayurveda & Holistic Wellness','فهم الأيورفيدا والعافية الشاملة','Body · Mind · Balance','جسد · عقل · توازن','How Ayurveda looks at balance between body, mind and daily habits.','كيف تنظر الأيورفيدا إلى التوازن بين الجسد والعقل والعادات اليومية.',
$$Ayurveda is a traditional system of health that began in India and is practised widely in Kerala. It looks at a person as a whole, with spiritual, mental and physical wellbeing seen together.

A central idea is balance. Ayurveda describes three constitutional types, or doshas, called Vata, Pitta and Kapha. Everyone has a mix of all three, and the mix shapes how a person tends to respond to food, weather, stress and sleep.

Treatment starts with understanding you: your history, routine, digestion and goals. From there, a physician may suggest therapies, herbal support, diet and lifestyle changes.

If you are curious where to begin, a consultation is the best first step. Your physician can explain what is suitable for you.$$,
$$الأيورفيدا نظام صحي تقليدي نشأ في الهند ويُمارس على نطاق واسع في ولاية كيرالا. ينظر إلى الإنسان ككل، فيرى العافية الروحية والذهنية والجسدية معًا.

الفكرة المحورية هي التوازن. تصف الأيورفيدا ثلاثة أنماط في التركيبة الجسدية تُسمى الدوشا: فاتا وبيتا وكافا. لدى كل شخص مزيج من الثلاثة، ويحدد هذا المزيج طريقة استجابته للطعام والطقس والتوتر والنوم.

يبدأ العلاج بفهمك أنت: تاريخك الصحي وروتينك وهضمك وأهدافك. بعد ذلك قد يقترح الطبيب علاجات ودعمًا عشبيًا وتغييرات في النظام الغذائي ونمط الحياة.

إذا كنت تتساءل من أين تبدأ، فالاستشارة هي الخطوة الأولى الأفضل. يستطيع طبيبك أن يشرح لك ما يناسبك.$$),
('what-is-shirodhara','2026-10-14',6,'Therapies','العلاجات','What Is Shirodhara? A Simple Guide','ما هو شيرودهارا؟ دليل مبسط','Calm · Restore · Renew','هدوء · استعادة · تجدد','A calm introduction to one of Kerala Ayurveda’s best-known therapies.','مقدمة هادئة عن أحد أشهر علاجات الأيورفيدا الكيرالية.',
$$Shirodhara, sometimes spelled Sirodhara, is a classic Ayurvedic therapy. Warm medicated oil or liquid is poured in a slow, steady stream over the forehead while you lie comfortably.

It is traditionally used to calm the mind and support restful sleep, and many people find the session deeply relaxing. It is often chosen as part of stress management programmes.

A session usually follows a short consultation, so the physician can choose the liquid that suits you. The number of sessions varies from person to person.

Shirodhara is not right for everyone. Tell your physician about your health and any medicines you take before you begin.$$,
$$شيرودهارا، وتُكتب أحيانًا سيرودهارا، علاج أيورفيدي كلاسيكي. يُسكب زيت أو سائل طبي دافئ في تيار بطيء ومستمر على الجبهة بينما تستلقي براحة.

يُستخدم تقليديًا لتهدئة العقل ودعم النوم الهانئ، ويجد كثيرون الجلسة مريحة للغاية. وغالبًا ما يُختار ضمن برامج إدارة التوتر.

تسبق الجلسةَ عادةً استشارة قصيرة ليختار الطبيب السائل الأنسب لك. ويختلف عدد الجلسات من شخص لآخر.

شيرودهارا ليس مناسبًا للجميع. أخبر طبيبك بحالتك الصحية وبأي أدوية تتناولها قبل البدء.$$),
('ayurvedic-diet','2026-10-08',4,'Diet & Lifestyle','النظام الغذائي ونمط الحياة','Ayurvedic Diet for Everyday Wellness','النظام الغذائي الأيورفيدي لعافية يومية','Eat mindfully · Live balanced','كل بوعي · عش بتوازن','Simple principles for mindful eating and a balanced daily routine.','مبادئ بسيطة للأكل الواعي وروتين يومي متوازن.',
$$In Ayurveda, food is part of treatment. The aim is to eat in a way that supports digestion and suits your constitution, the season and your daily life.

Some simple habits come up often: eat at regular times, make lunch the main meal, favour freshly cooked food, and eat without distraction.

Warm, lightly spiced foods are often recommended for digestion, while very cold or heavily processed food is eaten less. Your physician can suggest what suits you best.

Small, steady changes usually matter more than strict rules. Start with one habit and build from there.$$,
$$في الأيورفيدا يُعدّ الطعام جزءًا من العلاج. والهدف أن تأكل بطريقة تدعم الهضم وتناسب تركيبتك الجسدية والموسم وحياتك اليومية.

تتكرر بعض العادات البسيطة: تناول الطعام في مواعيد منتظمة، واجعل الغداء الوجبة الرئيسية، وفضّل الطعام المطبوخ طازجًا، وكل دون تشتت.

غالبًا ما يُنصح بالأطعمة الدافئة قليلة التوابل لدعم الهضم، بينما يُقلَّل من الأطعمة الباردة جدًا أو المصنّعة بكثرة. ويمكن لطبيبك أن يقترح ما يناسبك أكثر.

التغييرات الصغيرة والثابتة أهم عادةً من القواعد الصارمة. ابدأ بعادة واحدة ثم ابنِ عليها.$$)
on conflict (slug) do nothing;
