import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Truck, Cpu, Heart, ArrowRight } from "lucide-react";
import { useTranslations } from "@/i18n/context";
import { useI18n } from "@/i18n/context";

const serviceMeta = [
  {
    icon: Truck,
    iconBg: "bg-arctic/10",
    iconColor: "text-arctic",
    accentColor: "text-arctic",
    featureBorder: "border-arctic/20",
    featureText: "text-arctic",
    featureBg: "bg-arctic/5",
    ctaBg: "bg-arctic",
    borderGlow: "border-arctic/30",
    gradientFrom: "from-arctic/10",
  },
  {
    icon: Cpu,
    iconBg: "bg-xpertblue/10",
    iconColor: "text-xpertblue",
    accentColor: "text-xpertblue",
    featureBorder: "border-xpertblue/20",
    featureText: "text-xpertblue",
    featureBg: "bg-xpertblue/5",
    ctaBg: "bg-xpertblue",
    borderGlow: "border-xpertblue/30",
    gradientFrom: "from-xpertblue/10",
  },
  {
    icon: Heart,
    iconBg: "bg-ember/10",
    iconColor: "text-ember",
    accentColor: "text-ember",
    featureBorder: "border-ember/20",
    featureText: "text-ember",
    featureBg: "bg-ember/5",
    ctaBg: "bg-ember",
    borderGlow: "border-ember/30",
    gradientFrom: "from-ember/10",
    hasBadge: true,
  },
];

function StackedCard({
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
  const cardRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const ratio = entry.intersectionRatio;
            setProgress(Math.min(1, ratio * 1.5));
          }
        });
      },
      { threshold: Array.from({ length: 20 }, (_, i) => i / 19) }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const stickyTop = 100 + index * 48;
  const stackedScale = 0.92 + index * 0.04;

  return (
    <div
      ref={cardRef}
      className="h-[70vh] sm:h-[60vh] md:h-[55vh]"
      data-testid={`service-scroll-area-${index}`}
    >
      <div
        className="sticky"
        style={{ top: `${stickyTop}px` }}
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{
            opacity: progress > 0.1 ? 1 : 0,
            y: progress > 0.1 ? 0 : 60,
            scale: progress > 0.6 ? 1 : stackedScale,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`relative mx-auto max-w-4xl rounded-2xl border ${meta.borderGlow} bg-obsidian-light overflow-hidden shadow-2xl shadow-black/40`}
          data-testid={`card-service-${index}`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${meta.gradientFrom} to-transparent opacity-50 pointer-events-none`} />

          <div className="relative z-10 p-8 sm:p-10 md:p-12">
            <div className="flex flex-col md:flex-row md:items-start gap-8">
              <div className="flex-grow">
                <div className="flex items-start justify-between gap-3 mb-6">
                  <div className={`w-14 h-14 rounded-xl ${meta.iconBg} flex items-center justify-center`}>
                    <meta.icon className={`w-7 h-7 ${meta.iconColor}`} />
                  </div>
                  {meta.hasBadge && (
                    <span className="px-4 py-1.5 text-xs font-bold rounded-full bg-ember text-pure uppercase tracking-wider">
                      {badge}
                    </span>
                  )}
                </div>

                <h3 className="font-heading font-bold text-pure text-2xl sm:text-3xl mb-4">
                  {service.title}
                </h3>

                <p className="text-white/55 text-base leading-relaxed mb-8 max-w-xl">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2.5 mb-8">
                  {(service.features || []).map((feature: string, j: number) => (
                    <span
                      key={j}
                      className={`px-4 py-1.5 text-xs font-semibold rounded-full border ${meta.featureBorder} ${meta.featureText} ${meta.featureBg}`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <a
                  href={`/${locale}${service.href}`}
                  className={`inline-flex items-center gap-2.5 px-7 py-3.5 ${meta.ctaBg} text-pure font-semibold rounded-lg text-sm transition-all duration-300 group`}
                  data-testid={`button-service-cta-${index}`}
                >
                  {service.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              <div className="hidden md:flex flex-shrink-0 w-32 h-32 rounded-2xl bg-white/[0.03] border border-white/[0.06] items-center justify-center">
                <meta.icon className={`w-16 h-16 ${meta.iconColor} opacity-20`} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Services() {
  const { messages } = useTranslations("services");
  const { locale } = useI18n();
  const m = messages as any;
  const items = m.items || [];

  return (
    <section id="servicios" className="bg-obsidian-light" data-testid="section-servicios">
      <div className="pt-20 sm:pt-28 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 px-4 sm:px-6 lg:px-8"
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

      <div className="px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
        {items.map((service: any, i: number) => (
          <StackedCard
            key={i}
            service={service}
            meta={serviceMeta[i]}
            index={i}
            locale={locale}
            badge={m.badge}
          />
        ))}
      </div>
    </section>
  );
}
