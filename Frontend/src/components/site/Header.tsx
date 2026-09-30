import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag } from "lucide-react";
import * as React from "react";
import { useCart } from "@/lib/cart";
import { toArabicDigits } from "@/lib/products";
import { getStoreSettings, StoreSettings } from "@/lib/storeSettings";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const nav = [
  { to: "/", label: "الرئيسية" },
  { to: "/shop", label: "المتجر" },
  { to: "/track", label: "تتبع طلبك" },
  { to: "/cart", label: "السلة" },
] as const;

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="6" className="fill-gold/15" />
      <path
        d="M11 12C11 10.8954 11.8954 10 13 10H19C20.1046 10 21 10.8954 21 12V24C21 25.1046 20.1046 26 19 26H13C11.8954 26 11 25.1046 11 24V12Z"
        className="stroke-gold"
        strokeWidth="1.5"
      />
      <path
        d="M14 10V8C14 7.44772 14.4477 7 15 7H17C17.5523 7 18 7.44772 18 8V10"
        className="stroke-gold"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13 14H19"
        className="stroke-gold"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = React.useState(false);
  const [settings, setSettings] = React.useState<StoreSettings>(getStoreSettings());

  React.useEffect(() => {
    const handleUpdate = () => {
      setSettings(getStoreSettings());
    };
    window.addEventListener("aura_settings_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("aura_settings_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur">
      {settings.enableAnnouncements && settings.announcementText && (
        <div className="bg-primary py-2 text-center text-[11px] tracking-wide text-primary-foreground sm:text-xs font-medium">
          {settings.announcementText}
        </div>
      )}
      <div className="mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-4 px-3 py-4">
        {/* Brand block — right side in RTL */}
        <div className="flex min-w-0 items-center gap-4 md:gap-8">
          <Link to="/" className="flex min-w-0 items-center gap-2.5 shrink-0">
            <LogoMark className="h-9 w-9 md:h-10 md:w-10" />
            <div className="min-w-0">
              <span className="block font-display text-xl leading-none text-foreground md:text-2xl">
                دار العطور
              </span>
              <span className="mt-1 block text-[9px] tracking-[0.3em] text-muted-foreground md:text-[10px] md:tracking-[0.35em]">
                MAISON DE PARFUM
              </span>
            </div>
          </Link>
          <nav className="hidden items-center gap-7 text-sm md:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground font-medium" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Center spacer */}
        <div className="hidden md:block" />

        {/* Actions — extreme left in RTL, separate buttons with small gap */}
        <div className="flex items-center justify-end gap-1.5">
          <Link
            to="/cart"
            aria-label="سلة الشراء"
            className="relative flex items-center justify-center rounded-sm border border-border p-2.5 transition-colors hover:border-gold"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[11px] font-bold text-accent-foreground">
                {toArabicDigits(count)}
              </span>
            )}
          </Link>
          <button
            type="button"
            aria-label="القائمة"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center justify-center rounded-sm border border-border p-2.5 text-foreground transition-colors hover:border-gold md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 bg-card p-0" dir="rtl">
          <SheetHeader className="border-b border-border px-5 py-5 text-right">
            <SheetTitle className="flex items-center gap-2.5">
              <LogoMark className="h-9 w-9" />
              <span className="font-display text-xl">دار العطور</span>
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col px-3 py-4">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-sm px-3 py-3 text-base text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                activeProps={{ className: "bg-muted text-foreground font-medium border-r-2 border-gold" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="mx-5 mt-2 h-px gold-rule" />
          <p className="px-5 py-4 text-xs text-muted-foreground">
            شحن مجاني للطلبات فوق {toArabicDigits(settings.freeShippingThreshold)} ج.م
          </p>
        </SheetContent>
      </Sheet>
    </header>
  );
}
