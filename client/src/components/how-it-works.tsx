import { motion } from "framer-motion";
import { UserPlus, Bot, Users, Rocket } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Te registras como socio",
    subtitle: "Desde 5€/mes",
    description: "Elige el plan que mejor se adapte a tus necesidades. Es rápido, seguro y sin permanencia.",
  },
  {
    icon: Bot,
    step: "02",
    title: "La IA responde al instante",
    subtitle: "24/7",
    description: "Nuestro asistente de IA responde tus consultas en tiempo real con información actualizada y precisa.",
  },
  {
    icon: Users,
    step: "03",
    title: "Un experto interviene",
    subtitle: "Si necesitas más",
    description: "Cuando la consulta lo requiere, un profesional humano con décadas de experiencia toma el relevo.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Aprendes y creces",
    subtitle: "Comunidad",
    description: "Aprendes, creces y contribuyes a una comunidad que comparte conocimiento y ayuda a los demás.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="py-20 sm:py-28 bg-obsidian relative"
      data-testid="section-como-funciona"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-light via-obsidian to-obsidian pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-arctic text-xs font-semibold tracking-widest uppercase">
            Proceso
          </span>
          <h2 className="font-heading font-bold text-pure text-3xl sm:text-4xl mt-4">
            Cómo funciona
          </h2>
          <p className="mt-4 text-white/50 text-base max-w-xl mx-auto">
            De la pregunta a la solución en cuatro sencillos pasos.
          </p>
        </motion.div>

        <div className="hidden md:block relative">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-arctic/20 to-transparent -translate-y-1/2" />
          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
                data-testid={`step-${i}`}
              >
                <div className="text-center">
                  <div className="relative mx-auto w-16 h-16 rounded-full bg-obsidian border-2 border-arctic/30 flex items-center justify-center mb-6">
                    <step.icon className="w-7 h-7 text-arctic" />
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-xpertblue text-pure text-xs font-bold flex items-center justify-center font-mono">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="font-heading font-semibold text-pure text-base mb-1">
                    {step.title}
                  </h3>
                  <span className="text-arctic text-xs font-medium">{step.subtitle}</span>
                  <p className="mt-3 text-white/40 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="md:hidden space-y-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex gap-5"
              data-testid={`step-mobile-${i}`}
            >
              <div className="flex-shrink-0 relative">
                <div className="w-14 h-14 rounded-full border-2 border-arctic/30 flex items-center justify-center bg-obsidian">
                  <step.icon className="w-6 h-6 text-arctic" />
                </div>
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-xpertblue text-pure text-[10px] font-bold flex items-center justify-center font-mono">
                  {step.step}
                </span>
                {i < steps.length - 1 && (
                  <div className="absolute top-16 left-1/2 w-px h-8 bg-arctic/15 -translate-x-1/2" />
                )}
              </div>

              <div className="pt-1">
                <h3 className="font-heading font-semibold text-pure text-base mb-1">
                  {step.title}
                </h3>
                <span className="text-arctic text-xs font-medium">{step.subtitle}</span>
                <p className="mt-2 text-white/40 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
