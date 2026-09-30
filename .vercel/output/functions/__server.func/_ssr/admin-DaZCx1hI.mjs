import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as resetStoredProducts, c as updateStoredProduct, l as useProducts, n as deleteStoredProduct, o as sampleImages, r as formatPrice, s as toArabicDigits, t as addStoredProduct } from "./products-BTJ20OVa.mjs";
import { a as saveStoreSettings, i as getStoredCoupons, n as deleteCoupon, o as saveStoredCoupons, r as getStoreSettings, t as addCoupon } from "./couponsStore-B5vZBq3Z.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { i as getPaymentProofUrl, n as fetchAllOrders, o as updateOrderStatus, t as deleteOrder } from "./ordersService-nJMzTHvk.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { A as Clock, C as LogOut, D as Download, E as ExternalLink, F as Banknote, M as CircleCheck, N as CircleAlert, O as DollarSign, T as EyeOff, _ as Plus, a as Trash2, d as Shield, g as Printer, h as RotateCcw, i as TrendingUp, j as CircleX, l as Smartphone, m as Save, o as Tag, p as Search, r as Truck, s as Store, t as X, u as ShoppingBag, v as PenLine, w as Eye, y as Package } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DaZCx1hI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ADMIN_STORAGE_KEY = "aura_admin_auth";
var ADMIN_PASS_KEY = "aura_admin_password";
var DEFAULT_PASSWORD = "aura";
function getAdminPassword() {
	if (typeof window === "undefined") return DEFAULT_PASSWORD;
	return localStorage.getItem("aura_admin_password") || DEFAULT_PASSWORD;
}
function setAdminPassword(newPass) {
	if (!newPass || newPass.trim().length < 4) return false;
	localStorage.setItem(ADMIN_PASS_KEY, newPass.trim());
	return true;
}
function verifyAdminPassword(input) {
	const currentPass = getAdminPassword();
	return input.trim() === currentPass;
}
function loginAdmin(password) {
	if (verifyAdminPassword(password)) {
		localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify({
			authenticated: true,
			timestamp: Date.now()
		}));
		return true;
	}
	return false;
}
function isAdminAuthenticated() {
	if (typeof window === "undefined") return false;
	try {
		const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
		if (!raw) return false;
		const data = JSON.parse(raw);
		if (data.authenticated && Date.now() - data.timestamp < 6048e5) return true;
	} catch {
		return false;
	}
	return false;
}
function logoutAdmin() {
	if (typeof window !== "undefined") localStorage.removeItem(ADMIN_STORAGE_KEY);
}
function AdminDashboard() {
	const [auth, setAuth] = import_react.useState(false);
	const [passwordInput, setPasswordInput] = import_react.useState("");
	const [showPass, setShowPass] = import_react.useState(false);
	const [currentTab, setCurrentTab] = import_react.useState("overview");
	const [orders, setOrders] = import_react.useState([]);
	const [loadingOrders, setLoadingOrders] = import_react.useState(true);
	const [orderSearch, setOrderSearch] = import_react.useState("");
	const [statusFilter, setStatusFilter] = import_react.useState("all");
	const [selectedOrder, setSelectedOrder] = import_react.useState(null);
	const [proofModalUrl, setProofModalUrl] = import_react.useState(null);
	const products = useProducts();
	const [editingProduct, setEditingProduct] = import_react.useState(null);
	const [isNewProductModalOpen, setIsNewProductModalOpen] = import_react.useState(false);
	const [coupons, setCoupons] = import_react.useState(getStoredCoupons());
	const [isNewCouponOpen, setIsNewCouponOpen] = import_react.useState(false);
	const [newCoupon, setNewCoupon] = import_react.useState({
		code: "",
		type: "percent",
		value: 10,
		minOrder: 300,
		active: true
	});
	const [settings, setSettings] = import_react.useState(getStoreSettings());
	const [newPassword, setNewPassword] = import_react.useState("");
	import_react.useEffect(() => {
		setAuth(isAdminAuthenticated());
	}, []);
	const loadOrders = import_react.useCallback(async () => {
		setLoadingOrders(true);
		const res = await fetchAllOrders();
		setOrders(res.orders);
		setLoadingOrders(false);
	}, []);
	import_react.useEffect(() => {
		if (auth) {
			loadOrders();
			setCoupons(getStoredCoupons());
		}
	}, [auth, loadOrders]);
	const handleLogin = (e) => {
		e.preventDefault();
		if (loginAdmin(passwordInput)) {
			setAuth(true);
			toast.success("تم تسجيل الدخول بنجاح إلى لوحة التحكم");
			loadOrders();
		} else toast.error("كلمة المرور غير صحيحة، حاول مجدداً");
	};
	const handleLogout = () => {
		logoutAdmin();
		setAuth(false);
		toast.info("تم تسجيل الخروج");
	};
	const getStatusBadge = (status) => {
		switch (status) {
			case "pending": return {
				label: "قيد المراجعة",
				bg: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
				icon: Clock
			};
			case "processing": return {
				label: "جاري التجهيز",
				bg: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
				icon: Package
			};
			case "shipped": return {
				label: "تم الشحن",
				bg: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
				icon: Truck
			};
			case "delivered": return {
				label: "مكتمل / تم التوصيل",
				bg: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
				icon: CircleCheck
			};
			case "cancelled": return {
				label: "ملغي",
				bg: "bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30",
				icon: CircleX
			};
			default: return {
				label: status,
				bg: "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400 border-zinc-500/30",
				icon: CircleAlert
			};
		}
	};
	const filteredOrders = import_react.useMemo(() => {
		return orders.filter((o) => {
			const matchStatus = statusFilter === "all" || o.status === statusFilter;
			const search = orderSearch.trim().toLowerCase();
			const matchSearch = !search || o.order_number?.toLowerCase().includes(search) || o.customer_name?.toLowerCase().includes(search) || o.phone?.includes(search) || o.city?.toLowerCase().includes(search);
			return matchStatus && matchSearch;
		});
	}, [
		orders,
		statusFilter,
		orderSearch
	]);
	const stats = import_react.useMemo(() => {
		const totalSales = orders.filter((o) => o.status !== "cancelled").reduce((acc, curr) => acc + (Number(curr.total) || 0), 0);
		const totalCount = orders.length;
		const pendingCount = orders.filter((o) => o.status === "pending").length;
		const deliveredCount = orders.filter((o) => o.status === "delivered").length;
		const avgOrder = totalCount > 0 ? Math.round(totalSales / totalCount) : 0;
		const byGov = {};
		orders.forEach((o) => {
			const g = o.city || "غير محدد";
			byGov[g] = (byGov[g] || 0) + 1;
		});
		return {
			totalSales,
			totalCount,
			pendingCount,
			deliveredCount,
			avgOrder,
			byGov
		};
	}, [orders]);
	const handleUpdateStatus = async (orderNumber, status) => {
		if ((await updateOrderStatus(orderNumber, status)).success) {
			toast.success(`تم تحديث حالة الطلب ${orderNumber} إلى ${getStatusBadge(status).label}`);
			setOrders((prev) => prev.map((o) => o.order_number === orderNumber ? {
				...o,
				status
			} : o));
			if (selectedOrder?.order_number === orderNumber) setSelectedOrder((prev) => prev ? {
				...prev,
				status
			} : null);
		} else toast.error("تعذر تحديث الحالة");
	};
	const handleDeleteOrder = async (orderNumber) => {
		if (confirm(`هل أنت متأكد من حذف الطلب ${orderNumber} نهائياً؟`)) if ((await deleteOrder(orderNumber)).success) {
			toast.success("تم حذف الطلب بنجاح");
			setOrders((prev) => prev.filter((o) => o.order_number !== orderNumber));
			if (selectedOrder?.order_number === orderNumber) setSelectedOrder(null);
		} else toast.error("تعذر حذف الطلب");
	};
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
			"ملاحظات العميل"
		];
		const rows = orders.map((o) => [
			o.order_number,
			o.customer_name,
			o.phone,
			o.email || "",
			o.city,
			o.district,
			`"${(o.street || "").replace(/"/g, "\"\"")}"`,
			o.payment_method === "cod" ? "دفع عند الاستلام" : o.payment_method === "vodafone_cash" ? "فودافون كاش" : "إنستا باي",
			o.subtotal,
			o.shipping,
			o.total,
			getStatusBadge(o.status).label,
			new Date(o.created_at).toLocaleString("ar-EG"),
			`"${(o.notes || "").replace(/"/g, "\"\"")}"`
		]);
		const csvContent = "﻿" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
		const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `AURA_Orders_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
		a.click();
		URL.revokeObjectURL(url);
		toast.success("تم تصدير ملف الطلبات بنجاح");
	};
	const handlePrintInvoice = (order) => {
		const printWindow = window.open("", "_blank", "width=800,height=900");
		if (!printWindow) {
			toast.error("يرجى السماح بفتح النوافذ المنبثقة لطباعة الفاتورة");
			return;
		}
		const badge = getStatusBadge(order.status);
		const itemsRows = order.items?.map((it) => `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 10px; font-weight: bold;">${it.name}</td>
        <td style="padding: 10px; text-align: center;">${it.size} مل</td>
        <td style="padding: 10px; text-align: center;">${it.qty}</td>
        <td style="padding: 10px; text-align: left;">${it.unit_price} ج.م</td>
        <td style="padding: 10px; text-align: left; font-weight: bold;">${it.unit_price * it.qty} ج.م</td>
      </tr>
    `).join("");
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
        <script>window.onload = () => { window.print(); }<\/script>
      </body>
      </html>
    `;
		printWindow.document.open();
		printWindow.document.write(html);
		printWindow.document.close();
	};
	const handleSaveSettings = (e) => {
		e.preventDefault();
		saveStoreSettings(settings);
		if (newPassword.trim()) if (setAdminPassword(newPassword)) {
			toast.success("تم تغيير كلمة مرور لوحة التحكم بنجاح");
			setNewPassword("");
		} else toast.error("كلمة المرور يجب أن لا تقل عن ٤ أحرف");
		toast.success("تم حفظ إعدادات المتجر بنجاح");
	};
	const handleAddCoupon = (e) => {
		e.preventDefault();
		if (!newCoupon.code.trim() || !newCoupon.value) {
			toast.error("يرجى ملء كود الخصم والقيمة");
			return;
		}
		addCoupon({
			...newCoupon,
			code: newCoupon.code.trim().toUpperCase()
		});
		setCoupons(getStoredCoupons());
		setIsNewCouponOpen(false);
		setNewCoupon({
			code: "",
			type: "percent",
			value: 10,
			minOrder: 300,
			active: true
		});
		toast.success("تمت إضافة كود الخصم بنجاح");
	};
	const handleToggleCoupon = (code) => {
		const updated = coupons.map((c) => c.code === code ? {
			...c,
			active: !c.active
		} : c);
		saveStoredCoupons(updated);
		setCoupons(updated);
		toast.success("تم تحديث حالة الكوبون");
	};
	const handleDeleteCoupon = (code) => {
		if (confirm(`هل أنت متأكد من حذف الكوبون ${code}؟`)) {
			deleteCoupon(code);
			setCoupons(getStoredCoupons());
			toast.success("تم حذف الكوبون");
		}
	};
	if (!auth) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-[85vh] flex items-center justify-center px-4 py-16 bg-gradient-to-b from-background via-background to-sand/40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold border border-gold/30",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-7 w-7" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-4 font-display text-2xl font-bold text-foreground",
							children: "لوحة تحكم دار العطور"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: "أدخل كلمة المرور الخاصة بالإدارة للوصول للطلبات والمنتجات"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleLogin,
					className: "mt-8 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-xs font-semibold text-foreground mb-1.5",
							children: "كلمة مرور المدير"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: showPass ? "text" : "password",
								required: true,
								value: passwordInput,
								onChange: (e) => setPasswordInput(e.target.value),
								placeholder: "أدخل كلمة المرور...",
								className: "w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-gold pr-3 pl-10"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowPass(!showPass),
								className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
								children: showPass ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-[11px] text-muted-foreground",
							children: [
								"🔑 كلمة المرور الافتراضية: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-gold font-bold",
									children: "aura"
								}),
								" (يمكن تغييرها من الإعدادات لاحقاً)"
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "w-full rounded-sm bg-primary py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-ink",
						children: "تسجيل الدخول"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 border-t border-border pt-4 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "text-xs text-gold hover:underline inline-flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "العودة للمتجر الرئيسي" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" })]
					})
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background pb-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-9 w-9 items-center justify-center rounded-sm bg-gold/15 text-gold border border-gold/30",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-display text-lg font-bold leading-tight",
							children: "لوحة تحكم دار العطور"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-[10px] text-emerald-600 dark:text-emerald-400 font-medium",
							children: "● النظام متصل ويعمل"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							target: "_blank",
							className: "hidden sm:inline-flex items-center gap-1.5 rounded-sm border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-gold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "h-3.5 w-3.5" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "معاينة المتجر" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleLogout,
							className: "inline-flex items-center gap-1.5 rounded-sm bg-destructive/10 px-3 py-1.5 text-xs font-semibold text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "خروج" })]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pt-1",
					children: [
						{
							id: "overview",
							label: "نظرة عامة وإحصائيات",
							icon: TrendingUp
						},
						{
							id: "orders",
							label: `إدارة الطلبات (${orders.length})`,
							icon: ShoppingBag,
							badge: stats.pendingCount > 0 ? stats.pendingCount : void 0
						},
						{
							id: "products",
							label: `إدارة العطور (${products.length})`,
							icon: Package
						},
						{
							id: "coupons",
							label: `كوبونات الخصم (${coupons.length})`,
							icon: Tag
						},
						{
							id: "settings",
							label: "إعدادات المتجر والدفع",
							icon: Store
						}
					].map((t) => {
						const Icon = t.icon;
						const active = currentTab === t.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setCurrentTab(t.id),
							className: cn("relative flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold transition-colors whitespace-nowrap", active ? "border-gold text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-gold" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.label }),
								t.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] text-white",
									children: t.badge
								})
							]
						}, t.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-4 pt-8",
				children: [
					currentTab === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4 lg:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-border bg-card p-5 shadow-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "إجمالي المبيعات"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-4 w-4" })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-3 font-display text-2xl font-bold text-foreground",
											children: formatPrice(stats.totalSales)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] text-muted-foreground",
											children: "من كل الطلبات المؤكدة"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-border bg-card p-5 shadow-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "إجمالي الطلبات"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-600",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4" })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 font-display text-2xl font-bold text-foreground",
											children: [toArabicDigits(stats.totalCount), " طلب"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[11px] text-muted-foreground",
											children: [toArabicDigits(stats.deliveredCount), " تم توصيلها"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-border bg-card p-5 shadow-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "بانتظار التأكيد والشحن"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10 text-amber-600",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 font-display text-2xl font-bold text-amber-600 dark:text-amber-400",
											children: [toArabicDigits(stats.pendingCount), " طلب"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] text-muted-foreground",
											children: "تحتاج مراجعة وتجهيز"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-border bg-card p-5 shadow-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "عدد المنتجات في الكتالوج"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex h-8 w-8 items-center justify-center rounded-full bg-gold/15 text-gold",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4" })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 font-display text-2xl font-bold text-foreground",
											children: [toArabicDigits(products.length), " عطر"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[11px] text-muted-foreground",
											children: [toArabicDigits(products.filter((p) => p.inStock).length), " متوفر حالياً"]
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-card p-6 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-xl font-bold",
									children: "أحدث الطلبات المستلمة"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "آخر الطلبات التي تم تسجيلها في المتجر"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setCurrentTab("orders"),
									className: "text-xs font-bold text-gold hover:underline",
									children: [
										"عرض جميع الطلبات (",
										orders.length,
										") ←"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 divide-y divide-border overflow-x-auto",
								children: [orders.slice(0, 5).map((o) => {
									const badge = getStatusBadge(o.status);
									const Icon = badge.icon;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center justify-between gap-4 py-3.5 hover:bg-muted/30 px-2 rounded-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-mono font-bold text-xs text-gold",
												children: toArabicDigits(o.order_number)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block text-sm font-semibold",
												children: o.customer_name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "block text-xs text-muted-foreground",
												children: [
													o.city,
													" · ",
													o.phone
												]
											})] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-bold text-foreground",
													children: formatPrice(o.total)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold", badge.bg),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: badge.label })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => {
														setSelectedOrder(o);
														setCurrentTab("orders");
													},
													className: "rounded-sm border border-border px-3 py-1 text-xs hover:border-gold hover:text-gold",
													children: "تفاصيل"
												})
											]
										})]
									}, o.id || o.order_number);
								}), orders.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "py-8 text-center text-xs text-muted-foreground",
									children: "لا توجد طلبات مسجلة بعد. عند قيام العملاء بطلب عطور، ستظهر هنا فوراً."
								})]
							})]
						})]
					}),
					currentTab === "orders" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl font-bold",
									children: "إدارة الطلبات"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "متابعة وتحديث حالات الطلبات والتحقق من إيصالات التحويل وطباعة الفواتير"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: exportOrdersToCSV,
										className: "inline-flex items-center gap-1.5 rounded-sm bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تصدير الطلبات (Excel/CSV)" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: loadOrders,
										disabled: loadingOrders,
										className: "inline-flex items-center gap-1.5 rounded-sm border border-border bg-card px-3.5 py-2 text-xs font-semibold hover:border-gold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: cn("h-3.5 w-3.5", loadingOrders && "animate-spin") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تحديث" })]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-3 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative flex-1 max-w-md",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: orderSearch,
										onChange: (e) => setOrderSearch(e.target.value),
										placeholder: "ابحث برقم الطلب، اسم العميل، الهاتف، أو المحافظة...",
										className: "w-full rounded-sm border border-input bg-background pr-9 pl-3 py-2 text-xs outline-none focus:border-gold"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1.5",
									children: [
										{
											id: "all",
											label: "الكل"
										},
										{
											id: "pending",
											label: "قيد المراجعة"
										},
										{
											id: "processing",
											label: "جاري التجهيز"
										},
										{
											id: "shipped",
											label: "تم الشحن"
										},
										{
											id: "delivered",
											label: "مكتمل"
										},
										{
											id: "cancelled",
											label: "ملغي"
										}
									].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setStatusFilter(s.id),
										className: cn("rounded-sm px-3 py-1.5 text-xs font-medium transition-colors", statusFilter === s.id ? "bg-primary text-primary-foreground font-bold" : "border border-border bg-background text-muted-foreground hover:text-foreground"),
										children: s.label
									}, s.id))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-hidden rounded-lg border border-border bg-card shadow-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-x-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
										className: "w-full text-right text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
											className: "border-b border-border bg-muted/50 text-muted-foreground font-semibold",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3.5",
													children: "رقم الطلب"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3.5",
													children: "العميل"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3.5",
													children: "المحافظة"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3.5",
													children: "طريقة الدفع"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3.5",
													children: "المبلغ"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3.5",
													children: "الحالة"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3.5 text-center",
													children: "إجراءات"
												})
											] })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
											className: "divide-y divide-border",
											children: [filteredOrders.map((o) => {
												const badge = getStatusBadge(o.status);
												badge.icon;
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
													className: "hover:bg-muted/20 transition-colors",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "p-3.5 font-mono font-bold text-gold",
															children: toArabicDigits(o.order_number)
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
															className: "p-3.5",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "block font-semibold text-foreground",
																children: o.customer_name
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "block text-[11px] text-muted-foreground",
																children: o.phone
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "p-3.5 text-foreground",
															children: o.city
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
															className: "p-3.5",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center gap-1.5",
																children: [
																	o.payment_method === "cod" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																		className: "inline-flex items-center gap-1 text-zinc-700 dark:text-zinc-300",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banknote, { className: "h-3.5 w-3.5 text-emerald-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "دفع عند الاستلام" })]
																	}),
																	o.payment_method === "vodafone_cash" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																		className: "inline-flex items-center gap-1 text-rose-600 font-semibold",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "فودافون كاش" })]
																	}),
																	o.payment_method === "instapay" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																		className: "inline-flex items-center gap-1 text-purple-600 font-semibold",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إنستا باي" })]
																	})
																]
															}), o.proof_path && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																onClick: () => {
																	const url = getPaymentProofUrl(o.proof_path);
																	if (url) setProofModalUrl(url);
																	else toast.error("تعذر تحميل رابط الصورة");
																},
																className: "mt-1 block text-[11px] text-gold underline hover:text-amber-500",
																children: "🖼️ عرض صورة التحويل"
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "p-3.5 font-bold text-foreground",
															children: formatPrice(o.total)
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "p-3.5",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
																value: o.status,
																onChange: (e) => handleUpdateStatus(o.order_number, e.target.value),
																className: cn("rounded-sm border px-2 py-1 text-xs font-semibold outline-none", badge.bg),
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																		value: "pending",
																		children: "قيد المراجعة"
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																		value: "processing",
																		children: "جاري التجهيز"
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																		value: "shipped",
																		children: "تم الشحن"
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																		value: "delivered",
																		children: "مكتمل / تم التوصيل"
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																		value: "cancelled",
																		children: "ملغي"
																	})
																]
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "p-3.5 text-center",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center justify-center gap-1.5",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																		onClick: () => handlePrintInvoice(o),
																		className: "rounded-sm border border-border p-1.5 hover:border-gold hover:text-gold",
																		title: "طباعة الفاتورة وبوليصة الشحن",
																		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4" })
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																		onClick: () => setSelectedOrder(o),
																		className: "rounded-sm border border-border px-2.5 py-1 text-xs font-medium hover:border-gold hover:text-gold",
																		children: "تفاصيل"
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																		onClick: () => handleDeleteOrder(o.order_number),
																		className: "rounded-sm p-1.5 text-destructive hover:bg-destructive/10",
																		title: "حذف الطلب",
																		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
																	})
																]
															})
														})
													]
												}, o.id || o.order_number);
											}), filteredOrders.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												colSpan: 7,
												className: "p-8 text-center text-muted-foreground",
												children: "لا توجد طلبات مطابقة للبحث أو الفلتر المختار."
											}) })]
										})]
									})
								})
							})
						]
					}),
					currentTab === "products" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-bold",
								children: "إدارة العطور والمنتجات"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "إضافة عطور جديدة، تعديل الأسعار، تغيير الصور، والتحكم في حالة التوفر"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setIsNewProductModalOpen(true),
									className: "inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-sm hover:bg-ink",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إضافة عطر جديد" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										if (confirm("هل تريد استعادة قائمة العطور الأصلية الافتراضية؟")) {
											resetStoredProducts();
											toast.success("تم استعادة العطور الافتراضية");
										}
									},
									className: "inline-flex items-center gap-1.5 rounded-sm border border-border bg-card px-3.5 py-2.5 text-xs font-semibold hover:border-gold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "استعادة الافتراضي" })]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
							children: products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative aspect-square w-full bg-sand/30",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: p.image,
										alt: p.name,
										className: "h-full w-full object-cover"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "absolute top-2 right-2 flex flex-col gap-1",
										children: [p.featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-accent-foreground shadow-sm",
											children: "مميز"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("rounded-full px-2 py-0.5 text-[10px] font-bold shadow-sm", p.inStock ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"),
											children: p.inStock ? "متوفر" : "نفذت الكمية"
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-1 flex-col p-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[11px] font-semibold text-gold",
													children: [
														p.family,
														" · ",
														p.gender
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "font-display text-lg font-bold text-foreground",
													children: p.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground",
													children: p.subtitle
												})
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-left",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "block font-bold text-sm text-foreground",
													children: formatPrice(p.price)
												}), p.oldPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "block text-[11px] text-muted-foreground line-through",
													children: formatPrice(p.oldPrice)
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 line-clamp-2 text-xs text-muted-foreground flex-1",
											children: p.description
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 pt-3 border-t border-border flex items-center justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => {
													const updated = {
														...p,
														inStock: !p.inStock
													};
													updateStoredProduct(updated);
													toast.success(`تم تغيير حالة ${p.name} إلى ${!p.inStock ? "متوفر" : "نفذ"}`);
												},
												className: cn("rounded-sm px-2.5 py-1 text-xs font-semibold border", p.inStock ? "border-emerald-500/40 text-emerald-600 hover:bg-emerald-500/10" : "border-rose-500/40 text-rose-600 hover:bg-rose-500/10"),
												children: p.inStock ? "تعيين كـ غير متوفر" : "تعيين كـ متوفر"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setEditingProduct(p),
													className: "rounded-sm border border-border p-1.5 hover:border-gold hover:text-gold",
													title: "تعديل العطر",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "h-4 w-4" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => {
														if (confirm(`هل أنت متأكد من حذف ${p.name}؟`)) {
															deleteStoredProduct(p.id);
															toast.success(`تم حذف ${p.name}`);
														}
													},
													className: "rounded-sm border border-border p-1.5 text-destructive hover:bg-destructive/10",
													title: "حذف العطر",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
												})]
											})]
										})
									]
								})]
							}, p.id))
						})]
					}),
					currentTab === "coupons" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-bold",
								children: "إدارة كوبونات الخصم"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "إنشاء أكواد خصم ترويجية بنسبة مئوية أو مبلغ ثابت وتفعيلها للمتجر"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setIsNewCouponOpen(true),
								className: "inline-flex items-center gap-2 rounded-sm bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground shadow-sm hover:bg-ink",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إنشاء كوبون جديد" })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-hidden rounded-lg border border-border bg-card shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-right text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "border-b border-border bg-muted/50 text-muted-foreground font-semibold",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3.5",
											children: "كود الخصم"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3.5",
											children: "نوع الخصم"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3.5",
											children: "قيمة الخصم"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3.5",
											children: "الحد الأدنى للطلب"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3.5",
											children: "الحالة"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3.5 text-center",
											children: "إجراءات"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
									className: "divide-y divide-border",
									children: [coupons.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "hover:bg-muted/20 transition-colors",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3.5 font-mono font-bold text-gold text-sm uppercase",
												children: c.code
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3.5",
												children: c.type === "percent" ? "نسبة مئوية (%)" : "مبلغ مالي ثابت (ج.م)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3.5 font-bold text-foreground",
												children: c.type === "percent" ? `${c.value}%` : `${c.value} ج.م`
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3.5 text-muted-foreground",
												children: c.minOrder ? `${formatPrice(c.minOrder)}` : "بدون حد أدنى"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3.5",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold", c.active ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-zinc-500/15 text-zinc-600"),
													children: c.active ? "مفعّل" : "معطّل"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3.5 text-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => handleToggleCoupon(c.code),
														className: cn("rounded-sm px-2 py-1 text-xs font-semibold border", c.active ? "border-zinc-300 text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800" : "border-emerald-500 text-emerald-600 hover:bg-emerald-50"),
														children: c.active ? "تعطيل" : "تفعيل"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => handleDeleteCoupon(c.code),
														className: "rounded-sm p-1 text-destructive hover:bg-destructive/10",
														title: "حذف الكوبون",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
													})]
												})
											})
										]
									}, c.code)), coupons.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										colSpan: 6,
										className: "p-8 text-center text-muted-foreground",
										children: "لا توجد كوبونات خصم حالياً. أضف كوبوناً جديداً لتنشيط العروض الترويجية."
									}) })]
								})]
							})
						})]
					}),
					currentTab === "settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-2xl space-y-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-bold",
							children: "إعدادات المتجر والدفع"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "تعديل أرقام التحويل، رسوم الشحن، وشريط الإعلانات وكلمة سر المدير"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSaveSettings,
							className: "space-y-6 rounded-lg border border-border bg-card p-6 shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-bold border-b border-border pb-2",
									children: "بيانات الدفع والتحويل"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-xs font-semibold text-foreground mb-1",
											children: "رقم محفظة التحويل (فودافون كاش / إنستا باي)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "tel",
											required: true,
											value: settings.transferNumber,
											onChange: (e) => setSettings({
												...settings,
												transferNumber: e.target.value
											}),
											className: "w-full rounded-sm border border-input bg-background px-3 py-2 text-xs outline-none focus:border-gold"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-1 block text-[11px] text-muted-foreground",
											children: "هذا الرقم هو الذي يظهر للعملاء في صفحة إتمام الطلب لنسخه"
										})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-semibold text-foreground mb-1",
										children: "رقم هاتف خدمة العملاء / واتساب"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "tel",
										required: true,
										value: settings.storePhone,
										onChange: (e) => setSettings({
											...settings,
											storePhone: e.target.value
										}),
										className: "w-full rounded-sm border border-input bg-background px-3 py-2 text-xs outline-none focus:border-gold"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-bold border-b border-border pb-2 pt-4",
									children: "الشحن والرسوم"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-semibold text-foreground mb-1",
										children: "حد الشحن المجاني (جنية مصري)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										required: true,
										value: settings.freeShippingThreshold,
										onChange: (e) => setSettings({
											...settings,
											freeShippingThreshold: Number(e.target.value)
										}),
										className: "w-full rounded-sm border border-input bg-background px-3 py-2 text-xs outline-none focus:border-gold"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-semibold text-foreground mb-1",
										children: "رسوم إضافية للدفع عند الاستلام (ج.م)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										required: true,
										value: settings.codFee,
										onChange: (e) => setSettings({
											...settings,
											codFee: Number(e.target.value)
										}),
										className: "w-full rounded-sm border border-input bg-background px-3 py-2 text-xs outline-none focus:border-gold"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-foreground mb-1",
									children: "نص الشريط الإعلاني العلوي في المتجر"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: settings.announcementText,
									onChange: (e) => setSettings({
										...settings,
										announcementText: e.target.value
									}),
									className: "w-full rounded-sm border border-input bg-background px-3 py-2 text-xs outline-none focus:border-gold"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg font-bold border-b border-border pb-2 pt-4",
									children: "أمان لوحة التحكم (تغيير كلمة المرور)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-semibold text-foreground mb-1",
									children: "كلمة مرور جديدة (اتركها فارغة إذا لا ترغب في تغييرها)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									value: newPassword,
									onChange: (e) => setNewPassword(e.target.value),
									placeholder: "أدخل كلمة المرور الجديدة...",
									className: "w-full rounded-sm border border-input bg-background px-3 py-2 text-xs outline-none focus:border-gold"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									className: "inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-xs font-bold text-primary-foreground shadow-sm hover:bg-ink",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "حفظ التعديلات" })]
								})
							]
						})]
					})
				]
			}),
			isNewCouponOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-bold",
							children: "إنشاء كود خصم جديد"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setIsNewCouponOpen(false),
							className: "rounded p-1 hover:bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleAddCoupon,
						className: "mt-4 space-y-4 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block font-semibold mb-1",
								children: "كود الخصم (Promo Code) *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								required: true,
								placeholder: "مثال: SALE15",
								value: newCoupon.code,
								onChange: (e) => setNewCoupon({
									...newCoupon,
									code: e.target.value.toUpperCase()
								}),
								className: "w-full rounded-sm border border-input bg-background px-3 py-2 uppercase font-mono font-bold outline-none focus:border-gold"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block font-semibold mb-1",
									children: "نوع الخصم"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: newCoupon.type,
									onChange: (e) => setNewCoupon({
										...newCoupon,
										type: e.target.value
									}),
									className: "w-full rounded-sm border border-input bg-background px-3 py-2 outline-none focus:border-gold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "percent",
										children: "نسبة مئوية (%)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "fixed",
										children: "مبلغ ثابت (ج.م)"
									})]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block font-semibold mb-1",
									children: "قيمة الخصم *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									required: true,
									min: 1,
									value: newCoupon.value,
									onChange: (e) => setNewCoupon({
										...newCoupon,
										value: Number(e.target.value)
									}),
									className: "w-full rounded-sm border border-input bg-background px-3 py-2 outline-none focus:border-gold"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block font-semibold mb-1",
								children: "الحد الأدنى للطلب (اختياري)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 0,
								placeholder: "مثال: 300",
								value: newCoupon.minOrder || "",
								onChange: (e) => setNewCoupon({
									...newCoupon,
									minOrder: e.target.value ? Number(e.target.value) : void 0
								}),
								className: "w-full rounded-sm border border-input bg-background px-3 py-2 outline-none focus:border-gold"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-end gap-2 border-t border-border pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setIsNewCouponOpen(false),
									className: "rounded-sm border border-border px-4 py-2 font-semibold hover:bg-muted",
									children: "إلغاء"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "rounded-sm bg-primary px-6 py-2 font-bold text-primary-foreground hover:bg-ink",
									children: "حفظ الكوبون"
								})]
							})
						]
					})]
				})
			}),
			selectedOrder && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-border bg-card p-6 shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs font-bold text-gold",
							children: toArabicDigits(selectedOrder.order_number)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl font-bold",
							children: "تفاصيل الطلب"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => handlePrintInvoice(selectedOrder),
								className: "inline-flex items-center gap-1.5 rounded-sm border border-gold bg-gold/10 px-3 py-1.5 text-xs font-bold text-gold hover:bg-gold hover:text-accent-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "طباعة الفاتورة" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSelectedOrder(null),
								className: "rounded-sm p-1.5 hover:bg-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-6 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md border border-border bg-muted/20 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-bold text-sm text-foreground mb-3",
									children: "بيانات العميل والتوصيل"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "الاسم:"
											}),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-foreground",
												children: selectedOrder.customer_name
											})
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "الموبايل:"
											}),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: `tel:${selectedOrder.phone}`,
												className: "font-semibold text-gold underline",
												children: selectedOrder.phone
											})
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "المحافظة:"
											}),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-foreground",
												children: selectedOrder.city
											})
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "المنطقة:"
											}),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-foreground",
												children: selectedOrder.district
											})
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "col-span-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: "العنوان التفصيلي:"
												}),
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-foreground",
													children: selectedOrder.street
												})
											]
										}),
										selectedOrder.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "col-span-2 border-t border-border pt-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: "ملاحظات العميل:"
												}),
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-foreground",
													children: selectedOrder.notes
												})
											]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "font-bold text-sm text-foreground mb-2",
								children: "العطور المطلوبة"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "divide-y divide-border border border-border rounded-md overflow-hidden",
								children: selectedOrder.items?.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between p-3 bg-card",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-foreground text-sm block",
										children: item.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground text-xs",
										children: [
											"الحجم: ",
											toArabicDigits(item.size),
											" مل · الكمية: ",
											toArabicDigits(item.qty)
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-foreground",
										children: formatPrice(item.unit_price * item.qty)
									})]
								}, idx))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5 border-t border-border pt-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "المجموع الفرعي:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPrice(selectedOrder.subtotal) })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "الشحن:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selectedOrder.shipping === 0 ? "مجاني" : formatPrice(selectedOrder.shipping) })]
									}),
									selectedOrder.cod_fee > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "رسوم الدفع عند الاستلام:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPrice(selectedOrder.cod_fee) })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between font-bold text-base text-foreground pt-2 border-t border-border",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "الإجمالي:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-gold",
											children: formatPrice(selectedOrder.total)
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-4 border-t border-border pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: "تحديث حالة الطلب:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: selectedOrder.status,
										onChange: (e) => handleUpdateStatus(selectedOrder.order_number, e.target.value),
										className: "rounded-sm border border-input bg-background px-3 py-1.5 text-xs font-semibold outline-none focus:border-gold",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "pending",
												children: "قيد المراجعة"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "processing",
												children: "جاري التجهيز"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "shipped",
												children: "تم الشحن"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "delivered",
												children: "مكتمل / تم التوصيل"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "cancelled",
												children: "ملغي"
											})
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleDeleteOrder(selectedOrder.order_number),
									className: "rounded-sm bg-destructive/10 px-3 py-1.5 text-xs font-bold text-destructive hover:bg-destructive hover:text-white",
									children: "حذف الطلب"
								})]
							})
						]
					})]
				})
			}),
			proofModalUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				onClick: () => setProofModalUrl(null),
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					onClick: (e) => e.stopPropagation(),
					className: "relative max-h-[90vh] max-w-lg rounded-lg bg-card p-4 shadow-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setProofModalUrl(null),
							className: "absolute top-2 left-2 rounded-full bg-black/50 p-1.5 text-white hover:bg-black",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-display text-base font-bold mb-3",
							children: "إيصال التحويل المرفوع"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: proofModalUrl,
							alt: "إيصال التحويل",
							className: "max-h-[75vh] w-full rounded object-contain"
						})
					]
				})
			}),
			(isNewProductModalOpen || editingProduct) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductFormModal, {
				product: editingProduct,
				onClose: () => {
					setIsNewProductModalOpen(false);
					setEditingProduct(null);
				},
				onSave: (p) => {
					if (editingProduct) {
						updateStoredProduct(p);
						toast.success(`تم تحديث عطر ${p.name}`);
					} else {
						addStoredProduct(p);
						toast.success(`تمت إضافة عطر ${p.name} بنجاح`);
					}
					setIsNewProductModalOpen(false);
					setEditingProduct(null);
				}
			})
		]
	});
}
function ProductFormModal({ product, onClose, onSave }) {
	const [form, setForm] = import_react.useState(product || {
		id: `perfume-${Date.now()}`,
		name: "",
		subtitle: "",
		family: "شرقي",
		gender: "للجنسين",
		price: 350,
		oldPrice: void 0,
		image: sampleImages[0].url,
		featured: true,
		inStock: true,
		sizes: [{
			ml: 50,
			extra: 0
		}, {
			ml: 100,
			extra: 150
		}],
		notes: {
			top: ["زعفران", "برغموت"],
			heart: ["ورد طائفي", "ياسمين"],
			base: [
				"عود كمبودي",
				"عنبر",
				"مسك"
			]
		},
		description: "",
		concentration: "Extrait de Parfum"
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!form.name || !form.price) {
			toast.error("يرجى إدخال اسم العطر والسعر");
			return;
		}
		onSave(form);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-border bg-card p-6 shadow-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border pb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl font-bold",
					children: product ? `تعديل عطر: ${product.name}` : "إضافة عطر جديد"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "rounded-sm p-1.5 hover:bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "mt-4 space-y-4 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block font-semibold mb-1",
							children: "اسم العطر *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							type: "text",
							value: form.name || "",
							onChange: (e) => setForm({
								...form,
								name: e.target.value
							}),
							placeholder: "مثال: سر العود",
							className: "w-full rounded-sm border border-input bg-background px-3 py-2 outline-none focus:border-gold"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block font-semibold mb-1",
							children: "الاسم الفرعي (المكونات البارزة)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: form.subtitle || "",
							onChange: (e) => setForm({
								...form,
								subtitle: e.target.value
							}),
							placeholder: "مثال: عود كمبودي وعنبر ملكي",
							className: "w-full rounded-sm border border-input bg-background px-3 py-2 outline-none focus:border-gold"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block font-semibold mb-1",
								children: "العائلة العطرية"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: form.family || "شرقي",
								onChange: (e) => setForm({
									...form,
									family: e.target.value
								}),
								className: "w-full rounded-sm border border-input bg-background px-3 py-2 outline-none focus:border-gold",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "شرقي",
										children: "شرقي"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "زهري",
										children: "زهري"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "خشبي",
										children: "خشبي"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "منعش",
										children: "منعش"
									})
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block font-semibold mb-1",
								children: "الفئة"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: form.gender || "للجنسين",
								onChange: (e) => setForm({
									...form,
									gender: e.target.value
								}),
								className: "w-full rounded-sm border border-input bg-background px-3 py-2 outline-none focus:border-gold",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "رجالي",
										children: "رجالي"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "نسائي",
										children: "نسائي"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "للجنسين",
										children: "للجنسين"
									})
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block font-semibold mb-1",
								children: "التركيز"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: form.concentration || "Extrait de Parfum",
								onChange: (e) => setForm({
									...form,
									concentration: e.target.value
								}),
								className: "w-full rounded-sm border border-input bg-background px-3 py-2 outline-none focus:border-gold"
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block font-semibold mb-1",
							children: "السعر الأساسي (ج.م) *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							type: "number",
							value: form.price || "",
							onChange: (e) => setForm({
								...form,
								price: Number(e.target.value)
							}),
							className: "w-full rounded-sm border border-input bg-background px-3 py-2 outline-none focus:border-gold"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block font-semibold mb-1",
							children: "السعر قبل الخصم (اختياري)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							value: form.oldPrice || "",
							onChange: (e) => setForm({
								...form,
								oldPrice: e.target.value ? Number(e.target.value) : void 0
							}),
							placeholder: "اتركه فارغاً إذا لا يوجد خصم",
							className: "w-full rounded-sm border border-input bg-background px-3 py-2 outline-none focus:border-gold"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-3 border-t border-border pt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block font-semibold mb-1",
								children: "قمة العطر (مفصولة بفواصل)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: form.notes?.top?.join("، ") || "",
								onChange: (e) => setForm({
									...form,
									notes: {
										...form.notes,
										top: e.target.value.split(/[,،]/).map((s) => s.trim()).filter(Boolean)
									}
								}),
								className: "w-full rounded-sm border border-input bg-background px-3 py-2 outline-none focus:border-gold"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block font-semibold mb-1",
								children: "قلب العطر (مفصولة بفواصل)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: form.notes?.heart?.join("، ") || "",
								onChange: (e) => setForm({
									...form,
									notes: {
										...form.notes,
										heart: e.target.value.split(/[,،]/).map((s) => s.trim()).filter(Boolean)
									}
								}),
								className: "w-full rounded-sm border border-input bg-background px-3 py-2 outline-none focus:border-gold"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block font-semibold mb-1",
								children: "قاعدة العطر (مفصولة بفواصل)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: form.notes?.base?.join("، ") || "",
								onChange: (e) => setForm({
									...form,
									notes: {
										...form.notes,
										base: e.target.value.split(/[,،]/).map((s) => s.trim()).filter(Boolean)
									}
								}),
								className: "w-full rounded-sm border border-input bg-background px-3 py-2 outline-none focus:border-gold"
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block font-semibold mb-1",
						children: "الوصف التفصيلي للعطر"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						rows: 3,
						value: form.description || "",
						onChange: (e) => setForm({
							...form,
							description: e.target.value
						}),
						className: "w-full rounded-sm border border-input bg-background px-3 py-2 outline-none focus:border-gold"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block font-semibold mb-2",
							children: "اختيار صورة العطر"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-4 gap-2 sm:grid-cols-8",
							children: sampleImages.map((img) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setForm({
									...form,
									image: img.url
								}),
								className: cn("relative aspect-square overflow-hidden rounded border-2 transition-all", form.image === img.url ? "border-gold scale-105 shadow-md" : "border-transparent opacity-70 hover:opacity-100"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: img.url,
									alt: img.name,
									className: "h-full w-full object-cover"
								})
							}, img.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: form.image || "",
								onChange: (e) => setForm({
									...form,
									image: e.target.value
								}),
								placeholder: "أو أدخل رابط صورة خارجي مباشرة...",
								className: "w-full rounded-sm border border-input bg-background px-3 py-1.5 text-[11px] outline-none focus:border-gold"
							})
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-6 border-t border-border pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: form.inStock ?? true,
								onChange: (e) => setForm({
									...form,
									inStock: e.target.checked
								}),
								className: "h-4 w-4 rounded border-input text-gold focus:ring-gold"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: "العطر متوفر في المخزون (In Stock)"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: form.featured ?? false,
								onChange: (e) => setForm({
									...form,
									featured: e.target.checked
								}),
								className: "h-4 w-4 rounded border-input text-gold focus:ring-gold"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: "عرض في الصفحة الرئيسية (عطور مميزة)"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-3 border-t border-border pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onClose,
							className: "rounded-sm border border-border px-4 py-2 text-xs font-semibold hover:bg-muted",
							children: "إلغاء"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "rounded-sm bg-primary px-6 py-2 text-xs font-bold text-primary-foreground hover:bg-ink",
							children: product ? "حفظ التعديلات" : "إضافة العطر"
						})]
					})
				]
			})]
		})
	});
}
//#endregion
export { AdminDashboard as component };
