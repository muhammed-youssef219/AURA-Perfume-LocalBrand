# 🏛️ AURA LocalBrand — Backend API & Database

هذا المجلد يمثل الباك ايند المستقل لمتجر **دار العطور (AURA)**.

---

## 📁 محتويات المجلد (Folder Structure)

```text
Backend/
├── database/
│   ├── schema.sql      # المخطط الكامل لقاعدة البيانات (Supabase / PostgreSQL)
│   └── seed.sql        # بيانات تجريبية جاهزة للطلبات
├── server.js           # خادم REST API مستقل مبني بـ Node.js / Express
├── package.json        # إعدادات وتشغيل سيرفر الباك ايند
└── README.md           # هذا التوثيق الشامل
```

---

## 🚀 تشغيل الباك ايند

### 1. إعداد قاعدة بيانات Supabase
1. افتح **Supabase Dashboard** -> **SQL Editor**.
2. انسخ محتوى `database/schema.sql` واضغط **Run**.

### 2. تشغيل سيرفر REST API المستقل (اختياري)
```bash
cd Backend
npm install
npm start
```
يعمل السيرفر على: `http://localhost:5000`
- `GET /api/health` — فحص حالة السيرفر
- `GET /api/orders` — عرض جميع الطلبات
- `POST /api/orders` — إنشاء طلب جديد
- `PATCH /api/orders/:orderNumber/status` — تحديث حالة الطلب
- `GET /api/orders/track/:orderNumber` — تتبع الطلب برقم الطلب

