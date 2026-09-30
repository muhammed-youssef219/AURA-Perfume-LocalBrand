import { t as supabase } from "./client-8fa_tyGg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ordersService-nJMzTHvk.js
var LOCAL_ORDERS_KEY = "aura_cached_orders";
function getLocalOrders() {
	if (typeof window === "undefined") return [];
	try {
		const raw = localStorage.getItem(LOCAL_ORDERS_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}
function saveLocalOrders(orders) {
	if (typeof window === "undefined") return;
	localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(orders));
}
function saveSingleLocalOrder(order) {
	const current = getLocalOrders();
	if (!current.some((o) => o.order_number === order.order_number)) saveLocalOrders([order, ...current]);
}
async function fetchAllOrders() {
	try {
		const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
		if (error) {
			console.warn("Supabase fetch failed, falling back to cached orders", error);
			return { orders: getLocalOrders() };
		}
		const fetched = data || [];
		const local = getLocalOrders();
		const map = /* @__PURE__ */ new Map();
		[...fetched, ...local].forEach((o) => {
			if (o.order_number) map.set(o.order_number, o);
		});
		const combined = Array.from(map.values()).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
		saveLocalOrders(combined);
		return { orders: combined };
	} catch (err) {
		return {
			orders: getLocalOrders(),
			error: String(err)
		};
	}
}
async function updateOrderStatus(orderNumber, newStatus) {
	try {
		const { error } = await supabase.from("orders").update({ status: newStatus }).eq("order_number", orderNumber);
		if (error) console.warn("Could not update status on Supabase:", error);
		saveLocalOrders(getLocalOrders().map((o) => o.order_number === orderNumber ? {
			...o,
			status: newStatus
		} : o));
		window.dispatchEvent(new Event("aura_orders_updated"));
		return { success: true };
	} catch (err) {
		return {
			success: false,
			error: String(err)
		};
	}
}
async function deleteOrder(orderNumber) {
	try {
		await supabase.from("orders").delete().eq("order_number", orderNumber);
		saveLocalOrders(getLocalOrders().filter((o) => o.order_number !== orderNumber));
		window.dispatchEvent(new Event("aura_orders_updated"));
		return { success: true };
	} catch (err) {
		return {
			success: false,
			error: String(err)
		};
	}
}
function getPaymentProofUrl(path) {
	if (!path) return null;
	try {
		const { data } = supabase.storage.from("payment-proofs").getPublicUrl(path);
		return data?.publicUrl || null;
	} catch {
		return null;
	}
}
//#endregion
export { saveSingleLocalOrder as a, getPaymentProofUrl as i, fetchAllOrders as n, updateOrderStatus as o, getLocalOrders as r, deleteOrder as t };
