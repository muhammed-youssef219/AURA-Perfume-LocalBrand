import * as React from "react";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import p7 from "@/assets/p7.jpg";
import p8 from "@/assets/p8.jpg";

export type Product = {
  id: string;
  name: string;
  subtitle: string;
  family: "شرقي" | "زهري" | "خشبي" | "منعش" | string;
  gender: "رجالي" | "نسائي" | "للجنسين" | string;
  price: number;
  oldPrice?: number;
  image: string;
  featured: boolean;
  inStock: boolean;
  sizes: { ml: number; extra: number }[];
  notes: { top: string[]; heart: string[]; base: string[] };
  description: string;
  concentration: string;
};

export const sampleImages = [
  { id: "p1", name: "زجاجة عسلية وعنبرية", url: p1 },
  { id: "p2", name: "زجاجة وردية كريستال", url: p2 },
  { id: "p3", name: "زجاجة كلاسيكية ذهبية", url: p3 },
  { id: "p4", name: "زجاجة مسك أبيض وفضي", url: p4 },
  { id: "p5", name: "زجاجة ملكية سوداء وذهبية", url: p5 },
  { id: "p6", name: "زجاجة منعشة شفافة", url: p6 },
  { id: "p7", name: "زجاجة عنبر المساء الفاخرة", url: p7 },
  { id: "p8", name: "زجاجة زهور خمرية", url: p8 },
];

export const defaultProducts: Product[] = [
  {
    id: "layali-oud",
    name: "ليالي العود",
    subtitle: "عود كمبودي مع ورد طائفي",
    family: "شرقي",
    gender: "للجنسين",
    price: 480,
    oldPrice: 560,
    image: p1,
    featured: true,
    inStock: true,
    sizes: [
      { ml: 50, extra: 0 },
      { ml: 100, extra: 220 },
    ],
    notes: {
      top: ["زعفران", "هيل"],
      heart: ["ورد طائفي", "ياسمين"],
      base: ["عود كمبودي", "عنبر", "مسك أبيض"],
    },
    description:
      "تركيبة شرقية دافئة تجمع العود الكمبودي العتيق مع الورد الطائفي، لتترك أثراً فاخراً يدوم طويلاً في السهرات والمناسبات.",
    concentration: "Extrait de Parfum",
  },
  {
    id: "ward-alfajr",
    name: "ورد الفجر",
    subtitle: "ورد ندي مع فانيليا ناعمة",
    family: "زهري",
    gender: "نسائي",
    price: 320,
    image: p2,
    featured: true,
    inStock: true,
    sizes: [
      { ml: 50, extra: 0 },
      { ml: 100, extra: 150 },
    ],
    notes: {
      top: ["ليتشي", "برغموت"],
      heart: ["ورد دمشقي", "فاوانيا"],
      base: ["فانيليا", "مسك", "خشب الأرز"],
    },
    description:
      "عبير زهري ناعم يشبه نسمة الفجر، يبدأ بلمسة فاكهية منعشة وينتهي بدفء الفانيليا والمسك.",
    concentration: "Eau de Parfum",
  },
  {
    id: "sahra-dhahabiya",
    name: "صحراء ذهبية",
    subtitle: "عنبر وجلد مع توابل ذهبية",
    family: "شرقي",
    gender: "رجالي",
    price: 395,
    image: p3,
    featured: true,
    inStock: true,
    sizes: [
      { ml: 75, extra: 0 },
      { ml: 125, extra: 180 },
    ],
    notes: {
      top: ["فلفل أسود", "جريب فروت"],
      heart: ["جلد", "قرفة"],
      base: ["عنبر", "لبان", "باتشولي"],
    },
    description:
      "عطر رجالي جريء يستحضر رمال الصحراء عند الغروب، بمزيج من الجلد والعنبر والتوابل الدافئة.",
    concentration: "Eau de Parfum Intense",
  },
  {
    id: "misk-almadina",
    name: "مسك المدينة",
    subtitle: "مسك أبيض نقي",
    family: "خشبي",
    gender: "للجنسين",
    price: 260,
    image: p4,
    featured: true,
    inStock: true,
    sizes: [
      { ml: 50, extra: 0 },
      { ml: 100, extra: 130 },
    ],
    notes: {
      top: ["برتقال"],
      heart: ["مسك أبيض", "زهر الليمون"],
      base: ["صندل", "فانيليا"],
    },
    description:
      "نقاء المسك الأبيض بلمسة خشبية هادئة، مناسب للاستخدام اليومي وللأجواء الرسمية على حد سواء.",
    concentration: "Eau de Parfum",
  },
  {
    id: "layl-alkhaleej",
    name: "ليل الخليج",
    subtitle: "دخون وعنبر أسود",
    family: "شرقي",
    gender: "رجالي",
    price: 540,
    image: p5,
    featured: false,
    inStock: true,
    sizes: [
      { ml: 60, extra: 0 },
      { ml: 100, extra: 200 },
    ],
    notes: {
      top: ["توابل سوداء"],
      heart: ["دخون", "عود"],
      base: ["عنبر أسود", "جلد", "فيتيفر"],
    },
    description:
      "حضور قوي يجمع الدخون التقليدي بالعنبر الأسود، عطر مسائي يترك انطباعاً لا يُنسى.",
    concentration: "Extrait de Parfum",
  },
  {
    id: "nasim-alsabah",
    name: "نسيم الصباح",
    subtitle: "حمضيات وزهر البرتقال",
    family: "منعش",
    gender: "نسائي",
    price: 210,
    oldPrice: 245,
    image: p6,
    featured: false,
    inStock: true,
    sizes: [
      { ml: 50, extra: 0 },
      { ml: 90, extra: 110 },
    ],
    notes: {
      top: ["ليمون صقلي", "نعناع"],
      heart: ["زهر البرتقال", "فريزيا"],
      base: ["مسك خفيف", "خشب أبيض"],
    },
    description:
      "انتعاش صباحي خفيف من الحمضيات وزهر البرتقال، خيار مثالي لأيام العمل والأجواء الحارة.",
    concentration: "Eau de Toilette",
  },
  {
    id: "anbar-almasa",
    name: "عنبر المساء",
    subtitle: "عنبر ذهبي مع ورد وعنبر",
    family: "شرقي",
    gender: "للجنسين",
    price: 430,
    oldPrice: 510,
    image: p7,
    featured: true,
    inStock: true,
    sizes: [
      { ml: 50, extra: 0 },
      { ml: 100, extra: 190 },
    ],
    notes: {
      top: ["زعفران", "برغموت"],
      heart: ["عنبر", "ورد دمشقي"],
      base: ["عود", "فانيليا", "مسك أبيض"],
    },
    description:
      "تركيبة مسائية دافئة تجمع العنبر الذهبي بالورد الدمشقي والعود، لإطلالة فاخرة تدوم طوال الليل.",
    concentration: "Extrait de Parfum",
  },
  {
    id: "zahoor-alhadaeq",
    name: "زهور الحدائق",
    subtitle: "ورد بلغاري مع خزامى ومسك",
    family: "زهري",
    gender: "نسائي",
    price: 285,
    image: p8,
    featured: true,
    inStock: true,
    sizes: [
      { ml: 50, extra: 0 },
      { ml: 100, extra: 140 },
    ],
    notes: {
      top: ["خزامى", "ليمون صقلي"],
      heart: ["ورد بلغاري", "فاوانيا"],
      base: ["مسك", "صندل", "خشب أبيض"],
    },
    description:
      "إطلالة زهرية منعشة كمشية بين حدائق الورد، تبدأ بلمسة خزامى نقية وتنتهي بدفء المسك والصندل.",
    concentration: "Eau de Parfum",
  },
];

