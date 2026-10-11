import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import hi from "./locales/hi.json";

export const SUPPORTED_LANGS = ["en", "hi"];
export const DEFAULT_LANG = "en";
const STORAGE_KEY = "sic-lang";

function getInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (SUPPORTED_LANGS.includes(saved)) return saved;
  } catch {
    // localStorage unavailable (private mode, blocked) - fall back to default
  }
  return DEFAULT_LANG;
}

const initialLang = getInitialLang();

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
  },
  lng: initialLang,
  fallbackLng: DEFAULT_LANG,
  supportedLngs: SUPPORTED_LANGS,
  interpolation: { escapeValue: false }, // React already escapes
  returnNull: false,
  react: { useSuspense: false },
});

// Keep <html lang> in sync (screen readers, hyphenation, Devanagari font rules)
document.documentElement.lang = initialLang;
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
});

// The one place a user's choice is saved. Use this instead of i18n.changeLanguage.
export function setLanguage(lng) {
  if (!SUPPORTED_LANGS.includes(lng)) return;
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    // ignore - the choice still applies for this visit
  }
  return i18n.changeLanguage(lng);
}

export default i18n;
