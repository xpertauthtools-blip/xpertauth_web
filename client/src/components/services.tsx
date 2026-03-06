import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations, useI18n } from "@/i18n/context";

const CARD_HEIGHT = 420;
const PEEK = 8;
const STICKY_TOP = 100;
const SCROLL_PER_CARD = 600;
const OFFSCREEN = CARD_HEIGHT + 200;
const HEADER_SPACE = 250;
const PAUSE = 150;

const serviceMeta = [
  {
    number: "01",
    numberColor: "text-arctic",
    numberBg: "bg-arctic/10",
    featureBorder: "border-arctic/20",
    featureText: "text-arctic",
    featureBg: "bg-arctic/5",
    ctaBg: "bg-arctic",
    borderColor: "border-arctic/30",
    gradientFrom: "from-arctic/10",
  },
  {
    number: "02",
    numberColor: "text-xpertblue",
    numberBg: "bg-xpertblue/10",
    featureBorder: "border-xpertblue/20",
    featureText: "text-xpertblue",
    featureBg: "bg-xpertblue/5",
    ctaBg: "bg-xpertblue",
    borderColor: "border-xpertblue/30",
    gradientFrom: "from-xpertblue/10",
  },
  {
    number: "03",
    numberColor: "text-ember",
    numberBg: "bg-ember/10",
    featureBorder: "border-ember/20",
    featureText: "text-ember",
    featureBg: "bg-ember/5",
    ctaBg: "bg-ember",
    borderColor: "border-ember/30",
    gradientFrom: "from-ember/10",
    hasBadge: true,
  },
];

// Ilustración 01 — Transporte Especial
// Camión de perfil con carga sobredimensionada, señal de advertencia
function IllustrationTransporte({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-20">
      {/* Carretera */}
      <line x1="20" y1="175" x2="260" y2="175" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="185" x2="260" y2="185" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Línea discontinua */}
      <line x1="60" y1="180" x2="80" y2="180" stroke={color} strokeWidth="1" strokeLinecap="round" strokeDasharray="4 8" />
      <line x1="120" y1="180" x2="140" y2="180" stroke={color} strokeWidth="1" strokeLinecap="round" strokeDasharray="4 8" />
      <line x1="180" y1="180" x2="200" y2="180" stroke={color} strokeWidth="1" strokeLinecap="round" strokeDasharray="4 8" />

      {/* Cabina del camión */}
      <rect x="170" y="130" width="65" height="45" rx="4" stroke={color} strokeWidth="1.5" />
      {/* Parabrisas */}
      <rect x="195" y="136" width="30" height="20" rx="2" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
      {/* Paragolpes */}
      <rect x="232" y="162" width="8" height="8" rx="1" stroke={color} strokeWidth="1" />
      {/* Faro */}
      <circle cx="237" cy="148" r="3" stroke={color} strokeWidth="1" />

      {/* Remolque */}
      <rect x="45" y="120" width="128" height="55" rx="3" stroke={color} strokeWidth="1.5" />
      {/* Carga excepcional (sobresale por arriba) */}
      <rect x="55" y="75" width="108" height="48" rx="3" stroke={color} strokeWidth="1.5" strokeDasharray="5 3" />
      {/* Flejes de sujeción */}
      <line x1="80" y1="75" x2="80" y2="175" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
      <line x1="110" y1="75" x2="110" y2="175" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
      <line x1="140" y1="75" x2="140" y2="175" stroke={color} strokeWidth="1" strokeOpacity="0.5" />

      {/* Ruedas camión */}
      <circle cx="195" cy="175" r="12" stroke={color} strokeWidth="1.5" />
      <circle cx="195" cy="175" r="5" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
      <circle cx="225" cy="175" r="12" stroke={color} strokeWidth="1.5" />
      <circle cx="225" cy="175" r="5" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
      {/* Ruedas remolque */}
      <circle cx="75" cy="175" r="12" stroke={color} strokeWidth="1.5" />
      <circle cx="75" cy="175" r="5" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
      <circle cx="105" cy="175" r="12" stroke={color} strokeWidth="1.5" />
      <circle cx="105" cy="175" r="5" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
      <circle cx="145" cy="175" r="12" stroke={color} strokeWidth="1.5" />
      <circle cx="145" cy="175" r="5" stroke={color} strokeWidth="1" strokeOpacity="0.5" />

      {/* Señal triangular de advertencia */}
      <polygon points="30,95 18,118 42,118" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="30" y1="102" x2="30" y2="111" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="30" cy="114" r="1.5" fill={color} />

      {/* Señal lateral de convoy */}
      <rect x="45" y="108" width="128" height="10" rx="2" stroke={color} strokeWidth="1" strokeOpacity="0.4" strokeDasharray="6 4" />
    </svg>
  );
}

