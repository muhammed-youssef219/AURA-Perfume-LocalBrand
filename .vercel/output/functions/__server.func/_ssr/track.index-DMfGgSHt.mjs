import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { b as PackageSearch } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/track.index-DMfGgSHt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function normalizeOrderNumber(value) {
	const arabic = "٠١٢٣٤٥٦٧٨٩";
	return value.trim().replace(/[٠-٩]/g, (d) => String(arabic.indexOf(d))).toUpperCase().replace(/\s+/g, "");
}
function TrackSearch() {
	const navigate = useNavigate();
	const [value, setValue] = import_react.useState("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-4 py-20 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageSearch, { className: "mx-auto h-12 w-12 text-gold" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-6 font-display text-3xl",
				children: "متابعة الطلب"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-7 text-muted-foreground",
				children: "أدخل رقم الطلب الذي وصلك بعد تأكيد الشراء لعرض حالته الحالية وخط زمن التحديثات."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					const orderNumber = normalizeOrderNumber(value);
					if (orderNumber.length < 3) return;
					navigate({
						to: "/track/$orderNumber",
						params: { orderNumber }
					});
				},
				className: "mt-8 flex flex-col gap-3 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value,
					onChange: (e) => setValue(e.target.value),
					placeholder: "AT-١٢٣٤٥٦",
					"aria-label": "رقم الطلب",
					className: "w-full border border-input bg-card px-3 py-3 text-center text-sm outline-none focus:border-gold"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "bg-primary px-8 py-3 text-sm font-bold text-primary-foreground hover:bg-ink",
					children: "تتبّع"
				})]
			})
		]
	});
}
//#endregion
export { TrackSearch as component, normalizeOrderNumber };
