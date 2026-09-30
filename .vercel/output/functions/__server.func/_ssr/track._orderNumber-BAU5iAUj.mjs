import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/track._orderNumber-BAU5iAUj.js
var $$splitComponentImporter = () => import("./track._orderNumber-BX64KIaT.mjs");
var Route = createFileRoute("/track/$orderNumber")({
	head: ({ params }) => ({ meta: [
		{ title: `متابعة الطلب ${params.orderNumber} | دار العطور` },
		{
			name: "description",
			content: "تابع حالة طلبك من دار العطور وخط زمن التحديثات حتى التسليم."
		},
		{
			property: "og:title",
			content: "متابعة الطلب | دار العطور"
		},
		{
			property: "og:description",
			content: "حالة طلبك الحالية وتفاصيله."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
