# Ibdaha Sah (ابدأها صح)

منصة تساعد طلاب فلسطين (خصوصاً غزة) بعد التوجيهي يختاروا تخصصهم الجامعي، يعرفوا معدلات القبول، ويبلشوا أول سنة جامعة صح. الجمهور المستهدف طلاب عرب، فكل المحتوى بالعربي واللي بالموقع RTL بالكامل.

## Stack

- React 19 + Vite (بدون TypeScript)
- react-router-dom للتنقل بين الصفحات
- بدون باك إند وبدون قاعدة بيانات — كل المحتوى static جوا ملفات JSON بمجلد src/data
- Tailwind CSS v4 عن طريق @tailwindcss/vite plugin (مضاف بـ vite.config.js). src/index.css فيه `@import "tailwindcss";` + بلوك `@theme` واحد بيعرّف توكنز الألوان والخط المشتركة (primary, ink, muted, surface, border, success, font-sans) — هاد هو المكان الوحيد المسموح فيه قيم hex مباشرة. ما تضيفيش CSS مخصص تاني فيه ولا بملفات .css منفصلة؛ كل الستايل الباقي (مسافات، حدود، ظلال، تخطيط) بيتكتب مباشرة كـ utility classes بالـ className جوا الكومبوننتات، وأي لون بيستخدم التوكنز المعرّفة بـ@theme (bg-primary, text-ink...) مش قيم Tailwind الافتراضية (bg-blue-950, text-amber-600...).

## هيكلة المجلدات — التزم فيها دايماً

- `src/pages/` — صفحات على مستوى route (يلي مربوطة براوت بـ App.jsx). كل صفحة ملف واحد.
- `src/components/` — قطع UI قابلة لإعادة الاستخدام (كارد، هيدر، فوتر، اقتباس طالب...). أي عنصر UI متكرر أكتر من مرة لازم يصير component هون، مش نسخ ولصق جوا الصفحات.
- `src/data/` — محتوى الموقع الفعلي (majors.json, resources.json, guide.json, guideFaq.json, home.json). المحتوى (أسماء تخصصات، معدلات، نصوص) ما بينكتب جوا كود الكومبوننتات، دايماً جوا ملفات JSON هون. **مفيش ملف universities.json** — بيانات الجامعات مُشتقة وقت التشغيل من majors.json (شوفي src/utils/universities.js) عشان تضل متزامنة مع المصدر الوحيد للحقيقة ومتحدّث تلقائياً.
- `src/utils/` — دوال مساعدة بحتة (زي حساب ملخص المعدل، اشتقاق قائمة الجامعات)، بدون JSX.
- `src/context/` — React Context مشترك بين أكتر من صفحة (مثال: CompareContext لحالة "قارن بين تخصصات" — مشتركة بين Majors، صفحة الجامعة، وCompare).

## قواعد الكود

- Functional components بس مع hooks، بدون class components.
- كل component بملفه الخاص، اسم الملف PascalCase مطابق لاسم الكومبوننت (مثال: MajorCard.jsx).
- لا تكرري نفس بنية الـ UI بأكتر من صفحة — لو حسيت إنك عم تنسخي/تلصقي JSX، استخرجيه لـ component جديد بـ src/components.
- الألوان والمسافات والحدود والظلال دايماً عن طريق Tailwind utility classes، ما تكتبيش قيم hex مباشرة بالكومبوننتات (الاستثناء الوحيد هو بلوك `@theme` بـsrc/index.css). الهوية اللونية (توكنز معرّفة بـ@theme): **primary** (برتقالي/أحمر #E4572E، ولها **primary-hover** أغمق للـhover) للأزرار الرئيسية والشعار والعناصر التفاعلية المهمة، **ink** (رمادي داكن قريب من الأسود #111827) للنصوص الأساسية والعناوين وأي خلفية داكنة (فوتر، بانرات CTA، هيدر تفاصيل التخصص)، **muted** (#6B7280) للنصوص الثانوية، **surface** (#F7F7F8) لخلفيات الأقسام الفاتحة بين الأقسام البيضاء، **border** (#E5E7EB) لكل الحدود الفاتحة، **success** (#16A34A) محجوز لمؤشرات إيجابية مستقبلية. استخدمي `bg-primary/10` أو `text-primary` بدل درجات amber، و`text-ink`/`bg-surface`/`border-border` بدل درجات blue-950/stone. نصف قطر الحواف الموحّد rounded-2xl للبطاقات وrounded-full للأزرار والـbadges، shadow-sm افتراضي وshadow-md/lg عند hover.
- كل النصوص بالواجهة بالعربي الفلسطيني البسيط (نفس لهجة باقي الموقع)، وخلي التخطيط متوافق مع RTL (الموقع أصلاً dir="rtl" من index.html).
- ما تضيفيش مكتبات جديدة (npm install لحزمة UI أو state management) بدون داعي واضح — المشروع مقصود يكون بسيط وخفيف.

## قبل ما تعتبري أي تعديل خلص

1. `npx oxlint` — لازم يطلع بدون أخطاء.
2. `npm run build` — لازم يبني بدون أخطاء.
3. إذا التعديل بصفحة أو كومبوننت معين، جربيه بـ `npm run dev` وتأكدي بصرياً إنه شغال زي المتوقع.

## بيانات التخصصات (majors.json)

- كل عنصر لازم يحافظ على نفس الحقول الموجودة حالياً (id, name, faculty, track, duration, admission, subjectsY1, skillsNeeded, skillsToLearnNow, careers, relatedMajors, studentQuote) — لا تحذفي حقل موجود ولا تغيّري اسمه بدون ما تحدّثي كل مكان بيستخدمه.
- أي معدل قبول لسه مش مؤكد رسمياً لازم يكون معه `"verified": false` بعنصره جوا admission — هاد بيتحكم بظهور تنبيه "معدل تقريبي" تلقائياً بالواجهة (شوفي src/utils/majors.js → gpaSummary).
- 3 حقول اختيارية لصفحة `/compare` — `difficultyScore` (رقم 1-10)، `marketDemand` ({level, description})، `coreSubjects` (قائمة نصوص) — موثّقة بتفصيل بأعلى `scripts/build_majors.py`. ما تضيفيهاش لتخصص إلا لما يكون فيه مصدر بشري موثوق لهاد التخصص بالذات؛ لو التخصص ما معه الحقل، لازم الواجهة تعرضه كـ"قريباً" مش تختلق قيمة.