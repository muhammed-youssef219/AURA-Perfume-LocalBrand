export const ADMIN_STORAGE_KEY = "aura_admin_auth";
export const ADMIN_PASS_KEY = "aura_admin_password";
const DEFAULT_PASSWORD = "aura";

export function getAdminPassword(): string {
  if (typeof window === "undefined") return DEFAULT_PASSWORD;
  return localStorage.getItem(ADMIN_PASS_KEY) || DEFAULT_PASSWORD;
}

export function setAdminPassword(newPass: string): boolean {
  if (!newPass || newPass.trim().length < 4) return false;
  localStorage.setItem(ADMIN_PASS_KEY, newPass.trim());
  return true;
}

export function verifyAdminPassword(input: string): boolean {
  const currentPass = getAdminPassword();
  return input.trim() === currentPass;
}

export function loginAdmin(password: string): boolean {
  if (verifyAdminPassword(password)) {
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify({
      authenticated: true,
      timestamp: Date.now(),
    }));
    return true;
  }
  return false;
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    // Session valid for 7 days
    if (data.authenticated && Date.now() - data.timestamp < 7 * 24 * 60 * 60 * 1000) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

export function logoutAdmin(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
  }
}

