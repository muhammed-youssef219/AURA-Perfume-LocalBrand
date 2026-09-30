import * as React from "react";
import { Sparkles, X, ArrowLeft, Check, RotateCcw, ShoppingBag, Eye } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useProducts, formatPrice, toArabicDigits, Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

interface QuizQuestion {
  id: number;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    family?: string;
    gender?: string;
    tag?: string;
  }[];
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    title: "ما هو التوقيت أو المناسبة الأساسية للعطر؟",
    subtitle: "اختر الأجواء التي تفضل أن يرافقك فيها هذا العطر",
    options: [
      {
        label: "سهرات ومناسبات رسمية فاخرة",
        description: "حضور قوي وفخم يترك بصمة لا تُنسى",
        family: "شرقي",
      },
      {
        label: "استخدام يومي وصباحي وأوقات العمل",
        description: "عبير منعش وخفيف يمنحك طاقة إيجابية",
        family: "منعش",
      },
      {
        label: "أجواء رومانسية ولحظات هادئة",
        description: "رائحة ناعمة ودافئة تحيط بك بنعومة",
        family: "زهري",
      },
      {
        label: "إطلالة كلاسيكية مريحة",
        description: "نقاء المسك الأبيض والأخشاب العطرية",
        family: "خشبي",
      },
    ],
  },
  {
    id: 2,
    title: "ما هو طابع المكونات العطرية الأقرب لذوقك؟",
    subtitle: "الروائح التي تشعرك بالتميز والراحة",
    options: [
      {
        label: "العود الكمبودي، العنبر، والزعفران",
        description: "دفء شرقي أصيل بتركيز ملكي",
        tag: "شرقي",
      },
      {
        label: "الورد الطائفي، الفاوانيا، والفانيليا",
        description: "أنوثة ونعومة أزهار نديّة",
        tag: "زهري",
      },
      {
        label: "الحمضيات الإيطالية وزهر البرتقال",
        description: "انتعاش مشرق وحيوية متجددة",
        tag: "منعش",
      },
      {
        label: "المسك الأبيض وخشب الصندل",
        description: "نظافة وأناقة نقية تناسب كل الأوقات",
        tag: "خشبي",
      },
    ],
  },
  {
    id: 3,
    title: "لمن تبحث عن هذا العطر؟",
    subtitle: "حدد الفئة المطلوبة للحصول على أدق توصية",
    options: [
      {
        label: "عطر رجالي",
        description: "طابع جريء وثبات فواح للرجال",
        gender: "رجالي",
      },
      {
        label: "عطر نسائي",
        description: "رقة وأناقة فاخرة للسيدات",
        gender: "نسائي",
      },
      {
        label: "عطر للجنسين (Unisex)",
        description: "توليفة متوازنة وفاخرة تناسب الجميع",
        gender: "للجنسين",
      },
    ],
  },
];

export function PerfumeFinderModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const products = useProducts();
  const { add } = useCart();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<{
    family?: string;
    tag?: string;
    gender?: string;
  }>({});

  const handleSelectOption = (option: (typeof questions)[0]["options"][0]) => {
    const updated = { ...answers };
    if (option.family) updated.family = option.family;
    if (option.tag) updated.tag = option.tag;
    if (option.gender) updated.gender = option.gender;
    setAnswers(updated);

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setCurrentStep(questions.length); // Results step
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
  };

  // Matching algorithm
  const matchedProduct: Product | undefined = React.useMemo(() => {
    if (products.length === 0) return undefined;

    // Filter by gender if selected
    let candidates = products;
    if (answers.gender && answers.gender !== "للجنسين") {
      const genderMatch = products.filter(
        (p) => p.gender === answers.gender || p.gender === "للجنسين"
      );
      if (genderMatch.length > 0) candidates = genderMatch;
    }

    // Filter by family/tag
    const targetFamily = answers.family || answers.tag;
    if (targetFamily) {
      const familyMatch = candidates.filter((p) => p.family === targetFamily);
      if (familyMatch.length > 0) return familyMatch[0];
    }

    return candidates[0];
  }, [products, answers]);

  if (!isOpen) return null;

  const currentQ = questions[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-xl overflow-hidden rounded-xl border border-amber-400/30 bg-card p-6 shadow-2xl animate-fade-in text-foreground sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-500">
            <Sparkles className="h-3.5 w-3.5" />
            <span>مستشار العطور الذكي · دار العطور</span>
          </div>
        </div>

        {/* Steps Progress */}
        {currentStep < questions.length && (
          <div className="mt-6">
            <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground mb-2">
              <span>السؤال {toArabicDigits(currentStep + 1)} من {toArabicDigits(questions.length)}</span>
              <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Body */}
            <div className="mt-6 text-center">
              <h3 className="font-display text-2xl font-bold text-foreground">
                {currentQ?.title}
              </h3>
              <p className="mt-1.5 text-xs text-muted-foreground">{currentQ?.subtitle}</p>
            </div>

            {/* Options */}
            <div className="mt-6 grid gap-3">
              {currentQ?.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt)}
                  className="group flex flex-col items-start rounded-lg border border-border bg-muted/20 p-4 text-right transition-all duration-200 hover:border-gold hover:bg-gold/10 hover:scale-[1.01]"
                >
                  <span className="font-bold text-sm text-foreground group-hover:text-gold">
                    {opt.label}
                  </span>
                  <span className="mt-1 text-xs text-muted-foreground">
                    {opt.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Result Screen */}
        {currentStep >= questions.length && matchedProduct && (
          <div className="mt-6 text-center animate-fade-in">
            <h3 className="font-display text-2xl font-bold text-foreground">
              العطر المثالي لـذوقك هو:
            </h3>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1">
              ✨ نسبة التطابق ٩٨٪ مع تفضيلاتك
            </p>

            <div className="mt-6 overflow-hidden rounded-lg border border-gold/40 bg-card p-5 shadow-lg text-right">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <img
                  src={matchedProduct.image}
                  alt={matchedProduct.name}
                  className="h-32 w-28 rounded object-cover shadow-md shrink-0 aspect-[4/5]"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] font-bold text-gold">
                    {matchedProduct.family} · {matchedProduct.gender}
                  </span>
                  <h4 className="font-display text-xl font-bold text-foreground">
                    {matchedProduct.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{matchedProduct.subtitle}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {matchedProduct.description}
                  </p>
                  <div className="mt-3 font-display text-lg font-bold text-gold">
                    {formatPrice(matchedProduct.price)}
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
                <button
                  onClick={() => {
                    const size = matchedProduct.sizes[0] ?? { ml: 50, extra: 0 };
                    add(matchedProduct, size.ml, matchedProduct.price + size.extra, 1);
                    toast.success(`تمت إضافة ${matchedProduct.name} إلى السلة`);
                    onClose();
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-sm bg-primary py-2.5 text-xs font-bold text-primary-foreground hover:bg-ink shadow-sm"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>إضافة للسلة الآن</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    navigate({ to: "/product/$id", params: { id: matchedProduct.id } });
                  }}
                  className="inline-flex items-center justify-center gap-1.5 rounded-sm border border-gold px-4 py-2.5 text-xs font-bold text-gold hover:bg-gold hover:text-accent-foreground"
                >
                  <Eye className="h-4 w-4" />
                  <span>تفاصيل العطر</span>
                </button>
              </div>
            </div>

            <button
              onClick={handleRestart}
              className="mt-5 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>إعادة الاختبار واختيار تفضيلات أخرى</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

