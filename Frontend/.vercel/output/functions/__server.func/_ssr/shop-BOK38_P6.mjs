import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { l as useProducts, s as toArabicDigits } from "./products-BTJ20OVa.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as ProductCard } from "./ProductCard-CxGPMxH7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-BOK38_P6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var families = [
	"الكل",
	"شرقي",
	"زهري",
	"خشبي",
	"منعش"
];
var genders = [
	"الكل",
	"رجالي",
	"نسائي",
	"للجنسين"
];
var sorts = [
	{
		id: "featured",
		label: "الأكثر تميزاً"
	},
	{
		id: "low",
		label: "الأقل سعراً"
	},
	{
		id: "high",
		label: "الأعلى سعراً"
	}
];
function Shop() {
	const products = useProducts();
	const [family, setFamily] = import_react.useState("الكل");
	const [gender, setGender] = import_react.useState("الكل");
	const [sort, setSort] = import_react.useState("featured");
	const list = import_react.useMemo(() => {
		const out = products.filter((p) => (family === "الكل" || p.family === family) && (gender === "الكل" || p.gender === gender));
		if (sort === "low") return [...out].sort((a, b) => a.price - b.price);
		if (sort === "high") return [...out].sort((a, b) => b.price - a.price);
		return [...out].sort((a, b) => Number(b.featured) - Number(a.featured));
	}, [
		products,
		family,
		gender,
		sort
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: "المتجر"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: [toArabicDigits(list.length), " عطر متاح من تركيباتنا الخاصة"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-6 h-px w-full gold-rule" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: families.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setFamily(f),
						className: cn("border px-4 py-2 text-xs transition-colors", family === f ? "border-gold bg-gold text-accent-foreground" : "border-border hover:border-gold"),
						children: f
					}, f))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: genders.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setGender(g),
							className: cn("border px-3 py-1.5 text-xs transition-colors", gender === g ? "border-foreground" : "border-border text-muted-foreground"),
							children: g
						}, g))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: sort,
						onChange: (e) => setSort(e.target.value),
						className: "border border-border bg-card px-3 py-2 text-xs",
						"aria-label": "ترتيب",
						children: sorts.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s.id,
							children: s.label
						}, s.id))
					})]
				})]
			}),
			list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-20 text-center text-sm text-muted-foreground",
				children: "لا توجد عطور مطابقة لهذا الاختيار."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid grid-cols-2 gap-4 sm:gap-6",
				children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
			})
		]
	});
}
//#endregion
export { Shop as component };
