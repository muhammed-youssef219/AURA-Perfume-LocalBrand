-- ==============================================================================
-- دار العطور (AURA) - Complete Database Schema (Supabase / PostgreSQL)
-- ==============================================================================

-- 1. جدول الطلبات (Orders Table)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  city TEXT NOT NULL,
  district TEXT NOT NULL,
  street TEXT NOT NULL,
  notes TEXT,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('cod', 'vodafone_cash', 'instapay')),
  items JSONB NOT NULL,
  subtotal NUMERIC(10,2) NOT NULL,
  shipping NUMERIC(10,2) NOT NULL DEFAULT 0,
  cod_fee NUMERIC(10,2) NOT NULL DEFAULT 0,
  total NUMERIC(10,2) NOT NULL,
  proof_path TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- الفهارس لتحسين سرعة البحث
CREATE INDEX IF NOT EXISTS orders_order_number_idx ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON public.orders(created_at DESC);

-- 2. جدول أحداث وتتبع حالة الطلبات (Order Tracking Timeline)
CREATE TABLE IF NOT EXISTS public.order_status_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS order_status_events_order_id_idx ON public.order_status_events(order_id, created_at);

-- 3. تفعيل الحماية والصلاحيات (Row Level Security & Permissions)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_status_events ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON public.orders TO anon, authenticated;
GRANT SELECT ON public.orders TO anon, authenticated;
GRANT ALL ON public.orders TO service_role;

GRANT SELECT ON public.order_status_events TO anon, authenticated;
GRANT ALL ON public.order_status_events TO service_role;

-- سياسات الأمان
CREATE POLICY "Anyone can place an order"
  ON public.orders FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read order by order_number"
  ON public.orders FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can read order tracking events"
  ON public.order_status_events FOR SELECT TO anon, authenticated
  USING (true);

-- 4. إعداد حاوية تخزين إثباتات الدفع (Payment Proofs Storage Bucket)
INSERT INTO storage.buckets (id, name, public)
VALUES ('payment-proofs', 'payment-proofs', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can upload payment proof"
  ON storage.objects FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'payment-proofs');

CREATE POLICY "Anyone can view payment proofs"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'payment-proofs');

-- 5. تريجر تسجيل تحديثات الحالة تلقائياً (Auto-Log Status Trigger)
CREATE OR REPLACE FUNCTION public.log_order_status_event()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.order_status_events(order_id, status) VALUES (NEW.id, NEW.status);
  ELSIF NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO public.order_status_events(order_id, status) VALUES (NEW.id, NEW.status);
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS orders_log_status_insert ON public.orders;
CREATE TRIGGER orders_log_status_insert
AFTER INSERT ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.log_order_status_event();

DROP TRIGGER IF EXISTS orders_log_status_update ON public.orders;
CREATE TRIGGER orders_log_status_update
AFTER UPDATE OF status ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.log_order_status_event();

