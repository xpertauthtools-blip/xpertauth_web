import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useTranslations } from "@/i18n/context";

interface WaitlistModalProps {
  open: boolean;
  onClose: () => void;
  defaultType?: string;
}

export default function WaitlistModal({ open, onClose, defaultType = "individual" }: WaitlistModalProps) {
  const { t } = useTranslations("waitlist");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: { name: string; email: string; type: string }) => {
      const res = await apiRequest("POST", "/api/waitlist", data);
      return res.json();
    },
    onSuccess: () => {
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setName("");
        setEmail("");
      }, 2500);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    mutation.mutate({ name, email, type: defaultType });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.3 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-md bg-obsidian-light border border-white/10 rounded-xl p-6 sm:p-8 shadow-2xl">
            <button onClick={onClose} className="absolute top-4 right-4 text-white/40 p-1" data-testid="button-close-modal" aria-label="Cerrar">
              <X className="w-5 h-5" />
            </button>

            {success ? (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-arctic mx-auto mb-4" />
                <h3 className="font-heading font-bold text-pure text-xl mb-2">{t("successTitle")}</h3>
                <p className="text-white/50 text-sm">{t("successMessage")}</p>
              </motion.div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="font-heading font-bold text-pure text-xl mb-2">{t("title")}</h3>
                  <p className="text-white/50 text-sm">{t("subtitle")}</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-1.5">{t("nameLabel")}</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t("namePlaceholder")} required className="w-full px-4 py-3 rounded-md bg-white/[0.05] border border-white/10 text-pure text-sm placeholder:text-white/25 focus:outline-none focus:border-arctic/50 transition-colors" data-testid="input-waitlist-name" />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-1.5">{t("emailLabel")}</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("emailPlaceholder")} required className="w-full px-4 py-3 rounded-md bg-white/[0.05] border border-white/10 text-pure text-sm placeholder:text-white/25 focus:outline-none focus:border-arctic/50 transition-colors" data-testid="input-waitlist-email" />
                  </div>
                  {mutation.isError && (
                    <p className="text-red-400 text-sm" data-testid="text-waitlist-error">
                      {(mutation.error as Error)?.message?.includes("409") ? t("errorDuplicate") : t("errorGeneric")}
                    </p>
                  )}
                  <button type="submit" disabled={mutation.isPending} className="w-full py-3 bg-xpertblue text-pure font-semibold rounded-md text-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60" data-testid="button-waitlist-submit">
                    {mutation.isPending ? (<><Loader2 className="w-4 h-4 animate-spin" />{t("sending")}</>) : t("submit")}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
