//#region node_modules/.nitro/vite/services/ssr/assets/couponsStore-B5vZBq3Z.js
var SETTINGS_KEY = "aura_store_settings";
var defaultSettings = {
	transferNumber: "01013556821",
	freeShippingThreshold: 400,
	codFee: 15,
	storePhone: "01013556821",
	announcementText: "شحن مجاني للطلبات فوق ٤٠٠ ج.م · تغليف هدايا مجاني",
	enableAnnouncements: true
};
function getStoreSettings() {
	if (typeof window === "undefined") return defaultSettings;
	try {
		const raw = localStorage.getItem(SETTINGS_KEY);
		if (!raw) return defaultSettings;
		return {
			...defaultSettings,
			...JSON.parse(raw)
		};
	} catch {
		return defaultSettings;
	}
}
function saveStoreSettings(settings) {
	if (typeof window === "undefined") return;
	localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
	window.dispatchEvent(new Event("aura_settings_updated"));
}
var COUPONS_STORAGE_KEY = "aura_coupons_list";
var defaultCoupons = [
	{
		code: "AURA10",
		type: "percent",
		value: 10,
		minOrder: 300,
		active: true
	},
	{
		code: "WELCOME50",
		type: "fixed",
		value: 50,
		minOrder: 400,
		active: true
	},
	{
		code: "ROYAL20",
		type: "percent",
		value: 20,
		minOrder: 800,
		active: true
	}
];
function getStoredCoupons() {
	if (typeof window === "undefined") return defaultCoupons;
	try {
		const raw = localStorage.getItem(COUPONS_STORAGE_KEY);
		if (!raw) return defaultCoupons;
		return JSON.parse(raw);
	} catch {
		return defaultCoupons;
	}
}
function saveStoredCoupons(coupons) {
	if (typeof window === "undefined") return;
	localStorage.setItem(COUPONS_STORAGE_KEY, JSON.stringify(coupons));
	window.dispatchEvent(new Event("aura_coupons_updated"));
}
function addCoupon(coupon) {
	const current = getStoredCoupons();
	if (current.some((c) => c.code.toUpperCase() === coupon.code.toUpperCase())) saveStoredCoupons(current.map((c) => c.code.toUpperCase() === coupon.code.toUpperCase() ? coupon : c));
	else saveStoredCoupons([coupon, ...current]);
}
function deleteCoupon(code) {
	saveStoredCoupons(getStoredCoupons().filter((c) => c.code.toUpperCase() !== code.toUpperCase()));
}
function validateCoupon(code, subtotal) {
	if (!code || !code.trim()) return {
		valid: false,
		discount: 0,
		message: "يرجى إدخال كود الخصم"
	};
	const found = getStoredCoupons().find((c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.active);
	if (!found) return {
		valid: false,
		discount: 0,
		message: "كود الخصم غير صحيح أو منتهي الصلاحية"
	};
	if (found.minOrder && subtotal < found.minOrder) return {
		valid: false,
		discount: 0,
		message: `هذا الكوبون يتطلب حداً أدنى للطلب بقيمة ${found.minOrder} ج.م`
	};
	let discount = 0;
	if (found.type === "percent") discount = Math.round(subtotal * found.value / 100);
	else discount = Math.min(found.value, subtotal);
	return {
		valid: true,
		discount,
		message: `تم تطبيق الخصم بنجاح (${found.type === "percent" ? `${found.value}%` : `${found.value} ج.م`})`,
		coupon: found
	};
}
//#endregion
export { saveStoreSettings as a, getStoredCoupons as i, deleteCoupon as n, saveStoredCoupons as o, getStoreSettings as r, validateCoupon as s, addCoupon as t };