// Ilustración 02 — IA para PYMEs
// Nodos conectados, flujo de automatización
function IllustrationIA({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-20">
      {/* Nodo central */}
      <circle cx="140" cy="110" r="22" stroke={color} strokeWidth="1.5" />
      <circle cx="140" cy="110" r="10" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
      <circle cx="140" cy="110" r="3" fill={color} />

      {/* Nodo superior izquierdo */}
      <circle cx="60" cy="50" r="14" stroke={color} strokeWidth="1.5" />
      <circle cx="60" cy="50" r="5" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
      <line x1="72" y1="60" x2="120" y2="95" stroke={color} strokeWidth="1" strokeOpacity="0.5" />

      {/* Nodo superior derecho */}
      <circle cx="220" cy="50" r="14" stroke={color} strokeWidth="1.5" />
      <circle cx="220" cy="50" r="5" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
      <line x1="208" y1="60" x2="160" y2="95" stroke={color} strokeWidth="1" strokeOpacity="0.5" />

      {/* Nodo inferior izquierdo */}
      <circle cx="50" cy="170" r="14" stroke={color} strokeWidth="1.5" />
      <circle cx="50" cy="170" r="5" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
      <line x1="63" y1="162" x2="120" y2="126" stroke={color} strokeWidth="1" strokeOpacity="0.5" />

      {/* Nodo inferior derecho */}
      <circle cx="230" cy="170" r="14" stroke={color} strokeWidth="1.5" />
      <circle cx="230" cy="170" r="5" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
      <line x1="217" y1="162" x2="160" y2="126" stroke={color} strokeWidth="1" strokeOpacity="0.5" />

      {/* Nodo izquierdo */}
      <circle cx="30" cy="110" r="10" stroke={color} strokeWidth="1.5" />
      <line x1="40" y1="110" x2="118" y2="110" stroke={color} strokeWidth="1" strokeOpacity="0.5" />

      {/* Nodo derecho */}
      <circle cx="250" cy="110" r="10" stroke={color} strokeWidth="1.5" />
      <line x1="240" y1="110" x2="162" y2="110" stroke={color} strokeWidth="1" strokeOpacity="0.5" />

      {/* Pulso / onda alrededor del nodo central */}
      <circle cx="140" cy="110" r="35" stroke={color} strokeWidth="0.75" strokeOpacity="0.3" strokeDasharray="3 5" />
      <circle cx="140" cy="110" r="50" stroke={color} strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="2 6" />

      {/* Flechas de flujo */}
      <path d="M86 82 L118 100" stroke={color} strokeWidth="1" strokeOpacity="0.6" markerEnd="url(#arrow)" />
      <path d="M194 82 L162 100" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
      <path d="M162 122 L194 140" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
      <path d="M118 122 L86 140" stroke={color} strokeWidth="1" strokeOpacity="0.6" />

      {/* Etiquetas mini */}
      <rect x="46" y="42" width="28" height="3" rx="1.5" fill={color} fillOpacity="0.3" />
      <rect x="46" y="48" width="20" height="3" rx="1.5" fill={color} fillOpacity="0.2" />
      <rect x="206" y="42" width="28" height="3" rx="1.5" fill={color} fillOpacity="0.3" />
      <rect x="206" y="48" width="20" height="3" rx="1.5" fill={color} fillOpacity="0.2" />
    </svg>
  );
}

