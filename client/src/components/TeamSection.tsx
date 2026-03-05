import { motion } from "framer-motion";
import { useI18n } from "@/i18n/context";

const SUPABASE_BASE = "https://dcuvptwwtdhlepvcttvx.supabase.co/storage/v1/object/public/web-images";
const JOSE_LUIS_PHOTO = `${SUPABASE_BASE}/equipo/jose-luis_foto_v1.webp`;

// Icono LEX — balanza de justicia / normativa
function IconLex({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3"/>
      <line x1="24" y1="12" x2="24" y2="36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="14" y1="16" x2="34" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14 16 L11 24 C11 26.2 12.3 28 14 28 C15.7 28 17 26.2 17 24 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M34 16 L31 24 C31 26.2 32.3 28 34 28 C35.7 28 37 26.2 37 24 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <line x1="20" y1="36" x2="28" y2="36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

// Icono NOVA — circuito / automatización
function IconNova({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3"/>
      <rect x="18" y="18" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="24" y1="12" x2="24" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="24" y1="30" x2="24" y2="36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="12" y1="24" x2="18" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="30" y1="24" x2="36" y2="24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="24" cy="12" r="2" fill="currentColor"/>
      <circle cx="24" cy="36" r="2" fill="currentColor"/>
      <circle cx="12" cy="24" r="2" fill="currentColor"/>
      <circle cx="36" cy="24" r="2" fill="currentColor"/>
    </svg>
  );
}

// Icono ALMA — corazón con pulso / cuidado
function IconAlma({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3"/>
      <path d="M24 34 C24 34 13 27 13 20 C13 16.7 15.7 14 19 14 C21 14 22.8 15 24 16.5 C25.2 15 27 14 29 14 C32.3 14 35 16.7 35 20 C35 27 24 34 24 34Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M16 24 L19 21 L22 26 L25 22 L28 24 L31 22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const teamMembers = [
  {
    id: "jose-luis",
    name: "José Luis Echezarreta",
    role: {
      es: "Fundador y presidente",
      ca: "Fundador i president",
      en: "Founder and president",
      fr: "Fondateur et président",
    },
    description: {
      es: "30 años en transporte especial. El conocimiento humano detrás de todo lo que hacemos.",
      ca: "30 anys en transport especial. El coneixement humà darrere de tot el que fem.",
      en: "30 years in special transport. The human knowledge behind everything we do.",
      fr: "30 ans dans le transport spécial. La connaissance humaine derrière tout ce que nous faisons.",
    },
    cta: {
      es: "Conoce nuestra historia",
      ca: "Coneix la nostra història",
      en: "Our story",
      fr: "Notre histoire",
    },
    ctaHref: "/sobre-nosotros",
    isHuman: true,
    accentColor: "border-arctic/30",
    numberColor: "text-arctic",
    numberBg: "bg-arctic/10",
    ctaStyle: "border border-arctic/40 text-arctic hover:bg-arctic/10",
    Icon: null,
  },
  {
    id: "lex",
    name: "LEX",
    role: {
      es: "Agente IA · Normativa de Transporte",
      ca: "Agent IA · Normativa de Transport",
      en: "AI Agent · Transport Regulations",
      fr: "Agent IA · Réglementation Transport",
    },
    description: {
      es: "Preciso, metódico, cita siempre la fuente. Experto en normativa DGT, SCT y permisos especiales.",
      ca: "Precís, metòdic, cita sempre la font. Expert en normativa DGT, SCT i permisos especials.",
      en: "Precise, methodical, always cites the source. Expert in DGT, SCT regulations and special permits.",
      fr: "Précis, méthodique, cite toujours la source. Expert en réglementation DGT, SCT et permis spéciaux.",
    },
    cta: {
      es: "Pregunta al agente",
      ca: "Pregunta a l'agent",
      en: "Ask the agent",
      fr: "Interroger l'agent",
    },
    ctaHref: "#agente",
    isHuman: false,
    accentColor: "border-xpertblue/30",
    numberColor: "text-xpertblue",
    numberBg: "bg-xpertblue/10",
    ctaStyle: "bg-xpertblue text-pure hover:bg-xpertblue/90",
    Icon: IconLex,
  },
  {
    id: "nova",
    name: "NOVA",
    role: {
      es: "Agente IA · IA para PYMEs",
      ca: "Agent IA · IA per a PIMEs",
      en: "AI Agent · AI for SMEs",
      fr: "Agent IA · IA pour PME",
    },
    description: {
      es: "Curiosa, práctica, sin humo. Automatización e implementación de IA para empresas que quieren resultados reales.",
      ca: "Curiosa, pràctica, sense fum. Automatització i implementació d'IA per a empreses que volen resultats reals.",
      en: "Curious, practical, no fluff. Automation and AI implementation for businesses that want real results.",
      fr: "Curieuse, pratique, sans fioriture. Automatisation et implémentation d'IA pour les entreprises qui veulent de vrais résultats.",
    },
    cta: {
      es: "Pregunta al agente",
      ca: "Pregunta a l'agent",
      en: "Ask the agent",
      fr: "Interroger l'agent",
    },
    ctaHref: "#agente",
    isHuman: false,
    accentColor: "border-arctic/30",
    numberColor: "text-arctic",
    numberBg: "bg-arctic/10",
    ctaStyle: "bg-arctic text-obsidian hover:bg-arctic/90",
    Icon: IconNova,
  },
  {
    id: "alma",
    name: "ALMA",
    role: {
      es: "Agente IA · Formación Senior",
      ca: "Agent IA · Formació Sènior",
      en: "AI Agent · Senior Training",
      fr: "Agent IA · Formation Senior",
    },
    description: {
      es: "Paciente, cálida, sin jerga. Acompaña a personas mayores en su camino hacia la tecnología.",
      ca: "Pacient, càlida, sense argot. Acompanya persones grans en el seu camí cap a la tecnologia.",
      en: "Patient, warm, no jargon. Guides seniors on their journey towards technology.",
      fr: "Patiente, chaleureuse, sans jargon. Accompagne les seniors dans leur chemin vers la technologie.",
    },
    cta: {
      es: "Pregunta al agente",
      ca: "Pregunta a l'agent",
      en: "Ask the agent",
      fr: "Interroger l'agent",
    },
    ctaHref: "#agente",
    isHuman: false,
    accentColor: "border-ember/30",
    numberColor: "text-ember",
    numberBg: "bg-ember/10",
    ctaStyle: "bg-ember text-pure hover:bg-ember/90",
    Icon: IconAlma,
  },
];

const aiBadge = {
  es: "Agente IA",
  ca: "Agent IA",
  en: "AI Agent",
  fr: "Agent IA",
};

const sectionLabel = {
  es: "El equipo",
  ca: "L'equip",
  en: "The team",
  fr: "L'équipe",
};

const sectionTitle = {
  es: "El equipo que nunca para",
  ca: "L'equip que mai s'atura",
  en: "The team that never stops",
  fr: "L'équipe qui ne s'arrête jamais",
};

const sectionSubtitle = {
  es: "Experiencia humana real combinada con agentes de IA disponibles 24/7.",
  ca: "Experiència humana real combinada amb agents d'IA disponibles 24/7.",
  en: "Real human expertise combined with AI agents available 24/7.",
  fr: "Expertise humaine réelle combinée à des agents IA disponibles 24h/24.",
};

function JoseLuisAvatar() {
  return (
    <div className="relative w-16 h-16">
      <img
        src={JOSE_LUIS_PHOTO}
        alt="José Luis Echezarreta"
        className="w-16 h-16 rounded-full object-cover border-2 border-arctic/30"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
          const fallback = target.nextElementSibling as HTMLElement;
          if (fallback) fallback.style.display = "flex";
        }}
      />
      <div
        className="w-16 h-16 rounded-full bg-arctic/10 border border-arctic/30 items-center justify-center absolute inset-0"
        style={{ display: "none" }}
      >
        <span className="font-heading font-bold text-arctic text-xl">JL</span>
      </div>
    </div>
  );
}

export default function TeamSection() {
  const { locale } = useI18n();
  const lang = (locale as keyof typeof sectionTitle) || "es";

  const handleCta = (member: typeof teamMembers[0]) => {
    if (member.ctaHref === "#agente") {
      const el = document.querySelector("#contacto");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/${locale}${member.ctaHref}`;
    }
  };

  return (
    <section id="equipo" className="py-20 sm:py-28 bg-obsidian-light" data-testid="section-equipo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-arctic text-xs font-semibold tracking-widest uppercase">
            {sectionLabel[lang]}
          </span>
          <h2 className="font-heading font-bold text-pure text-3xl sm:text-4xl mt-4">
            {sectionTitle[lang]}
          </h2>
          <p className="mt-4 text-white/50 text-base max-w-xl mx-auto">
            {sectionSubtitle[lang]}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => {
            const Icon = member.Icon;
            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`relative flex flex-col rounded-xl border ${member.accentColor} bg-white/[0.02] p-6 transition-all duration-300 hover:bg-white/[0.04]`}
                data-testid={`card-team-${member.id}`}
              >
                {/* Avatar */}
                <div className="mb-5">
                  {member.isHuman ? (
                    <JoseLuisAvatar />
                  ) : (
                    <div className={`w-16 h-16 rounded-full ${member.numberBg} border ${member.accentColor} flex items-center justify-center`}>
                      {Icon && <Icon className={`w-8 h-8 ${member.numberColor}`} />}
                    </div>
                  )}
                </div>

                {/* Badge IA */}
                {!member.isHuman && (
                  <span className={`inline-flex self-start px-2.5 py-1 rounded-full text-xs font-semibold border mb-3 ${member.numberBg} ${member.numberColor}`}
                    style={{ borderColor: "currentColor", borderOpacity: 0.2 }}>
                    {aiBadge[lang]}
                  </span>
                )}

                {/* Nombre y rol */}
                <h3 className="font-heading font-bold text-pure text-base leading-tight mb-1">
                  {member.name}
                </h3>
                <p className={`text-xs font-medium mb-3 ${member.numberColor}`}>
                  {member.role[lang]}
                </p>

                {/* Descripción */}
                <p className="text-white/50 text-sm leading-relaxed flex-grow mb-6">
                  {member.description[lang]}
                </p>

                {/* CTA */}
                <button
                  onClick={() => handleCta(member)}
                  className={`w-full py-2.5 rounded-md text-sm font-semibold transition-all duration-200 ${member.ctaStyle}`}
                  data-testid={`button-team-${member.id}`}
                >
                  {member.cta[lang]}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
