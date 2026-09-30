import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Banknote, Check, CheckCircle2, Copy, Smartphone, Upload, X } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lineProduct, useCart } from "@/lib/cart";
import { formatPrice, toArabicDigits } from "@/lib/products";
import { saveSingleLocalOrder } from "@/lib/ordersService";
import { getStoreSettings } from "@/lib/storeSettings";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "إتمام الطلب | دار العطور" },
      {
        name: "description",
        content: "أدخل بيانات الشحن واختر طريقة الدفع لإتمام طلب عطورك من دار العطور.",
      },
      { property: "og:title", content: "إتمام الطلب | دار العطور" },
      { property: "og:description", content: "بيانات الشحن وطرق الدفع لإتمام طلبك." },
    ],
  }),
  component: Checkout,
});

const payments = [
  { id: "cod", label: "الدفع عند الاستلام", icon: Banknote, hint: "رسوم إضافية ١٥ ج.م" },
  { id: "vodafone_cash", label: "فودافون كاش", icon: Smartphone, hint: "تحويل على المحفظة" },
  { id: "instapay", label: "إنستا باي", icon: Smartphone, hint: "تحويل فوري عبر إنستا باي" },
] as const;

const governorates = [
  "القاهرة",
  "الجيزة",
  "الإسكندرية",
  "الدقهلية (المنصورة)",
  "القليوبية",
  "الشرقية (الزقازيق)",
  "المنوفية",
  "الغربية (طنطا / المحلة)",
  "البحيرة (دمنهور)",
  "كفر الشيخ",
  "دمياط",
  "بورسعيد",
  "الإسماعيلية",
  "السويس",
  "الفيوم",
  "بني سويف",
  "المنيا",
  "أسيوط",
  "سوهاج",
  "قنا",
  "الأقصر",
  "أسوان",
  "البحر الأحمر (الغردقة / الجونة)",
  "جنوب سيناء (شرم الشيخ / دهب)",
  "شمال سيناء",
  "مطروح (الساحل الشمالي)",
  "الوادي الجديد",
];