// Ilustración 03 — Formación Senior
// Figura humana con smartphone, ondas de conexión
function IllustrationSenior({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-20">
      {/* Figura humana — cabeza */}
      <circle cx="130" cy="52" r="20" stroke={color} strokeWidth="1.5" />
      {/* Cuerpo */}
      <path d="M110 72 C105 85 100 105 102 130 L158 130 C160 105 155 85 150 72 Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      {/* Piernas */}
      <line x1="115" y1="130" x2="110" y2="175" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="145" y1="130" x2="150" y2="175" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Pies */}
      <line x1="110" y1="175" x2="100" y2="175" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="150" y1="175" x2="160" y2="175" stroke={color} strokeWidth="1.5" strokeLinecap="round" />

      {/* Brazo extendido hacia el smartphone */}
      <path d="M150 90 C160 88 168 86 175 85" stroke={color} strokeWidth="1.5" strokeLinecap="round" />

      {/* Smartphone */}
      <rect x="175" y="72" width="36" height="60" rx="5" stroke={color} strokeWidth="1.5" />
      {/* Pantalla */}
      <rect x="180" y="80" width="26" height="38" rx="2" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
      {/* Botón home */}
      <circle cx="193" cy="124" r="3" stroke={color} strokeWidth="1" strokeOpacity="0.6" />
      {/* Notch */}
      <rect x="188" y="75" width="10" height="3" rx="1.5" stroke={color} strokeWidth="0.75" strokeOpacity="0.4" />

      {/* Contenido pantalla — íconos simples */}
      <rect x="183" y="84" width="8" height="8" rx="1.5" stroke={color} strokeWidth="0.75" strokeOpacity="0.5" />
      <rect x="195" y="84" width="8" height="8" rx="1.5" stroke={color} strokeWidth="0.75" strokeOpacity="0.5" />
      <rect x="183" y="97" width="8" height="8" rx="1.5" stroke={color} strokeWidth="0.75" strokeOpacity="0.5" />
      <rect x="195" y="97" width="8" height="8" rx="1.5" stroke={color} strokeWidth="0.75" strokeOpacity="0.5" />

      {/* Ondas WiFi / conexión desde el smartphone */}
      <path d="M218 88 C225 82 225 78 218 72" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.6" />
      <path d="M222 93 C234 83 234 73 222 63" stroke={color} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.4" />
      <path d="M226 98 C242 84 242 68 226 54" stroke={color} strokeWidth="0.75" strokeLinecap="round" strokeOpacity="0.25" />

      {/* Figura sentada — mesa / silla (contexto formación) */}
      <line x1="70" y1="175" x2="70" y2="140" stroke={color} strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round" />
      <line x1="55" y1="140" x2="85" y2="140" stroke={color} strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round" />
      <line x1="55" y1="175" x2="55" y2="140" stroke={color} strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round" />
      <line x1="85" y1="175" x2="85" y2="140" stroke={color} strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round" />

      {/* Corazón pequeño — cercanía / calidez */}
      <path d="M128 30 C128 27.5 125 25 122.5 27.5 C120 30 128 36 128 36 C128 36 136 30 133.5 27.5 C131 25 128 27.5 128 30Z" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
    </svg>
  );
}

const illustrations = [IllustrationTransporte, IllustrationIA, IllustrationSenior];
const illustrationColors = ["#4D9FEC", "#1B4FD8", "#E8620A"];

