import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as formatPrice, s as toArabicDigits } from "./products-BTJ20OVa.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { r as getLocalOrders } from "./ordersService-nJMzTHvk.mjs";
import { D as isRedirect, _ as useRouter, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { A as Clock, P as Check, b as PackageSearch } from "../_libs/lucide-react.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import { t as Route } from "./track._orderNumber-BAU5iAUj.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-DLffJrVw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/track._orderNumber-BX64KIaT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getOrderTracking = createServerFn({ method: "GET" }).inputValidator((data) => objectType({ orderNumber: stringType().min(3).max(40) }).parse(data)).handler(createSsrRpc("e3538de015ceaeef3f7a025a433016dbd076df27c494087c916f9295ab53792f"));
var STEPS = [
	{
		id: "pending",
		label: "تم استلام الطلب"
	},
	{
		id: "confirmed",
		label: "تم تأكيد الطلب"
	},
	{
		id: "processing",
		label: "جاري التجهيز والتحضير"
	},
	{
		id: "shipped",
		label: "تم الشحن وخرج للتسليم"
	},
	{
		id: "delivered",
		label: "تم التسليم بنجاح"
	}
];
var PAYMENTS = {
	cod: "الدفع عند الاستلام",
	vodafone_cash: "فودافون كاش",
	instapay: "إنستا باي"
};
function arabicDate(iso) {
	const d = new Date(iso);
	const s = new Intl.DateTimeFormat("ar-EG", {
		dateStyle: "medium",
		timeStyle: "short"
	}).format(d);
	return toArabicDigits(s);
}
function normalizeStatus(st) {
	if (st === "pending" || st === "received") return 0;
	if (st === "confirmed") return 1;
	if (st === "processing" || st === "preparing") return 2;
	if (st === "shipped") return 3;
	if (st === "delivered") return 4;
	return 0;
}
function TrackOrder() {
	const { orderNumber } = Route.useParams();
	const fetchOrder = useServerFn(getOrderTracking);
	const { data: serverData, isPending } = useQuery({
		queryKey: ["tracking", orderNumber],
		queryFn: () => fetchOrder({ data: { orderNumber } })
	});
	const localOrder = React.useMemo(() => {
		if (typeof window === "undefined") return null;
		return getLocalOrders().find((o) => o.order_number?.toLowerCase() === orderNumber?.toLowerCase());
	}, [orderNumber]);
	const data = serverData || localOrder;
	if (isPending && !localOrder) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-xl px-4 py-24 text-center text-sm text-muted-foreground",
		children: "جارٍ تحميل بيانات الطلب…"
	});
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageSearch, { className: "mx-auto h-12 w-12 text-muted-foreground" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-6 font-display text-3xl",
				children: "لم نجد هذا الطلب"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: [
					"تأكد من رقم الطلب ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold",
						children: toArabicDigits(orderNumber)
					}),
					" ثم حاول مرة أخرى."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/track",
				className: "mt-8 inline-block bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground hover:bg-ink",
				children: "إدخال رقم آخر"
			})
		]
	});
	const currentIndex = normalizeStatus(data.status);
	const eventByStatus = new Map(data.events?.map((e) => [e.status, e.created_at]) || []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-widest text-muted-foreground",
				children: "متابعة الطلب"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-display text-4xl",
				children: toArabicDigits(data.order_number)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: [
					"تاريخ الطلب: ",
					arabicDate(data.created_at),
					" — الحالة الحالية:",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold text-foreground",
						children: STEPS[currentIndex]?.label ?? "قيد المراجعة"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "border border-border bg-card p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl",
						children: "خط زمن التحديثات"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-6 space-y-0",
						children: STEPS.map((step, i) => {
							const done = i <= currentIndex;
							const at = eventByStatus.get(step.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("flex h-8 w-8 items-center justify-center rounded-full border", done ? "border-gold bg-gold text-accent-foreground" : "border-border bg-background text-muted-foreground"),
										children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5" })
									}), i < STEPS.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("w-px flex-1", done ? "bg-gold" : "bg-border"),
										style: { minHeight: 34 }
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pb-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: cn("text-sm font-bold", !done && "text-muted-foreground"),
										children: step.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: at ? arabicDate(at) : "بانتظار التحديث"
									})]
								})]
							}, step.id);
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "border border-border bg-card p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-xl",
									children: "تفاصيل الطلب"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-4 space-y-3 text-sm",
									children: data.items.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											it.name,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs text-muted-foreground",
												children: [
													"(",
													toArabicDigits(String(it.size)),
													" مل × ",
													toArabicDigits(it.qty),
													")"
												]
											})
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "whitespace-nowrap text-xs font-bold",
											children: formatPrice(it.unit_price * it.qty)
										})]
									}, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 space-y-2 border-t border-border pt-4 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
											label: "المجموع الفرعي",
											value: formatPrice(data.subtotal)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
											label: "الشحن",
											value: formatPrice(data.shipping)
										}),
										data.cod_fee > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
											label: "رسوم الدفع عند الاستلام",
											value: formatPrice(data.cod_fee)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between border-t border-border pt-3 font-bold",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "الإجمالي" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPrice(data.total) })]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "border border-border bg-card p-6 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-xl",
									children: "بيانات التوصيل"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4",
									children: data.customer_name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-muted-foreground",
									children: [
										data.city,
										" — ",
										data.district
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-muted-foreground",
									children: data.street
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 text-xs text-muted-foreground",
									children: ["طريقة الدفع: ", PAYMENTS[data.payment_method] ?? data.payment_method]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							className: "block bg-primary px-8 py-3.5 text-center text-sm font-bold text-primary-foreground hover:bg-ink",
							children: "متابعة التسوق"
						})
					]
				})]
			})
		]
	});
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: value })]
	});
}
//#endregion
export { TrackOrder as component };
