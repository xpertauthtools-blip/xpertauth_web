import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useTranslations } from "@/i18n/context";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const { t, messages } = useTranslations("contact");
  const m = messages as any;

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: { nombre: string; email: string; mensaje: string }) => {
      const res = await apiRequest("POST", "/api/contacto", data);
      return res.json();
    },
    onSuccess: () => {
      setSuccess(true);
      setNombre("");
      setEmail("");
      setMensaje("");
      setPrivacyAccepted(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim() || !mensaje.trim() || !privacyAccepted) return;
    mutation.mutate({ nombre, email, mensaje });
  };

  const handleClose = () => {
    if (mutation.isPending) return;
    setSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9990]"
            onClick={handleClose}
            data-testid="contact-modal-overlay"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[9991] flex items-center justify-center p-4"
            data-testid="contact-modal"
          >
            <div className="w-full max-w-md bg-[#0F1628] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/[0.06]">
                <div>
                  <h2 className="font-heading font-bold text-pure text-lg">
                    {m?.title ?? "Contacta con nosotros"}
                  </h2>
                  <p className="text-white/40 text-xs mt-0.5">
                    {m?.subtitle ?? "Te respondemos en menos de 24 horas."}
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-md flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/5 transition-colors"
                  data-testid="button-contact-modal-close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-5">
                {success ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center text-center py-6 gap-3"
                  >
                    <CheckCircle className="w-10 h-10 text-arctic" />
                    <h3 className="font-heading font-semibold text-pure text-base">
                      {m?.successTitle ?? "¡Mensaje enviado!"}
                    </h3>
                    <p className="text-white/50 text-sm">
                      {m?.successMessage ?? "Hemos recibido tu mensaje. Nos pondremos en contacto contigo pronto."}
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-2 px-6 py-2.5 bg-xpertblue text-pure text-sm font-semibold rounded-md hover:bg-xpertblue/90 transition-colors"
                    >
                      {m?.close ?? "Cerrar"}
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nombre */}
                    <div>
                      <label className="block text-white/60 text-xs font-medium mb-1.5">
                        {m?.nameLabel ?? "Nombre"} <span className="text-ember">*</span>
                      </label>
                      <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder={m?.namePlaceholder ?? "Tu nombre"}
                        required
                        className="w-full px-3 py-2.5 rounded-md bg-white/[0.05] border border-white/10 text-pure text-sm placeholder:text-white/20 focus:outline-none focus:border-arctic/40 transition-colors"
                        data-testid="input-contact-nombre"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-white/60 text-xs font-medium mb-1.5">
                        {m?.emailLabel ?? "Email"} <span className="text-ember">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={m?.emailPlaceholder ?? "tu@email.com"}
                        required
                        className="w-full px-3 py-2.5 rounded-md bg-white/[0.05] border border-white/10 text-pure text-sm placeholder:text-white/20 focus:outline-none focus:border-arctic/40 transition-colors"
                        data-testid="input-contact-email"
                      />
                    </div>

                    {/* Mensaje */}
                    <div>
                      <label className="block text-white/60 text-xs font-medium mb-1.5">
                        {m?.messageLabel ?? "Mensaje"} <span className="text-ember">*</span>
                      </label>
                      <textarea
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                        placeholder={m?.messagePlaceholder ?? "¿En qué podemos ayudarte?"}
                        required
                        rows={4}
                        className="w-full px-3 py-2.5 rounded-md bg-white/[0.05] border border-white/10 text-pure text-sm placeholder:text-white/20 focus:outline-none focus:border-arctic/40 transition-colors resize-none"
                        data-testid="input-contact-mensaje"
                      />
                    </div>

                    {/* Privacidad */}
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => setPrivacyAccepted((v) => !v)}
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 rounded border transition-colors ${
                          privacyAccepted
                            ? "bg-xpertblue border-xpertblue"
                            : "bg-transparent border-white/20 hover:border-white/40"
                        }`}
                        data-testid="checkbox-contact-privacy"
                      >
                        {privacyAccepted && (
                          <svg viewBox="0 0 12 12" fill="none" className="w-full h-full p-0.5">
                            <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>
                      <p className="text-white/40 text-xs leading-relaxed">
                        {m?.privacyText ?? "He leído y acepto la"}{" "}
                        <a href="#" className="text-arctic underline hover:text-arctic/80 transition-colors">
                          {m?.privacyLink ?? "Política de Privacidad"}
                        </a>
                        . {m?.privacyInfo ?? "Tus datos se usan exclusivamente para responder a tu consulta."}
                      </p>
                    </div>

                    {/* Error */}
                    {mutation.isError && (
                      <p className="text-red-400 text-xs">
                        {m?.errorGeneric ?? "Error al enviar. Inténtalo de nuevo."}
                      </p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={mutation.isPending || !privacyAccepted}
                      className="w-full py-3 bg-xpertblue text-pure text-sm font-semibold rounded-md transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 hover:bg-xpertblue/90"
                      data-testid="button-contact-submit"
                    >
                      {mutation.isPending ? (
                        <><Loader2 className="w-4 h-4 animate-spin" />{m?.sending ?? "Enviando..."}</>
                      ) : (
                        m?.submit ?? "Enviar mensaje"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
