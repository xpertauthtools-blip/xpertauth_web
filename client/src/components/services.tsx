import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Truck, Cpu, Heart, ArrowRight } from "lucide-react";
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
    icon: Truck,
    iconBg: "bg-arctic/10",
    iconColor: "text-arctic",
    featureBorder: "border-arctic/20",
    featureText: "text-arctic",
    featureBg: "bg-arctic/5",
    ctaBg: "bg-arctic",
    borderColor: "border-arctic/30",
    gradientFrom: "from-arctic/10",
  },
  {
    icon: Cpu,
    iconBg: "bg-xpertblue/10",
    iconColor: "text-xpertblue",
    featureBorder: "border-xpertblue/20",
    featureText: "text-xpertblue",
    featureBg: "bg-xpertblue/5",
    ctaBg: "bg-xpertblue",
    borderColor: "border-xpertblue/30",
    gradientFrom: "from-xpertblue/10",
  },
  {
    icon: Heart,
    iconBg: "bg-ember/10",
    iconColor: "text-ember",
    featureBorder: "border-ember/20",
    featureText: "text-ember",
    featureBg: "bg-ember/5",
    ctaBg: "bg-ember",
    borderColor: "border-ember/30",
    gradientFrom: "from-ember/10",
    hasBadge: true,
  },
];

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
  return (
    <div
      className={`relative w-[80%] mx-auto rounded-2xl border ${meta.borderColor} bg-obsidian-light overflow-hidden shadow-2xl shadow-black/50`}
      style={{ height: CARD_HEIGHT }}
      data-testid={`card-service-${index}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${meta.gradientFrom} to-transparent opacity-50 pointer-events-none rounded-2xl`} />

      <div className="relative z-10 p-8 sm:p-10 md:p-12 h-full flex flex-col">
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className={`w-14 h-14 rounded-xl ${meta.iconBg} flex items-center justify-center flex-shrink-0`}>
            <meta.icon className={`w-7 h-7 ${meta.iconColor}`} />
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

        <p className="text-white/55 text-sm sm:text-base leading-relaxed mb-6 max-w-xl flex-grow">
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
    const card3End = card3Start + SCROLL_PER_CARD;
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
