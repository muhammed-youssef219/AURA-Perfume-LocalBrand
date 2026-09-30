import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/site/ProductCard";
import { HeroSection } from "@/components/site/HeroSection";
import { useProducts } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "دار العطور | عطور شرقية فاخرة بصناعة محلية" },
      {
        name: "description",
        content:
          "متجر دار العطور: عطور شرقية وزهرية وخشبية بتركيبات فاخرة من العود والورد، مع شحن سريع لجميع محافظات مصر.",
      },
      { property: "og:title", content: "دار العطور | عطور شرقية فاخرة" },
      {
        property: "og:description",
        content: "تركيبات عطرية فاخرة من العود والورد والعنبر، بصناعة محلية وشحن سريع.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const allProducts = useProducts();
  const featured = allProducts.filter((p) => p.featured);

  return (
    <div>
      <HeroSection />

      <section id="featured-perfumes" className="mx-auto max-w-6xl px-4 py-16 scroll-mt-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl">عطور مميزة</h2>
            <p className="mt-2 text-sm text-muted-foreground">اختيارات عملائنا الأكثر طلباً</p>
          </div>
          <Link to="/shop" className="shrink-0 text-sm text-gold hover:underline">
            عرض الكل
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="bg-sand/60 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-3">
          {[
            { t: "تعتيق ٦ أشهر", d: "كل تركيبة تُترك لتنضج قبل التعبئة، فتأتي الرائحة متوازنة وثابتة." },
            { t: "ثبات يوم كامل", d: "تركيز عالٍ من الزيوت العطرية يمنح فوحاً يمتد من الصباح للمساء." },
            { t: "تغليف هدايا", d: "علبة خشبية وبطاقة إهداء مكتوبة بخط اليد مع كل طلب." },
          ].map((c) => (
            <div key={c.t} className="border-r-2 border-gold pr-5">
              <h3 className="font-display text-xl">{c.t}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{c.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
