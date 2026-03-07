import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Users, MapPin, Clock, Smartphone } from "lucide-react";
import { useTranslations } from "@/i18n/context";

const SUPABASE_BASE = "https://dcuvptwwtdhlepvcttvx.supabase.co/storage/v1/object/public/web-images";

const featureIcons = [Users, MapPin, Clock, Smartphone];

const marqueeItems = [
  {
    name: "Antonio",
    image: `${SUPABASE_BASE}/senior-training/senior_antonio_v1.webp`,
    quote: "Descubrió que podía identificar enfermedades de sus plantas con el móvil",
  },
  {
    name: "Rosa",
    image: `${SUPABASE_BASE}/senior-training/senior_rosa_v1.webp`,
    quote: "Habla por videollamada con sus nietos cada domingo",
  },
  {
    name: "Manuel",
    image: `${SUPABASE_BASE}/senior-training/senior_manuel_v1.webp`,
    quote: "Aprendió a hacer sus gestiones del banco sin salir de casa",
  },
  {
    name: "Carmen",
    image: `${SUPABASE_BASE}/senior-training/senior_carmen_v1.webp`,
    quote: "Encontró todas sus fotos antiguas digitalizadas",
  },
  {
    name: "Paco",
    image: `${SUPABASE_BASE}/senior-training/senior_paco_v1.webp`,
    quote: "Ya no necesita que nadie le ayude con el móvil",
  },
  {
    name: "Dolores",
    image: `${SUPABASE_BASE}/senior-training/senior_dolores_v1.webp`,
    quote: "Aprendió a usar WhatsApp y no para de enviar audios",
  },
];

// — Contador animado —
function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

const stats = [
  { value: 100, suffix: "%", label: "Gratuito para los asistentes" },
  { value: 3, suffix: "h", label: "Sesiones prácticas por módulo" },
  { value: 3, suffix: " meses", label: "De seguimiento incluido" },
];

function AnimatedStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-3 gap-6 p-8 rounded-2xl border border-white/10 bg-white/5">
      {stats.map((s, i) => {
        const count = useCountUp(s.value, 1200, active);
        return (
          <div key={i} className="text-center">
            <div className="font-heading font-bold text-4xl sm:text-5xl text-ember">
              {count}{s.suffix}
            </div>
            <p className="mt-2 text-white/50 text-xs sm:text-sm leading-snug">{s.label}</p>
          </div>
        );
      })}
    </div>
  );
}

function MarqueeCard({ item }: { item: (typeof marqueeItems)[0] }) {
  return (
    <div
      className="flex-shrink-0 w-[300px] sm:w-[340px] bg-white/5 rounded-2xl border border-white/10 p-5 flex gap-4 items-start"
      data-testid={`marquee-card-${item.name.toLowerCase()}`}
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 rounded-full object-cover border-2 border-ember/40 flex-shrink-0"
      />
      <div className="min-w-0">
        <span className="font-heading font-bold text-white text-sm">{item.name}</span>
        <p className="mt-1 text-white/50 text-[13px] leading-relaxed">{item.quote}</p>
      </div>
    </div>
  );
}

function Marquee() {
  const doubled = [...marqueeItems, ...marqueeItems];
  return (
    <div className="relative overflow-hidden py-2" data-testid="senior-marquee">
      <div className="flex gap-5 animate-marquee" style={{ width: "max-content" }}>
        {doubled.map((item, i) => (
          <MarqueeCard key={`${item.name}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function SeniorTraining() {
  const { messages } = useTranslations("seniorTraining");
  const m = messages as any;
  const features = m.features || [];

  return (
    <section id="formacion-senior" className="py-20 sm:py-28 bg-obsidian relative" data-testid="section-senior-training">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">

          {/* Columna izquierda — texto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ember/15 mb-6">
              <Heart className="w-4 h-4 text-ember" />
              <span className="text-ember text-xs font-bold tracking-wide uppercase">{m.badge}</span>
            </div>

            <h2 className="font-heading font-bold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight">
              {m.title1}<br /><span className="text-ember">{m.title2}</span>
            </h2>

            <p className="mt-6 text-white/60 text-lg leading-relaxed">{m.description}</p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {features.map((f: string, i: number) => {
                const Icon = featureIcons[i];
                return (
                  <div key={i} className="flex items-center gap-3" data-testid={`feature-senior-${i}`}>
                    <div className="w-10 h-10 rounded-lg bg-ember/15 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-ember" />
                    </div>
                    <span className="text-white/70 text-sm font-medium">{f}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-10">
              <span className="inline-flex px-5 py-2.5 bg-ember text-white font-bold rounded-md text-sm uppercase tracking-wider">
                {m.free}
              </span>
            </div>
          </motion.div>

          {/* Columna derecha — contador animado */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <AnimatedStats />
          </motion.div>

        </div>
      </div>

      {/* Marquee de alumnos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <Marquee />
      </motion.div>
    </section>
  );
}
