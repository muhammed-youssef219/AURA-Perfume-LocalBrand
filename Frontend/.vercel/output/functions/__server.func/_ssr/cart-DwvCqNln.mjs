import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { i as getProduct } from "./products-BTJ20OVa.mjs";
import { r as getStoreSettings, s as validateCoupon } from "./couponsStore-B5vZBq3Z.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-DwvCqNln.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Ctx = import_react.createContext(null);
var STORAGE_KEY = "dar-alatoor-cart";
var COUPON_STORAGE_KEY = "dar-alatoor-coupon";
var DEFAULT_SHIPPING = 25;
function CartProvider({ children }) {
	const [lines, setLines] = import_react.useState([]);
	const [appliedCoupon, setAppliedCoupon] = import_react.useState(null);
	const [threshold, setThreshold] = import_react.useState(getStoreSettings().freeShippingThreshold);
	import_react.useEffect(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) setLines(JSON.parse(raw));
			const rawCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
			if (rawCoupon) setAppliedCoupon(JSON.parse(rawCoupon));
		} catch {}
		const syncSettings = () => {
			setThreshold(getStoreSettings().freeShippingThreshold);
		};
		window.addEventListener("aura_settings_updated", syncSettings);
		window.addEventListener("storage", syncSettings);
		return () => {
			window.removeEventListener("aura_settings_updated", syncSettings);
			window.removeEventListener("storage", syncSettings);
		};
	}, []);
	import_react.useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
		} catch {}
	}, [lines]);
	import_react.useEffect(() => {
		try {
			if (appliedCoupon) localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
			else localStorage.removeItem(COUPON_STORAGE_KEY);
		} catch {}
	}, [appliedCoupon]);
	const add = (product, size, unitPrice, qty = 1) => {
		const key = `${product.id}-${size}`;
		setLines((prev) => {
			if (prev.find((l) => l.key === key)) return prev.map((l) => l.key === key ? {
				...l,
				qty: Math.min(l.qty + qty, 20)
			} : l);
			return [...prev, {
				key,
				productId: product.id,
				size,
				qty,
				unitPrice
			}];
		});
	};
	const setQty = (key, qty) => setLines((prev) => qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => l.key === key ? {
		...l,
		qty: Math.min(qty, 20)
	} : l));
	const remove = (key) => setLines((prev) => prev.filter((l) => l.key !== key));
	const clear = () => {
		setLines([]);
		setAppliedCoupon(null);
	};
	const count = lines.reduce((s, l) => s + l.qty, 0);
	const subtotal = lines.reduce((s, l) => s + l.qty * l.unitPrice, 0);
	let discount = 0;
	if (appliedCoupon && subtotal > 0) if (appliedCoupon.minOrder && subtotal < appliedCoupon.minOrder) discount = 0;
	else if (appliedCoupon.type === "percent") discount = Math.round(subtotal * appliedCoupon.value / 100);
	else discount = Math.min(appliedCoupon.value, subtotal);
	const shipping = lines.length === 0 || subtotal >= threshold ? 0 : DEFAULT_SHIPPING;
	const total = Math.max(0, subtotal - discount) + shipping;
	const applyCoupon = (code) => {
		const result = validateCoupon(code, subtotal);
		if (result.valid && result.coupon) {
			setAppliedCoupon(result.coupon);
			return {
				success: true,
				message: result.message
			};
		}
		return {
			success: false,
			message: result.message
		};
	};
	const removeCoupon = () => {
		setAppliedCoupon(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value: {
			lines,
			add,
			setQty,
			remove,
			clear,
			count,
			subtotal,
			discount,
			appliedCoupon,
			applyCoupon,
			removeCoupon,
			shipping,
			total,
			freeShippingThreshold: threshold
		},
		children
	});
}
function useCart() {
	const ctx = import_react.useContext(Ctx);
	if (!ctx) throw new Error("useCart must be used inside CartProvider");
	return ctx;
}
var lineProduct = (line) => getProduct(line.productId);
//#endregion
export { lineProduct as n, useCart as r, CartProvider as t };
