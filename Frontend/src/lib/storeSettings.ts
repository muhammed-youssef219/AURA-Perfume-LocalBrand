export interface StoreSettings {
  transferNumber: string;
  freeShippingThreshold: number;
  codFee: number;
  storePhone: string;
  announcementText: string;
  enableAnnouncements: boolean;
}

const SETTINGS_KEY = "aura_store_settings";

const defaultSettings: StoreSettings = {
  transferNumber: "01013556821",
  freeShippingThreshold: 400,
  codFee: 15,
  storePhone: "01013556821",
  announcementText: "شحن مجاني للطلبات فوق ٤٠٠ ج.م · تغليف هدايا مجاني",
  enableAnnouncements: true,
};

export function getStoreSettings(): StoreSettings {
  if (typeof window === "undefined") return defaultSettings;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return defaultSettings;
    return { ...defaultSettings, ...JSON.parse(raw) };
  } catch {
    return defaultSettings;
  }
}

export function saveStoreSettings(settings: StoreSettings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  window.dispatchEvent(new Event("aura_settings_updated"));
}

