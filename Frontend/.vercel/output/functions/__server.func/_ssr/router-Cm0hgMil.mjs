import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { s as toArabicDigits } from "./products-BTJ20OVa.mjs";
import { r as getStoreSettings } from "./couponsStore-B5vZBq3Z.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { S as Menu, t as X, u as ShoppingBag } from "../_libs/lucide-react.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { r as useCart, t as CartProvider } from "./cart-DwvCqNln.mjs";
import { t as Route$7 } from "./product._id-CAQyjJb7.mjs";
import { t as Route$8 } from "./track._orderNumber-BAU5iAUj.mjs";
import { n as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Cm0hgMil.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BZ9W841C.css";
var Sheet = Dialog;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute left-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
var nav = [
	{
		to: "/",
		label: "الرئيسية"
	},
	{
		to: "/shop",
		label: "المتجر"
	},
	{
		to: "/track",
		label: "تتبع طلبك"
	},
	{
		to: "/cart",
		label: "السلة"
	}
];
function LogoMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "6",
				className: "fill-gold/15"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M11 12C11 10.8954 11.8954 10 13 10H19C20.1046 10 21 10.8954 21 12V24C21 25.1046 20.1046 26 19 26H13C11.8954 26 11 25.1046 11 24V12Z",
				className: "stroke-gold",
				strokeWidth: "1.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M14 10V8C14 7.44772 14.4477 7 15 7H17C17.5523 7 18 7.44772 18 8V10",
				className: "stroke-gold",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M13 14H19",
				className: "stroke-gold",
				strokeWidth: "1.5",
				strokeLinecap: "round"
			})
		]
	});
}
function Header() {
	const { count } = useCart();
	const [open, setOpen] = import_react.useState(false);
	const [settings, setSettings] = import_react.useState(getStoreSettings());
	import_react.useEffect(() => {
		const handleUpdate = () => {
			setSettings(getStoreSettings());
		};
		window.addEventListener("aura_settings_updated", handleUpdate);
		window.addEventListener("storage", handleUpdate);
		return () => {
			window.removeEventListener("aura_settings_updated", handleUpdate);
			window.removeEventListener("storage", handleUpdate);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur",
		children: [
			settings.enableAnnouncements && settings.announcementText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-primary py-2 text-center text-[11px] tracking-wide text-primary-foreground sm:text-xs font-medium",
				children: settings.announcementText
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-4 px-3 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-4 md:gap-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex min-w-0 items-center gap-2.5 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { className: "h-9 w-9 md:h-10 md:w-10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-display text-xl leading-none text-foreground md:text-2xl",
									children: "دار العطور"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-[9px] tracking-[0.3em] text-muted-foreground md:text-[10px] md:tracking-[0.35em]",
									children: "MAISON DE PARFUM"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden items-center gap-7 text-sm md:flex",
							children: nav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: n.to,
								className: "text-muted-foreground transition-colors hover:text-foreground",
								activeProps: { className: "text-foreground font-medium" },
								activeOptions: { exact: n.to === "/" },
								children: n.label
							}, n.to))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden md:block" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-end gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/cart",
							"aria-label": "سلة الشراء",
							className: "relative flex items-center justify-center rounded-sm border border-border p-2.5 transition-colors hover:border-gold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-5 w-5" }), count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -top-2 -right-2 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[11px] font-bold text-accent-foreground",
								children: toArabicDigits(count)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "القائمة",
							onClick: () => setOpen((v) => !v),
							className: "flex items-center justify-center rounded-sm border border-border p-2.5 text-foreground transition-colors hover:border-gold md:hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "left",
					className: "w-72 bg-card p-0",
					dir: "rtl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
							className: "border-b border-border px-5 py-5 text-right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { className: "h-9 w-9" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-xl",
									children: "دار العطور"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "flex flex-col px-3 py-4",
							children: nav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: n.to,
								onClick: () => setOpen(false),
								className: "rounded-sm px-3 py-3 text-base text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
								activeProps: { className: "bg-muted text-foreground font-medium border-r-2 border-gold" },
								activeOptions: { exact: n.to === "/" },
								children: n.label
							}, n.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-5 mt-2 h-px gold-rule" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "px-5 py-4 text-xs text-muted-foreground",
							children: [
								"شحن مجاني للطلبات فوق ",
								toArabicDigits(settings.freeShippingThreshold),
								" ج.م"
							]
						})
					]
				})
			})
		]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-24 border-t border-border bg-sand/60",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl",
					children: "دار العطور"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-7 text-muted-foreground",
					children: "بيت عطور محلي يصنع تركيبات شرقية بمكونات مختارة من الطائف وكمبوديا وأصفهان."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-bold",
					children: "تسوّق"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							className: "hover:text-foreground",
							children: "كل العطور"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/cart",
							className: "hover:text-foreground",
							children: "سلة الشراء"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/checkout",
							className: "hover:text-foreground",
							children: "إتمام الطلب"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-bold",
					children: "خدمة العملاء"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "الشحن خلال ٢-٤ أيام عمل" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "إرجاع خلال ١٤ يوماً" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "الدفع عند الاستلام متاح" })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-bold",
					children: "تواصل معنا"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm leading-7 text-muted-foreground",
					children: [
						"القاهرة — جمهورية مصر العربية",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"واتساب: ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://wa.me/201013556821",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-gold font-bold hover:underline",
							children: "01013556821"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"خدمة العملاء يومياً ٩ ص – ١١ م"
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border py-5 text-center text-xs text-muted-foreground",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" دار العطور (AURA). جميع الحقوق محفوظة."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin",
						className: "text-muted-foreground hover:text-gold transition-colors font-medium",
						children: "لوحة التحكم (Admin)"
					})
				]
			})
		})]
	});
}
function OfficialWhatsAppIcon({ className = "h-7 w-7" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		className,
		viewBox: "0 0 448 512",
		fill: "currentColor",
		xmlns: "http://www.w3.org/2000/svg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" })
	});
}
function WhatsAppButton() {
	const [phone, setPhone] = import_react.useState(getStoreSettings().storePhone);
	const [isOpen, setIsOpen] = import_react.useState(false);
	import_react.useEffect(() => {
		const sync = () => setPhone(getStoreSettings().storePhone);
		window.addEventListener("aura_settings_updated", sync);
		window.addEventListener("storage", sync);
		return () => {
			window.removeEventListener("aura_settings_updated", sync);
			window.removeEventListener("storage", sync);
		};
	}, []);
	const cleanPhone = phone.replace(/[^0-9]/g, "");
	const waUrl = `https://wa.me/${cleanPhone.startsWith("0") ? `20${cleanPhone.slice(1)}` : cleanPhone.startsWith("20") ? cleanPhone : `20${cleanPhone}`}?text=${encodeURIComponent("مرحباً بكم في دار العطور AURA 🌹\nأنا مهتم بمعرفة المزيد عن عطوركم الفاخرة، هل يمكنكم مساعدتي؟")}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed bottom-6 left-6 z-50 flex flex-col items-start font-sans",
		children: [isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 w-72 rounded-lg border border-border bg-card p-4 shadow-2xl animate-fade-in text-right",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-[#25D366] animate-ping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-xs text-foreground",
							children: "خدمة عملاء دار العطور"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setIsOpen(false),
						className: "rounded p-1 hover:bg-muted text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2.5 text-xs leading-relaxed text-muted-foreground",
					children: "👋 أهلاً وسهلاً! اضغط الزر أدناه وسيتم فتح محادثة واتساب معنا فوراً."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: waUrl,
					target: "_blank",
					rel: "noopener noreferrer",
					className: "mt-3 flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-2.5 text-xs font-bold text-white shadow-md transition-colors hover:bg-[#20bd5a]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficialWhatsAppIcon, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "بدء المحادثة عبر واتساب" })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			href: waUrl,
			target: "_blank",
			rel: "noopener noreferrer",
			"aria-label": "تواصل معنا عبر واتساب",
			onClick: () => setIsOpen(false),
			className: "group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-[#20bd5a] hover:shadow-[0_0_25px_rgba(37,211,102,0.6)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficialWhatsAppIcon, { className: "h-7 w-7 fill-white" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-400 shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-amber-500 animate-ping" })
			})]
		})]
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$6 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{
				name: "author",
				content: "دار العطور"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			},
			{
				rel: "apple-touch-icon",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&family=Amiri:wght@400;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "ar",
		dir: "rtl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$6.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CartProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-screen flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppButton, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, { position: "top-center" })
		] })
	});
}
var $$splitComponentImporter$5 = () => import("./routes-Dv-c0fzC.mjs");
var Route$5 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "دار العطور | عطور شرقية فاخرة بصناعة محلية" },
		{
			name: "description",
			content: "متجر دار العطور: عطور شرقية وزهرية وخشبية بتركيبات فاخرة من العود والورد، مع شحن سريع لجميع محافظات مصر."
		},
		{
			property: "og:title",
			content: "دار العطور | عطور شرقية فاخرة"
		},
		{
			property: "og:description",
			content: "تركيبات عطرية فاخرة من العود والورد والعنبر، بصناعة محلية وشحن سريع."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./admin-DaZCx1hI.mjs");
var Route$4 = createFileRoute("/admin")({
	head: () => ({ meta: [{ title: "لوحة التحكم الشاملة | دار العطور" }, {
		name: "robots",
		content: "noindex, nofollow"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./cart-Burej87B.mjs");
var Route$3 = createFileRoute("/cart")({
	head: () => ({ meta: [
		{ title: "سلة الشراء | دار العطور" },
		{
			name: "description",
			content: "راجع العطور في سلتك، عدّل الكميات، واطّلع على إجمالي الطلب قبل إتمام الشراء."
		},
		{
			property: "og:title",
			content: "سلة الشراء | دار العطور"
		},
		{
			property: "og:description",
			content: "راجع عطورك وعدّل الكميات قبل إتمام الطلب."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./checkout-CuVYfgHy.mjs");
var Route$2 = createFileRoute("/checkout")({
	head: () => ({ meta: [
		{ title: "إتمام الطلب | دار العطور" },
		{
			name: "description",
			content: "أدخل بيانات الشحن واختر طريقة الدفع لإتمام طلب عطورك من دار العطور."
		},
		{
			property: "og:title",
			content: "إتمام الطلب | دار العطور"
		},
		{
			property: "og:description",
			content: "بيانات الشحن وطرق الدفع لإتمام طلبك."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./shop-BOK38_P6.mjs");
var Route$1 = createFileRoute("/shop")({
	head: () => ({ meta: [
		{ title: "المتجر | كل العطور — دار العطور" },
		{
			name: "description",
			content: "تصفّح مجموعة دار العطور الكاملة: عطور شرقية وزهرية وخشبية ومنعشة للرجال والنساء مع أسعار وأحجام متعددة."
		},
		{
			property: "og:title",
			content: "المتجر | كل العطور — دار العطور"
		},
		{
			property: "og:description",
			content: "مجموعة كاملة من العطور الشرقية والزهرية والخشبية بأحجام وأسعار متعددة."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./track.index-DMfGgSHt.mjs");
var Route = createFileRoute("/track/")({
	head: () => ({ meta: [
		{ title: "متابعة الطلب | دار العطور" },
		{
			name: "description",
			content: "أدخل رقم طلبك لمتابعة حالته ومعرفة مراحل التجهيز والتسليم خطوة بخطوة."
		},
		{
			property: "og:title",
			content: "متابعة الطلب | دار العطور"
		},
		{
			property: "og:description",
			content: "تتبّع حالة طلبك من دار العطور برقم الطلب."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$5.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$6
});
var AdminRoute = Route$4.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$6
});
var CartRoute = Route$3.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => Route$6
});
var CheckoutRoute = Route$2.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$6
});
var ShopRoute = Route$1.update({
	id: "/shop",
	path: "/shop",
	getParentRoute: () => Route$6
});
var ProductIdRoute = Route$7.update({
	id: "/product/$id",
	path: "/product/$id",
	getParentRoute: () => Route$6
});
var TrackIndexRoute = Route.update({
	id: "/track/",
	path: "/track/",
	getParentRoute: () => Route$6
});
var rootRouteChildren = {
	IndexRoute,
	AdminRoute,
	CartRoute,
	CheckoutRoute,
	ShopRoute,
	ProductIdRoute,
	TrackOrderNumberRoute: Route$8.update({
		id: "/track/$orderNumber",
		path: "/track/$orderNumber",
		getParentRoute: () => Route$6
	}),
	TrackIndexRoute
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
