import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { useProducts, toArabicDigits } from "@/lib/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "المتجر | كل العطور — دار العطور" },
      {
        name: "description",
        content:
          "تصفّح مجموعة دار العطور الكاملة: عطور شرقية وزهرية وخشبية ومنعشة للرجال والنساء مع أسعار وأحجام متعددة.",
      },
      { property: "og:title", content: "المتجر | كل العطور — دار العطور" },
      {
        property: "og:description",
        content: "مجموعة كاملة من العطور الشرقية والزهرية والخشبية بأحجام وأسعار متعددة.",
      },
    ],
  }),
  component: Shop,
});

const families = ["الكل", "شرقي", "زهري", "خشبي", "منعش"] as const;
const genders = ["الكل", "رجالي", "نسائي", "للجنسين"] as const;
const sorts = [
  { id: "featured", label: "الأكثر تميزاً" },
  { id: "low", label: "الأقل سعراً" },
  { id: "high", label: "الأعلى سعراً" },
] as const;

function Shop() {
  const products = useProducts();
  const [family, setFamily] = React.useState<string>("الكل");
  const [gender, setGender] = React.useState<string>("الكل");
  const [sort, setSort] = React.useState<string>("featured");

  const list = React.useMemo(() => {
    const out = products.filter(
      (p) =>
        (family === "الكل" || p.family === family) && (gender === "الكل" || p.gender === gender),
    );
    if (sort === "low") return [...out].sort((a, b) => a.price - b.price);
    if (sort === "high") return [...out].sort((a, b) => b.price - a.price);
    return [...out].sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [products, family, gender, sort]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-4xl">المتجر</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {toArabicDigits(list.length)} عطر متاح من تركيباتنا الخاصة
      </p>
      <div className="mt-6 h-px w-full gold-rule" />

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {families.map((f) => (
            <button
              key={f}
              onClick={() => setFamily(f)}
              className={cn(
                "border px-4 py-2 text-xs transition-colors",
                family === f
                  ? "border-gold bg-gold text-accent-foreground"
                  : "border-border hover:border-gold",
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2">
            {genders.map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={cn(
                  "border px-3 py-1.5 text-xs transition-colors",
                  gender === g ? "border-foreground" : "border-border text-muted-foreground",
                )}
              >
                {g}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-border bg-card px-3 py-2 text-xs"
            aria-label="ترتيب"
          >
            {sorts.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {list.length === 0 ? (
        <p className="py-20 text-center text-sm text-muted-foreground">
          لا توجد عطور مطابقة لهذا الاختيار.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
