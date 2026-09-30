import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { l as useProducts, r as formatPrice, s as toArabicDigits } from "./products-BTJ20OVa.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { L as ArrowLeft, c as Sparkles, h as RotateCcw, t as X, u as ShoppingBag, w as Eye } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as useCart } from "./cart-DwvCqNln.mjs";
import { t as ProductCard } from "./ProductCard-CxGPMxH7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dv-c0fzC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var questions = [
	{
		id: 1,
		title: "ما هو التوقيت أو المناسبة الأساسية للعطر؟",
		subtitle: "اختر الأجواء التي تفضل أن يرافقك فيها هذا العطر",
		options: [
			{
				label: "سهرات ومناسبات رسمية فاخرة",
				description: "حضور قوي وفخم يترك بصمة لا تُنسى",
				family: "شرقي"
			},
			{
				label: "استخدام يومي وصباحي وأوقات العمل",
				description: "عبير منعش وخفيف يمنحك طاقة إيجابية",
				family: "منعش"
			},
			{
				label: "أجواء رومانسية ولحظات هادئة",
				description: "رائحة ناعمة ودافئة تحيط بك بنعومة",
				family: "زهري"
			},
			{
				label: "إطلالة كلاسيكية مريحة",
				description: "نقاء المسك الأبيض والأخشاب العطرية",
				family: "خشبي"
			}
		]
	},
	{
		id: 2,
		title: "ما هو طابع المكونات العطرية الأقرب لذوقك؟",
		subtitle: "الروائح التي تشعرك بالتميز والراحة",
		options: [
			{
				label: "العود الكمبودي، العنبر، والزعفران",
				description: "دفء شرقي أصيل بتركيز ملكي",
				tag: "شرقي"
			},
			{
				label: "الورد الطائفي، الفاوانيا، والفانيليا",
				description: "أنوثة ونعومة أزهار نديّة",
				tag: "زهري"
			},
			{
				label: "الحمضيات الإيطالية وزهر البرتقال",
				description: "انتعاش مشرق وحيوية متجددة",
				tag: "منعش"
			},
			{
				label: "المسك الأبيض وخشب الصندل",
				description: "نظافة وأناقة نقية تناسب كل الأوقات",
				tag: "خشبي"
			}
		]
	},
	{
		id: 3,
		title: "لمن تبحث عن هذا العطر؟",
		subtitle: "حدد الفئة المطلوبة للحصول على أدق توصية",
		options: [
			{
				label: "عطر رجالي",
				description: "طابع جريء وثبات فواح للرجال",
				gender: "رجالي"
			},
			{
				label: "عطر نسائي",
				description: "رقة وأناقة فاخرة للسيدات",
				gender: "نسائي"
			},
			{
				label: "عطر للجنسين (Unisex)",
				description: "توليفة متوازنة وفاخرة تناسب الجميع",
				gender: "للجنسين"
			}
		]
	}
];
function PerfumeFinderModal({ isOpen, onClose }) {
	const products = useProducts();
	const { add } = useCart();
	const navigate = useNavigate();
	const [currentStep, setCurrentStep] = import_react.useState(0);
	const [answers, setAnswers] = import_react.useState({});
	const handleSelectOption = (option) => {
		const updated = { ...answers };
		if (option.family) updated.family = option.family;
		if (option.tag) updated.tag = option.tag;
		if (option.gender) updated.gender = option.gender;
		setAnswers(updated);
		if (currentStep < questions.length - 1) setCurrentStep((prev) => prev + 1);
		else setCurrentStep(questions.length);
	};
	const handleRestart = () => {
		setCurrentStep(0);
		setAnswers({});
	};
	const matchedProduct = import_react.useMemo(() => {
		if (products.length === 0) return void 0;
		let candidates = products;
		if (answers.gender && answers.gender !== "للجنسين") {
			const genderMatch = products.filter((p) => p.gender === answers.gender || p.gender === "للجنسين");
			if (genderMatch.length > 0) candidates = genderMatch;
		}
		const targetFamily = answers.family || answers.tag;
		if (targetFamily) {
			const familyMatch = candidates.filter((p) => p.family === targetFamily);
			if (familyMatch.length > 0) return familyMatch[0];
		}
		return candidates[0];
	}, [products, answers]);
	if (!isOpen) return null;
	const currentQ = questions[currentStep];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-xl overflow-hidden rounded-xl border border-amber-400/30 bg-card p-6 shadow-2xl animate-fade-in text-foreground sm:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "absolute top-4 left-4 rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-500",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "مستشار العطور الذكي · دار العطور" })]
					})
				}),
				currentStep < questions.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-[11px] font-semibold text-muted-foreground mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"السؤال ",
								toArabicDigits(currentStep + 1),
								" من ",
								toArabicDigits(questions.length)
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [Math.round((currentStep + 1) / questions.length * 100), "%"] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-1.5 w-full overflow-hidden rounded-full bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-300",
								style: { width: `${(currentStep + 1) / questions.length * 100}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-2xl font-bold text-foreground",
								children: currentQ?.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-xs text-muted-foreground",
								children: currentQ?.subtitle
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 grid gap-3",
							children: currentQ?.options.map((opt, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => handleSelectOption(opt),
								className: "group flex flex-col items-start rounded-lg border border-border bg-muted/20 p-4 text-right transition-all duration-200 hover:border-gold hover:bg-gold/10 hover:scale-[1.01]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-sm text-foreground group-hover:text-gold",
									children: opt.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 text-xs text-muted-foreground",
									children: opt.description
								})]
							}, idx))
						})
					]
				}),
				currentStep >= questions.length && matchedProduct && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 text-center animate-fade-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl font-bold text-foreground",
							children: "العطر المثالي لـذوقك هو:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1",
							children: "✨ نسبة التطابق ٩٨٪ مع تفضيلاتك"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 overflow-hidden rounded-lg border border-gold/40 bg-card p-5 shadow-lg text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row items-center gap-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: matchedProduct.image,
									alt: matchedProduct.name,
									className: "h-32 w-28 rounded object-cover shadow-md shrink-0 aspect-[4/5]"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[11px] font-bold text-gold",
											children: [
												matchedProduct.family,
												" · ",
												matchedProduct.gender
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-display text-xl font-bold text-foreground",
											children: matchedProduct.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground mt-0.5",
											children: matchedProduct.subtitle
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2",
											children: matchedProduct.description
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-3 font-display text-lg font-bold text-gold",
											children: formatPrice(matchedProduct.price)
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 flex flex-wrap gap-2 border-t border-border pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										const size = matchedProduct.sizes[0] ?? {
											ml: 50,
											extra: 0
										};
										add(matchedProduct, size.ml, matchedProduct.price + size.extra, 1);
										toast.success(`تمت إضافة ${matchedProduct.name} إلى السلة`);
										onClose();
									},
									className: "flex-1 inline-flex items-center justify-center gap-2 rounded-sm bg-primary py-2.5 text-xs font-bold text-primary-foreground hover:bg-ink shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إضافة للسلة الآن" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										onClose();
										navigate({
											to: "/product/$id",
											params: { id: matchedProduct.id }
										});
									},
									className: "inline-flex items-center justify-center gap-1.5 rounded-sm border border-gold px-4 py-2.5 text-xs font-bold text-gold hover:bg-gold hover:text-accent-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "تفاصيل العطر" })]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleRestart,
							className: "mt-5 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "إعادة الاختبار واختيار تفضيلات أخرى" })]
						})
					]
				})
			]
		})
	});
}
function HeroSection() {
	const [isQuizOpen, setIsQuizOpen] = import_react.useState(false);
	const canvasRef = import_react.useRef(null);
	const videoRef = import_react.useRef(null);
	import_react.useEffect(() => {
		if (videoRef.current) videoRef.current.play().catch(() => {});
	}, []);
	import_react.useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let animationFrameId;
		let width = canvas.width = canvas.offsetWidth;
		let height = canvas.height = canvas.offsetHeight;
		const handleResize = () => {
			if (!canvas) return;
			width = canvas.width = canvas.offsetWidth;
			height = canvas.height = canvas.offsetHeight;
		};
		window.addEventListener("resize", handleResize);
		const particles = Array.from({ length: 45 }, () => ({
			x: Math.random() * width,
			y: Math.random() * height,
			size: Math.random() * 2.2 + .8,
			speedY: Math.random() * .4 + .15,
			speedX: (Math.random() - .5) * .25,
			opacity: Math.random() * .7 + .3,
			pulseSpeed: Math.random() * .02 + .01,
			pulseVal: Math.random() * Math.PI
		}));
		const render = () => {
			ctx.clearRect(0, 0, width, height);
			particles.forEach((p) => {
				p.y -= p.speedY;
				p.x += p.speedX;
				p.pulseVal += p.pulseSpeed;
				if (p.y < 0) {
					p.y = height;
					p.x = Math.random() * width;
				}
				if (p.x < 0) p.x = width;
				if (p.x > width) p.x = 0;
				const currentOpacity = p.opacity * (.6 + .4 * Math.sin(p.pulseVal));
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(234, 179, 8, ${currentOpacity})`;
				ctx.shadowBlur = 10;
				ctx.shadowColor = "rgba(234, 179, 8, 0.9)";
				ctx.fill();
				ctx.shadowBlur = 0;
			});
			animationFrameId = requestAnimationFrame(render);
		};
		render();
		return () => {
			window.removeEventListener("resize", handleResize);
			cancelAnimationFrame(animationFrameId);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative min-h-[90vh] sm:min-h-[85vh] w-full overflow-hidden flex flex-col justify-end items-center pb-12 sm:pb-16 bg-black text-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 z-0 overflow-hidden bg-black flex items-center justify-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					ref: videoRef,
					src: "/hero.mp4",
					autoPlay: true,
					muted: true,
					loop: true,
					playsInline: true,
					disablePictureInPicture: true,
					disableRemotePlayback: true,
					className: "w-full h-full max-h-[88vh] object-contain object-center pointer-events-none select-none"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: "absolute inset-0 z-[1] w-full h-full pointer-events-none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mx-auto w-full max-w-lg sm:max-w-xl px-3 sm:px-4 flex flex-row items-center justify-center gap-2 sm:gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/shop",
					className: "group relative flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2.5 overflow-hidden rounded-md bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-3.5 sm:px-7 sm:py-4 text-xs sm:text-sm font-bold text-black shadow-[0_0_25px_rgba(234,179,8,0.4)] transition-all duration-300 hover:scale-105 hover:from-amber-400 hover:to-amber-500 hover:shadow-[0_0_35px_rgba(234,179,8,0.6)] active:scale-95 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: "تسوّق المجموعة الملكية"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-1" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setIsQuizOpen(true),
					className: "flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-md border border-amber-400/50 bg-black/60 px-3 py-3.5 sm:px-7 sm:py-4 text-xs sm:text-sm font-bold text-amber-300 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-amber-400 hover:bg-amber-500/20 hover:scale-105 active:scale-95 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
						className: "h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-amber-400 animate-spin",
						style: { animationDuration: "4s" }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: "مستشار العطور الذكي"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerfumeFinderModal, {
				isOpen: isQuizOpen,
				onClose: () => setIsQuizOpen(false)
			})
		]
	});
}
function Index() {
	const featured = useProducts().filter((p) => p.featured);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroSection, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "featured-perfumes",
			className: "mx-auto max-w-6xl px-4 py-16 scroll-mt-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl",
					children: "عطور مميزة"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "اختيارات عملائنا الأكثر طلباً"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					className: "shrink-0 text-sm text-gold hover:underline",
					children: "عرض الكل"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid grid-cols-2 gap-4 sm:gap-6",
				children: featured.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { product: p }, p.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-sand/60 py-16",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-3",
				children: [
					{
						t: "تعتيق ٦ أشهر",
						d: "كل تركيبة تُترك لتنضج قبل التعبئة، فتأتي الرائحة متوازنة وثابتة."
					},
					{
						t: "ثبات يوم كامل",
						d: "تركيز عالٍ من الزيوت العطرية يمنح فوحاً يمتد من الصباح للمساء."
					},
					{
						t: "تغليف هدايا",
						d: "علبة خشبية وبطاقة إهداء مكتوبة بخط اليد مع كل طلب."
					}
				].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-r-2 border-gold pr-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl",
						children: c.t
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-7 text-muted-foreground",
						children: c.d
					})]
				}, c.t))
			})
		})
	] });
}
//#endregion
export { Index as component };
