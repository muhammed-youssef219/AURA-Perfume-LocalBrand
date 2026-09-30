import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";
import {
  Package,
  ShoppingBag,
  TrendingUp,
  Users,
  Eye,
  EyeOff,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Search,
  CheckCircle,
  Clock,
  Truck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ExternalLink,
  Shield,
  Save,
  RotateCcw,
  Sparkles,
  Smartphone,
  Banknote,
  DollarSign,
  Tag,
  Store,
  Printer,
  Download,
  Percent,
  Layers,
  FileText,
  MapPin,
  Phone,
  Mail,
  X,
  Image as ImageIcon
} from "lucide-react";
import { toast } from "sonner";
import {
  Product,
  useProducts,
  saveStoredProducts,
  addStoredProduct,
  updateStoredProduct,
  deleteStoredProduct,
  resetStoredProducts,
  sampleImages,
  formatPrice,
  toArabicDigits
} from "@/lib/products";
import {
  OrderRecord,
  fetchAllOrders,
  updateOrderStatus,
  deleteOrder,
  getPaymentProofUrl
} from "@/lib/ordersService";
import {
  isAdminAuthenticated,
  loginAdmin,
  logoutAdmin,
  setAdminPassword
} from "@/lib/adminAuth";
import {
  Coupon,
  getStoredCoupons,
  saveStoredCoupons,
  addCoupon,
  deleteCoupon
} from "@/lib/couponsStore";
import { getStoreSettings, saveStoreSettings, StoreSettings } from "@/lib/storeSettings";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "لوحة التحكم الشاملة | دار العطور" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboard,
});

type TabType = "overview" | "orders" | "products" | "coupons" | "settings";

