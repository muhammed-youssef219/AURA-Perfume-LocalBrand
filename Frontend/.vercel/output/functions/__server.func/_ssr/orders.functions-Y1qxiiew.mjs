import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders.functions-Y1qxiiew.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getOrderTracking_createServerFn_handler = createServerRpc({
	id: "e3538de015ceaeef3f7a025a433016dbd076df27c494087c916f9295ab53792f",
	name: "getOrderTracking",
	filename: "src/lib/orders.functions.ts"
}, (opts) => getOrderTracking.__executeServer(opts));
var getOrderTracking = createServerFn({ method: "GET" }).inputValidator((data) => objectType({ orderNumber: stringType().min(3).max(40) }).parse(data)).handler(getOrderTracking_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-DV608Anp.mjs");
	const orderNumber = data.orderNumber.trim().toUpperCase();
	const { data: order, error } = await supabaseAdmin.from("orders").select("id, order_number, customer_name, city, district, street, payment_method, items, subtotal, shipping, cod_fee, total, status, created_at").eq("order_number", orderNumber).maybeSingle();
	if (error || !order) return null;
	const { data: events } = await supabaseAdmin.from("order_status_events").select("status, created_at").eq("order_id", order.id).order("created_at", { ascending: true });
	const { id: _id, ...rest } = order;
	return {
		...rest,
		items: rest.items ?? [],
		events: events ?? []
	};
});
//#endregion
export { getOrderTracking_createServerFn_handler };
