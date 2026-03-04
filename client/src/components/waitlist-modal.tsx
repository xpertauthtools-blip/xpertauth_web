import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useTranslations } from "@/i18n/context";

interface WaitlistModalProps {
  open: boolean;
  onClose: () => void;
  tipo: "gratuito" | "individual";
}

export default function WaitlistModal({ open, onClose, tipo }: WaitlistModalProps) {
  const { t } = useTranslations("waitlist");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [acceptFee, setAcceptFee] = useState(false);
  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: { nombre: string; email: string; tipo_socio: string; acepta_privacidad: boolean }) => {
      const res = await apiRequest("POST", "/api/socios", data);
      if (!res.ok) {
        const body = await res.json();
        const err = new Error(body.error || "Error");
        (err as any).status = res.status;
        throw err;
      }
      return res.json();
    },
    onSuccess: () => {
      setSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 2500);
    },
  });

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSuccess(false);
      setName("");
      setEmail("");
      setAcceptFee(false);
      mutation.reset();
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    if (tipo === "individual" && !acceptFee) return;
    mutation.mutate({
      nombre: name.trim(),
      email: email.trim(),
      tipo_socio: tipo,
      acepta_privacidad: true,
    });
  };

  const isFree = tipo === "gratuito";

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={handleClose}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.3 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-md bg-obsidian-light border border-white/10 rounded-xl p-6 sm:p-8 shadow-2xl">
            <button onClick={handleClose} className="absolute top-4 right-4 text-white/40 hover:text-white/70 p-1 transition-colors" data-testid="button-close-modal" aria-label="Cerrar">
              <X className="w-5 h-5" />
            </button>

            {success ? (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-arctic mx-auto mb-4" />
                <h3 className="font-heading font-bold text-pure text-xl mb-2" data-testid="text-success-title">{t("successTitle")}</h3>
                <p className="text-white/50 text-sm" data-testid="text-success-message">{t("successMessage")}</p>
              </motion.div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="font-heading font-bold text-pure text-xl mb-2" data-testid="text-modal-title">
                    {isFree ? t("titleFree") : t("titleIndividual")}
                  </h3>
                  <p className="text-white/50 text-sm">
                    {isFree ? t("subtitleFree") : t("subtitleIndividual")}
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-1.5">{t("nameLabel")}</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={t("namePlaceholder")} required className="w-full px-4 py-3 rounded-md bg-white/[0.05] border border-white/10 text-pure text-sm placeholder:text-white/25 focus:outline-none focus:border-arctic/50 transition-colors" data-testid="input-socio-name" />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-1.5">{t("emailLabel")}</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("emailPlaceholder")} required className="w-full px-4 py-3 rounded-md bg-white/[0.05] border border-white/10 text-pure text-sm placeholder:text-white/25 focus:outline-none focus:border-arctic/50 transition-colors" data-testid="input-socio-email" />
                  </div>
                  {!isFree && (
                    <label className="flex items-start gap-3 cursor-pointer group" data-testid="label-accept-fee">
                      <input type="checkbox" checked={acceptFee} onChange={(e) => setAcceptFee(e.target.checked)} className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-xpertblue focus:ring-xpertblue/50 accent-xpertblue" data-testid="checkbox-accept-fee" />
                      <span className="text-white/50 text-sm group-hover:text-white/70 transition-colors">{t("acceptFee")}</span>
                    </label>
                  )}
                  {mutation.isError && (
                    <p className="text-red-400 text-sm" data-testid="text-socio-error">
                      {(mutation.error as any)?.status === 409 ? t("errorDuplicate") : t("errorGeneric")}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={mutation.isPending || (!isFree && !acceptFee)}
                    className="w-full py-3 bg-xpertblue hover:bg-xpertblue/90 text-pure font-semibold rounded-md text-sm transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="button-socio-submit"
                  >
                    {mutation.isPending ? (
                      <><Loader2 className="w-4 h-4 animate-spin" />{t("sending")}</>
                    ) : (
                      isFree ? t("submitFree") : t("submitIndividual")
                    )}
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
