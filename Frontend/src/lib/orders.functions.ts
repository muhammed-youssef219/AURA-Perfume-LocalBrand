import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type TrackingItem = {
  name: string;
  size: number | string;
  qty: number;
  unit_price: number;
};

export type TrackingEvent = { status: string; created_at: string };

export type TrackingOrder = {
  order_number: string;
  customer_name: string;
  city: string;
  district: string;
  street: string;
  payment_method: string;
  items: TrackingItem[];
  subtotal: number;
  shipping: number;
  cod_fee: number;
  total: number;
  status: string;
  created_at: string;
  events: TrackingEvent[];
};

export const getOrderTracking = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) =>
    z.object({ orderNumber: z.string().min(3).max(40) }).parse(data),
  )
  .handler(async ({ data }): Promise<TrackingOrder | null> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const orderNumber = data.orderNumber.trim().toUpperCase();

    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .select(
        "id, order_number, customer_name, city, district, street, payment_method, items, subtotal, shipping, cod_fee, total, status, created_at",
      )
      .eq("order_number", orderNumber)
      .maybeSingle();

    if (error || !order) return null;

    const { data: events } = await supabaseAdmin
      .from("order_status_events")
      .select("status, created_at")
      .eq("order_id", order.id)
      .order("created_at", { ascending: true });

    const { id: _id, ...rest } = order;
    return {
      ...rest,
      items: (rest.items as unknown as TrackingItem[]) ?? [],
      events: (events as TrackingEvent[] | null) ?? [],
    } as TrackingOrder;
  });