function ServiceCard({
  service,
  meta,
  index,
  locale,
  badge,
}: {
  service: any;
  meta: (typeof serviceMeta)[0];
  index: number;
  locale: string;
  badge: string;
}) {
  const Illustration = illustrations[index];
  const illColor = illustrationColors[index];

  return (
    <div
      className={`relative w-[80%] mx-auto rounded-2xl border ${meta.borderColor} bg-obsidian-light overflow-hidden shadow-2xl shadow-black/50`}
      style={{ height: CARD_HEIGHT }}
      data-testid={`card-service-${index}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${meta.gradientFrom} to-transparent opacity-50 pointer-events-none rounded-2xl`} />

      <div className="relative z-10 h-full flex flex-row">
        {/* Columna izquierda — contenido */}
        <div className="flex flex-col p-8 sm:p-10 md:p-12 flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-5">
            <div className={`w-14 h-14 rounded-xl ${meta.numberBg} flex items-center justify-center flex-shrink-0`}>
              <span className={`font-heading font-bold text-xl ${meta.numberColor}`}>{meta.number}</span>
            </div>
            {meta.hasBadge && (
              <span className="px-4 py-1.5 text-xs font-bold rounded-full bg-ember text-pure uppercase tracking-wider">
                {badge}
              </span>
            )}
          </div>

          <h3 className="font-heading font-bold text-pure text-2xl sm:text-3xl mb-3">
            {service.title}
          </h3>

          <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6 max-w-md flex-grow">
            {service.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {(service.features || []).map((feature: string, j: number) => (
              <span
                key={j}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border ${meta.featureBorder} ${meta.featureText} ${meta.featureBg}`}
              >
                {feature}
              </span>
            ))}
          </div>

          <div>
            <a
              href={`/${locale}${service.href}`}
              className={`inline-flex items-center gap-2.5 px-7 py-3 ${meta.ctaBg} text-pure font-semibold rounded-lg text-sm transition-all duration-300 group`}
              data-testid={`button-service-cta-${index}`}
            >
              {service.cta}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Columna derecha — ilustración */}
        <div className="hidden md:flex items-center justify-center w-64 lg:w-80 flex-shrink-0 pr-8">
          <Illustration color={illColor} />
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const { messages } = useTranslations("services");
  const { locale } = useI18n();
  const m = messages as any;
  const items = m.items || [];
  const sectionRef = useRef<HTMLDivElement>(null);
  const [cardOffsets, setCardOffsets] = useState([0, OFFSCREEN, OFFSCREEN]);

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrolled = Math.max(0, -(rect.top - STICKY_TOP) - HEADER_SPACE);

    const offsets = [0, 0, 0];

    offsets[0] = 0;

    const card2Start = PAUSE;
    const card2End = card2Start + SCROLL_PER_CARD;
    const card2Progress = Math.max(0, Math.min(1, (scrolled - card2Start) / SCROLL_PER_CARD));
    offsets[1] = OFFSCREEN * (1 - card2Progress);

    const card3Start = card2End + PAUSE;
    const card3Progress = Math.max(0, Math.min(1, (scrolled - card3Start) / SCROLL_PER_CARD));
    offsets[2] = OFFSCREEN * (1 - card3Progress);

    setCardOffsets(offsets);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const [viewportH, setViewportH] = useState(800);
  useEffect(() => {
    const update = () => setViewportH(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scrollNeeded = HEADER_SPACE + PAUSE * 3 + SCROLL_PER_CARD * 2;
  const totalScrollHeight = scrollNeeded + viewportH;

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="bg-obsidian-light relative"
      style={{ height: totalScrollHeight }}
      data-testid="section-servicios"
    >
      <div className="sticky" style={{ top: 0, overflow: "hidden", height: "100vh" }}>
        <div className="pt-20 sm:pt-28 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center px-4 sm:px-6 lg:px-8"
          >
            <span className="text-arctic text-xs font-semibold tracking-widest uppercase">
              {m.label}
            </span>
            <h2 className="font-heading font-bold text-pure text-3xl sm:text-4xl mt-4">
              {m.title}
            </h2>
            <p className="mt-4 text-white/50 text-base max-w-xl mx-auto">
              {m.subtitle}
            </p>
          </motion.div>
        </div>

        <div
          className="relative mx-auto"
          style={{ height: CARD_HEIGHT + PEEK * 2 }}
        >
          {items.map((service: any, i: number) => (
            <div
              key={i}
              className="absolute inset-x-0"
              style={{
                top: i * PEEK,
                zIndex: i + 1,
                transform: `translateY(${cardOffsets[i]}px)`,
                transition: "transform 0.15s ease-out",
                willChange: "transform",
              }}
            >
              <ServiceCard
                service={service}
                meta={serviceMeta[i]}
                index={i}
                locale={locale}
                badge={m.badge}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
