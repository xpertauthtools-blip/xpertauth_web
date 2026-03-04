import { motion } from "framer-motion";
import { Award, Clock, Users, Quote } from "lucide-react";

const stats = [
  { icon: Clock, value: "30+", label: "Años de experiencia", color: "text-xpertblue" },
  { icon: Users, value: "1000+", label: "Consultas resueltas", color: "text-arctic" },
  { icon: Award, value: "100%", label: "Compromiso social", color: "text-ember" },
];

const testimonials = [
  {
    quote: "Gracias a XpertAuth pude resolver mis dudas sobre normativa en minutos, no en semanas.",
    author: "Carlos M.",
    role: "Transportista autónomo",
  },
  {
    quote: "La IA nos ayudó a automatizar procesos que antes consumían horas. Increíble relación calidad-precio.",
    author: "María R.",
    role: "Directora de operaciones, LogiTrans",
  },
  {
    quote: "Mis padres ahora hacen videollamadas solos. El programa de formación es maravilloso.",
    author: "Ana P.",
    role: "Familiar de alumno senior",
  },
];

export default function SocialProof() {
  return (
    <section
      id="autoridad"
      className="py-20 sm:py-28 bg-mist"
      data-testid="section-social-proof"
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
            Confianza
          </span>
          <h2 className="font-heading font-bold text-obsidian text-3xl sm:text-4xl mt-4">
            Experiencia que habla por sí misma
          </h2>
          <p className="mt-4 text-obsidian/50 text-base max-w-xl mx-auto">
            Décadas de conocimiento especializado al servicio de quienes más lo necesitan.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center p-6 rounded-xl bg-white border border-obsidian/[0.06]"
              data-testid={`stat-${i}`}
            >
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
              <div className="font-heading font-bold text-obsidian text-3xl sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-obsidian/50 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="relative p-6 sm:p-8 rounded-xl bg-white border border-obsidian/[0.06]"
              data-testid={`testimonial-${i}`}
            >
              <Quote className="w-8 h-8 text-xpertblue/20 mb-4" />
              <p className="text-obsidian/70 text-sm leading-relaxed italic mb-6">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-xpertblue/20 to-arctic/20 flex items-center justify-center">
                  <span className="text-xpertblue font-heading font-bold text-sm">
                    {t.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-heading font-semibold text-obsidian text-sm">{t.author}</div>
                  <div className="text-obsidian/40 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-obsidian/30 text-xs uppercase tracking-widest mb-6">
            Próximamente: partners y colaboradores
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {["Partner 1", "Partner 2", "Partner 3", "Partner 4"].map((p, i) => (
              <div
                key={i}
                className="w-24 h-10 rounded-md bg-obsidian/[0.04] flex items-center justify-center"
              >
                <span className="text-obsidian/20 text-xs font-medium">{p}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
