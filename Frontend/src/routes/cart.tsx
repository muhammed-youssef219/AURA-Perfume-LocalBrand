import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, Tag, X, Check } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { lineProduct, useCart } from "@/lib/cart";
import { formatPrice, toArabicDigits } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "سلة الشراء | دار العطور" },
      {
        name: "description",
        content: "راجع العطور في سلتك، عدّل الكميات، واطّلع على إجمالي الطلب قبل إتمام الشراء.",
      },
      { property: "og:title", content: "سلة الشراء | دار العطور" },
      { property: "og:description", content: "راجع عطورك وعدّل الكميات قبل إتمام الطلب." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const {
    lines,
    setQty,
    remove,
    subtotal,
    discount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    shipping,
    total,
    count,
    freeShippingThreshold,
  } = useCart();

  const [couponCode, setCouponCode] = React.useState("");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode.trim());
    if (res.success) {
      toast.success(res.message);
      setCouponCode("");
    } else {
      toast.error(res.message);
    }
  };

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl">سلتك فارغة</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          لم تُضف أي عطر بعد. تصفّح المجموعة واختر ما يناسب ذوقك.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-block bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground hover:bg-ink"
        >
          تسوّق الآن
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-4xl">سلة الشراء</h1>
      <p className="mt-2 text-sm text-muted-foreground">{toArabicDigits(count)} قطعة في سلتك</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="divide-y divide-border border-y border-border">
          {lines.map((line) => {
            const p = lineProduct(line);
            if (!p) return null;
            return (
              <div
                key={line.key}
                className="grid grid-cols-[80px_minmax(0,1fr)] items-start gap-4 py-5 sm:grid-cols-[96px_minmax(0,1fr)_auto]"
              >
                <Link to="/product/$id" params={{ id: p.id }} className="shrink-0">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={900}
                    height={1100}
                    className="h-24 w-20 object-cover sm:h-28 sm:w-24 rounded"
                  />
                </Link>
                <div className="min-w-0">
                  <Link
                    to="/product/$id"
                    params={{ id: p.id }}
                    className="font-display text-lg hover:text-gold font-bold"
                  >
                    {p.name}
                  </Link>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {toArabicDigits(line.size)} مل · {p.concentration}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatPrice(line.unitPrice)} للقطعة
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <div className="flex items-center border border-border rounded-sm bg-card">
                      <button
                        aria-label="إنقاص الكمية"
                        onClick={() => setQty(line.key, line.qty - 1)}
                        className="p-2 hover:bg-muted"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-10 text-center text-sm font-bold">{toArabicDigits(line.qty)}</span>
                      <button
                        aria-label="زيادة الكمية"
                        onClick={() => setQty(line.key, line.qty + 1)}
                        className="p-2 hover:bg-muted"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => remove(line.key)}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> حذف
                    </button>
                  </div>
                </div>
                <div className="col-span-2 text-sm font-bold sm:col-span-1 sm:text-left">
                  {formatPrice(line.unitPrice * line.qty)}
                </div>
              </div>
            );
          })}
        </div>

        <aside className="h-fit border border-border bg-card p-6 rounded-lg shadow-sm">
          <h2 className="font-display text-xl font-bold">ملخص الطلب</h2>

          {/* Coupon Code Section */}
          <div className="mt-5 border-b border-border pb-4">
            {appliedCoupon ? (
              <div className="flex items-center justify-between rounded-md bg-gold/15 border border-gold/40 p-2.5 text-xs">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-gold" />
                  <span className="font-bold text-foreground">{appliedCoupon.code}</span>
                  <span className="text-[11px] text-muted-foreground">
                    ({appliedCoupon.type === "percent" ? `${appliedCoupon.value}%` : `${appliedCoupon.value} ج.م`})
                  </span>
                </div>
                <button
                  onClick={() => {
                    removeCoupon();
                    toast.info("تم إلغاء كود الخصم");
                  }}
                  className="rounded-full p-1 hover:bg-black/10 text-muted-foreground hover:text-destructive"
                  title="إزالة الكوبون"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="كود الخصم (مثل AURA10)"
                  className="w-full rounded-sm border border-input bg-background px-3 py-2 text-xs outline-none focus:border-gold uppercase"
                />
                <button
                  type="submit"
                  className="rounded-sm bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-ink shrink-0"
                >
                  تطبيق
                </button>
              </form>
            )}
          </div>

          <div className="mt-4 space-y-3 text-sm">
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

            {shipping > 0 && subtotal < freeShippingThreshold && (
              <p className="text-xs text-gold">
                أضف بقيمة {formatPrice(freeShippingThreshold - subtotal)} للحصول على شحن مجاني.
              </p>
            )}

            <div className="mt-2 h-px w-full gold-rule" />
            <div className="flex justify-between text-base font-bold">
              <span>الإجمالي</span>
              <span className="text-gold">{formatPrice(total)}</span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="mt-6 block rounded-sm bg-primary px-6 py-3.5 text-center text-sm font-bold text-primary-foreground shadow-sm hover:bg-ink transition-colors"
          >
            إتمام الطلب
          </Link>
          <Link
            to="/shop"
            className="mt-3 block px-6 py-2 text-center text-xs text-muted-foreground hover:text-foreground"
          >
            متابعة التسوق
          </Link>
        </aside>
      </div>
    </div>
  );
}