const PRODUCTS_STORAGE_KEY = "aura_custom_products";

export function getStoredProducts(): Product[] {
  if (typeof window === "undefined") return defaultProducts;
  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!raw) return defaultProducts;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // fallback
  }
  return defaultProducts;
}

export function saveStoredProducts(list: Product[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("aura_products_updated"));
}

export function addStoredProduct(product: Product): void {
  const current = getStoredProducts();
  const updated = [product, ...current];
  saveStoredProducts(updated);
}

export function updateStoredProduct(product: Product): void {
  const current = getStoredProducts();
  const updated = current.map((p) => (p.id === product.id ? product : p));
  saveStoredProducts(updated);
}

export function deleteStoredProduct(id: string): void {
  const current = getStoredProducts();
  const updated = current.filter((p) => p.id !== id);
  saveStoredProducts(updated);
}

export function resetStoredProducts(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PRODUCTS_STORAGE_KEY);
  window.dispatchEvent(new Event("aura_products_updated"));
}

// React Hook for reactive products in components
export function useProducts(): Product[] {
  const [items, setItems] = React.useState<Product[]>(getStoredProducts());

  React.useEffect(() => {
    const sync = () => {
      setItems(getStoredProducts());
    };
    sync();
    window.addEventListener("aura_products_updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("aura_products_updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return items;
}

// Global products fallback (points to dynamic stored list or defaults)
export const products: Product[] = defaultProducts;

export const getProduct = (id: string): Product | undefined => {
  const list = getStoredProducts();
  return list.find((p) => p.id === id) || defaultProducts.find((p) => p.id === id);
};

const AR_DIGITS = "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";

export const toArabicDigits = (value: string | number) =>
  String(value).replace(/[0-9]/g, (d) => AR_DIGITS[Number(d)]!);

export const formatPrice = (v: number) => {
  const rounded = Math.round(v);
  const grouped = rounded.toLocaleString("en-US").replace(/,/g, "\u066C");
  return `${toArabicDigits(grouped)} \u062C.\u0645`;
};
