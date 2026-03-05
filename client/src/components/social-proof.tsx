import { motion } from "framer-motion";
import { useTranslations } from "@/i18n/context";
import truckerImg from "@assets/stock_images/trucker_highway.jpg";
import officeImg from "@assets/stock_images/businesswoman_office.jpg";
import familyImg from "@assets/stock_images/family_senior.jpg";

const testimonialImages = [truckerImg, officeImg, familyImg];

export default function SocialProof() {
  const { messages } = useTranslations("socialProof");
  const m = messages as any;
  const stats = m.stats || [];
  const testimonials = m.testimonials || [];

  return (
    <section id="autoridad" className="py-20 sm:py-28 bg-obsidian" data-testid="section-social-proof">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-arctic text-xs font-semibold tracking-widest uppercase">{m.label}</span>
          <h2 className="font-heading font-bold text-pure text-3xl sm:text-4xl mt-4">{m.title}</h2>
          <p className="mt-4 text-white/50 text-base max-w-xl mx-auto">{m.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
          {stats.map((stat: any, i: number) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="text-center p-6 rounded-xl bg-white/[0.03] border border-white/[0.08]" data-testid={`stat-${i}`}>
              <div className="font-heading font-bold text-pure text-5xl sm:text-6xl">{stat.value}</div>
              <div className="mt-2 text-white/50 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              className="relative rounded-xl overflow-hidden min-h-[320px] flex flex-col justify-end group"
              data-testid={`testimonial-${i}`}
            >
              <img
                src={testimonialImages[i]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-obsidian/30" />
              <div className="relative z-10 p-6 sm:p-8">
                <p className="text-white/90 text-sm leading-relaxed italic mb-5">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <span className="text-arctic font-heading font-bold text-sm">{t.author?.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-pure text-sm">{t.author}</div>
                    <div className="text-white/50 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mt-16 text-center">
          <p className="text-white/30 text-xs uppercase tracking-widest mb-6">{m.partnersLabel}</p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {["Partner 1", "Partner 2", "Partner 3", "Partner 4"].map((p, i) => (
              <div key={i} className="w-24 h-10 rounded-md bg-white/[0.04] flex items-center justify-center">
                <span className="text-white/20 text-xs font-medium">{p}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
