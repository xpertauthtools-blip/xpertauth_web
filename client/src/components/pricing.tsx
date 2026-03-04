import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { useState } from "react";
import WaitlistModal from "./waitlist-modal";

const plans = [
  {
    name: "Usuario Gratuito",
    price: "0€",
    period: "/siempre",
    description: "Accede a contenido público y participa en la comunidad.",
    features: [
      "Acceso al blog y newsletter",
      "Contenido público de la comunidad",
      "Formación Senior (presencial)",
      "Actualizaciones por email",
    ],
    cta: "Registrarse gratis",
    popular: false,
    color: "border-white/10",
    bgCard: "bg-white/[0.02]",
    type: "free",
  },
  {
    name: "Socio Individual",
    price: "5€",
    period: "/mes",
    description: "Acceso completo a consultoría con IA y soporte experto.",
    features: [
      "Todo lo del plan Gratuito",
      "Consultas con IA ilimitadas",
      "Soporte de experto humano",
      "Acceso anticipado a formaciones",
      "Descuentos en servicios premium",
      "Comunidad privada de socios",
    ],
    cta: "Unirse como Socio",
    popular: true,
    color: "border-xpertblue",
    bgCard: "bg-xpertblue/[0.05]",
    type: "individual",
  },
  {
    name: "Socio Corporativo",
    price: "Contactar",
    period: "",
    description: "Soluciones a medida para empresas. IA + consultoría integral.",
    features: [
      "Todo lo del plan Individual",
      "Múltiples usuarios por cuenta",
      "Implementación IA a medida",
      "Consultoría personalizada",
      "Soporte prioritario",
      "Informes y análisis avanzados",
    ],
    cta: "Solicitar información",
    popular: false,
    color: "border-white/10",
    bgCard: "bg-white/[0.02]",
    type: "corporate",
  },
];

export default function Pricing() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("individual");

  const openWaitlist = (type: string) => {
    setSelectedType(type);
    setModalOpen(true);
  };

  return (
    <section
      id="hazte-socio"
      className="py-20 sm:py-28 bg-obsidian relative"
      data-testid="section-pricing"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian-light/50 to-obsidian pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-arctic text-xs font-semibold tracking-widest uppercase">
            Modelo de socios
          </span>
          <h2 className="font-heading font-bold text-pure text-3xl sm:text-4xl mt-4">
            Elige tu plan
          </h2>
          <p className="mt-4 text-white/50 text-base max-w-xl mx-auto">
            Planes sencillos y transparentes. Sin permanencia ni sorpresas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`relative rounded-xl border-2 ${plan.color} ${plan.bgCard} p-6 sm:p-8 flex flex-col ${
                plan.popular ? "md:-mt-4 md:mb-0 md:pb-12" : ""
              }`}
              data-testid={`card-plan-${plan.type}`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-xpertblue text-pure text-xs font-bold rounded-full uppercase tracking-wider">
                    <Star className="w-3 h-3" />
                    Más popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-heading font-semibold text-pure text-lg">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-heading font-bold text-pure text-4xl">{plan.price}</span>
                  <span className="text-white/40 text-sm">{plan.period}</span>
                </div>
                <p className="mt-3 text-white/40 text-sm">{plan.description}</p>
              </div>

              <div className="flex-grow space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-arctic mt-0.5 flex-shrink-0" />
                    <span className="text-white/60 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => openWaitlist(plan.type)}
                className={`w-full py-3 rounded-md font-semibold text-sm transition-all duration-200 ${
                  plan.popular
                    ? "bg-xpertblue text-pure"
                    : "border border-white/20 text-pure/80"
                }`}
                data-testid={`button-plan-${plan.type}`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <span className="text-white/40 text-xs">Distribución de tu cuota:</span>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <span className="text-ember text-xs font-mono font-medium">40% seniors</span>
              <span className="text-white/20">|</span>
              <span className="text-arctic text-xs font-mono font-medium">35% tech</span>
              <span className="text-white/20">|</span>
              <span className="text-white/50 text-xs font-mono font-medium">15% admin</span>
              <span className="text-white/20">|</span>
              <span className="text-white/50 text-xs font-mono font-medium">10% reserva</span>
            </div>
          </div>
        </motion.div>
      </div>

      <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} defaultType={selectedType} />
    </section>
  );
}
