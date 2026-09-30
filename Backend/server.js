import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory / Mock DB fallback
let orders = [
  {
    id: "AT-100201",
    order_number: "AT-100201",
    customer_name: "أحمد محمود",
    phone: "01012345678",
    email: "ahmed@example.com",
    city: "القاهرة",
    district: "التجمع الخامس",
    street: "شارع التسعين الشمالي، فيلا 42",
    notes: "يرجى الاتصال قبل الوصول",
    payment_method: "vodafone_cash",
    items: [{ id: "oud-malaki", name: "عود ملكي", size: 100, qty: 1, unit_price: 520 }],
    subtotal: 520,
    shipping: 0,
    cod_fee: 0,
    total: 520,
    status: "shipped",
    created_at: new Date().toISOString()
  }
];

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "AURA Backend API", timestamp: new Date() });
});

// Orders API
app.get("/api/orders", (req, res) => {
  res.json({ orders });
});

app.post("/api/orders", (req, res) => {
  const newOrder = {
    ...req.body,
    id: req.body.order_number || `AT-${Math.floor(100000 + Math.random() * 899999)}`,
    created_at: new Date().toISOString(),
    status: "pending"
  };
  orders.unshift(newOrder);
  res.status(201).json({ success: true, order: newOrder });
});

app.get("/api/orders/track/:orderNumber", (req, res) => {
  const { orderNumber } = req.params;
  const order = orders.find(o => o.order_number?.toLowerCase() === orderNumber?.toLowerCase());
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  res.json({ order });
});

app.patch("/api/orders/:orderNumber/status", (req, res) => {
  const { orderNumber } = req.params;
  const { status } = req.body;
  const order = orders.find(o => o.order_number?.toLowerCase() === orderNumber?.toLowerCase());
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  order.status = status;
  res.json({ success: true, order });
});

app.delete("/api/orders/:orderNumber", (req, res) => {
  const { orderNumber } = req.params;
  orders = orders.filter(o => o.order_number?.toLowerCase() !== orderNumber?.toLowerCase());
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`[AURA Backend] Server is running on http://localhost:${PORT}`);
});

