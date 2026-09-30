# 👑 AURA LocalBrand | دار العطور
### *Luxury Perfume E-Commerce & Management Platform*

<div align="center">

![License](https://img.shields.io/badge/License-MIT-gold.svg)
![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.2-38B2AC?logo=tailwind-css&logoColor=white)
![TanStack](https://img.shields.io/badge/TanStack-Router_%26_Start-FF4154?logo=react-table&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Backend_API-339933?logo=node.js&logoColor=white)

<p align="center">
  <b>منصة تجارة إلكترونية فاخرة لعلامة تجارية متخصصة في صناعة وتوزيع العطور الشرقية والفرنسية الملكية</b><br>
  مبنية بأحدث تقنيات الويب العالمية مع دعم كامل للغة العربية (RTL)، لوحة تحكم إدارية شاملة، ونظام متكامل لتتبع وإدارة الطلبات.
</p>

[استعراض الموقع](http://localhost:8080) • [لوحة التحكم](http://localhost:8080/admin) • [توثيق الباك ايند](./Backend/README.md)

</div>

---

## 🌟 أبرز المميزات (Key Features)

### 🛍️ متجر العملاء (Storefront)
- **واجهة سينمائية (3D Video Hero)**: خلفية فيديو عالية الدقة مع جزيئات ذهبية متطايرة بتصميم متجاوب بالكامل لشاشات الموبايل والكمبيوتر.
- **مستشار العطور الذكي (Perfume Finder Quiz)**: كويز تفاعلي من 3 أسئلة يقترح العطر الأنسب لذوق العميل مع إمكانية الشراء الفوري.
- **كتالوج عطور تفاعلي**: استعراض العطور وتصفيتها حسب العائلة العطرية (شرقي، زهري، خشبي، منعش) والجنس، مع اختيار الأحجام وتحديث السعر تلقائياً.
- **سلة شراء ذكية وكوبونات خصم**: دعم الخصم بالنسب المئوية والمبالغ الثابتة مع إشعار بالحد الأدنى للشحن المجاني.
- **إتمام طلب مخصص لمصر**: دعم كامل لجميع **محافظات مصر (27 محافظة)** مع حساب رسوم الدفع عند الاستلام.
- **بوابات دفع متعددة**:
  - 💵 **الدفع عند الاستلام (COD)**.
  - 📱 **فودافون كاش (Vodafone Cash)** مع رفع إثبات التحويل وزر نسخ الرقم.
  - ⚡ **إنستا باي (InstaPay)** مع تعليمات التحويل الفوري.
- **تتبع مباشر للشحنات (`/track`)**: خط زمني تفاعلي لمراحل الطلب من الاستلام حتى التسليم للباب.
- **زر واتساب رسمي عائم**: فتح محادثة الدعم الفني مباشرة مع رسالة ترحيبية مهيئة تلقائياً.

---

### 🛡️ لوحة التحكم الإدارية الشاملة (`/admin`)
- 🔒 **حماية بكلمة مرور**: جلسة دخول آمنة مع إمكانية تغيير كلمة السر من الإعدادات.
- 📦 **إدارة الطلبات**: فلترة بالبحث والحالة، تغيير الحالات، معاينة إثباتات الدفع، **تصدير كشوفات CSV**، و**طباعة بوالص الشحن والفواتير**.
- 🧴 **إدارة المنتجات والمخزون**: إضافة عطور جديدة، تعديل الأسعار والأحجام، رفع الصور، وتفعيل أو إيقاف توفر المنتج بالمخزون بضغطة زر.
- 🎟️ **نظام الكوبونات**: إنشاء وتفعيل وحذف أكواد الخصم وتحديد نسب أو مبالغ التخفيض.
- ⚙️ **إعدادات المتجر المتغيرة**: تعديل رقم التحويل، رقم الواتساب، رسوم الدفع، حد الشحن المجاني، وشريط الإعلانات العلوي في الوقت الفعلي.

---

## 🏗️ هيكلية المشروع (Monorepo Architecture)

تم تقسيم المشروع إلى بيئتين مستقلتين (**Frontend & Backend**) لسهولة التطوير والرفع:

```text
AURA-LocalBrand/
│
├── 📁 Backend/                         # 🏛️ الباك ايند وقاعدة البيانات
│   ├── database/
│   │   ├── schema.sql                  # مخطط جداول Supabase / PostgreSQL والسياسات
│   │   └── seed.sql                    # بيانات تجريبية جاهزة للطلبات
│   ├── server.js                       # خادم REST API مستقل (Node.js & Express)
│   ├── package.json                    # حزم وتشغيل خادم الـ API
│   └── README.md                       # دليل تثبيت وربط قاعدة البيانات
│
├── 📁 Frontend/                        # 🎨 تطبيق الويب والمتجر الإلكتروني
│   ├── public/                         # الوسائط والفيديو وشعار العلامة التجارية
│   │   ├── hero.mp4                    # فيديو الخلفية الرئيسي
│   │   └── favicon.svg                 # أيقونة البراند الرسمية
│   ├── src/
│   │   ├── components/
│   │   │   ├── site/                   # مكونات الموقع (Hero, Header, Footer, Quiz, etc.)
│   │   │   └── ui/                     # مكونات واجهة المستخدم والتنبيهات
│   │   ├── routes/                     # مسارات وصفحات التطبيق (TanStack Router)
│   │   │   ├── index.tsx               # الرئيسية
│   │   │   ├── shop.tsx                # المتجر والفلترة
│   │   │   ├── product.$id.tsx         # تفاصيل المنتج
│   │   │   ├── cart.tsx                # سلة الشراء
│   │   │   ├── checkout.tsx            # إتمام الطلب
│   │   │   ├── track.index.tsx         # تتبع الطلب
│   │   │   ├── track.$orderNumber.tsx  # تفاصيل التتبع
│   │   │   └── admin.tsx               # لوحة التحكم
│   │   ├── lib/                        # منطق التطبيق والمخازن وسياق السلة
│   │   └── integrations/               # إعدادات وعميل Supabase
│   ├── package.json                    # حزم الفرونت ايند
│   ├── vite.config.ts                  # إعدادات محرك Vite
│   └── tsconfig.json                   # إعدادات TypeScript
│
├── package.json                        # تشغيل وإدارة المشروع من المجلد الرئيسي
└── README.md                           # هذا التوثيق التعريفي الشامل
```

---

## 💻 التقنيات المستخدمة (Tech Stack)

| المجال | التقنيات |
|---|---|
| **الواجهة الأمامية (Frontend)** | React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons |
| **التوجيه وإدارة الحالة** | TanStack Router, TanStack Query (React Query) |
| **قاعدة البيانات والخدمات السحابية** | Supabase (PostgreSQL), Row Level Security (RLS), Supabase Storage |
| **خادم الباك ايند (Backend API)** | Node.js, Express.js, CORS |
| **التنبيهات والمكونات التفاعلية** | Sonner Toasts, Radix UI Primitives, Canvas Particles |

---

## 🚀 التثبيت والتشغيل المحلي (Getting Started)

### 1. استنساخ المشروع
```bash
git clone https://github.com/your-username/AURA-LocalBrand.git
cd AURA-LocalBrand
```

### 2. تثبيت الحزم
```bash
# تثبيت حزم الفرونت ايند
cd Frontend && npm install

# تثبيت حزم الباك ايند (اختياري)
cd ../Backend && npm install
cd ..
```

### 3. تشغيل المشروع

**من المجلد الرئيسي مباشرة:**
```bash
# تشغيل المتجر (Frontend)
npm run dev

# أو تشغيل خادم الـ API (Backend)
npm run server
```

- رابط المتجر: `http://localhost:8080`
- لوحة التحكم: `http://localhost:8080/admin` *(كلمة السر الافتراضية: `aura`)*

---

## 🗄️ إعداد قاعدة بيانات Supabase (Database Setup)

1. أنشئ مشروعاً جديداً على [Supabase](https://supabase.com).
2. ادخل إلى قسم **SQL Editor** في لوحة التحكم.
3. انسخ محتوى الملف `Backend/database/schema.sql` والصقه في المحرر ثم اضغط **Run**.
4. حدّث ملف `Frontend/.env` بمعلومات الاتصال الخاصة بمشروعك:
```env
VITE_SUPABASE_URL="https://your-project.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="your-anon-key"
```

---

## 📱 التوافق والتجاوب (Responsive Design)

- ✅ **موبايل (iOS & Android)**: واجهة مرنة وسلسة، أزرار تفاعلية سفلية، وقائمة منزلقة سهلة الاستخدام.
- ✅ **أجهزة التابلت والكمبيوتر**: شبكة عرض متقدمة وتأثيرات بصرية راقية تبرز هوية البراند.
- ✅ **دعم كامل لاتجاه اليمين إلى اليسار (RTL)** بالخطوط العربية الأصيلة (*Tajawal & Amiri*).

---

## 📄 الترخيص (License)
هذا المشروع مرخص تحت رخصة **MIT**. يمكنك استخدامه وتطويره بحرية.

<div align="center">
  <sub>صُنِعَ بشغف لدار العطور الفاخرة © 2026 AURA LocalBrand. جميع الحقوق محفوظة.</sub>
</div>
