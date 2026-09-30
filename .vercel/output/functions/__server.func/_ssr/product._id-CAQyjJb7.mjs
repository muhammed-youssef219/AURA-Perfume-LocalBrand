import { i as getProduct } from "./products-BTJ20OVa.mjs";
import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._id-CAQyjJb7.js
var $$splitComponentImporter = () => import("./product._id-CORQQIvK.mjs");
var Route = createFileRoute("/product/$id")({
	loader: ({ params }) => {
		return { product: getProduct(params.id) || null };
	},
	head: ({ loaderData }) => {
		if (!loaderData?.product) return { meta: [{ title: "العطر غير متوفر | دار العطور" }, {
			name: "robots",
			content: "noindex"
		}] };
		const p = loaderData.product;
		const desc = `${p.subtitle} — ${p.description}`.slice(0, 155);
		return { meta: [
			{ title: `${p.name} | دار العطور` },
			{
				name: "description",
				content: desc
			},
			{
				property: "og:title",
				content: `${p.name} | دار العطور`
			},
			{
				property: "og:description",
				content: desc
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
