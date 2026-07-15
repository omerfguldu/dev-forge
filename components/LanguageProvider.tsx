"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { setupI18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export const i18n = setupI18n();

const trMessages = {
  // Sidebar
  "sidebar.favorites": "SIK KULLANILANLAR",
  "sidebar.open_source": "Açık Kaynak",
  "sidebar.github_star": "GitHub'da Yıldızla",
  "sidebar.support_title": "DevStack'i Beğendiniz mi?",
  "sidebar.support_desc":
    "Bize GitHub'da yıldız vererek projenin büyümesine katkıda bulunabilirsiniz.",
  "sidebar.theme_light": "Aydınlık",
  "sidebar.theme_dark": "Karanlık",
  "sidebar.switch_light": "Aydınlık temaya geç",
  "sidebar.switch_dark": "Karanlık temaya geç",
  "sidebar.expand": "Kenar çubuğunu genişlet",
  "sidebar.collapse": "Kenar çubuğunu daralt",
  "sidebar.lang_tr": "Türkçe",
  "sidebar.lang_en": "İngilizce",
  "sidebar.switch_tr": "Türkçe diline geç",
  "sidebar.switch_en": "İngilizce diline geç",

  // Header
  "header.search_placeholder": "Araç ara...",
  "header.history": "Geçmiş",
  "header.last_actions": "SON 10 İŞLEM",
  "header.no_actions": "Henüz işlem yok.",

  // Home Page
  "home.title": "DevStack",
  "home.subtitle":
    "Geliştirici araçlarını tek, hızlı ve tamamen istemci taraflı bir arayüzde toplayan yardımcı araç seti.",

  // Tool Groups
  "group.json_data": "JSON & VERİ",
  "group.text_security": "METİN & GÜVENLİK",
  "group.generators": "ÜRETİCİLER",

  // Tool Labels & Descriptions
  "tool.json-formatter.label": "JSON Suite",
  "tool.json-formatter.desc": "Formatlayıcı, minifier ve doğrulayıcı",
  "tool.converters.label": "Dönüştürücü",
  "tool.converters.desc": "JSON, YAML, XML ve CSV dönüşümleri",
  "tool.string-crypto.label": "String & Şifreleme",
  "tool.string-crypto.desc": "Base64, URL kodlama ve JWT çözümleyici",
  "tool.diff-checker.label": "Metin Karşılaştırıcı",
  "tool.diff-checker.desc": "İki metin arasındaki farkları görselleştirir",
  "tool.generators.label": "Üreticiler",
  "tool.generators.desc": "UUID, hash, QR kod ve Lorem Ipsum",
};

const enMessages = {
  // Sidebar
  "sidebar.favorites": "FAVORITES",
  "sidebar.open_source": "Open Source",
  "sidebar.github_star": "Star on GitHub",
  "sidebar.support_title": "Do you like DevStack?",
  "sidebar.support_desc":
    "You can support our growth by starring the project on GitHub.",
  "sidebar.theme_light": "Light",
  "sidebar.theme_dark": "Dark",
  "sidebar.switch_light": "Switch to light theme",
  "sidebar.switch_dark": "Switch to dark theme",
  "sidebar.expand": "Expand sidebar",
  "sidebar.collapse": "Collapse sidebar",
  "sidebar.lang_tr": "Turkish",
  "sidebar.lang_en": "English",
  "sidebar.switch_tr": "Switch to Turkish",
  "sidebar.switch_en": "Switch to English",

  // Header
  "header.search_placeholder": "Search tools...",
  "header.history": "History",
  "header.last_actions": "LAST 10 ACTIONS",
  "header.no_actions": "No actions yet.",

  // Home Page
  "home.title": "DevStack",
  "home.subtitle":
    "A developer utility suite combining tools in a single, fast, client-side interface.",

  // Tool Groups
  "group.json_data": "JSON & DATA",
  "group.text_security": "TEXT & SECURITY",
  "group.generators": "GENERATORS",

  // Tool Labels & Descriptions
  "tool.json-formatter.label": "JSON Suite",
  "tool.json-formatter.desc": "Formatter, minifier, and validator",
  "tool.converters.label": "Converter",
  "tool.converters.desc": "JSON, YAML, XML, and CSV conversions",
  "tool.string-crypto.label": "String & Encryption",
  "tool.string-crypto.desc": "Base64, URL encoding, and JWT parser",
  "tool.diff-checker.label": "Diff Checker",
  "tool.diff-checker.desc": "Visualizes differences between two texts",
  "tool.generators.label": "Generators",
  "tool.generators.desc": "UUID, hash, QR code, and Lorem Ipsum",
};

i18n.load({
  tr: trMessages,
  en: enMessages,
});

interface LanguageContextProps {
  locale: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useLocalStorage("devstack-locale", "");
  const [activeLocale, setActiveLocale] = useState("tr");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let initialLocale = locale;
    if (!initialLocale) {
      const sysLang =
        typeof window !== "undefined" ? navigator.language || "en" : "en";
      initialLocale = sysLang.startsWith("tr") ? "tr" : "en";
      setLocale(initialLocale);
    }
    i18n.activate(initialLocale);
    setActiveLocale(initialLocale);
    setMounted(true);
  }, [locale, setLocale]);

  const setLanguage = useCallback(
    (lang: string) => {
      setLocale(lang);
      i18n.activate(lang);
      setActiveLocale(lang);
    },
    [setLocale],
  );

  // Default to Turkish for SSR to matching output
  if (!mounted) {
    i18n.activate("tr");
  }

  const contextValue = useMemo(
    () => ({
      locale: activeLocale,
      setLanguage,
    }),
    [activeLocale, setLanguage],
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      <I18nProvider i18n={i18n}>{children}</I18nProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
