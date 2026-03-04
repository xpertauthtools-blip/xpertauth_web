import { createContext, useContext, useMemo, useCallback, useEffect } from "react";
import { useLocation } from "wouter";
import es from "./messages/es";
import en from "./messages/en";
import fr from "./messages/fr";
import ca from "./messages/ca";

export const LOCALES = ["es", "ca", "en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "es";

const messages: Record<Locale, typeof es> = { es, en, fr, ca };

type Messages = typeof es;

function getNestedValue(obj: any, path: string): any {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

function deepMerge(target: any, fallback: any): any {
  if (fallback === undefined || fallback === null) return target;
  if (target === undefined || target === null) return fallback;
  if (Array.isArray(target) && Array.isArray(fallback)) {
    return target.map((item: any, i: number) => deepMerge(item, fallback[i]));
  }
  if (typeof target === "object" && typeof fallback === "object") {
    const result: any = { ...fallback };
    for (const key of Object.keys(target)) {
      result[key] = deepMerge(target[key], fallback[key]);
    }
    return result;
  }
  if (typeof target === "string" && target === "") return fallback;
  return target;
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  messages: Messages;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [location, navigate] = useLocation();

  const locale = useMemo<Locale>(() => {
    const pathLocale = location.split("/")[1] as Locale;
    if (LOCALES.includes(pathLocale)) return pathLocale;
    return DEFAULT_LOCALE;
  }, [location]);

  useEffect(() => {
    const pathLocale = location.split("/")[1] as Locale;
    if (!LOCALES.includes(pathLocale)) {
      const saved = localStorage.getItem("xpertauth-locale") as Locale;
      const target = saved && LOCALES.includes(saved) ? saved : DEFAULT_LOCALE;
      navigate(`/${target}`, { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    localStorage.setItem("xpertauth-locale", locale);
    document.documentElement.lang = locale;
  }, [locale]);

  const fallbackMessages = useMemo(() => messages[DEFAULT_LOCALE], []);
  const currentMessages = useMemo(
    () => (locale === DEFAULT_LOCALE ? messages[locale] : deepMerge(messages[locale], fallbackMessages)),
    [locale, fallbackMessages]
  );

  const t = useCallback(
    (key: string): string => {
      const value = getNestedValue(currentMessages, key);
      if (typeof value === "string" && value !== "") return value;
      const fallback = getNestedValue(fallbackMessages, key);
      if (typeof fallback === "string") return fallback;
      return key;
    },
    [currentMessages, fallbackMessages]
  );

  const setLocale = useCallback(
    (newLocale: Locale) => {
      const hash = window.location.hash;
      const pathParts = location.split("/");
      const currentLocale = pathParts[1];
      if (LOCALES.includes(currentLocale as Locale)) {
        pathParts[1] = newLocale;
      } else {
        pathParts.splice(1, 0, newLocale);
      }
      const newPath = pathParts.join("/") || `/${newLocale}`;
      navigate(newPath);
      if (hash) {
        requestAnimationFrame(() => {
          window.location.hash = hash;
        });
      }
    },
    [location, navigate]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, messages: currentMessages }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function useTranslations(section?: string) {
  const { t, messages, locale, setLocale } = useI18n();

  const sectionT = useCallback(
    (key: string): string => {
      return section ? t(`${section}.${key}`) : t(key);
    },
    [t, section]
  );

  const sectionMessages = useMemo(() => {
    if (!section) return messages;
    return getNestedValue(messages, section);
  }, [messages, section]);

  return { t: sectionT, messages: sectionMessages, locale, setLocale };
}
