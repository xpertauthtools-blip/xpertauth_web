import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ChevronUp, Shield } from "lucide-react";
import { useTranslations } from "@/i18n/context";

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_KEY = "xpertauth_cookie_consent";

function getStoredConsent(): CookiePreferences | null {
  try {
    const raw = localStorage.getItem(COOKIE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function storeConsent(prefs: CookiePreferences) {
  try {
    localStorage.setItem(COOKIE_KEY, JSON.stringify(prefs));
  } catch {}
}

export default function CookieBanner() {
  const { t, messages } = useTranslations("cookies");
  const m = messages as any;

  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      // Pequeño delay para no bloquear el render inicial
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    const all = { necessary: true, analytics: true, marketing: true };
    storeConsent(all);
    setVisible(false);
  };

  const rejectAll = () => {
    const minimal = { necessary: true, analytics: false, marketing: false };
    storeConsent(minimal);
    setVisible(false);
  };

  const saveCustom = () => {
    storeConsent(prefs);
    setVisible(false);
  };

  const toggle = (key: keyof CookiePreferences) => {
    if (key === "necessary") return;
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6"
          data-testid="cookie-banner"
        >
          <div className="max-w-4xl mx-auto bg-[#0F1628] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="px-6 pt-5 pb-4 flex items-start gap-3">
              <Shield className="w-5 h-5 text-arctic flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-pure text-sm mb-1">
                  {m?.title ?? "Tu privacidad importa"}
                </h3>
                <p className="text-white/50 text-xs leading-relaxed">
                  {m?.description ?? "Usamos cookies para mejorar tu experiencia. Puedes aceptar todas, rechazar las no esenciales o personalizar tu elección."}{" "}
                  <a href="#" className="text-arctic underline hover:text-arctic/80 transition-colors">
                    {m?.learnMore ?? "Más información"}
                  </a>
                </p>
              </div>
            </div>

            {/* Panel de personalización */}
            <AnimatePresence>
              {showCustomize && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 space-y-3 border-t border-white/[0.06] pt-4">
                    {/* Necesarias */}
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-pure text-xs font-semibold">{m?.necessary ?? "Necesarias"}</p>
                        <p className="text-white/40 text-xs">{m?.necessaryDesc ?? "Imprescindibles para el funcionamiento de la web. No se pueden desactivar."}</p>
                      </div>
                      <div className="w-10 h-5 rounded-full bg-xpertblue flex-shrink-0 flex items-center justify-end px-0.5 cursor-not-allowed opacity-60">
                        <div className="w-4 h-4 rounded-full bg-white" />
                      </div>
                    </div>

                    {/* Analíticas */}
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-pure text-xs font-semibold">{m?.analytics ?? "Analíticas"}</p>
                        <p className="text-white/40 text-xs">{m?.analyticsDesc ?? "Nos ayudan a entender cómo se usa la web para mejorarla."}</p>
                      </div>
                      <button
                        onClick={() => toggle("analytics")}
                        className={`w-10 h-5 rounded-full flex-shrink-0 flex items-center px-0.5 transition-all duration-200 ${prefs.analytics ? "bg-xpertblue justify-end" : "bg-white/10 justify-start"}`}
                        aria-label="Toggle analytics"
                      >
                        <div className="w-4 h-4 rounded-full bg-white" />
                      </button>
                    </div>

                    {/* Marketing */}
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-pure text-xs font-semibold">{m?.marketing ?? "Marketing"}</p>
                        <p className="text-white/40 text-xs">{m?.marketingDesc ?? "Permiten mostrarte contenido relevante según tus intereses."}</p>
                      </div>
                      <button
                        onClick={() => toggle("marketing")}
                        className={`w-10 h-5 rounded-full flex-shrink-0 flex items-center px-0.5 transition-all duration-200 ${prefs.marketing ? "bg-xpertblue justify-end" : "bg-white/10 justify-start"}`}
                        aria-label="Toggle marketing"
                      >
                        <div className="w-4 h-4 rounded-full bg-white" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botones */}
            <div className="px-6 pb-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 border-t border-white/[0.06] pt-4">
              <button
                onClick={() => setShowCustomize((v) => !v)}
                className="flex items-center justify-center gap-1.5 px-4 py-2 text-white/50 text-xs font-medium hover:text-white/80 transition-colors order-3 sm:order-1 sm:mr-auto"
                data-testid="button-cookies-customize"
              >
                {showCustomize
                  ? (m?.hideCustomize ?? "Ocultar opciones")
                  : (m?.customize ?? "Personalizar")}
                {showCustomize ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>

              {showCustomize && (
                <button
                  onClick={saveCustom}
                  className="px-5 py-2 border border-white/20 text-pure text-xs font-semibold rounded-md hover:bg-white/5 transition-colors order-2"
                  data-testid="button-cookies-save"
                >
                  {m?.savePreferences ?? "Guardar preferencias"}
                </button>
              )}

              <button
                onClick={rejectAll}
                className="px-5 py-2 border border-white/20 text-pure/70 text-xs font-medium rounded-md hover:bg-white/5 transition-colors order-2 sm:order-3"
                data-testid="button-cookies-reject"
              >
                {m?.reject ?? "Solo necesarias"}
              </button>

              <button
                onClick={acceptAll}
                className="px-5 py-2 bg-xpertblue text-pure text-xs font-semibold rounded-md hover:bg-xpertblue/90 transition-colors order-1 sm:order-4"
                data-testid="button-cookies-accept"
              >
                {m?.accept ?? "Aceptar todas"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
