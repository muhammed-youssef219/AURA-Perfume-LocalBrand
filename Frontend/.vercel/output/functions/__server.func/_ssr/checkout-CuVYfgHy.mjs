import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { r as formatPrice, s as toArabicDigits } from "./products-BTJ20OVa.mjs";
import { r as getStoreSettings } from "./couponsStore-B5vZBq3Z.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as supabase } from "./client-8fa_tyGg.mjs";
import { a as saveSingleLocalOrder } from "./ordersService-nJMzTHvk.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { F as Banknote, M as CircleCheck, P as Check, k as Copy, l as Smartphone, n as Upload, t as X } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as lineProduct, r as useCart } from "./cart-DwvCqNln.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-CuVYfgHy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var payments = [
	{
		id: "cod",
		label: "الدفع عند الاستلام",
		icon: Banknote,
		hint: "رسوم إضافية ١٥ ج.م"
	},
	{
		id: "vodafone_cash",
		label: "فودافون كاش",
		icon: Smartphone,
		hint: "تحويل على المحفظة"
	},
	{
		id: "instapay",
		label: "إنستا باي",
		icon: Smartphone,
		hint: "تحويل فوري عبر إنستا باي"
	}
];
var governorates = [
	"القاهرة",
	"الجيزة",
	"الإسكندرية",
	"الدقهلية (المنصورة)",
	"القليوبية",
	"الشرقية (الزقازيق)",
	"المنوفية",
	"الغربية (طنطا / المحلة)",
	"البحيرة (دمنهور)",
	"كفر الشيخ",
	"دمياط",
	"بورسعيد",
	"الإسماعيلية",
	"السويس",
	"الفيوم",
	"بني سويف",
	"المنيا",
	"أسيوط",
	"سوهاج",
	"قنا",
	"الأقصر",
	"أسوان",
	"البحر الأحمر (الغردقة / الجونة)",
	"جنوب سيناء (شرم الشيخ / دهب)",
	"شمال سيناء",
	"مطروح (الساحل الشمالي)",
	"الوادي الجديد"
];
function Checkout() {
	const { lines, subtotal, discount, appliedCoupon, shipping, total, clear } = useCart();
	const navigate = useNavigate();
	const [method, setMethod] = import_react.useState("cod");
	const [placed, setPlaced] = import_react.useState(null);
	const [submitting, setSubmitting] = import_react.useState(false);
	const [proof, setProof] = import_react.useState(null);
	const [proofUrl, setProofUrl] = import_react.useState(null);
	const [copied, setCopied] = import_react.useState(false);
	const settings = getStoreSettings();
	const needsTransfer = method === "vodafone_cash" || method === "instapay";
	const codFee = method === "cod" ? settings.codFee : 0;
	const grandTotal = total + codFee;
	import_react.useEffect(() => {
		return () => {
			if (proofUrl) URL.revokeObjectURL(proofUrl);
		};
	}, [proofUrl]);
	const pickProof = (file) => {
		if (proofUrl) URL.revokeObjectURL(proofUrl);
		setProof(file);
		setProofUrl(file ? URL.createObjectURL(file) : null);
	};
	const copyNumber = async () => {
		try {
			await navigator.clipboard.writeText(settings.transferNumber);
			setCopied(true);
			toast.success("تم نسخ الرقم");
			setTimeout(() => setCopied(false), 2e3);
		} catch {
			toast.error("تعذّر النسخ، انسخ الرقم يدوياً");
		}
	};
	if (placed) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mx-auto h-14 w-14 text-gold" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-6 font-display text-3xl",
				children: "تم استلام طلبك"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm leading-7 text-muted-foreground",
				children: [
					"رقم الطلب ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold text-foreground",
						children: toArabicDigits(placed)
					}),
					" — سنراجع الطلب ونتواصل معك لتأكيد الشحن قريباً."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/track/$orderNumber",
					params: { orderNumber: placed },
					className: "w-full max-w-xs bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground hover:bg-ink",
					children: "متابعة الطلب"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					className: "w-full max-w-xs border border-gold px-8 py-3.5 text-sm font-bold text-gold hover:bg-gold hover:text-accent-foreground",
					children: "متابعة التسوق"
				})]
			})
		]
	});
	if (lines.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl",
				children: "لا يوجد ما يمكن شراؤه"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: "أضف عطراً إلى السلة أولاً."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/shop",
				className: "mt-8 inline-block bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground hover:bg-ink",
				children: "تسوّق الآن"
			})
		]
	});
	const onSubmit = async (e) => {
		e.preventDefault();
		if (needsTransfer && !proof) {
			toast.error("يرجى رفع صورة إثبات التحويل");
			return;
		}
		setSubmitting(true);
		const form = new FormData(e.currentTarget);
		const orderNumber = `AT-${Math.floor(1e5 + Math.random() * 899999)}`;
		try {
			let proofPath = null;
			if (needsTransfer && proof) {
				const ext = proof.name.split(".").pop() ?? "jpg";
				proofPath = `${orderNumber}/${Date.now()}.${ext}`;
				try {
					const { error: upErr } = await supabase.storage.from("payment-proofs").upload(proofPath, proof, { contentType: proof.type || "image/jpeg" });
					if (upErr) console.warn("Supabase storage upload warning:", upErr);
				} catch (storageErr) {
					console.warn("Storage upload skipped/fallback:", storageErr);
				}
			}
			const orderRecord = {
				id: orderNumber,
				order_number: orderNumber,
				customer_name: String(form.get("name") ?? ""),
				phone: String(form.get("phone") ?? ""),
				email: String(form.get("email") ?? ""),
				city: String(form.get("city") ?? ""),
				district: String(form.get("district") ?? ""),
				street: String(form.get("street") ?? ""),
				notes: String(form.get("notes") ?? ""),
				payment_method: method,
				items: lines.map((l) => ({
					id: l.productId,
					name: lineProduct(l).name,
					size: l.size,
					qty: l.qty,
					unit_price: l.unitPrice
				})),
				subtotal,
				shipping,
				cod_fee: codFee,
				total: grandTotal,
				proof_path: proofPath,
				status: "pending",
				created_at: (/* @__PURE__ */ new Date()).toISOString()
			};
			saveSingleLocalOrder(orderRecord);
			try {
				const { error } = await supabase.from("orders").insert(orderRecord);
				if (error) console.warn("Supabase insert warning:", error);
			} catch (err) {
				console.warn("Supabase insert error (cached locally):", err);
			}
			clear();
			pickProof(null);
			setPlaced(orderNumber);
			toast.success("تم تأكيد الطلب بنجاح");
			navigate({ to: "/checkout" });
		} catch {
			toast.error("تعذّر إرسال الطلب، حاول مرة أخرى");
		} finally {
			setSubmitting(false);
		}
	};
	const field = "mt-1.5 w-full border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-gold";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl",
				children: "إتمام الطلب"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "الخطوة الأخيرة — أدخل بياناتك واختر طريقة الدفع."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "border border-border bg-card p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl",
								children: "بيانات العميل"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 grid gap-4 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-xs",
										children: ["الاسم الكامل", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											required: true,
											name: "name",
											className: field,
											placeholder: "محمد يوسف"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-xs",
										children: ["رقم الموبايل", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											required: true,
											name: "phone",
											type: "tel",
											inputMode: "tel",
											pattern: "[0-9+ ]{9,15}",
											className: field,
											placeholder: "01xxxxxxxxx"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-xs sm:col-span-2",
										children: ["البريد الإلكتروني", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											required: true,
											name: "email",
											type: "email",
											className: field,
											placeholder: "name@email.com"
										})]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "border border-border bg-card p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl",
								children: "عنوان الشحن"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 grid gap-4 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-xs",
										children: ["المحافظة", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											required: true,
											name: "city",
											className: field,
											defaultValue: "القاهرة",
											children: governorates.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: c,
												children: c
											}, c))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-xs",
										children: ["المنطقة", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											required: true,
											name: "district",
											className: field,
											placeholder: "مدينة نصر"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-xs sm:col-span-2",
										children: ["العنوان التفصيلي", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											required: true,
											name: "street",
											className: field,
											placeholder: "الشارع، رقم العقار"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-xs sm:col-span-2",
										children: ["ملاحظات للمندوب (اختياري)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											name: "notes",
											rows: 3,
											className: field,
											placeholder: "مثال: الاتصال قبل الوصول"
										})]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "border border-border bg-card p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-xl",
									children: "طريقة الدفع"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-5 grid gap-3",
									children: payments.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setMethod(p.id),
										className: cn("flex items-center gap-4 border p-4 text-right transition-colors", method === p.id ? "border-gold bg-gold-soft/30" : "border-border hover:border-gold"),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(p.icon, { className: "h-5 w-5 shrink-0 text-gold" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "min-w-0 flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "block text-sm font-bold",
													children: p.label
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "block text-xs text-muted-foreground",
													children: p.hint
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-4 w-4 shrink-0 rounded-full border", method === p.id ? "border-gold bg-gold" : "border-border") })
										]
									}, p.id))
								}),
								needsTransfer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 space-y-5 border-t border-border pt-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "border border-gold/50 bg-gold-soft/25 p-5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-sm font-bold",
												children: method === "vodafone_cash" ? "تعليمات التحويل عبر فودافون كاش" : "تعليمات التحويل عبر إنستا باي"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
												className: "mt-3 space-y-2 text-xs leading-6 text-muted-foreground",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
														"١. حوّل مبلغ",
														" ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-bold text-foreground",
															children: formatPrice(grandTotal)
														}),
														" ",
														"إلى الرقم التالي."
													] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
														"٢.",
														" ",
														method === "vodafone_cash" ? "استخدم تطبيق فودافون كاش أو كود ‎*٩*٧#‎ للتحويل." : "استخدم تطبيق إنستا باي أو تطبيق البنك واختر التحويل برقم الموبايل."
													] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "٣. صوّر شاشة تأكيد التحويل وارفعها بالأسفل قبل تأكيد الطلب." })
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-4 flex items-center gap-3 border border-border bg-card px-4 py-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													dir: "ltr",
													className: "flex-1 font-display text-xl tracking-widest text-foreground",
													children: toArabicDigits(settings.transferNumber)
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													onClick: copyNumber,
													className: "flex items-center gap-1.5 bg-primary px-3 py-2 text-xs font-bold text-primary-foreground hover:bg-ink",
													children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" }), copied ? "تم النسخ" : "نسخ الرقم"]
												})]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
											className: "text-sm font-bold",
											children: ["صورة إثبات التحويل ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-destructive",
												children: "*"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs text-muted-foreground",
											children: "مطلوبة لتأكيد الطلب — ارفع لقطة شاشة واضحة لعملية التحويل."
										}),
										proofUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 flex items-start gap-4 border border-border p-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: proofUrl,
												alt: "معاينة إثبات التحويل",
												className: "h-32 w-24 shrink-0 object-cover"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0 flex-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "truncate text-xs font-bold",
														children: proof?.name
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "mt-1 text-[11px] text-muted-foreground",
														children: [toArabicDigits(Math.max(1, Math.round((proof?.size ?? 0) / 1024))), " ك.ب"]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														type: "button",
														onClick: () => pickProof(null),
														className: "mt-3 inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-xs hover:border-gold",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" }), " إزالة الصورة"]
													})
												]
											})]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-gold/60 bg-gold-soft/15 px-4 py-8 text-center hover:bg-gold-soft/30",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-6 w-6 text-gold" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-bold",
													children: "اضغط لاختيار صورة الإثبات"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[11px] text-muted-foreground",
													children: "JPG أو PNG بحد أقصى ١٠ ميجابايت"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "file",
													accept: "image/*",
													className: "hidden",
													onChange: (e) => {
														const file = e.target.files?.[0] ?? null;
														if (file && file.size > 10485760) {
															toast.error("حجم الصورة أكبر من ١٠ ميجابايت");
															return;
														}
														pickProof(file);
													}
												})
											]
										})
									] })]
								}),
								method === "cod" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-5 border-t border-border pt-5 text-xs leading-6 text-muted-foreground",
									children: "ستدفع المبلغ كاملاً نقداً للمندوب عند استلام الطلب، مع رسوم تحصيل ١٥ ج.م."
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "h-fit border border-border bg-card p-6 lg:sticky lg:top-32",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl",
							children: "ملخص الطلب"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-5 space-y-4",
							children: lines.map((line) => {
								const p = lineProduct(line);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: p.image,
											alt: p.name,
											loading: "lazy",
											width: 900,
											height: 1100,
											className: "h-16 w-14 shrink-0 object-cover"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "truncate text-sm",
												children: p.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-muted-foreground",
												children: [
													toArabicDigits(line.size),
													" مل × ",
													toArabicDigits(line.qty)
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "shrink-0 text-xs font-bold",
											children: formatPrice(line.unitPrice * line.qty)
										})
									]
								}, line.key);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 space-y-3 border-t border-border pt-5 text-sm",
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
								codFee > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "رسوم الدفع عند الاستلام"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPrice(codFee) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px w-full gold-rule" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-base font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "الإجمالي" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-gold",
										children: formatPrice(grandTotal)
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: submitting,
							className: "mt-6 w-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground hover:bg-ink disabled:opacity-70",
							children: submitting ? "جاري تأكيد الطلب..." : `تأكيد الطلب · ${formatPrice(grandTotal)}`
						}),
						needsTransfer && !proof && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-center text-[11px] font-bold text-destructive",
							children: "يجب رفع صورة إثبات التحويل لإتمام الطلب."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-center text-[11px] text-muted-foreground",
							children: "بالضغط على تأكيد الطلب أنت توافق على سياسة الاستبدال والإرجاع."
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { Checkout as component };
