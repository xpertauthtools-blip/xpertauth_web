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

function MarqueeCard({ item }: { item: (typeof marqueeItems)[0] }) {
  return (
    <div
      className="flex-shrink-0 w-[300px] sm:w-[340px] bg-white rounded-2xl border border-ember/10 shadow-sm p-5 flex gap-4 items-start"
      data-testid={`marquee-card-${item.name.toLowerCase()}`}
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 rounded-full object-cover border-2 border-ember/20 flex-shrink-0"
      />
      <div className="min-w-0">
        <span className="font-heading font-bold text-obsidian text-sm">{item.name}</span>
        <p className="mt-1 text-obsidian/60 text-[13px] leading-relaxed">{item.quote}</p>
      </div>
    </div>
  );
}

function Marquee() {
  const doubled = [...marqueeItems, ...marqueeItems];

  return (
    <div className="relative overflow-hidden py-2" data-testid="senior-marquee">
      <div
        className="flex gap-5 animate-marquee"
        style={{ width: "max-content" }}
      >
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
    <section id="formacion-senior" className="py-20 sm:py-28 bg-white relative" data-testid="section-senior-training">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ember/10 mb-6">
              <Heart className="w-4 h-4 text-ember" />
              <span className="text-ember text-xs font-bold tracking-wide uppercase">{m.badge}</span>
            </div>

            <h2 className="font-heading font-bold text-obsidian text-3xl sm:text-4xl lg:text-5xl leading-tight">
              {m.title1}<br /><span className="text-ember">{m.title2}</span>
            </h2>

            <p className="mt-6 text-obsidian/60 text-lg leading-relaxed">{m.description}</p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {features.map((f: string, i: number) => {
                const Icon = featureIcons[i];
                return (
                  <div key={i} className="flex items-center gap-3" data-testid={`feature-senior-${i}`}>
                    <div className="w-10 h-10 rounded-lg bg-ember/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-ember" />
                    </div>
                    <span className="text-obsidian/70 text-sm font-medium">{f}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-10">
              <span className="inline-flex px-5 py-2.5 bg-ember text-pure font-bold rounded-md text-sm uppercase tracking-wider">{m.free}</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-ember/10 via-ember/5 to-transparent" />
              <div className="absolute inset-4 rounded-xl border-2 border-dashed border-ember/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto rounded-full bg-ember/10 flex items-center justify-center mb-6">
                    <Heart className="w-12 h-12 text-ember" />
                  </div>
                  <h3 className="font-heading font-semibold text-obsidian text-xl mb-2">{m.illustrationTitle}</h3>
                  <p className="text-obsidian/50 text-sm leading-relaxed">{m.illustrationDescription}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

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
