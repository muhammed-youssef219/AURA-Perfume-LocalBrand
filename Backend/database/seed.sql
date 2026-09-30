-- ==============================================================================
-- بيانات تجريبية اختيارية (Optional Seed Data)
-- ==============================================================================

INSERT INTO public.orders (
  order_number,
  customer_name,
  phone,
  email,
  city,
  district,
  street,
  notes,
  payment_method,
  items,
  subtotal,
  shipping,
  cod_fee,
  total,
  status
) VALUES 
(
  'AT-100201',
  'أحمد محمود',
  '01012345678',
  'ahmed@example.com',
  'القاهرة',
  'التجمع الخامس',
  'شارع التسعين الشمالي، فيلا 42',
  'يرجى الاتصال قبل الوصول بنصف ساعة',
  'vodafone_cash',
  '[{"id": "oud-malaki", "name": "عود ملكي", "size": 100, "qty": 1, "unit_price": 520}]'::jsonb,
  520.00,
  0.00,
  0.00,
  520.00,
  'shipped'
),
(
  'AT-100202',
  'سارة إبراهيم',
  '01198765432',
  'sara@example.com',
  'الإسكندرية',
  'سموحة',
  'شارع فوزي معاذ',
  'التوصيل في الفترة المسائية',
  'cod',
  '[{"id": "ward-taifi", "name": "ورد طائفي فاخر", "size": 50, "qty": 2, "unit_price": 380}]'::jsonb,
  760.00,
  0.00,
  15.00,
  775.00,
  'processing'
)
ON CONFLICT (order_number) DO NOTHING;

