import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Check, Clock, PackageSearch } from "lucide-react";
import { getOrderTracking, TrackingOrder } from "@/lib/orders.functions";
import { getLocalOrders } from "@/lib/ordersService";
import { formatPrice, toArabicDigits } from "@/lib/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/track/$orderNumber")({
  head: ({ params }) => ({
    meta: [
      { title: `متابعة الطلب ${params.orderNumber} | دار العطور` },
      {
        name: "description",
        content: "تابع حالة طلبك من دار العطور وخط زمن التحديثات حتى التسليم.",
      },
      { property: "og:title", content: "متابعة الطلب | دار العطور" },
      { property: "og:description", content: "حالة طلبك الحالية وتفاصيله." },
    ],
  }),
  component: TrackOrder,
});

const STEPS = [
  { id: "pending", label: "تم استلام الطلب" },
  { id: "confirmed", label: "تم تأكيد الطلب" },
  { id: "processing", label: "جاري التجهيز والتحضير" },
  { id: "shipped", label: "تم الشحن وخرج للتسليم" },
  { id: "delivered", label: "تم التسليم بنجاح" },
] as const;

const PAYMENTS: Record<string, string> = {
  cod: "الدفع عند الاستلام",
  vodafone_cash: "فودافون كاش",
  instapay: "إنستا باي",
};

function arabicDate(iso: string) {
  const d = new Date(iso);
  const s = new Intl.DateTimeFormat("ar-EG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(d);
  return toArabicDigits(s);
}

function normalizeStatus(st: string): number {
  if (st === "pending" || st === "received") return 0;
  if (st === "confirmed") return 1;
  if (st === "processing" || st === "preparing") return 2;
  if (st === "shipped") return 3;
  if (st === "delivered") return 4;
  return 0;
}

function TrackOrder() {
  const { orderNumber } = Route.useParams();
  const fetchOrder = useServerFn(getOrderTracking);
  const { data: serverData, isPending } = useQuery({
    queryKey: ["tracking", orderNumber],
    queryFn: () => fetchOrder({ data: { orderNumber } }),
  });

  const localOrder = React.useMemo(() => {
    if (typeof window === "undefined") return null;
    return getLocalOrders().find(
      (o) => o.order_number?.toLowerCase() === orderNumber?.toLowerCase()
    );
  }, [orderNumber]);

  const data = serverData || (localOrder as unknown as TrackingOrder | null);

  if (isPending && !localOrder) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center text-sm text-muted-foreground">
        جارٍ تحميل بيانات الطلب…
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <PackageSearch className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-6 font-display text-3xl">لم نجد هذا الطلب</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          تأكد من رقم الطلب <span className="font-bold">{toArabicDigits(orderNumber)}</span> ثم حاول
          مرة أخرى.
        </p>
        <Link
          to="/track"
          className="mt-8 inline-block bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground hover:bg-ink"
        >
          إدخال رقم آخر
        </Link>
      </div>
    );
  }

  const currentIndex = normalizeStatus(data.status);
  const eventByStatus = new Map(data.events?.map((e) => [e.status, e.created_at]) || []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <p className="text-[11px] tracking-widest text-muted-foreground">متابعة الطلب</p>
      <h1 className="mt-1 font-display text-4xl">{toArabicDigits(data.order_number)}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        تاريخ الطلب: {arabicDate(data.created_at)} — الحالة الحالية:{" "}
        <span className="font-bold text-foreground">
          {STEPS[currentIndex]?.label ?? "قيد المراجعة"}
        </span>
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <section className="border border-border bg-card p-6">
          <h2 className="font-display text-xl">خط زمن التحديثات</h2>
          <ol className="mt-6 space-y-0">
            {STEPS.map((step, i) => {
              const done = i <= currentIndex;
              const at = eventByStatus.get(step.id);
              return (
                <li key={step.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border",
                        done
                          ? "border-gold bg-gold text-accent-foreground"
                          : "border-border bg-background text-muted-foreground",
                      )}
                    >
                      {done ? <Check className="h-4 w-4" /> : <Clock className="h-3.5 w-3.5" />}
                    </span>
                    {i < STEPS.length - 1 && (
                      <span
                        className={cn("w-px flex-1", done ? "bg-gold" : "bg-border")}
                        style={{ minHeight: 34 }}
                      />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className={cn("text-sm font-bold", !done && "text-muted-foreground")}>
                      {step.label}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {at ? arabicDate(at) : "بانتظار التحديث"}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <aside className="space-y-6">
          <section className="border border-border bg-card p-6">
            <h2 className="font-display text-xl">تفاصيل الطلب</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {data.items.map((it, i) => (
                <li key={i} className="flex items-start justify-between gap-3">
                  <span>
                    {it.name}{" "}
                    <span className="text-xs text-muted-foreground">
                      ({toArabicDigits(String(it.size))} مل × {toArabicDigits(it.qty)})
                    </span>
                  </span>
                  <span className="whitespace-nowrap text-xs font-bold">
                    {formatPrice(it.unit_price * it.qty)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
              <Row label="المجموع الفرعي" value={formatPrice(data.subtotal)} />
              <Row label="الشحن" value={formatPrice(data.shipping)} />
              {data.cod_fee > 0 && (
                <Row label="رسوم الدفع عند الاستلام" value={formatPrice(data.cod_fee)} />
              )}
              <div className="flex items-center justify-between border-t border-border pt-3 font-bold">
                <span>الإجمالي</span>
                <span>{formatPrice(data.total)}</span>
              </div>
            </div>
          </section>

          <section className="border border-border bg-card p-6 text-sm">
            <h2 className="font-display text-xl">بيانات التوصيل</h2>
            <p className="mt-4">{data.customer_name}</p>
            <p className="mt-1 text-muted-foreground">
              {data.city} — {data.district}
            </p>
            <p className="mt-1 text-muted-foreground">{data.street}</p>
            <p className="mt-3 text-xs text-muted-foreground">
              طريقة الدفع: {PAYMENTS[data.payment_method] ?? data.payment_method}
            </p>
          </section>

          <Link
            to="/shop"
            className="block bg-primary px-8 py-3.5 text-center text-sm font-bold text-primary-foreground hover:bg-ink"
          >
            متابعة التسوق
          </Link>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-muted-foreground">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
