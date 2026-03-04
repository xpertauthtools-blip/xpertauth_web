import { motion } from "framer-motion";
import { Heart, Users, MapPin, Clock, Smartphone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const features = [
  { icon: Users, label: "Grupos máx. 6 personas" },
  { icon: MapPin, label: "Formación presencial" },
  { icon: Clock, label: "A tu ritmo, sin prisas" },
  { icon: Smartphone, label: "Desde lo más básico" },
];

export default function SeniorTraining() {
  return (
    <section
      id="formacion-senior"
      className="py-20 sm:py-28 bg-white relative"
      data-testid="section-senior-training"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ember/10 mb-6">
              <Heart className="w-4 h-4 text-ember" />
              <span className="text-ember text-xs font-bold tracking-wide uppercase">
                Programa social
              </span>
            </div>

            <h2 className="font-heading font-bold text-obsidian text-3xl sm:text-4xl lg:text-5xl leading-tight">
              La tecnología no es
              <br />
              <span className="text-ember">cosa de jóvenes.</span>
            </h2>

            <p className="mt-6 text-obsidian/60 text-lg leading-relaxed">
              Nuestro programa de alfabetización digital está diseñado
              específicamente para personas mayores que quieren aprender a usar la
              tecnología sin estrés, sin prisas y sin coste.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3" data-testid={`feature-senior-${i}`}>
                  <div className="w-10 h-10 rounded-lg bg-ember/10 flex items-center justify-center flex-shrink-0">
                    <f.icon className="w-5 h-5 text-ember" />
                  </div>
                  <span className="text-obsidian/70 text-sm font-medium">{f.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
              <span className="inline-flex px-5 py-2.5 bg-ember text-pure font-bold rounded-md text-sm uppercase tracking-wider">
                100% Gratuito
              </span>
              <a
                href="https://wa.me/34625897546"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white font-semibold rounded-md text-sm transition-all duration-200"
                data-testid="link-whatsapp-senior"
              >
                <SiWhatsapp className="w-5 h-5" />
                Contactar por WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-ember/10 via-ember/5 to-transparent" />
              <div className="absolute inset-4 rounded-xl border-2 border-dashed border-ember/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto rounded-full bg-ember/10 flex items-center justify-center mb-6">
                    <Heart className="w-12 h-12 text-ember" />
                  </div>
                  <h3 className="font-heading font-semibold text-obsidian text-xl mb-2">
                    Aprender juntos
                  </h3>
                  <p className="text-obsidian/50 text-sm leading-relaxed">
                    Clases presenciales donde cada persona avanza a su propio ritmo,
                    acompañada por formadores con paciencia infinita.
                  </p>
                  <div className="mt-6 flex items-center justify-center gap-2">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <div
                        key={n}
                        className="w-8 h-8 rounded-full bg-ember/10 border-2 border-white flex items-center justify-center -ml-1 first:ml-0"
                      >
                        <span className="text-ember text-[10px] font-bold">{n}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-obsidian/30 text-xs">Máx. 6 personas por grupo</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <a
        href="https://wa.me/34625897546"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-110"
        data-testid="button-whatsapp-float"
        aria-label="Contactar por WhatsApp"
      >
        <SiWhatsapp className="w-7 h-7 text-white" />
      </a>
    </section>
  );
}
