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

const gradientStyle: React.CSSProperties = {
  background: "linear-gradient(135deg,#ffffff 0%,#4D9FEC 40%,#1B4FD8 70%,#ffffff 100%)",
  backgroundSize: "300% 300%",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: "snGrad 6s ease infinite",
};

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

function IllustrationTransporte({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ opacity: 0.35 }}>
      <line x1="10" y1="148" x2="230" y2="148" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="158" x2="230" y2="158" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="153" x2="65" y2="153" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="6 10" />
      <line x1="105" y1="153" x2="130" y2="153" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="6 10" />
      <line x1="170" y1="153" x2="195" y2="153" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="6 10" />
      <rect x="28" y="98" width="118" height="50" rx="3" stroke={color} strokeWidth="2.5" />
      <rect x="38" y="58" width="98" height="42" rx="3" stroke={color} strokeWidth="2" strokeDasharray="6 4" />
      <line x1="62" y1="58" x2="62" y2="148" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="95" y1="58" x2="95" y2="148" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="128" y1="58" x2="128" y2="148" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
      <rect x="146" y="106" width="60" height="42" rx="4" stroke={color} strokeWidth="2.5" />
      <rect x="168" y="112" width="28" height="18" rx="2" stroke={color} strokeWidth="1.5" strokeOpacity="0.7" />
      <circle cx="204" cy="126" r="4" stroke={color} strokeWidth="1.5" />
      <circle cx="55" cy="148" r="13" stroke={color} strokeWidth="2.5" />
      <circle cx="55" cy="148" r="5" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
      <circle cx="90" cy="148" r="13" stroke={color} strokeWidth="2.5" />
      <circle cx="90" cy="148" r="5" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
      <circle cx="128" cy="148" r="13" stroke={color} strokeWidth="2.5" />
      <circle cx="128" cy="148" r="5" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
      <circle cx="162" cy="148" r="13" stroke={color} strokeWidth="2.5" />
      <circle cx="162" cy="148" r="5" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
      <circle cx="196" cy="148" r="13" stroke={color} strokeWidth="2.5" />
      <circle cx="196" cy="148" r="5" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
      <polygon points="18,82 6,106 30,106" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <line x1="18" y1="90" x2="18" y2="100" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="18" cy="103" r="2" fill={color} />
    </svg>
  );
}

function IllustrationIA({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ opacity: 0.35 }}>
      <circle cx="120" cy="100" r="24" stroke={color} strokeWidth="2.5" />
      <circle cx="120" cy="100" r="10" stroke={color} strokeWidth="1.5" strokeOpacity="0.6" />
      <circle cx="120" cy="100" r="4" fill={color} />
      <circle cx="42" cy="42" r="16" stroke={color} strokeWidth="2.5" />
      <circle cx="42" cy="42" r="6" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="56" y1="53" x2="98" y2="82" stroke={color} strokeWidth="1.5" strokeOpacity="0.6" />
      <circle cx="198" cy="42" r="16" stroke={color} strokeWidth="2.5" />
      <circle cx="198" cy="42" r="6" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="184" y1="53" x2="142" y2="82" stroke={color} strokeWidth="1.5" strokeOpacity="0.6" />
      <circle cx="42" cy="158" r="16" stroke={color} strokeWidth="2.5" />
      <circle cx="42" cy="158" r="6" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="56" y1="149" x2="98" y2="118" stroke={color} strokeWidth="1.5" strokeOpacity="0.6" />
      <circle cx="198" cy="158" r="16" stroke={color} strokeWidth="2.5" />
      <circle cx="198" cy="158" r="6" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
      <line x1="184" y1="149" x2="142" y2="118" stroke={color} strokeWidth="1.5" strokeOpacity="0.6" />
      <circle cx="18" cy="100" r="11" stroke={color} strokeWidth="2.5" />
      <line x1="29" y1="100" x2="96" y2="100" stroke={color} strokeWidth="1.5" strokeOpacity="0.6" />
      <circle cx="222" cy="100" r="11" stroke={color} strokeWidth="2.5" />
      <line x1="211" y1="100" x2="144" y2="100" stroke={color} strokeWidth="1.5" strokeOpacity="0.6" />
      <circle cx="120" cy="100" r="38" stroke={color} strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 6" />
      <circle cx="120" cy="100" r="54" stroke={color} strokeWidth="0.75" strokeOpacity="0.15" strokeDasharray="3 7" />
    </svg>
  );
}

function IllustrationSenior({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ opacity: 0.35 }}>
      <circle cx="100" cy="44" r="22" stroke={color} strokeWidth="2.5" />
      <path d="M78 66 C72 82 68 108 70 132 L130 132 C132 108 128 82 122 66 Z" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="85" y1="132" x2="80" y2="172" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="115" y1="132" x2="120" y2="172" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="80" y1="172" x2="68" y2="172" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="120" y1="172" x2="132" y2="172" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M122 88 C138 86 150 84 160 83" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <rect x="160" y="68" width="42" height="70" rx="6" stroke={color} strokeWidth="2.5" />
      <rect x="166" y="78" width="30" height="44" rx="2" stroke={color} strokeWidth="1.5" strokeOpacity="0.6" />
      <circle cx="181" cy="130" r="4" stroke={color} strokeWidth="1.5" strokeOpacity="0.7" />
      <rect x="175" y="72" width="12" height="4" rx="2" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
      <rect x="169" y="83" width="10" height="10" rx="2" stroke={color} strokeWidth="1.5" strokeOpacity="0.6" />
      <rect x="183" y="83" width="10" height="10" rx="2" stroke={color} strokeWidth="1.5" strokeOpacity="0.6" />
      <rect x="169" y="98" width="10" height="10" rx="2" stroke={color} strokeWidth="1.5" strokeOpacity="0.6" />
      <rect x="183" y="98" width="10" height="10" rx="2" stroke={color} strokeWidth="1.5" strokeOpacity="0.6" />
      <path d="M208 84 C218 76 218 70 208 62" stroke={color} strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
      <path d="M214 90 C230 78 230 64 214 52" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.45" />
      <path d="M219 96 C240 80 240 58 219 42" stroke={color} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.25" />
      <path d="M100 24 C100 21 97 18 94 21 C91 24 100 31 100 31 C100 31 109 24 106 21 C103 18 100 21 100 24Z" stroke={color} strokeWidth="1.5" strokeOpacity="0.6" />
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
        <div className="hidden md:flex items-center justify-center w-56 lg:w-72 flex-shrink-0 pr-10 pl-0">
          <div className="w-full max-w-[220px] -translate-x-8">
            <Illustration color={illColor} />
          </div>
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
    const card2Progress = Math.max(0, Math.min(1, (scrolled - card2Start) / SCROLL_PER_CARD));
    offsets[1] = OFFSCREEN * (1 - card2Progress);

    const card2End = card2Start + SCROLL_PER_CARD;
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
            <h2
              className="font-heading font-bold text-3xl sm:text-4xl mt-4"
              style={gradientStyle}
            >
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
