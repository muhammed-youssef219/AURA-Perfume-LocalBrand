import * as React from "react";
import { getProduct, type Product } from "./products";
import { getStoreSettings } from "./storeSettings";
import { validateCoupon, Coupon } from "./couponsStore";

export type CartLine = {
  key: string;
  productId: string;
  size: number;
  qty: number;
  unitPrice: number;
};

type CartCtx = {
  lines: CartLine[];
  add: (product: Product, size: number, unitPrice: number, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  discount: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  shipping: number;
  total: number;
  freeShippingThreshold: number;
};

const Ctx = React.createContext<CartCtx | null>(null);
const STORAGE_KEY = "dar-alatoor-cart";
const COUPON_STORAGE_KEY = "dar-alatoor-coupon";
const DEFAULT_SHIPPING = 25;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = React.useState<CartLine[]>([]);
  const [appliedCoupon, setAppliedCoupon] = React.useState<Coupon | null>(null);
  const [threshold, setThreshold] = React.useState<number>(
    getStoreSettings().freeShippingThreshold
  );

  // Load initial cart and coupon
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
      const rawCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
      if (rawCoupon) setAppliedCoupon(JSON.parse(rawCoupon) as Coupon);
    } catch {
      /* ignore */
    }

    const syncSettings = () => {
      setThreshold(getStoreSettings().freeShippingThreshold);
    };

    window.addEventListener("aura_settings_updated", syncSettings);
    window.addEventListener("storage", syncSettings);
    return () => {
      window.removeEventListener("aura_settings_updated", syncSettings);
      window.removeEventListener("storage", syncSettings);
    };
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  React.useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch {
      /* ignore */
    }
  }, [appliedCoupon]);

  const add: CartCtx["add"] = (product, size, unitPrice, qty = 1) => {
    const key = `${product.id}-${size}`;
    setLines((prev) => {
      const found = prev.find((l) => l.key === key);
      if (found) {
        return prev.map((l) => (l.key === key ? { ...l, qty: Math.min(l.qty + qty, 20) } : l));
      }
      return [...prev, { key, productId: product.id, size, qty, unitPrice }];
    });
  };

  const setQty: CartCtx["setQty"] = (key, qty) =>
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, qty: Math.min(qty, 20) } : l)),
    );

  const remove: CartCtx["remove"] = (key) => setLines((prev) => prev.filter((l) => l.key !== key));
  const clear = () => {
    setLines([]);
    setAppliedCoupon(null);
  };

  const count = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.qty * l.unitPrice, 0);

  // Compute discount
  let discount = 0;
  if (appliedCoupon && subtotal > 0) {
    if (appliedCoupon.minOrder && subtotal < appliedCoupon.minOrder) {
      // Minimum order not met
      discount = 0;
    } else if (appliedCoupon.type === "percent") {
      discount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else {
      discount = Math.min(appliedCoupon.value, subtotal);
    }
  }

  const shipping = lines.length === 0 || subtotal >= threshold ? 0 : DEFAULT_SHIPPING;
  const total = Math.max(0, subtotal - discount) + shipping;

  const applyCoupon: CartCtx["applyCoupon"] = (code: string) => {
    const result = validateCoupon(code, subtotal);
    if (result.valid && result.coupon) {
      setAppliedCoupon(result.coupon);
      return { success: true, message: result.message };
    }
    return { success: false, message: result.message };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <Ctx.Provider
      value={{
        lines,
        add,
        setQty,
        remove,
        clear,
        count,
        subtotal,
        discount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        shipping,
        total,
        freeShippingThreshold: threshold,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export const lineProduct = (line: CartLine) => getProduct(line.productId)!;
