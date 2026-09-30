import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PackageSearch } from "lucide-react";
import * as React from "react";

export const Route = createFileRoute("/track/")({
  head: () => ({
    meta: [
      { title: "متابعة الطلب | دار العطور" },
      {
        name: "description",
        content: "أدخل رقم طلبك لمتابعة حالته ومعرفة مراحل التجهيز والتسليم خطوة بخطوة.",
      },
      { property: "og:title", content: "متابعة الطلب | دار العطور" },
      { property: "og:description", content: "تتبّع حالة طلبك من دار العطور برقم الطلب." },
    ],
  }),
  component: TrackSearch,
});

export function normalizeOrderNumber(value: string) {
  const arabic = "٠١٢٣٤٥٦٧٨٩";
  return value
    .trim()
    .replace(/[٠-٩]/g, (d) => String(arabic.indexOf(d)))
    .toUpperCase()
    .replace(/\s+/g, "");
}

function TrackSearch() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState("");

  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <PackageSearch className="mx-auto h-12 w-12 text-gold" />
      <h1 className="mt-6 font-display text-3xl">متابعة الطلب</h1>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        أدخل رقم الطلب الذي وصلك بعد تأكيد الشراء لعرض حالته الحالية وخط زمن التحديثات.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const orderNumber = normalizeOrderNumber(value);
          if (orderNumber.length < 3) return;
          void navigate({ to: "/track/$orderNumber", params: { orderNumber } });
        }}
        className="mt-8 flex flex-col gap-3 sm:flex-row"
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="AT-١٢٣٤٥٦"
          aria-label="رقم الطلب"
          className="w-full border border-input bg-card px-3 py-3 text-center text-sm outline-none focus:border-gold"
        />
        <button
          type="submit"
          className="bg-primary px-8 py-3 text-sm font-bold text-primary-foreground hover:bg-ink"
        >
          تتبّع
        </button>
      </form>
    </div>
  );
}
