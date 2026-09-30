import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { formatPrice, type Product, toArabicDigits } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const navigate = useNavigate();
  const size = product.sizes?.[0] ?? { ml: 50, extra: 0 };
  const unitPrice = product.price + size.extra;

  const handleOrderNow = () => {
    add(product, size.ml, unitPrice, 1);
    navigate({ to: "/checkout" });
  };

  const handleAddToCart = () => {
    add(product, size.ml, unitPrice, 1);
    toast.success(`تمت إضافة ${product.name} إلى السلة`);
  };

  return (
    <div className="group flex flex-col overflow-hidden border border-border bg-card transition-all hover:border-gold hover:shadow-[0_14px_40px_-24px_oklch(0.32_0.055_45)]">
      <Link to="/product/$id" params={{ id: product.id }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-sand">
          <img
            src={product.image}
            alt={`عطر ${product.name}`}
            loading="lazy"
            width={900}
            height={1100}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {!product.inStock && (
            <span className="absolute top-3 right-3 bg-foreground/85 px-2.5 py-1 text-[11px] text-background">
              نفد المخزون
            </span>
          )}
          {product.oldPrice && product.inStock && (
            <span className="absolute top-3 right-3 bg-gold px-2.5 py-1 text-[11px] font-bold text-accent-foreground">
              عرض خاص
            </span>
          )}
        </div>
        <div className="p-4">
          <p className="text-[11px] tracking-widest text-muted-foreground">
            {product.family} · {product.gender}
          </p>
          <h3 className="mt-1.5 font-display text-lg">{product.name}</h3>
          <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{product.subtitle}</p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-sm font-bold">{formatPrice(unitPrice)}</span>
            {product.oldPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="mt-auto flex flex-col gap-2 border-t border-border p-4 pt-3">
        <button
          disabled={!product.inStock}
          onClick={handleAddToCart}
          className="w-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
        >
          {product.inStock ? "أضف إلى السلة" : "غير متوفر"}
        </button>
        <button
          disabled={!product.inStock}
          onClick={handleOrderNow}
          className="w-full border border-gold bg-transparent px-4 py-2.5 text-sm font-bold text-gold transition-colors hover:bg-gold hover:text-accent-foreground disabled:cursor-not-allowed disabled:border-muted disabled:text-muted-foreground"
        >
          اطلب الآن
        </button>
      </div>
    </div>
  );
}
