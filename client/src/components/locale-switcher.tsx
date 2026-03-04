import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useI18n, LOCALES, type Locale } from "@/i18n/context";

const localeLabels: Record<Locale, { flag: string; code: string }> = {
  es: { flag: "\uD83C\uDDEA\uD83C\uDDF8", code: "ES" },
  ca: { flag: "\uD83C\uDFF3\uFE0F", code: "CA" },
  en: { flag: "\uD83C\uDDEC\uD83C\uDDE7", code: "EN" },
  fr: { flag: "\uD83C\uDDEB\uD83C\uDDF7", code: "FR" },
};

export default function LocaleSwitcher() {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const current = localeLabels[locale];

  return (
    <div ref={ref} className="relative" data-testid="locale-switcher">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 text-sm text-white/70 rounded-md transition-colors"
        data-testid="button-locale-toggle"
        aria-label="Cambiar idioma"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="font-medium text-xs">{current.code}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-1 w-32 rounded-md border border-white/10 bg-obsidian shadow-xl shadow-black/30 py-1 z-50"
          >
            {LOCALES.map((loc) => {
              const info = localeLabels[loc];
              const isActive = loc === locale;
              return (
                <button
                  key={loc}
                  onClick={() => {
                    setLocale(loc);
                    setOpen(false);
                  }}
                  className={`flex items-center gap-2.5 w-full px-3 py-2 text-sm transition-colors ${
                    isActive ? "text-arctic bg-white/[0.05]" : "text-white/60"
                  }`}
                  data-testid={`button-locale-${loc}`}
                >
                  <span className="text-base leading-none">{info.flag}</span>
                  <span className="font-medium text-xs">{info.code}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