function AdminDashboard() {
  const [auth, setAuth] = React.useState<boolean>(false);
  const [passwordInput, setPasswordInput] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState<TabType>("overview");

  // Orders State
  const [orders, setOrders] = React.useState<OrderRecord[]>([]);
  const [loadingOrders, setLoadingOrders] = React.useState(true);
  const [orderSearch, setOrderSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [selectedOrder, setSelectedOrder] = React.useState<OrderRecord | null>(null);
  const [proofModalUrl, setProofModalUrl] = React.useState<string | null>(null);

  // Products State
  const products = useProducts();
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = React.useState(false);

  // Coupons State
  const [coupons, setCoupons] = React.useState<Coupon[]>(getStoredCoupons());
  const [isNewCouponOpen, setIsNewCouponOpen] = React.useState(false);
  const [newCoupon, setNewCoupon] = React.useState<Coupon>({
    code: "",
    type: "percent",
    value: 10,
    minOrder: 300,
    active: true,
  });

  // Settings State
  const [settings, setSettings] = React.useState<StoreSettings>(getStoreSettings());
  const [newPassword, setNewPassword] = React.useState("");

  // Check auth on mount
  React.useEffect(() => {
    setAuth(isAdminAuthenticated());
  }, []);

  // Load orders
  const loadOrders = React.useCallback(async () => {
    setLoadingOrders(true);
    const res = await fetchAllOrders();
    setOrders(res.orders);
    setLoadingOrders(false);
  }, []);

  React.useEffect(() => {
    if (auth) {
      loadOrders();
      setCoupons(getStoredCoupons());
    }
  }, [auth, loadOrders]);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(passwordInput)) {
      setAuth(true);
      toast.success("تم تسجيل الدخول بنجاح إلى لوحة التحكم");
      loadOrders();
    } else {
      toast.error("كلمة المرور غير صحيحة، حاول مجدداً");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    logoutAdmin();
    setAuth(false);
    toast.info("تم تسجيل الخروج");
  };

  // Status badge styling helper
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return {
          label: "قيد المراجعة",
          bg: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
          icon: Clock,
        };
      case "processing":
        return {
          label: "جاري التجهيز",
          bg: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
          icon: Package,
        };
      case "shipped":
        return {
          label: "تم الشحن",
          bg: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
          icon: Truck,
        };
      case "delivered":
        return {
          label: "مكتمل / تم التوصيل",
          bg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
          icon: CheckCircle2,
        };
      case "cancelled":
        return {
          label: "ملغي",
          bg: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
          icon: XCircle,
        };
      default:
        return {
          label: status,
          bg: "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400 border-zinc-500/30",
          icon: AlertCircle,
        };
    }
  };

  // Filtered orders
  const filteredOrders = React.useMemo(() => {
    return orders.filter((o) => {
      const matchStatus = statusFilter === "all" || o.status === statusFilter;
      const search = orderSearch.trim().toLowerCase();
      const matchSearch =
        !search ||
        o.order_number?.toLowerCase().includes(search) ||
        o.customer_name?.toLowerCase().includes(search) ||
        o.phone?.includes(search) ||
        o.city?.toLowerCase().includes(search);
      return matchStatus && matchSearch;
    });
  }, [orders, statusFilter, orderSearch]);

  // Statistics calculation
  const stats = React.useMemo(() => {
    const totalSales = orders
      .filter((o) => o.status !== "cancelled")
      .reduce((acc, curr) => acc + (Number(curr.total) || 0), 0);
    const totalCount = orders.length;
    const pendingCount = orders.filter((o) => o.status === "pending").length;
    const deliveredCount = orders.filter((o) => o.status === "delivered").length;
    const avgOrder = totalCount > 0 ? Math.round(totalSales / totalCount) : 0;

    const byGov: Record<string, number> = {};
    orders.forEach((o) => {
      const g = o.city || "غير محدد";
      byGov[g] = (byGov[g] || 0) + 1;
    });

    return { totalSales, totalCount, pendingCount, deliveredCount, avgOrder, byGov };
  }, [orders]);

  // Quick Status Update
  const handleUpdateStatus = async (orderNumber: string, status: string) => {
    const res = await updateOrderStatus(orderNumber, status);
    if (res.success) {
      toast.success(`تم تحديث حالة الطلب ${orderNumber} إلى ${getStatusBadge(status).label}`);
      setOrders((prev) =>
        prev.map((o) => (o.order_number === orderNumber ? { ...o, status } : o))
      );
      if (selectedOrder?.order_number === orderNumber) {
        setSelectedOrder((prev) => (prev ? { ...prev, status } : null));
      }
    } else {
      toast.error("تعذر تحديث الحالة");
    }
  };

  // Delete Order
  const handleDeleteOrder = async (orderNumber: string) => {
    if (confirm(`هل أنت متأكد من حذف الطلب ${orderNumber} نهائياً؟`)) {
      const res = await deleteOrder(orderNumber);
      if (res.success) {
        toast.success("تم حذف الطلب بنجاح");
        setOrders((prev) => prev.filter((o) => o.order_number !== orderNumber));
        if (selectedOrder?.order_number === orderNumber) {
          setSelectedOrder(null);
        }
      } else {
        toast.error("تعذر حذف الطلب");
      }
    }
  };

  // Export Orders to CSV
  const exportOrdersToCSV = () => {
    if (orders.length === 0) {
      toast.error("لا توجد طلبات لتصديرها");
      return;
    }

    const headers = [
      "رقم الطلب",
      "اسم العميل",
      "رقم الهاتف",
      "البريد الإلكتروني",
      "المحافظة",
      "المنطقة",
      "العنوان التفصيلي",
      "طريقة الدفع",
      "المجموع الفرعي",
      "الشحن",
      "الإجمالي",
      "الحالة",
      "تاريخ الطلب",
      "ملاحظات العميل",
    ];

    const rows = orders.map((o) => [
      o.order_number,
      o.customer_name,
      o.phone,
      o.email || "",
      o.city,
      o.district,
      `"${(o.street || "").replace(/"/g, '""')}"`,
      o.payment_method === "cod"
        ? "دفع عند الاستلام"
        : o.payment_method === "vodafone_cash"
        ? "فودافون كاش"
        : "إنستا باي",
      o.subtotal,
      o.shipping,
      o.total,
      getStatusBadge(o.status).label,
      new Date(o.created_at).toLocaleString("ar-EG"),
      `"${(o.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `AURA_Orders_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("تم تصدير ملف الطلبات بنجاح");
  };

  // Print Invoice Window
  const handlePrintInvoice = (order: OrderRecord) => {
    const printWindow = window.open("", "_blank", "width=800,height=900");
    if (!printWindow) {
      toast.error("يرجى السماح بفتح النوافذ المنبثقة لطباعة الفاتورة");
      return;
    }

    const badge = getStatusBadge(order.status);
    const itemsRows = order.items
      ?.map(
        (it) => `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 10px; font-weight: bold;">${it.name}</td>
        <td style="padding: 10px; text-align: center;">${it.size} مل</td>
        <td style="padding: 10px; text-align: center;">${it.qty}</td>
        <td style="padding: 10px; text-align: left;">${it.unit_price} ج.م</td>
        <td style="padding: 10px; text-align: left; font-weight: bold;">${it.unit_price * it.qty} ج.م</td>
      </tr>
    `
      )
      .join("");

    const html = `
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <title>فاتورة وبوليصة شحن - ${order.order_number}</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; padding: 30px; color: #111827; }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #d4af37; padding-bottom: 20px; }
          .brand-title { font-size: 26px; font-weight: bold; color: #000; margin: 0; }
          .brand-sub { font-size: 11px; letter-spacing: 2px; color: #6b7280; }
          .invoice-tag { background: #d4af37; color: #000; padding: 6px 14px; font-weight: bold; border-radius: 4px; font-size: 14px; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 25px 0; background: #f9fafb; padding: 18px; border-radius: 6px; border: 1px solid #e5e7eb; }
          .info-item { margin-bottom: 8px; font-size: 13px; }
          .info-label { font-weight: bold; color: #4b5563; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13px; }
          th { background: #f3f4f6; padding: 10px; text-align: right; border-bottom: 2px solid #d1d5db; }
          .totals { margin-top: 25px; margin-right: auto; max-width: 320px; border-top: 1px solid #e5e7eb; padding-top: 10px; font-size: 14px; }
          .total-row { display: flex; justify-content: space-between; padding: 6px 0; }
          .grand-total { font-size: 18px; font-weight: bold; color: #000; border-top: 2px solid #000; padding-top: 8px; margin-top: 4px; }
          .footer-notes { margin-top: 40px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px dashed #d1d5db; padding-top: 15px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1 class="brand-title">دار العطور (AURA)</h1>
            <span class="brand-sub">MAISON DE PARFUM · بوليصة شحن وفاتورة مبيعات</span>
          </div>
          <div class="invoice-tag">طلب رقم: ${order.order_number}</div>
        </div>

        <div class="info-grid">
          <div>
            <div class="info-item"><span class="info-label">اسم العميل:</span> ${order.customer_name}</div>
            <div class="info-item"><span class="info-label">رقم الهاتف:</span> ${order.phone}</div>
            <div class="info-item"><span class="info-label">المحافظة والمدينة:</span> ${order.city} - ${order.district}</div>
            <div class="info-item"><span class="info-label">العنوان التفصيلي:</span> ${order.street}</div>
          </div>
          <div>
            <div class="info-item"><span class="info-label">تاريخ الطلب:</span> ${new Date(order.created_at).toLocaleString("ar-EG")}</div>
            <div class="info-item"><span class="info-label">طريقة الدفع:</span> ${order.payment_method === "cod" ? "الدفع نقداً عند الاستلام" : order.payment_method === "vodafone_cash" ? "فودافون كاش (مدفوع)" : "إنستا باي (مدفوع)"}</div>
            <div class="info-item"><span class="info-label">حالة الطلب:</span> ${badge.label}</div>
            ${order.notes ? `<div class="info-item"><span class="info-label">ملاحظات للمندوب:</span> ${order.notes}</div>` : ""}
          </div>
        </div>

        <h3>العطور والمنتجات المطلوبة</h3>
        <table>
          <thead>
            <tr>
              <th>العطر</th>
              <th style="text-align: center;">الحجم</th>
              <th style="text-align: center;">الكمية</th>
              <th style="text-align: left;">سعر الوحدة</th>
              <th style="text-align: left;">المجموع</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRows}
          </tbody>
        </table>

        <div class="totals">
          <div class="total-row"><span>المجموع الفرعي:</span> <span>${order.subtotal} ج.م</span></div>
          <div class="total-row"><span>الشحن:</span> <span>${order.shipping === 0 ? "مجاني" : `${order.shipping} ج.م`}</span></div>
          ${order.cod_fee > 0 ? `<div class="total-row"><span>رسوم الدفع عند الاستلام:</span> <span>${order.cod_fee} ج.م</span></div>` : ""}
          <div class="total-row grand-total"><span>المطلوب تحصيله:</span> <span>${order.total} ج.م</span></div>
        </div>

        <div class="footer-notes">
          شكراً لتسوقكم من دار العطور. للاستفسارات وخدمة العملاء: ${settings.storePhone}
        </div>
        <script>window.onload = () => { window.print(); }</script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  };

  // Save Store Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoreSettings(settings);
    if (newPassword.trim()) {
      if (setAdminPassword(newPassword)) {
        toast.success("تم تغيير كلمة مرور لوحة التحكم بنجاح");
        setNewPassword("");
      } else {
        toast.error("كلمة المرور يجب أن لا تقل عن ٤ أحرف");
      }
    }
    toast.success("تم حفظ إعدادات المتجر بنجاح");
  };

  // Add Coupon
  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoupon.code.trim() || !newCoupon.value) {
      toast.error("يرجى ملء كود الخصم والقيمة");
      return;
    }
    addCoupon({ ...newCoupon, code: newCoupon.code.trim().toUpperCase() });
    setCoupons(getStoredCoupons());
    setIsNewCouponOpen(false);
    setNewCoupon({ code: "", type: "percent", value: 10, minOrder: 300, active: true });
    toast.success("تمت إضافة كود الخصم بنجاح");
  };

  // Toggle Coupon Active
  const handleToggleCoupon = (code: string) => {
    const updated = coupons.map((c) =>
      c.code === code ? { ...c, active: !c.active } : c
    );
    saveStoredCoupons(updated);
    setCoupons(updated);
    toast.success("تم تحديث حالة الكوبون");
  };

  // Delete Coupon
  const handleDeleteCoupon = (code: string) => {
    if (confirm(`هل أنت متأكد من حذف الكوبون ${code}؟`)) {
      deleteCoupon(code);
      setCoupons(getStoredCoupons());
      toast.success("تم حذف الكوبون");
    }
  };

  // If not authenticated, show luxury login view
  if (!auth) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-gradient-to-b from-background via-background to-sand/40">
        <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-xl">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold border border-gold/30">
              <Shield className="h-7 w-7" />
            </div>
            <h1 className="mt-4 font-display text-2xl font-bold text-foreground">
              لوحة تحكم دار العطور
            </h1>
            <p className="mt-2 text-xs text-muted-foreground">
              أدخل كلمة المرور الخاصة بالإدارة للوصول للطلبات والمنتجات
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">
                كلمة مرور المدير
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="أدخل كلمة المرور..."
                  className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-gold pr-3 pl-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">
                🔑 كلمة المرور الافتراضية: <span className="font-mono text-gold font-bold">aura</span> (يمكن تغييرها من الإعدادات لاحقاً)
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-sm bg-primary py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-ink"
            >
              تسجيل الدخول
            </button>
          </form>

          <div className="mt-6 border-t border-border pt-4 text-center">
            <Link to="/" className="text-xs text-gold hover:underline inline-flex items-center gap-1">
              <span>العودة للمتجر الرئيسي</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Top Admin Header Bar */}
      <div className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-gold/15 text-gold border border-gold/30">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <span className="block font-display text-lg font-bold leading-tight">
                لوحة تحكم دار العطور
              </span>
              <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                ● النظام متصل ويعمل
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-sm border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-gold"
            >
              <Store className="h-3.5 w-3.5" />
              <span>معاينة المتجر</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-sm bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>خروج</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pt-1">
          {[
            { id: "overview", label: "نظرة عامة وإحصائيات", icon: TrendingUp },
            {
              id: "orders",
              label: `إدارة الطلبات (${orders.length})`,
              icon: ShoppingBag,
              badge: stats.pendingCount > 0 ? stats.pendingCount : undefined,
            },
            { id: "products", label: `إدارة العطور (${products.length})`, icon: Package },
            { id: "coupons", label: `كوبونات الخصم (${coupons.length})`, icon: Tag },
            { id: "settings", label: "إعدادات المتجر والدفع", icon: Store },
          ].map((t) => {
            const Icon = t.icon;
            const active = currentTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setCurrentTab(t.id as TabType)}
                className={cn(
                  "relative flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold transition-colors whitespace-nowrap",
                  active
                    ? "border-gold text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4 text-gold" />
                <span>{t.label}</span>
                {t.badge && (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] text-white">
                    {t.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8">
        {/* ===================== TAB 1: OVERVIEW ===================== */}
        {currentTab === "overview" && (
          <div className="space-y-8">
            {/* 4 Stat Cards */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">إجمالي المبيعات</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                    <DollarSign className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3 font-display text-2xl font-bold text-foreground">
                  {formatPrice(stats.totalSales)}
                </div>
                <span className="text-[11px] text-muted-foreground">من كل الطلبات المؤكدة</span>
              </div>

              <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">إجمالي الطلبات</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-600">
                    <ShoppingBag className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3 font-display text-2xl font-bold text-foreground">
                  {toArabicDigits(stats.totalCount)} طلب
                </div>
                <span className="text-[11px] text-muted-foreground">
                  {toArabicDigits(stats.deliveredCount)} تم توصيلها
                </span>
              </div>

              <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">بانتظار التأكيد والشحن</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
                    <Clock className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3 font-display text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {toArabicDigits(stats.pendingCount)} طلب
                </div>
                <span className="text-[11px] text-muted-foreground">تحتاج مراجعة وتجهيز</span>
              </div>

              <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">عدد المنتجات في الكتالوج</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <Package className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3 font-display text-2xl font-bold text-foreground">
                  {toArabicDigits(products.length)} عطر
                </div>
                <span className="text-[11px] text-muted-foreground">
                  {toArabicDigits(products.filter((p) => p.inStock).length)} متوفر حالياً
                </span>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-xl font-bold">أحدث الطلبات المستلمة</h2>
                  <p className="text-xs text-muted-foreground">آخر الطلبات التي تم تسجيلها في المتجر</p>
                </div>
                <button
                  onClick={() => setCurrentTab("orders")}
                  className="text-xs font-bold text-gold hover:underline"
                >
                  عرض جميع الطلبات ({orders.length}) ←
                </button>
              </div>

              <div className="mt-5 divide-y divide-border overflow-x-auto">
                {orders.slice(0, 5).map((o) => {
                  const badge = getStatusBadge(o.status);
                  const Icon = badge.icon;
                  return (
                    <div
                      key={o.id || o.order_number}
                      className="flex flex-wrap items-center justify-between gap-4 py-3.5 hover:bg-muted/30 px-2 rounded-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="font-mono font-bold text-xs text-gold">
                          {toArabicDigits(o.order_number)}
                        </div>
                        <div>
                          <span className="block text-sm font-semibold">{o.customer_name}</span>
                          <span className="block text-xs text-muted-foreground">
                            {o.city} · {o.phone}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-foreground">
                          {formatPrice(o.total)}
                        </span>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold",
                            badge.bg
                          )}
                        >
                          <Icon className="h-3 w-3" />
                          <span>{badge.label}</span>
                        </span>
                        <button
                          onClick={() => {
                            setSelectedOrder(o);
                            setCurrentTab("orders");
                          }}
                          className="rounded-sm border border-border px-3 py-1 text-xs hover:border-gold hover:text-gold"
                        >
                          تفاصيل
                        </button>
                      </div>
                    </div>
                  );
                })}
                {orders.length === 0 && (
                  <div className="py-8 text-center text-xs text-muted-foreground">
                    لا توجد طلبات مسجلة بعد. عند قيام العملاء بطلب عطور، ستظهر هنا فوراً.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 2: ORDERS MANAGEMENT ===================== */}
        {currentTab === "orders" && (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold">إدارة الطلبات</h2>
                <p className="text-xs text-muted-foreground">
                  متابعة وتحديث حالات الطلبات والتحقق من إيصالات التحويل وطباعة الفواتير
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={exportOrdersToCSV}
                  className="inline-flex items-center gap-1.5 rounded-sm bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>تصدير الطلبات (Excel/CSV)</span>
                </button>
                <button
                  onClick={loadOrders}
                  disabled={loadingOrders}
                  className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-card px-3.5 py-2 text-xs font-semibold hover:border-gold"
                >
                  <RotateCcw className={cn("h-3.5 w-3.5", loadingOrders && "animate-spin")} />
                  <span>تحديث</span>
                </button>
              </div>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="ابحث برقم الطلب، اسم العميل، الهاتف، أو المحافظة..."
                  className="w-full rounded-sm border border-input bg-background pr-9 pl-3 py-2 text-xs outline-none focus:border-gold"
                />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: "all", label: "الكل" },
                  { id: "pending", label: "قيد المراجعة" },
                  { id: "processing", label: "جاري التجهيز" },
                  { id: "shipped", label: "تم الشحن" },
                  { id: "delivered", label: "مكتمل" },
                  { id: "cancelled", label: "ملغي" },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setStatusFilter(s.id)}
                    className={cn(
                      "rounded-sm px-3 py-1.5 text-xs font-medium transition-colors",
                      statusFilter === s.id
                        ? "bg-primary text-primary-foreground font-bold"
                        : "border border-border bg-background text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="border-b border-border bg-muted/50 text-muted-foreground font-semibold">
                    <tr>
                      <th className="p-3.5">رقم الطلب</th>
                      <th className="p-3.5">العميل</th>
                      <th className="p-3.5">المحافظة</th>
                      <th className="p-3.5">طريقة الدفع</th>
                      <th className="p-3.5">المبلغ</th>
                      <th className="p-3.5">الحالة</th>
                      <th className="p-3.5 text-center">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredOrders.map((o) => {
                      const badge = getStatusBadge(o.status);
                      const Icon = badge.icon;
                      return (
                        <tr key={o.id || o.order_number} className="hover:bg-muted/20 transition-colors">
                          <td className="p-3.5 font-mono font-bold text-gold">
                            {toArabicDigits(o.order_number)}
                          </td>
                          <td className="p-3.5">
                            <span className="block font-semibold text-foreground">
                              {o.customer_name}
                            </span>
                            <span className="block text-[11px] text-muted-foreground">
                              {o.phone}
                            </span>
                          </td>
                          <td className="p-3.5 text-foreground">{o.city}</td>
                          <td className="p-3.5">
                            <div className="flex items-center gap-1.5">
                              {o.payment_method === "cod" && (
                                <span className="inline-flex items-center gap-1 text-zinc-700 dark:text-zinc-300">
                                  <Banknote className="h-3.5 w-3.5 text-emerald-600" />
                                  <span>دفع عند الاستلام</span>
                                </span>
                              )}
                              {o.payment_method === "vodafone_cash" && (
                                <span className="inline-flex items-center gap-1 text-rose-600 font-semibold">
                                  <Smartphone className="h-3.5 w-3.5" />
                                  <span>فودافون كاش</span>
                                </span>
                              )}
                              {o.payment_method === "instapay" && (
                                <span className="inline-flex items-center gap-1 text-purple-600 font-semibold">
                                  <Smartphone className="h-3.5 w-3.5" />
                                  <span>إنستا باي</span>
                                </span>
                              )}
                            </div>
                            {o.proof_path && (
                              <button
                                type="button"
                                onClick={() => {
                                  const url = getPaymentProofUrl(o.proof_path);
                                  if (url) setProofModalUrl(url);
                                  else toast.error("تعذر تحميل رابط الصورة");
                                }}
                                className="mt-1 block text-[11px] text-gold underline hover:text-amber-500"
                              >
                                🖼️ عرض صورة التحويل
                              </button>
                            )}
                          </td>
                          <td className="p-3.5 font-bold text-foreground">
                            {formatPrice(o.total)}
                          </td>
                          <td className="p-3.5">
                            <select
                              value={o.status}
                              onChange={(e) => handleUpdateStatus(o.order_number, e.target.value)}
                              className={cn(
                                "rounded-sm border px-2 py-1 text-xs font-semibold outline-none",
                                badge.bg
                              )}
                            >
                              <option value="pending">قيد المراجعة</option>
                              <option value="processing">جاري التجهيز</option>
                              <option value="shipped">تم الشحن</option>
                              <option value="delivered">مكتمل / تم التوصيل</option>
                              <option value="cancelled">ملغي</option>
                            </select>
                          </td>
                          <td className="p-3.5 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => handlePrintInvoice(o)}
                                className="rounded-sm border border-border p-1.5 hover:border-gold hover:text-gold"
                                title="طباعة الفاتورة وبوليصة الشحن"
                              >
                                <Printer className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => setSelectedOrder(o)}
                                className="rounded-sm border border-border px-2.5 py-1 text-xs font-medium hover:border-gold hover:text-gold"
                              >
                                تفاصيل
                              </button>
                              <button
                                onClick={() => handleDeleteOrder(o.order_number)}
                                className="rounded-sm p-1.5 text-destructive hover:bg-destructive/10"
                                title="حذف الطلب"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredOrders.length === 0 && (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-muted-foreground">
                          لا توجد طلبات مطابقة للبحث أو الفلتر المختار.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 3: PRODUCTS MANAGEMENT ===================== */}
        {currentTab === "products" && (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold">إدارة العطور والمنتجات</h2>
                <p className="text-xs text-muted-foreground">
                  إضافة عطور جديدة، تعديل الأسعار، تغيير الصور، والتحكم في حالة التوفر
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setIsNewProductModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-sm hover:bg-ink"
                >
                  <Plus className="h-4 w-4" />
                  <span>إضافة عطر جديد</span>
                </button>
                <button
                  onClick={() => {
                    if (confirm("هل تريد استعادة قائمة العطور الأصلية الافتراضية؟")) {
                      resetStoredProducts();
                      toast.success("تم استعادة العطور الافتراضية");
                    }
                  }}
                  className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-card px-3.5 py-2.5 text-xs font-semibold hover:border-gold"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>استعادة الافتراضي</span>
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm"
                >
                  <div className="relative aspect-square w-full bg-sand/30">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-2 right-2 flex flex-col gap-1">
                      {p.featured && (
                        <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-accent-foreground shadow-sm">
                          مميز
                        </span>
                      )}
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-bold shadow-sm",
                          p.inStock
                            ? "bg-emerald-600 text-white"
                            : "bg-rose-600 text-white"
                        )}
                      >
                        {p.inStock ? "متوفر" : "نفذت الكمية"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-semibold text-gold">
                          {p.family} · {p.gender}
                        </span>
                        <h3 className="font-display text-lg font-bold text-foreground">
                          {p.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">{p.subtitle}</p>
                      </div>
                      <div className="text-left">
                        <span className="block font-bold text-sm text-foreground">
                          {formatPrice(p.price)}
                        </span>
                        {p.oldPrice && (
                          <span className="block text-[11px] text-muted-foreground line-through">
                            {formatPrice(p.oldPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="mt-3 line-clamp-2 text-xs text-muted-foreground flex-1">
                      {p.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-border flex items-center justify-between gap-2">
                      {/* Toggle inStock */}
                      <button
                        type="button"
                        onClick={() => {
                          const updated = { ...p, inStock: !p.inStock };
                          updateStoredProduct(updated);
                          toast.success(`تم تغيير حالة ${p.name} إلى ${!p.inStock ? "متوفر" : "نفذ"}`);
                        }}
                        className={cn(
                          "rounded-sm px-2.5 py-1 text-xs font-semibold border",
                          p.inStock
                            ? "border-emerald-500/40 text-emerald-600 hover:bg-emerald-500/10"
                            : "border-rose-500/40 text-rose-600 hover:bg-rose-500/10"
                        )}
                      >
                        {p.inStock ? "تعيين كـ غير متوفر" : "تعيين كـ متوفر"}
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setEditingProduct(p)}
                          className="rounded-sm border border-border p-1.5 hover:border-gold hover:text-gold"
                          title="تعديل العطر"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`هل أنت متأكد من حذف ${p.name}؟`)) {
                              deleteStoredProduct(p.id);
                              toast.success(`تم حذف ${p.name}`);
                            }
                          }}
                          className="rounded-sm border border-border p-1.5 text-destructive hover:bg-destructive/10"
                          title="حذف العطر"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB 4: COUPONS MANAGEMENT ===================== */}
        {currentTab === "coupons" && (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold">إدارة كوبونات الخصم</h2>
                <p className="text-xs text-muted-foreground">
                  إنشاء أكواد خصم ترويجية بنسبة مئوية أو مبلغ ثابت وتفعيلها للمتجر
                </p>
              </div>

              <button
                onClick={() => setIsNewCouponOpen(true)}
                className="inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-sm hover:bg-ink"
              >
                <Plus className="h-4 w-4" />
                <span>إنشاء كوبون جديد</span>
              </button>
            </div>

            {/* Coupons Table */}
            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              <table className="w-full text-right text-xs">
                <thead className="border-b border-border bg-muted/50 text-muted-foreground font-semibold">
                  <tr>
                    <th className="p-3.5">كود الخصم</th>
                    <th className="p-3.5">نوع الخصم</th>
                    <th className="p-3.5">قيمة الخصم</th>
                    <th className="p-3.5">الحد الأدنى للطلب</th>
                    <th className="p-3.5">الحالة</th>
                    <th className="p-3.5 text-center">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {coupons.map((c) => (
                    <tr key={c.code} className="hover:bg-muted/20 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-gold text-sm uppercase">
                        {c.code}
                      </td>
                      <td className="p-3.5">
                        {c.type === "percent" ? "نسبة مئوية (%)" : "مبلغ مالي ثابت (ج.م)"}
                      </td>
                      <td className="p-3.5 font-bold text-foreground">
                        {c.type === "percent" ? `${c.value}%` : `${c.value} ج.م`}
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        {c.minOrder ? `${formatPrice(c.minOrder)}` : "بدون حد أدنى"}
                      </td>
                      <td className="p-3.5">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                            c.active
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                              : "bg-zinc-500/15 text-zinc-600"
                          )}
                        >
                          {c.active ? "مفعّل" : "معطّل"}
                        </span>
                      </td>
                      <td className="p-3.5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleToggleCoupon(c.code)}
                            className={cn(
                              "rounded-sm px-2 py-1 text-xs font-semibold border",
                              c.active
                                ? "border-zinc-300 text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                : "border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                            )}
                          >
                            {c.active ? "تعطيل" : "تفعيل"}
                          </button>
                          <button
                            onClick={() => handleDeleteCoupon(c.code)}
                            className="rounded-sm p-1 text-destructive hover:bg-destructive/10"
                            title="حذف الكوبون"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {coupons.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-muted-foreground">
                        لا توجد كوبونات خصم حالياً. أضف كوبوناً جديداً لتنشيط العروض الترويجية.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===================== TAB 5: SETTINGS ===================== */}
        {currentTab === "settings" && (
          <div className="max-w-2xl space-y-8">
            <div>
              <h2 className="font-display text-2xl font-bold">إعدادات المتجر والدفع</h2>
              <p className="text-xs text-muted-foreground">
                تعديل أرقام التحويل، رسوم الشحن، وشريط الإعلانات وكلمة سر المدير
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-6 rounded-lg border border-border bg-card p-6 shadow-sm">
              <h3 className="font-display text-lg font-bold border-b border-border pb-2">
                بيانات الدفع والتحويل
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    رقم محفظة التحويل (فودافون كاش / إنستا باي)
                  </label>
                  <input
                    type="tel"
                    required
                    value={settings.transferNumber}
                    onChange={(e) => setSettings({ ...settings, transferNumber: e.target.value })}
                    className="w-full rounded-sm border border-input bg-background px-3 py-2 text-xs outline-none focus:border-gold"
                  />
                  <span className="mt-1 block text-[11px] text-muted-foreground">
                    هذا الرقم هو الذي يظهر للعملاء في صفحة إتمام الطلب لنسخه
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    رقم هاتف خدمة العملاء / واتساب
                  </label>
                  <input
                    type="tel"
                    required
                    value={settings.storePhone}
                    onChange={(e) => setSettings({ ...settings, storePhone: e.target.value })}
                    className="w-full rounded-sm border border-input bg-background px-3 py-2 text-xs outline-none focus:border-gold"
                  />
                </div>
              </div>

              <h3 className="font-display text-lg font-bold border-b border-border pb-2 pt-4">
                الشحن والرسوم
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    حد الشحن المجاني (جنية مصري)
                  </label>
                  <input
                    type="number"
                    required
                    value={settings.freeShippingThreshold}
                    onChange={(e) =>
                      setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })
                    }
                    className="w-full rounded-sm border border-input bg-background px-3 py-2 text-xs outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    رسوم إضافية للدفع عند الاستلام (ج.م)
                  </label>
                  <input
                    type="number"
                    required
                    value={settings.codFee}
                    onChange={(e) => setSettings({ ...settings, codFee: Number(e.target.value) })}
                    className="w-full rounded-sm border border-input bg-background px-3 py-2 text-xs outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  نص الشريط الإعلاني العلوي في المتجر
                </label>
                <input
                  type="text"
                  value={settings.announcementText}
                  onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                  className="w-full rounded-sm border border-input bg-background px-3 py-2 text-xs outline-none focus:border-gold"
                />
              </div>

              <h3 className="font-display text-lg font-bold border-b border-border pb-2 pt-4">
                أمان لوحة التحكم (تغيير كلمة المرور)
              </h3>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  كلمة مرور جديدة (اتركها فارغة إذا لا ترغب في تغييرها)
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور الجديدة..."
                  className="w-full rounded-sm border border-input bg-background px-3 py-2 text-xs outline-none focus:border-gold"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-xs font-bold text-primary-foreground shadow-sm hover:bg-ink"
              >
                <Save className="h-4 w-4" />
                <span>حفظ التعديلات</span>
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ===================== NEW COUPON MODAL ===================== */}
      {isNewCouponOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-display text-lg font-bold">إنشاء كود خصم جديد</h3>
              <button onClick={() => setIsNewCouponOpen(false)} className="rounded p-1 hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddCoupon} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">كود الخصم (Promo Code) *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: SALE15"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                  className="w-full rounded-sm border border-input bg-background px-3 py-2 uppercase font-mono font-bold outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">نوع الخصم</label>
                  <select
                    value={newCoupon.type}
                    onChange={(e) =>
                      setNewCoupon({ ...newCoupon, type: e.target.value as "percent" | "fixed" })
                    }
                    className="w-full rounded-sm border border-input bg-background px-3 py-2 outline-none focus:border-gold"
                  >
                    <option value="percent">نسبة مئوية (%)</option>
                    <option value="fixed">مبلغ ثابت (ج.م)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">قيمة الخصم *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newCoupon.value}
                    onChange={(e) => setNewCoupon({ ...newCoupon, value: Number(e.target.value) })}
                    className="w-full rounded-sm border border-input bg-background px-3 py-2 outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">الحد الأدنى للطلب (اختياري)</label>
                <input
                  type="number"
                  min={0}
                  placeholder="مثال: 300"
                  value={newCoupon.minOrder || ""}
                  onChange={(e) =>
                    setNewCoupon({
                      ...newCoupon,
                      minOrder: e.target.value ? Number(e.target.value) : undefined,
                    })
                  }
                  className="w-full rounded-sm border border-input bg-background px-3 py-2 outline-none focus:border-gold"
                />
              </div>

              <div className="flex justify-end gap-2 border-t border-border pt-4">
                <button
                  type="button"
                  onClick={() => setIsNewCouponOpen(false)}
                  className="rounded-sm border border-border px-4 py-2 font-semibold hover:bg-muted"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="rounded-sm bg-primary px-6 py-2 font-bold text-primary-foreground hover:bg-ink"
                >
                  حفظ الكوبون
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== ORDER DETAILS MODAL ===================== */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-gold">
                  {toArabicDigits(selectedOrder.order_number)}
                </span>
                <h3 className="font-display text-xl font-bold">تفاصيل الطلب</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePrintInvoice(selectedOrder)}
                  className="inline-flex items-center gap-1.5 rounded-sm border border-gold bg-gold/10 px-3 py-1.5 text-xs font-bold text-gold hover:bg-gold hover:text-accent-foreground"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>طباعة الفاتورة</span>
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="rounded-sm p-1.5 hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-6 text-xs">
              {/* Customer info */}
              <div className="rounded-md border border-border bg-muted/20 p-4">
                <h4 className="font-bold text-sm text-foreground mb-3">بيانات العميل والتوصيل</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-muted-foreground">الاسم:</span>{" "}
                    <span className="font-semibold text-foreground">{selectedOrder.customer_name}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">الموبايل:</span>{" "}
                    <a href={`tel:${selectedOrder.phone}`} className="font-semibold text-gold underline">
                      {selectedOrder.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-muted-foreground">المحافظة:</span>{" "}
                    <span className="font-semibold text-foreground">{selectedOrder.city}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">المنطقة:</span>{" "}
                    <span className="font-semibold text-foreground">{selectedOrder.district}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">العنوان التفصيلي:</span>{" "}
                    <span className="font-semibold text-foreground">{selectedOrder.street}</span>
                  </div>
                  {selectedOrder.notes && (
                    <div className="col-span-2 border-t border-border pt-2">
                      <span className="text-muted-foreground">ملاحظات العميل:</span>{" "}
                      <span className="text-foreground">{selectedOrder.notes}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Items */}
              <div>
                <h4 className="font-bold text-sm text-foreground mb-2">العطور المطلوبة</h4>
                <div className="divide-y divide-border border border-border rounded-md overflow-hidden">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-card">
                      <div>
                        <span className="font-bold text-foreground text-sm block">{item.name}</span>
                        <span className="text-muted-foreground text-xs">
                          الحجم: {toArabicDigits(item.size)} مل · الكمية: {toArabicDigits(item.qty)}
                        </span>
                      </div>
                      <span className="font-bold text-foreground">
                        {formatPrice(item.unit_price * item.qty)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals Breakdown */}
              <div className="space-y-1.5 border-t border-border pt-3">
                <div className="flex justify-between text-muted-foreground">
                  <span>المجموع الفرعي:</span>
                  <span>{formatPrice(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>الشحن:</span>
                  <span>{selectedOrder.shipping === 0 ? "مجاني" : formatPrice(selectedOrder.shipping)}</span>
                </div>
                {selectedOrder.cod_fee > 0 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>رسوم الدفع عند الاستلام:</span>
                    <span>{formatPrice(selectedOrder.cod_fee)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-base text-foreground pt-2 border-t border-border">
                  <span>الإجمالي:</span>
                  <span className="text-gold">{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>

              {/* Status updater */}
              <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">تحديث حالة الطلب:</span>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => handleUpdateStatus(selectedOrder.order_number, e.target.value)}
                    className="rounded-sm border border-input bg-background px-3 py-1.5 text-xs font-semibold outline-none focus:border-gold"
                  >
                    <option value="pending">قيد المراجعة</option>
                    <option value="processing">جاري التجهيز</option>
                    <option value="shipped">تم الشحن</option>
                    <option value="delivered">مكتمل / تم التوصيل</option>
                    <option value="cancelled">ملغي</option>
                  </select>
                </div>

                <button
                  onClick={() => handleDeleteOrder(selectedOrder.order_number)}
                  className="rounded-sm bg-destructive/10 px-3 py-1.5 text-xs font-bold text-destructive hover:bg-destructive hover:text-white"
                >
                  حذف الطلب
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== PAYMENT PROOF VIEWER MODAL ===================== */}
      {proofModalUrl && (
        <div
          onClick={() => setProofModalUrl(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] max-w-lg rounded-lg bg-card p-4 shadow-2xl"
          >
            <button
              onClick={() => setProofModalUrl(null)}
              className="absolute top-2 left-2 rounded-full bg-black/50 p-1.5 text-white hover:bg-black"
            >
              <X className="h-5 w-5" />
            </button>
            <h4 className="font-display text-base font-bold mb-3">إيصال التحويل المرفوع</h4>
            <img
              src={proofModalUrl}
              alt="إيصال التحويل"
              className="max-h-[75vh] w-full rounded object-contain"
            />
          </div>
        </div>
      )}

      {/* ===================== ADD / EDIT PRODUCT MODAL ===================== */}
      {(isNewProductModalOpen || editingProduct) && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => {
            setIsNewProductModalOpen(false);
            setEditingProduct(null);
          }}
          onSave={(p) => {
            if (editingProduct) {
              updateStoredProduct(p);
              toast.success(`تم تحديث عطر ${p.name}`);
            } else {
              addStoredProduct(p);
              toast.success(`تمت إضافة عطر ${p.name} بنجاح`);
            }
            setIsNewProductModalOpen(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}

// Subcomponent: Add / Edit Product Modal
function ProductFormModal({
  product,
  onClose,
  onSave,
}: {
  product: Product | null;
  onClose: () => void;
  onSave: (p: Product) => void;
}) {
  const [form, setForm] = React.useState<Partial<Product>>(
    product || {
      id: `perfume-${Date.now()}`,
      name: "",
      subtitle: "",
      family: "شرقي",
      gender: "للجنسين",
      price: 350,
      oldPrice: undefined,
      image: sampleImages[0]!.url,
      featured: true,
      inStock: true,
      sizes: [
        { ml: 50, extra: 0 },
        { ml: 100, extra: 150 },
      ],
      notes: {
        top: ["زعفران", "برغموت"],
        heart: ["ورد طائفي", "ياسمين"],
        base: ["عود كمبودي", "عنبر", "مسك"],
      },
      description: "",
      concentration: "Extrait de Parfum",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      toast.error("يرجى إدخال اسم العطر والسعر");
      return;
    }
    onSave(form as Product);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h3 className="font-display text-xl font-bold">
            {product ? `تعديل عطر: ${product.name}` : "إضافة عطر جديد"}
          </h3>
          <button onClick={onClose} className="rounded-sm p-1.5 hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block font-semibold mb-1">اسم العطر *</label>
              <input
                required
                type="text"
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="مثال: سر العود"
                className="w-full rounded-sm border border-input bg-background px-3 py-2 outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">الاسم الفرعي (المكونات البارزة)</label>
              <input
                type="text"
                value={form.subtitle || ""}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                placeholder="مثال: عود كمبودي وعنبر ملكي"
                className="w-full rounded-sm border border-input bg-background px-3 py-2 outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block font-semibold mb-1">العائلة العطرية</label>
              <select
                value={form.family || "شرقي"}
                onChange={(e) => setForm({ ...form, family: e.target.value })}
                className="w-full rounded-sm border border-input bg-background px-3 py-2 outline-none focus:border-gold"
              >
                <option value="شرقي">شرقي</option>
                <option value="زهري">زهري</option>
                <option value="خشبي">خشبي</option>
                <option value="منعش">منعش</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">الفئة</label>
              <select
                value={form.gender || "للجنسين"}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="w-full rounded-sm border border-input bg-background px-3 py-2 outline-none focus:border-gold"
              >
                <option value="رجالي">رجالي</option>
                <option value="نسائي">نسائي</option>
                <option value="للجنسين">للجنسين</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">التركيز</label>
              <input
                type="text"
                value={form.concentration || "Extrait de Parfum"}
                onChange={(e) => setForm({ ...form, concentration: e.target.value })}
                className="w-full rounded-sm border border-input bg-background px-3 py-2 outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block font-semibold mb-1">السعر الأساسي (ج.م) *</label>
              <input
                required
                type="number"
                value={form.price || ""}
                onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                className="w-full rounded-sm border border-input bg-background px-3 py-2 outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">السعر قبل الخصم (اختياري)</label>
              <input
                type="number"
                value={form.oldPrice || ""}
                onChange={(e) =>
                  setForm({ ...form, oldPrice: e.target.value ? Number(e.target.value) : undefined })
                }
                placeholder="اتركه فارغاً إذا لا يوجد خصم"
                className="w-full rounded-sm border border-input bg-background px-3 py-2 outline-none focus:border-gold"
              />
            </div>
          </div>

          {/* Scent notes */}
          <div className="grid gap-3 sm:grid-cols-3 border-t border-border pt-3">
            <div>
              <label className="block font-semibold mb-1">قمة العطر (مفصولة بفواصل)</label>
              <input
                type="text"
                value={form.notes?.top?.join("، ") || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    notes: {
                      ...form.notes!,
                      top: e.target.value.split(/[,،]/).map((s) => s.trim()).filter(Boolean),
                    },
                  })
                }
                className="w-full rounded-sm border border-input bg-background px-3 py-2 outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">قلب العطر (مفصولة بفواصل)</label>
              <input
                type="text"
                value={form.notes?.heart?.join("، ") || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    notes: {
                      ...form.notes!,
                      heart: e.target.value.split(/[,،]/).map((s) => s.trim()).filter(Boolean),
                    },
                  })
                }
                className="w-full rounded-sm border border-input bg-background px-3 py-2 outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">قاعدة العطر (مفصولة بفواصل)</label>
              <input
                type="text"
                value={form.notes?.base?.join("، ") || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    notes: {
                      ...form.notes!,
                      base: e.target.value.split(/[,،]/).map((s) => s.trim()).filter(Boolean),
                    },
                  })
                }
                className="w-full rounded-sm border border-input bg-background px-3 py-2 outline-none focus:border-gold"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-1">الوصف التفصيلي للعطر</label>
            <textarea
              rows={3}
              value={form.description || ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-sm border border-input bg-background px-3 py-2 outline-none focus:border-gold"
            />
          </div>

          {/* Image Selection */}
          <div>
            <label className="block font-semibold mb-2">اختيار صورة العطر</label>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
              {sampleImages.map((img) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setForm({ ...form, image: img.url })}
                  className={cn(
                    "relative aspect-square overflow-hidden rounded border-2 transition-all",
                    form.image === img.url
                      ? "border-gold scale-105 shadow-md"
                      : "border-transparent opacity-70 hover:opacity-100"
                  )}
                >
                  <img src={img.url} alt={img.name} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
            <div className="mt-2">
              <input
                type="text"
                value={form.image || ""}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="أو أدخل رابط صورة خارجي مباشرة..."
                className="w-full rounded-sm border border-input bg-background px-3 py-1.5 text-[11px] outline-none focus:border-gold"
              />
            </div>
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap gap-6 border-t border-border pt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.inStock ?? true}
                onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
                className="h-4 w-4 rounded border-input text-gold focus:ring-gold"
              />
              <span className="font-semibold">العطر متوفر في المخزون (In Stock)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured ?? false}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="h-4 w-4 rounded border-input text-gold focus:ring-gold"
              />
              <span className="font-semibold">عرض في الصفحة الرئيسية (عطور مميزة)</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 border-t border-border pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-sm border border-border px-4 py-2 text-xs font-semibold hover:bg-muted"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="rounded-sm bg-primary px-6 py-2 text-xs font-bold text-primary-foreground hover:bg-ink"
            >
              {product ? "حفظ التعديلات" : "إضافة العطر"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