function Checkout() {
  const { lines, subtotal, discount, appliedCoupon, shipping, total, clear } = useCart();
  const navigate = useNavigate();
  const [method, setMethod] = React.useState<string>("cod");
  const [placed, setPlaced] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [proof, setProof] = React.useState<File | null>(null);
  const [proofUrl, setProofUrl] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);

  const settings = getStoreSettings();
  const needsTransfer = method === "vodafone_cash" || method === "instapay";
  const codFee = method === "cod" ? settings.codFee : 0;
  const grandTotal = total + codFee;

  React.useEffect(() => {
    return () => {
      if (proofUrl) URL.revokeObjectURL(proofUrl);
    };
  }, [proofUrl]);

  const pickProof = (file: File | null) => {
    if (proofUrl) URL.revokeObjectURL(proofUrl);
    setProof(file);
    setProofUrl(file ? URL.createObjectURL(file) : null);
  };

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(settings.transferNumber);
      setCopied(true);
      toast.success("تم نسخ الرقم");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("تعذّر النسخ، انسخ الرقم يدوياً");
    }
  };

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-gold" />
        <h1 className="mt-6 font-display text-3xl">تم استلام طلبك</h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          رقم الطلب <span className="font-bold text-foreground">{toArabicDigits(placed)}</span> —
          سنراجع الطلب ونتواصل معك لتأكيد الشحن قريباً.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <Link
            to="/track/$orderNumber"
            params={{ orderNumber: placed }}
            className="w-full max-w-xs bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground hover:bg-ink"
          >
            متابعة الطلب
          </Link>
          <Link
            to="/shop"
            className="w-full max-w-xs border border-gold px-8 py-3.5 text-sm font-bold text-gold hover:bg-gold hover:text-accent-foreground"
          >
            متابعة التسوق
          </Link>
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl">لا يوجد ما يمكن شراؤه</h1>
        <p className="mt-3 text-sm text-muted-foreground">أضف عطراً إلى السلة أولاً.</p>
        <Link
          to="/shop"
          className="mt-8 inline-block bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground hover:bg-ink"
        >
          تسوّق الآن
        </Link>
      </div>
    );
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (needsTransfer && !proof) {
      toast.error("يرجى رفع صورة إثبات التحويل");
      return;
    }
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const orderNumber = `AT-${Math.floor(100000 + Math.random() * 899999)}`;

    try {
      let proofPath: string | null = null;
      if (needsTransfer && proof) {
        const ext = proof.name.split(".").pop() ?? "jpg";
        proofPath = `${orderNumber}/${Date.now()}.${ext}`;
        try {
          const { error: upErr } = await supabase.storage
            .from("payment-proofs")
            .upload(proofPath, proof, { contentType: proof.type || "image/jpeg" });
          if (upErr) console.warn("Supabase storage upload warning:", upErr);
        } catch (storageErr) {
          console.warn("Storage upload skipped/fallback:", storageErr);
        }
      }

      const orderRecord = {
        id: orderNumber,
        order_number: orderNumber,
        customer_name: String(form.get("name") ?? ""),
        phone: String(form.get("phone") ?? ""),
        email: String(form.get("email") ?? ""),
        city: String(form.get("city") ?? ""),
        district: String(form.get("district") ?? ""),
        street: String(form.get("street") ?? ""),
        notes: String(form.get("notes") ?? ""),
        payment_method: method,
        items: lines.map((l) => ({
          id: l.productId,
          name: lineProduct(l).name,
          size: l.size,
          qty: l.qty,
          unit_price: l.unitPrice,
        })),
        subtotal,
        shipping,
        cod_fee: codFee,
        total: grandTotal,
        proof_path: proofPath,
        status: "pending",
        created_at: new Date().toISOString(),
      };

      saveSingleLocalOrder(orderRecord);

      try {
        const { error } = await supabase.from("orders").insert(orderRecord);
        if (error) console.warn("Supabase insert warning:", error);
      } catch (err) {
        console.warn("Supabase insert error (cached locally):", err);
      }

      clear();
      pickProof(null);
      setPlaced(orderNumber);
      toast.success("تم تأكيد الطلب بنجاح");
      void navigate({ to: "/checkout" });
    } catch {
      toast.error("تعذّر إرسال الطلب، حاول مرة أخرى");
    } finally {
      setSubmitting(false);
    }
  };

  const field =
    "mt-1.5 w-full border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-gold";

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-4xl">إتمام الطلب</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        الخطوة الأخيرة — أدخل بياناتك واختر طريقة الدفع.
      </p>

      <form onSubmit={onSubmit} className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-8">
          <section className="border border-border bg-card p-6">
            <h2 className="font-display text-xl">بيانات العميل</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block text-xs">
                الاسم الكامل
                <input required name="name" className={field} placeholder="محمد يوسف" />
              </label>
              <label className="block text-xs">
                رقم الموبايل
                <input
                  required
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  pattern="[0-9+ ]{9,15}"
                  className={field}
                  placeholder="01xxxxxxxxx"
                />
              </label>
              <label className="block text-xs sm:col-span-2">
                البريد الإلكتروني
                <input
                  required
                  name="email"
                  type="email"
                  className={field}
                  placeholder="name@email.com"
                />
              </label>
            </div>
          </section>

          <section className="border border-border bg-card p-6">
            <h2 className="font-display text-xl">عنوان الشحن</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block text-xs">
                المحافظة
                <select required name="city" className={field} defaultValue="القاهرة">
                  {governorates.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-xs">
                المنطقة
                <input required name="district" className={field} placeholder="مدينة نصر" />
              </label>
              <label className="block text-xs sm:col-span-2">
                العنوان التفصيلي
                <input required name="street" className={field} placeholder="الشارع، رقم العقار" />
              </label>
              <label className="block text-xs sm:col-span-2">
                ملاحظات للمندوب (اختياري)
                <textarea name="notes" rows={3} className={field} placeholder="مثال: الاتصال قبل الوصول" />
              </label>
            </div>
          </section>

          <section className="border border-border bg-card p-6">
            <h2 className="font-display text-xl">طريقة الدفع</h2>
            <div className="mt-5 grid gap-3">
              {payments.map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setMethod(p.id)}
                  className={cn(
                    "flex items-center gap-4 border p-4 text-right transition-colors",
                    method === p.id ? "border-gold bg-gold-soft/30" : "border-border hover:border-gold",
                  )}
                >
                  <p.icon className="h-5 w-5 shrink-0 text-gold" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold">{p.label}</span>
                    <span className="block text-xs text-muted-foreground">{p.hint}</span>
                  </span>
                  <span
                    className={cn(
                      "h-4 w-4 shrink-0 rounded-full border",
                      method === p.id ? "border-gold bg-gold" : "border-border",
                    )}
                  />
                </button>
              ))}
            </div>

            {needsTransfer && (
              <div className="mt-6 space-y-5 border-t border-border pt-6">
                <div className="border border-gold/50 bg-gold-soft/25 p-5">
                  <h3 className="text-sm font-bold">
                    {method === "vodafone_cash" ? "تعليمات التحويل عبر فودافون كاش" : "تعليمات التحويل عبر إنستا باي"}
                  </h3>
                  <ol className="mt-3 space-y-2 text-xs leading-6 text-muted-foreground">
                    <li>
                      ١. حوّل مبلغ{" "}
                      <span className="font-bold text-foreground">{formatPrice(grandTotal)}</span>{" "}
                      إلى الرقم التالي.
                    </li>
                    <li>
                      ٢.{" "}
                      {method === "vodafone_cash"
                        ? "استخدم تطبيق فودافون كاش أو كود ‎*٩*٧#‎ للتحويل."
                        : "استخدم تطبيق إنستا باي أو تطبيق البنك واختر التحويل برقم الموبايل."}
                    </li>
                    <li>٣. صوّر شاشة تأكيد التحويل وارفعها بالأسفل قبل تأكيد الطلب.</li>
                  </ol>
                  <div className="mt-4 flex items-center gap-3 border border-border bg-card px-4 py-3">
                    <span
                      dir="ltr"
                      className="flex-1 font-display text-xl tracking-widest text-foreground"
                    >
                      {toArabicDigits(settings.transferNumber)}
                    </span>
                    <button
                      type="button"
                      onClick={copyNumber}
                      className="flex items-center gap-1.5 bg-primary px-3 py-2 text-xs font-bold text-primary-foreground hover:bg-ink"
                    >
                      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      {copied ? "تم النسخ" : "نسخ الرقم"}
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold">
                    صورة إثبات التحويل <span className="text-destructive">*</span>
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    مطلوبة لتأكيد الطلب — ارفع لقطة شاشة واضحة لعملية التحويل.
                  </p>

                  {proofUrl ? (
                    <div className="mt-4 flex items-start gap-4 border border-border p-4">
                      <img
                        src={proofUrl}
                        alt="معاينة إثبات التحويل"
                        className="h-32 w-24 shrink-0 object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-bold">{proof?.name}</p>
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          {toArabicDigits(Math.max(1, Math.round((proof?.size ?? 0) / 1024)))} ك.ب
                        </p>
                        <button
                          type="button"
                          onClick={() => pickProof(null)}
                          className="mt-3 inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-xs hover:border-gold"
                        >
                          <X className="h-3.5 w-3.5" /> إزالة الصورة
                        </button>
                      </div>
                    </div>
                  ) : (
                    <label className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-gold/60 bg-gold-soft/15 px-4 py-8 text-center hover:bg-gold-soft/30">
                      <Upload className="h-6 w-6 text-gold" />
                      <span className="text-xs font-bold">اضغط لاختيار صورة الإثبات</span>
                      <span className="text-[11px] text-muted-foreground">
                        JPG أو PNG بحد أقصى ١٠ ميجابايت
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0] ?? null;
                          if (file && file.size > 10 * 1024 * 1024) {
                            toast.error("حجم الصورة أكبر من ١٠ ميجابايت");
                            return;
                          }
                          pickProof(file);
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>
            )}

            {method === "cod" && (
              <p className="mt-5 border-t border-border pt-5 text-xs leading-6 text-muted-foreground">
                ستدفع المبلغ كاملاً نقداً للمندوب عند استلام الطلب، مع رسوم تحصيل ١٥ ج.م.
              </p>
            )}
          </section>
        </div>

        <aside className="h-fit border border-border bg-card p-6 lg:sticky lg:top-32">
          <h2 className="font-display text-xl">ملخص الطلب</h2>
          <ul className="mt-5 space-y-4">
            {lines.map((line) => {
              const p = lineProduct(line);
              return (
                <li key={line.key} className="flex items-start gap-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={900}
                    height={1100}
                    className="h-16 w-14 shrink-0 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{p.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {toArabicDigits(line.size)} مل × {toArabicDigits(line.qty)}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs font-bold">
                    {formatPrice(line.unitPrice * line.qty)}
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">المجموع الفرعي</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>خصم الكوبون</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">الشحن</span>
              <span>{shipping === 0 ? "مجاني" : formatPrice(shipping)}</span>
            </div>
            {codFee > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">رسوم الدفع عند الاستلام</span>
                <span>{formatPrice(codFee)}</span>
              </div>
            )}
            <div className="h-px w-full gold-rule" />
            <div className="flex justify-between text-base font-bold">
              <span>الإجمالي</span>
              <span className="text-gold">{formatPrice(grandTotal)}</span>
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground hover:bg-ink disabled:opacity-70"
          >
            {submitting ? "جاري تأكيد الطلب..." : `تأكيد الطلب · ${formatPrice(grandTotal)}`}
          </button>
          {needsTransfer && !proof && (
            <p className="mt-3 text-center text-[11px] font-bold text-destructive">
              يجب رفع صورة إثبات التحويل لإتمام الطلب.
            </p>
          )}
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            بالضغط على تأكيد الطلب أنت توافق على سياسة الاستبدال والإرجاع.
          </p>
        </aside>
      </form>
    </div>
  );
}
