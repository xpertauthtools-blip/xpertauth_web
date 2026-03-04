import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Truck, Cpu, Heart, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Transporte Especial",
    description: "Consultoría experta en normativa de transporte especial. Resolución de dudas sobre la DGT, permisos, vehículos especiales y legislación vigente.",
    features: ["Consultas normativas", "Asesoría en permisos", "Actualización legal"],
    iconBg: "bg-arctic/10",
    iconColor: "text-arctic",
    featureBorder: "border-arctic/20",
    featureText: "text-arctic",
    featureBg: "bg-arctic/5",
    linkColor: "text-arctic",
    span: "md:col-span-2",
  },
  {
    icon: Cpu,
    title: "IA para PYMEs",
    description: "Implementación de inteligencia artificial adaptada a las necesidades reales de tu empresa. Sin complicaciones, sin jerga técnica.",
    features: ["Automatización", "Análisis inteligente", "Formación interna"],
    iconBg: "bg-xpertblue/10",
    iconColor: "text-xpertblue",
    featureBorder: "border-xpertblue/20",
    featureText: "text-xpertblue",
    featureBg: "bg-xpertblue/5",
    linkColor: "text-xpertblue",
    span: "md:col-span-1",
  },
  {
    icon: Heart,
    title: "Formación Senior",
    description: "Programa gratuito de alfabetización digital para mayores. Grupos reducidos, presencial y con todo el tiempo del mundo.",
    features: ["100% Gratuito", "Grupos de 6 max.", "Presencial"],
    iconBg: "bg-ember/10",
    iconColor: "text-ember",
    featureBorder: "border-ember/20",
    featureText: "text-ember",
    featureBg: "bg-ember/5",
    linkColor: "text-ember",
    span: "md:col-span-1",
    badge: "Gratuito",
  },
];

function GlowCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`relative rounded-xl border border-white/[0.08] bg-white/[0.02] transition-all duration-500 ${className || ""}`}
    >
      {isHovering && (
        <div
          className="absolute pointer-events-none rounded-xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${glowPos.x}px ${glowPos.y}px, rgba(77, 159, 236, 0.08), transparent 60%)`,
            inset: "-1px",
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default function Services() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="servicios"
      className="py-20 sm:py-28 bg-obsidian-light"
      data-testid="section-servicios"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-arctic text-xs font-semibold tracking-widest uppercase">
            Servicios
          </span>
          <h2 className="font-heading font-bold text-pure text-3xl sm:text-4xl mt-4">
            Tres pilares, una misión
          </h2>
          <p className="mt-4 text-white/50 text-base max-w-xl mx-auto">
            Combinamos experiencia humana con inteligencia artificial para ayudarte en lo que más necesitas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={service.span}
            >
              <GlowCard className="h-full">
                <div className="p-6 sm:p-8 h-full flex flex-col">
                  <div className="flex items-start justify-between gap-1 mb-6">
                    <div className={`w-12 h-12 rounded-lg ${service.iconBg} flex items-center justify-center`}>
                      <service.icon className={`w-6 h-6 ${service.iconColor}`} />
                    </div>
                    {service.badge && (
                      <span className="px-3 py-1 text-xs font-bold rounded-full bg-ember text-pure uppercase tracking-wider">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-semibold text-pure text-xl sm:text-2xl mb-3">
                    {service.title}
                  </h3>

                  <p className="text-white/50 text-sm leading-relaxed mb-6 flex-grow">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.features.map((feature, j) => (
                      <span
                        key={j}
                        className={`px-3 py-1 text-xs font-medium rounded-full border ${service.featureBorder} ${service.featureText} ${service.featureBg}`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => scrollTo("#hazte-socio")}
                    className={`inline-flex items-center gap-1.5 text-sm font-medium ${service.linkColor} group`}
                    data-testid={`link-service-${i}`}
                  >
                    Saber más
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
