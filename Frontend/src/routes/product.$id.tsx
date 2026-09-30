import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, Minus, Plus, ShieldCheck, Truck, ArrowRight, PackageSearch } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { ProductCard } from "@/components/site/ProductCard";
import { useCart } from "@/lib/cart";
import { formatPrice, getProduct, useProducts, toArabicDigits, Product } from "@/lib/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    return { product: product || null };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.product) {
      return {
        meta: [{ title: "العطر غير متوفر | دار العطور" }, { name: "robots", content: "noindex" }],
      };
    }
    const p = loaderData.product;
    const desc = `${p.subtitle} — ${p.description}`.slice(0, 155);
    return {
      meta: [
        { title: `${p.name} | دار العطور` },
        { name: "description", content: desc },
        { property: "og:title", content: `${p.name} | دار العطور` },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useParams();
  const loaderData = Route.useLoaderData();
  const allProducts = useProducts();
  const { add } = useCart();
  const navigate = useNavigate({ from: "/product/$id" });

  // Dynamic product resolution (from live products store or loader fallback)
  const product: Product | undefined =
    allProducts.find((p) => p.id === id) || loaderData?.product || getProduct(id);

  const [sizeIndex, setSizeIndex] = React.useState(0);
  const [qty, setQty] = React.useState(1);

  React.useEffect(() => {
    setSizeIndex(0);
    setQty(1);
  }, [product]);

  if (!product) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <PackageSearch className="mx-auto h-16 w-16 text-muted-foreground" />
        <h1 className="mt-6 font-display text-3xl font-bold">العطر غير متوفر حالياً</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          ربما تم تعديل هذا العطر أو حذفه من الكتالوج.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center gap-2 bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground hover:bg-ink"
        >
          <span>تصفّح تشكيلة العطور</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const size = product.sizes?.[sizeIndex] ?? product.sizes?.[0] ?? { ml: 50, extra: 0 };
  const unitPrice = product.price + size.extra;
  const related = allProducts.filter((p) => p.id !== product.id).slice(0, 3);

  const handleOrderNow = () => {
    add(product, size.ml, unitPrice, qty);
    navigate({ to: "/checkout" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav className="text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          الرئيسية
        </Link>
        <span className="px-2">/</span>
        <Link to="/shop" className="hover:text-foreground">
          المتجر
        </Link>
        <span className="px-2">/</span>
        <span className="text-foreground font-semibold">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-lg bg-sand/40 border border-border">
          <img
            src={product.image}
            alt={`عطر ${product.name} — ${product.subtitle}`}
            width={900}
            height={1100}
            className="w-full object-cover aspect-[4/5]"
          />
        </div>

        <div>
          <p className="text-[11px] tracking-[0.3em] text-gold font-bold">
            {product.family} · {product.concentration}
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold">{product.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{product.subtitle}</p>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-foreground">{formatPrice(unitPrice)}</span>
            {product.oldPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <p
            className={cn(
              "mt-3 inline-flex items-center gap-2 text-xs font-semibold",
              product.inStock ? "text-emerald-600 dark:text-emerald-400" : "text-destructive",
            )}
          >
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                product.inStock ? "bg-emerald-500" : "bg-destructive",
              )}
            />
            {product.inStock ? "متوفر — يُشحن خلال ٢-٤ أيام" : "نفد المخزون حالياً"}
          </p>

          <p className="mt-6 text-sm leading-8 text-muted-foreground">{product.description}</p>

          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-7">
              <p className="text-xs font-bold text-foreground">الحجم</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s, i) => (
                  <button
                    key={s.ml}
                    onClick={() => setSizeIndex(i)}
                    className={cn(
                      "border px-5 py-2.5 text-sm transition-colors rounded-sm font-semibold",
                      size.ml === s.ml
                        ? "border-gold bg-gold text-accent-foreground"
                        : "border-border hover:border-gold",
                    )}
                  >
                    {toArabicDigits(s.ml)} مل
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center border border-border rounded-sm bg-card">
              <button
                aria-label="إنقاص"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="p-3 hover:bg-muted"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center text-sm font-bold">{toArabicDigits(qty)}</span>
              <button
                aria-label="زيادة"
                onClick={() => setQty((q) => Math.min(20, q + 1))}
                className="p-3 hover:bg-muted"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            <button
              disabled={!product.inStock}
              onClick={() => {
                add(product, size.ml, unitPrice, qty);
                toast.success(`تمت إضافة ${product.name} (${toArabicDigits(size.ml)} مل) إلى السلة`);
              }}
              className="w-full rounded-sm bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground shadow-sm"
            >
              {product.inStock ? "أضف إلى السلة" : "نفد المخزون"}
            </button>
            <button
              disabled={!product.inStock}
              onClick={handleOrderNow}
              className="w-full rounded-sm border border-gold bg-transparent px-8 py-3.5 text-sm font-bold text-gold transition-colors hover:bg-gold hover:text-accent-foreground disabled:cursor-not-allowed disabled:border-muted disabled:text-muted-foreground"
            >
              اطلب الآن
            </button>
          </div>

          <div className="mt-8 grid gap-3 border-t border-border pt-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-gold" /> شحن سريع لجميع محافظات مصر
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-gold" /> ضمان أصالة المنتج وثبات يدوم ٢٤ ساعة
            </span>
          </div>

          {product.notes && (
            <div className="mt-8 grid gap-5 border border-border p-5 sm:grid-cols-3 rounded-lg bg-card/60">
              {[
                { t: "المقدمة", v: product.notes.top },
                { t: "القلب", v: product.notes.heart },
                { t: "القاعدة", v: product.notes.base },
              ].map(
                (n) =>
                  n.v &&
                  n.v.length > 0 && (
                    <div key={n.t}>
                      <p className="font-display text-base font-bold text-foreground">{n.t}</p>
                      <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                        {n.v.map((x) => (
                          <li key={x} className="flex items-center gap-1.5">
                            <Check className="h-3 w-3 text-gold" /> {x}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
              )}
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl font-bold">قد يعجبك أيضاً</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
