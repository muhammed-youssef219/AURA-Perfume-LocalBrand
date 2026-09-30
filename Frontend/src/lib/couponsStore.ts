export interface Coupon {
  code: string;
  type: "percent" | "fixed";
  value: number; // e.g. 10 for 10% or 50 for 50 EGP
  minOrder?: number;
  active: boolean;
}

const COUPONS_STORAGE_KEY = "aura_coupons_list";

export const defaultCoupons: Coupon[] = [
  { code: "AURA10", type: "percent", value: 10, minOrder: 300, active: true },
  { code: "WELCOME50", type: "fixed", value: 50, minOrder: 400, active: true },
  { code: "ROYAL20", type: "percent", value: 20, minOrder: 800, active: true },
];

export function getStoredCoupons(): Coupon[] {
  if (typeof window === "undefined") return defaultCoupons;
  try {
    const raw = localStorage.getItem(COUPONS_STORAGE_KEY);
    if (!raw) return defaultCoupons;
    return JSON.parse(raw);
  } catch {
    return defaultCoupons;
  }
}

export function saveStoredCoupons(coupons: Coupon[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(COUPONS_STORAGE_KEY, JSON.stringify(coupons));
  window.dispatchEvent(new Event("aura_coupons_updated"));
}

export function addCoupon(coupon: Coupon): void {
  const current = getStoredCoupons();
  const exists = current.some((c) => c.code.toUpperCase() === coupon.code.toUpperCase());
  if (exists) {
    saveStoredCoupons(
      current.map((c) => (c.code.toUpperCase() === coupon.code.toUpperCase() ? coupon : c))
    );
  } else {
    saveStoredCoupons([coupon, ...current]);
  }
}

export function deleteCoupon(code: string): void {
  const current = getStoredCoupons();
  saveStoredCoupons(current.filter((c) => c.code.toUpperCase() !== code.toUpperCase()));
}

export function validateCoupon(
  code: string,
  subtotal: number
): { valid: boolean; discount: number; message: string; coupon?: Coupon } {
  if (!code || !code.trim()) {
    return { valid: false, discount: 0, message: "يرجى إدخال كود الخصم" };
  }

  const coupons = getStoredCoupons();
  const found = coupons.find(
    (c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.active
  );

  if (!found) {
    return { valid: false, discount: 0, message: "كود الخصم غير صحيح أو منتهي الصلاحية" };
  }

  if (found.minOrder && subtotal < found.minOrder) {
    return {
      valid: false,
      discount: 0,
      message: `هذا الكوبون يتطلب حداً أدنى للطلب بقيمة ${found.minOrder} ج.م`,
    };
  }

  let discount = 0;
  if (found.type === "percent") {
    discount = Math.round((subtotal * found.value) / 100);
  } else {
    discount = Math.min(found.value, subtotal);
  }

  return {
    valid: true,
    discount,
    message: `تم تطبيق الخصم بنجاح (${found.type === "percent" ? `${found.value}%` : `${found.value} ج.م`})`,
    coupon: found,
  };
}

