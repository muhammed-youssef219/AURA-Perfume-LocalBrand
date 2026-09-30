import { supabase } from "@/integrations/supabase/client";

export interface OrderItem {
  id: string;
  name: string;
  size: number;
  qty: number;
  unit_price: number;
}

export interface OrderRecord {
  id: string;
  order_number: string;
  customer_name: string;
  phone: string;
  email?: string | null;
  city: string;
  district: string;
  street: string;
  notes?: string | null;
  payment_method: "cod" | "vodafone_cash" | "instapay" | string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  cod_fee: number;
  total: number;
  proof_path?: string | null;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | string;
  created_at: string;
}

const LOCAL_ORDERS_KEY = "aura_cached_orders";

export function getLocalOrders(): OrderRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalOrders(orders: OrderRecord[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(orders));
}

export function saveSingleLocalOrder(order: OrderRecord): void {
  const current = getLocalOrders();
  const exists = current.some((o) => o.order_number === order.order_number);
  if (!exists) {
    saveLocalOrders([order, ...current]);
  }
}

export async function fetchAllOrders(): Promise<{ orders: OrderRecord[]; error?: string }> {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Supabase fetch failed, falling back to cached orders", error);
      return { orders: getLocalOrders() };
    }

    const fetched = (data as unknown as OrderRecord[]) || [];
    // Merge with local orders
    const local = getLocalOrders();
    const map = new Map<string, OrderRecord>();

    [...fetched, ...local].forEach((o) => {
      if (o.order_number) map.set(o.order_number, o);
    });

    const combined = Array.from(map.values()).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    saveLocalOrders(combined);
    return { orders: combined };
  } catch (err) {
    return { orders: getLocalOrders(), error: String(err) };
  }
}

export async function updateOrderStatus(
  orderNumber: string,
  newStatus: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Update Supabase
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("order_number", orderNumber);

    if (error) {
      console.warn("Could not update status on Supabase:", error);
    }

    // 2. Update Local Cache
    const current = getLocalOrders();
    const updated = current.map((o) =>
      o.order_number === orderNumber ? { ...o, status: newStatus } : o
    );
    saveLocalOrders(updated);
    window.dispatchEvent(new Event("aura_orders_updated"));

    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

export async function deleteOrder(
  orderNumber: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Delete from Supabase
    await supabase.from("orders").delete().eq("order_number", orderNumber);

    // 2. Delete from Local Cache
    const current = getLocalOrders();
    const updated = current.filter((o) => o.order_number !== orderNumber);
    saveLocalOrders(updated);
    window.dispatchEvent(new Event("aura_orders_updated"));

    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

export function getPaymentProofUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  try {
    const { data } = supabase.storage.from("payment-proofs").getPublicUrl(path);
    return data?.publicUrl || null;
  } catch {
    return null;
  }
}

