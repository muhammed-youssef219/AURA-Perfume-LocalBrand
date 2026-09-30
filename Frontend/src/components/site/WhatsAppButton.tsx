import * as React from "react";
import { X } from "lucide-react";
import { getStoreSettings } from "@/lib/storeSettings";

function OfficialWhatsAppIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 448 512"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  );
}

export function WhatsAppButton() {
  const [phone, setPhone] = React.useState<string>(getStoreSettings().storePhone);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const sync = () => setPhone(getStoreSettings().storePhone);
    window.addEventListener("aura_settings_updated", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("aura_settings_updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const cleanPhone = phone.replace(/[^0-9]/g, "");
  // Ensure country code 20 for Egypt
  const waNumber = cleanPhone.startsWith("0")
    ? `20${cleanPhone.slice(1)}`
    : cleanPhone.startsWith("20")
    ? cleanPhone
    : `20${cleanPhone}`;

  const welcomeMsg = encodeURIComponent(
    "مرحباً بكم في دار العطور AURA 🌹\nأنا مهتم بمعرفة المزيد عن عطوركم الفاخرة، هل يمكنكم مساعدتي؟"
  );
  const waUrl = `https://wa.me/${waNumber}?text=${welcomeMsg}`;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start font-sans">
      {isOpen && (
        <div className="mb-3 w-72 rounded-lg border border-border bg-card p-4 shadow-2xl animate-fade-in text-right">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#25D366] animate-ping" />
              <span className="font-bold text-xs text-foreground">خدمة عملاء دار العطور</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded p-1 hover:bg-muted text-muted-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
            👋 أهلاً وسهلاً! اضغط الزر أدناه وسيتم فتح محادثة واتساب معنا فوراً.
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-2.5 text-xs font-bold text-white shadow-md transition-colors hover:bg-[#20bd5a]"
          >
            <OfficialWhatsAppIcon className="h-4 w-4" />
            <span>بدء المحادثة عبر واتساب</span>
          </a>
        </div>
      )}

      {/* الأيقونة الرئيسية — شعار واتساب الأصلي */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل معنا عبر واتساب"
        onClick={() => setIsOpen(false)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-[#20bd5a] hover:shadow-[0_0_25px_rgba(37,211,102,0.6)]"
      >
        <OfficialWhatsAppIcon className="h-7 w-7 fill-white" />
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-400 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
        </span>
      </a>
    </div>
  );
}

