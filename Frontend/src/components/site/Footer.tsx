import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-sand/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="font-display text-xl">دار العطور</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            بيت عطور محلي يصنع تركيبات شرقية بمكونات مختارة من الطائف وكمبوديا وأصفهان.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-bold">تسوّق</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/shop" className="hover:text-foreground">
                كل العطور
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-foreground">
                سلة الشراء
              </Link>
            </li>
            <li>
              <Link to="/checkout" className="hover:text-foreground">
                إتمام الطلب
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold">خدمة العملاء</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>الشحن خلال ٢-٤ أيام عمل</li>
            <li>إرجاع خلال ١٤ يوماً</li>
            <li>الدفع عند الاستلام متاح</li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold">تواصل معنا</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            القاهرة — جمهورية مصر العربية
            <br />
            واتساب: <a href="https://wa.me/201013556821" target="_blank" rel="noopener noreferrer" className="text-gold font-bold hover:underline">01013556821</a>
            <br />
            خدمة العملاء يومياً ٩ ص – ١١ م
          </p>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        <div className="flex items-center justify-center gap-3">
          <span>© {new Date().getFullYear()} دار العطور (AURA). جميع الحقوق محفوظة.</span>
          <span>·</span>
          <Link to="/admin" className="text-muted-foreground hover:text-gold transition-colors font-medium">
            لوحة التحكم (Admin)
          </Link>
        </div>
      </div>
    </footer>
  );
}
