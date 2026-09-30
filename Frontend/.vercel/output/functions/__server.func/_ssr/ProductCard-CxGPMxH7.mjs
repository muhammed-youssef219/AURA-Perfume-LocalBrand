import { r as formatPrice } from "./products-BTJ20OVa.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as useCart } from "./cart-DwvCqNln.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCard-CxGPMxH7.js
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ product }) {
	const { add } = useCart();
	const navigate = useNavigate();
	const size = product.sizes?.[0] ?? {
		ml: 50,
		extra: 0
	};
	const unitPrice = product.price + size.extra;
	const handleOrderNow = () => {
		add(product, size.ml, unitPrice, 1);
		navigate({ to: "/checkout" });
	};
	const handleAddToCart = () => {
		add(product, size.ml, unitPrice, 1);
		toast.success(`تمت إضافة ${product.name} إلى السلة`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group flex flex-col overflow-hidden border border-border bg-card transition-all hover:border-gold hover:shadow-[0_14px_40px_-24px_oklch(0.32_0.055_45)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/product/$id",
			params: { id: product.id },
			className: "block",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-[4/5] overflow-hidden bg-sand",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: product.image,
						alt: `عطر ${product.name}`,
						loading: "lazy",
						width: 900,
						height: 1100,
						className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
					}),
					!product.inStock && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute top-3 right-3 bg-foreground/85 px-2.5 py-1 text-[11px] text-background",
						children: "نفد المخزون"
					}),
					product.oldPrice && product.inStock && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute top-3 right-3 bg-gold px-2.5 py-1 text-[11px] font-bold text-accent-foreground",
						children: "عرض خاص"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] tracking-widest text-muted-foreground",
						children: [
							product.family,
							" · ",
							product.gender
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-1.5 font-display text-lg",
						children: product.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 line-clamp-1 text-xs text-muted-foreground",
						children: product.subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-baseline gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-bold",
							children: formatPrice(unitPrice)
						}), product.oldPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground line-through",
							children: formatPrice(product.oldPrice)
						})]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-auto flex flex-col gap-2 border-t border-border p-4 pt-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				disabled: !product.inStock,
				onClick: handleAddToCart,
				className: "w-full bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground",
				children: product.inStock ? "أضف إلى السلة" : "غير متوفر"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				disabled: !product.inStock,
				onClick: handleOrderNow,
				className: "w-full border border-gold bg-transparent px-4 py-2.5 text-sm font-bold text-gold transition-colors hover:bg-gold hover:text-accent-foreground disabled:cursor-not-allowed disabled:border-muted disabled:text-muted-foreground",
				children: "اطلب الآن"
			})]
		})]
	});
}
//#endregion
export { ProductCard as t };
