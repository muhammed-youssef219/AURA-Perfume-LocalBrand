import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as getProduct, l as useProducts, r as formatPrice, s as toArabicDigits } from "./products-BTJ20OVa.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { I as ArrowRight, P as Check, _ as Plus, b as PackageSearch, f as ShieldCheck, r as Truck, x as Minus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as useCart } from "./cart-DwvCqNln.mjs";
import { t as Route } from "./product._id-CAQyjJb7.mjs";
import { t as ProductCard } from "./ProductCard-CxGPMxH7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._id-CORQQIvK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductPage() {
	const { id } = Route.useParams();
	const loaderData = Route.useLoaderData();
	const allProducts = useProducts();
	const { add } = useCart();
	const navigate = useNavigate({ from: "/product/$id" });
	const product = allProducts.find((p) => p.id === id) || loaderData?.product || getProduct(id);
	const [sizeIndex, setSizeIndex] = import_react.useState(0);
	const [qty, setQty] = import_react.useState(1);
	import_react.useEffect(() => {
		setSizeIndex(0);
		setQty(1);
	}, [product]);
	if (!product) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageSearch, { className: "mx-auto h-16 w-16 text-muted-foreground" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-6 font-display text-3xl font-bold",
				children: "العطر غير متوفر حالياً"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: "ربما تم تعديل هذا العطر أو حذفه من الكتالوج."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/shop",
				className: "mt-8 inline-flex items-center gap-2 bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground hover:bg-ink",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تصفّح تشكيلة العطور" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
			})
		]
	});
	const size = product.sizes?.[sizeIndex] ?? product.sizes?.[0] ?? {
		ml: 50,
		extra: 0
	};
	const unitPrice = product.price + size.extra;
	const related = allProducts.filter((p) => p.id !== product.id).slice(0, 3);
	const handleOrderNow = () => {
		add(product, size.ml, unitPrice, qty);
		navigate({ to: "/checkout" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-foreground",
						children: "الرئيسية"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "px-2",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						className: "hover:text-foreground",
						children: "المتجر"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "px-2",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground font-semibold",
						children: product.name
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-10 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-lg bg-sand/40 border border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: product.image,
						alt: `عطر ${product.name} — ${product.subtitle}`,
						width: 900,
						height: 1100,
						className: "w-full object-cover aspect-[4/5]"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] tracking-[0.3em] text-gold font-bold",
						children: [
							product.family,
							" · ",
							product.concentration
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-4xl font-bold",
						children: product.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: product.subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex items-baseline gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-2xl font-bold text-foreground",
							children: formatPrice(unitPrice)
						}), product.oldPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted-foreground line-through",
							children: formatPrice(product.oldPrice)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: cn("mt-3 inline-flex items-center gap-2 text-xs font-semibold", product.inStock ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-2 w-2 rounded-full", product.inStock ? "bg-emerald-500" : "bg-destructive") }), product.inStock ? "متوفر — يُشحن خلال ٢-٤ أيام" : "نفد المخزون حالياً"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-sm leading-8 text-muted-foreground",
						children: product.description
					}),
					product.sizes && product.sizes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold text-foreground",
							children: "الحجم"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: product.sizes.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setSizeIndex(i),
								className: cn("border px-5 py-2.5 text-sm transition-colors rounded-sm font-semibold", size.ml === s.ml ? "border-gold bg-gold text-accent-foreground" : "border-border hover:border-gold"),
								children: [toArabicDigits(s.ml), " مل"]
							}, s.ml))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 flex flex-wrap items-center gap-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center border border-border rounded-sm bg-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									"aria-label": "إنقاص",
									onClick: () => setQty((q) => Math.max(1, q - 1)),
									className: "p-3 hover:bg-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-12 text-center text-sm font-bold",
									children: toArabicDigits(qty)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									"aria-label": "زيادة",
									onClick: () => setQty((q) => Math.min(20, q + 1)),
									className: "p-3 hover:bg-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							disabled: !product.inStock,
							onClick: () => {
								add(product, size.ml, unitPrice, qty);
								toast.success(`تمت إضافة ${product.name} (${toArabicDigits(size.ml)} مل) إلى السلة`);
							},
							className: "w-full rounded-sm bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground shadow-sm",
							children: product.inStock ? "أضف إلى السلة" : "نفد المخزون"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							disabled: !product.inStock,
							onClick: handleOrderNow,
							className: "w-full rounded-sm border border-gold bg-transparent px-8 py-3.5 text-sm font-bold text-gold transition-colors hover:bg-gold hover:text-accent-foreground disabled:cursor-not-allowed disabled:border-muted disabled:text-muted-foreground",
							children: "اطلب الآن"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 grid gap-3 border-t border-border pt-6 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-4 w-4 text-gold" }), " شحن سريع لجميع محافظات مصر"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-gold" }), " ضمان أصالة المنتج وثبات يدوم ٢٤ ساعة"]
						})]
					}),
					product.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-5 border border-border p-5 sm:grid-cols-3 rounded-lg bg-card/60",
						children: [
							{
								t: "المقدمة",
								v: product.notes.top
							},
							{
								t: "القلب",
								v: product.notes.heart
							},
							{
								t: "القاعدة",
								v: product.notes.base
							}
						].map((n) => n.v && n.v.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-base font-bold text-foreground",
							children: n.t
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 space-y-1 text-xs text-muted-foreground",
							children: n.v.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3 text-gold" }),
									" ",
									x
								]
							}, x))
						})] }, n.t))
					})
				] })]
			}),
			related.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-bold",
					children: "قد يعجبك أيضاً"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid grid-cols-2 gap-4 sm:gap-6",
					children: related.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
				})]
			})
		]
	});
}
//#endregion
export { ProductPage as component };
