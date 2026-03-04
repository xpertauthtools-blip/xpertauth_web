import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Mail, ArrowRight, Calendar, Loader2, CheckCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const placeholderPosts = [
  {
    title: "Novedades en normativa DGT para transporte especial 2026",
    excerpt: "Análisis de los últimos cambios regulatorios y cómo afectan a tu actividad profesional.",
    date: "Próximamente",
  },
  {
    title: "5 formas en que la IA puede transformar tu PYME hoy",
    excerpt: "Casos prácticos de implementación de inteligencia artificial en pequeñas y medianas empresas.",
    date: "Próximamente",
  },
  {
    title: "Guía básica: tu primer smartphone sin miedo",
    excerpt: "Todo lo que necesitas saber para empezar a usar un teléfono inteligente con confianza.",
    date: "Próximamente",
  },
];

const placeholderNewsletters = [
  {
    volume: "Vol. 1",
    title: "Bienvenida a XpertAuth",
    description: "Presentación de la asociación, misión y primeros pasos.",
  },
  {
    volume: "Vol. 2",
    title: "IA accesible para todos",
    description: "Cómo la inteligencia artificial puede beneficiar a cualquier persona.",
  },
];

function NewsletterSignupInline() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: { email: string }) => {
      const res = await apiRequest("POST", "/api/newsletter", data);
      return res.json();
    },
    onSuccess: () => {
      setSuccess(true);
      setEmail("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    mutation.mutate({ email });
  };

  if (success) {
    return (
      <div className="p-5 rounded-xl bg-white border border-obsidian/[0.06] text-center">
        <CheckCircle className="w-8 h-8 text-arctic mx-auto mb-2" />
        <p className="text-obsidian/70 text-sm font-medium">¡Suscrito correctamente!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-5 rounded-xl bg-white border border-obsidian/[0.06]">
      <p className="text-obsidian/70 text-sm font-medium mb-3">
        Recibe cada edición en tu email
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          className="flex-grow px-3 py-2.5 rounded-md bg-mist border border-obsidian/[0.08] text-obsidian text-sm placeholder:text-obsidian/30 focus:outline-none focus:border-xpertblue/40 transition-colors"
          data-testid="input-newsletter-email"
        />
        <button
          type="submit"
          disabled={mutation.isPending}
          className="px-4 py-2.5 bg-xpertblue text-pure text-sm font-semibold rounded-md transition-all duration-200 disabled:opacity-60 flex-shrink-0"
          data-testid="button-newsletter-submit"
        >
          {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Suscribir"}
        </button>
      </div>
      {mutation.isError && (
        <p className="mt-2 text-red-500 text-xs" data-testid="text-newsletter-error">
          {(mutation.error as Error)?.message?.includes("409")
            ? "Este email ya está suscrito."
            : "Error al suscribir. Inténtalo de nuevo."}
        </p>
      )}
    </form>
  );
}

export default function BlogNewsletter() {
  return (
    <section
      id="blog"
      className="py-20 sm:py-28 bg-mist"
      data-testid="section-blog-newsletter"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xpertblue text-xs font-semibold tracking-widest uppercase">
            Contenido
          </span>
          <h2 className="font-heading font-bold text-obsidian text-3xl sm:text-4xl mt-4">
            Blog y Newsletter
          </h2>
          <p className="mt-4 text-obsidian/50 text-base max-w-xl mx-auto">
            Mantente al día con las últimas novedades en transporte, IA y formación digital.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-xpertblue" />
              <h3 className="font-heading font-semibold text-obsidian text-lg">
                Últimos artículos
              </h3>
            </div>

            <div className="space-y-4">
              {placeholderPosts.map((post, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group p-5 rounded-xl bg-white border border-obsidian/[0.06] cursor-pointer transition-all duration-300"
                  data-testid={`card-blog-${i}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-grow">
                      <h4 className="font-heading font-semibold text-obsidian text-base mb-2 group-hover:text-xpertblue transition-colors">
                        {post.title}
                      </h4>
                      <p className="text-obsidian/50 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-obsidian/30" />
                        <span className="text-obsidian/30 text-xs">{post.date}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-obsidian/20 flex-shrink-0 mt-1 transition-all group-hover:text-xpertblue group-hover:translate-x-1" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Mail className="w-5 h-5 text-arctic" />
              <h3 className="font-heading font-semibold text-obsidian text-lg">
                Newsletter
              </h3>
            </div>

            <div className="space-y-4 mb-6">
              {placeholderNewsletters.map((nl, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="p-5 rounded-xl bg-white border border-obsidian/[0.06]"
                  data-testid={`card-newsletter-${i}`}
                >
                  <span className="inline-block px-2.5 py-0.5 bg-arctic/10 text-arctic text-xs font-bold rounded-full mb-3 font-mono">
                    {nl.volume}
                  </span>
                  <h4 className="font-heading font-semibold text-obsidian text-sm mb-1">
                    {nl.title}
                  </h4>
                  <p className="text-obsidian/40 text-xs leading-relaxed">
                    {nl.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <NewsletterSignupInline />
          </div>
        </div>
      </div>
    </section>
  );
}
