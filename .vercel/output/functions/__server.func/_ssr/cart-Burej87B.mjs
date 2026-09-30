import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as formatPrice, s as toArabicDigits } from "./products-BTJ20OVa.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as Plus, a as Trash2, o as Tag, t as X, x as Minus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as lineProduct, r as useCart } from "./cart-DwvCqNln.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-Burej87B.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CartPage() {
	const { lines, setQty, remove, subtotal, discount, appliedCoupon, applyCoupon, removeCoupon, shipping, total, count, freeShippingThreshold } = useCart();
	const [couponCode, setCouponCode] = import_react.useState("");
	const handleApplyCoupon = (e) => {
		e.preventDefault();
		if (!couponCode.trim()) return;
		const res = applyCoupon(couponCode.trim());
		if (res.success) {
			toast.success(res.message);
			setCouponCode("");
		} else toast.error(res.message);
	};
	if (lines.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "سلتك فارغة"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: "لم تُضف أي عطر بعد. تصفّح المجموعة واختر ما يناسب ذوقك."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/shop",
				className: "mt-8 inline-block bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground hover:bg-ink",
				children: "تسوّق الآن"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: "سلة الشراء"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: [toArabicDigits(count), " قطعة في سلتك"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-border border-y border-border",
					children: lines.map((line) => {
						const p = lineProduct(line);
						if (!p) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[80px_minmax(0,1fr)] items-start gap-4 py-5 sm:grid-cols-[96px_minmax(0,1fr)_auto]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/product/$id",
									params: { id: p.id },
									className: "shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: p.image,
										alt: p.name,
										loading: "lazy",
										width: 900,
										height: 1100,
										className: "h-24 w-20 object-cover sm:h-28 sm:w-24 rounded"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/product/$id",
											params: { id: p.id },
											className: "font-display text-lg hover:text-gold font-bold",
											children: p.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 text-xs text-muted-foreground",
											children: [
												toArabicDigits(line.size),
												" مل · ",
												p.concentration
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 text-xs text-muted-foreground",
											children: [formatPrice(line.unitPrice), " للقطعة"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 flex flex-wrap items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center border border-border rounded-sm bg-card",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														"aria-label": "إنقاص الكمية",
														onClick: () => setQty(line.key, line.qty - 1),
														className: "p-2 hover:bg-muted",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3.5 w-3.5" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "w-10 text-center text-sm font-bold",
														children: toArabicDigits(line.qty)
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														"aria-label": "زيادة الكمية",
														onClick: () => setQty(line.key, line.qty + 1),
														className: "p-2 hover:bg-muted",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" })
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => remove(line.key),
												className: "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), " حذف"]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "col-span-2 text-sm font-bold sm:col-span-1 sm:text-left",
									children: formatPrice(line.unitPrice * line.qty)
								})
							]
						}, line.key);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "h-fit border border-border bg-card p-6 rounded-lg shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl font-bold",
							children: "ملخص الطلب"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 border-b border-border pb-4",
							children: appliedCoupon ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-md bg-gold/15 border border-gold/40 p-2.5 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "h-4 w-4 text-gold" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-foreground",
											children: appliedCoupon.code
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[11px] text-muted-foreground",
											children: [
												"(",
												appliedCoupon.type === "percent" ? `${appliedCoupon.value}%` : `${appliedCoupon.value} ج.م`,
												")"
											]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										removeCoupon();
										toast.info("تم إلغاء كود الخصم");
									},
									className: "rounded-full p-1 hover:bg-black/10 text-muted-foreground hover:text-destructive",
									title: "إزالة الكوبون",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleApplyCoupon,
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: couponCode,
									onChange: (e) => setCouponCode(e.target.value),
									placeholder: "كود الخصم (مثل AURA10)",
									className: "w-full rounded-sm border border-input bg-background px-3 py-2 text-xs outline-none focus:border-gold uppercase"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "rounded-sm bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-ink shrink-0",
									children: "تطبيق"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "المجموع الفرعي"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPrice(subtotal) })]
								}),
								discount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "خصم الكوبون" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["-", formatPrice(discount)] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "الشحن"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: shipping === 0 ? "مجاني" : formatPrice(shipping) })]
								}),
								shipping > 0 && subtotal < freeShippingThreshold && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-gold",
									children: [
										"أضف بقيمة ",
										formatPrice(freeShippingThreshold - subtotal),
										" للحصول على شحن مجاني."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-2 h-px w-full gold-rule" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-base font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "الإجمالي" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-gold",
										children: formatPrice(total)
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/checkout",
							className: "mt-6 block rounded-sm bg-primary px-6 py-3.5 text-center text-sm font-bold text-primary-foreground shadow-sm hover:bg-ink transition-colors",
							children: "إتمام الطلب"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							className: "mt-3 block px-6 py-2 text-center text-xs text-muted-foreground hover:text-foreground",
							children: "متابعة التسوق"
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { CartPage as component };
