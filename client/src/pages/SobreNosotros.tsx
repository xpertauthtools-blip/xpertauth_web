import { useEffect, useRef } from "react";
import { useI18n } from "../i18n/context";

// ─── TRADUCCIONES ────────────────────────────────────────────────────────────

const translations = {
  es: {
    hero: {
      titulo: "Conocimiento real.\nConstruido desde dentro.",
      subtitulo:
        "XpertAuth nació de 30 años en el sector del transporte especial y de una pregunta sencilla: ¿por qué el conocimiento experto sigue siendo inaccesible para quien más lo necesita?",
    },
    historia: {
      etiqueta: "Nuestra historia",
      parrafos: [
        "Llevo más de 30 años trabajando en el mundo del transporte especial por carretera, la mayor parte de ellos en Catalunya. He gestionado permisos, planificado rutas excepcionales y resuelto problemas que la normativa no siempre tiene claros. Lo aprendí todo sobre el terreno.",
        "Cuando llegó el momento de cerrar esa etapa, mi mente inquieta no supo quedarse quieta. Empecé a formarme en inteligencia artificial. Primero por curiosidad. Después con convicción.",
        "Fue entonces cuando lo vi claro. Las herramientas de IA que estaba estudiando podían transformar algo que siempre había sido un problema en el sector: el acceso al conocimiento normativo. Buscar entre cientos de páginas de reglamentos no es lo mismo que hablar con alguien que los conoce a fondo y te responde al instante. Eso era lo que la IA podía hacer. Y yo podía construirlo.",
        "Eso sí, con una condición innegociable: la IA siempre supervisada por personas. La inteligencia artificial es una herramienta extraordinaria, pero la experiencia humana —y el sentido común en la toma de decisiones— es y será siempre necesaria. En XpertAuth, los agentes no trabajan solos. Trabajan conmigo.",
        "Pero había otro problema que no podía ignorar. Las personas seniors se enfrentan cada día a barreras digitales que el resto damos por superadas. Usar la app del banco en lugar de ir a la ventanilla. Acceder a la Meva Salut. Usar el certificado electrónico, Cl@ve PIN o idCAT para cualquier trámite oficial. Para muchas personas, eso es un muro.",
        "Decidí que una parte importante de los ingresos de la asociación se destinaría a formaciones para seniors. Y que esas formaciones serían siempre gratuitas. Una condición innegociable.",
      ],
      firma: "José Luis Echezarreta — Fundador de XpertAuth",
    },
    mision: {
      etiqueta: "Misión",
      titulo: "Por qué existimos",
      texto:
        "XpertAuth es una asociación sin ánimo de lucro que combina experiencia humana real e inteligencia artificial para democratizar el acceso al conocimiento experto. Trabajamos en tres frentes: la gestión normativa del transporte especial, la adopción de la IA en PYMEs y autónomos, y la formación digital gratuita para personas seniors. Siempre con tecnología al servicio de las personas, nunca al revés.",
    },
    valores: {
      etiqueta: "Valores",
      titulo: "Lo que nos define",
      items: [
        {
          num: "01",
          titulo: "La formación senior, siempre gratuita",
          texto:
            "No es una decisión económica ni una estrategia de captación. Es un compromiso fundacional. Las personas seniors no deberían pagar por aprender a usar las herramientas que el resto del mundo ya da por sentadas.",
        },
        {
          num: "02",
          titulo: "Transparencia radical",
          texto:
            "Usamos inteligencia artificial y lo decimos abiertamente. Sabemos lo que la IA puede hacer y lo que no puede hacer. Y cuando no sabemos algo, también lo decimos.",
        },
        {
          num: "03",
          titulo: "La IA como herramienta, el humano como criterio",
          texto:
            "Los agentes de XpertAuth no trabajan solos. Cada respuesta está respaldada por experiencia real. La tecnología amplifica el conocimiento humano; no lo sustituye.",
        },
        {
          num: "04",
          titulo: "Empatía tecnológica",
          texto:
            "No todo el mundo llegó a la tecnología al mismo tiempo ni de la misma manera. En XpertAuth no juzgamos desde dónde empieza cada persona. Empezamos desde ahí.",
        },
      ],
    },
    cta: {
      titulo: "¿Quieres formar parte de esto?",
      subtitulo:
        "XpertAuth está en construcción, pero el rumbo está claro. Únete como socio o habla con nosotros si tienes alguna pregunta.",
      boton1: "Hazte socio",
      boton2: "Contacta con nosotros",
    },
  },

  ca: {
    hero: {
      titulo: "Coneixement real.\nConstruït des de dins.",
      subtitulo:
        "XpertAuth va néixer de 30 anys al sector del transport especial i d'una pregunta senzilla: per què el coneixement expert continua sent inaccessible per a qui més el necessita?",
    },
    historia: {
      etiqueta: "La nostra història",
      parrafos: [
        "Porto més de 30 anys treballant en el món del transport especial per carretera, la major part d'ells a Catalunya. He gestionat permisos, planificat rutes excepcionals i resolt problemes que la normativa no sempre té clars. Ho vaig aprendre tot sobre el terreny.",
        "Quan va arribar el moment de tancar aquella etapa, la meva ment inquieta no va saber quedar-se quieta. Vaig començar a formar-me en intel·ligència artificial. Primer per curiositat. Després amb convicció.",
        "Va ser llavors quan ho vaig veure clar. Les eines d'IA que estava estudiant podien transformar quelcom que sempre havia estat un problema al sector: l'accés al coneixement normatiu. Cercar entre centenars de pàgines de reglaments no és el mateix que parlar amb algú que els coneix a fons i et respon al moment. Això era el que la IA podia fer. I jo podia construir-ho.",
        "Això sí, amb una condició innegociable: la IA sempre supervisada per persones. La intel·ligència artificial és una eina extraordinària, però l'experiència humana —i el sentit comú en la presa de decisions— és i serà sempre necessària. A XpertAuth, els agents no treballen sols. Treballen amb mi.",
        "Però hi havia un altre problema que no podia ignorar. Les persones seniors s'enfronten cada dia a barreres digitals que la resta donem per superades. Usar l'app del banc en lloc d'anar a la finestreta. Accedir a la Meva Salut. Usar el certificat electrònic, Cl@ve PIN o idCAT per a qualsevol tràmit oficial. Per a moltes persones, això és un mur.",
        "Vaig decidir que una part important dels ingressos de l'associació es destinaria a formacions per a seniors. I que aquestes formacions serien sempre gratuïtes. Una condició innegociable.",
      ],
      firma: "José Luis Echezarreta — Fundador de XpertAuth",
    },
    mision: {
      etiqueta: "Missió",
      titulo: "Per què existim",
      texto:
        "XpertAuth és una associació sense ànim de lucre que combina experiència humana real i intel·ligència artificial per democratitzar l'accés al coneixement expert. Treballem en tres fronts: la gestió normativa del transport especial, l'adopció de la IA en PIMEs i autònoms, i la formació digital gratuïta per a persones seniors. Sempre amb tecnologia al servei de les persones, mai al revés.",
    },
    valores: {
      etiqueta: "Valors",
      titulo: "El que ens defineix",
      items: [
        {
          num: "01",
          titulo: "La formació senior, sempre gratuïta",
          texto:
            "No és una decisió econòmica ni una estratègia de captació. És un compromís fundacional. Les persones seniors no haurien de pagar per aprendre a usar les eines que la resta del món ja dona per descomptades.",
        },
        {
          num: "02",
          titulo: "Transparència radical",
          texto:
            "Usem intel·ligència artificial i ho diem obertament. Sabem el que la IA pot fer i el que no pot fer. I quan no sabem alguna cosa, també ho diem.",
        },
        {
          num: "03",
          titulo: "La IA com a eina, l'humà com a criteri",
          texto:
            "Els agents de XpertAuth no treballen sols. Cada resposta està avalada per experiència real. La tecnologia amplifica el coneixement humà; no el substitueix.",
        },
        {
          num: "04",
          titulo: "Empatia tecnològica",
          texto:
            "No tothom va arribar a la tecnologia al mateix temps ni de la mateixa manera. A XpertAuth no jutgem des d'on comença cada persona. Comencem des d'allà.",
        },
      ],
    },
    cta: {
      titulo: "Vols formar part d'això?",
      subtitulo:
        "XpertAuth està en construcció, però el rumb és clar. Uneix-te com a soci o parla amb nosaltres si tens alguna pregunta.",
      boton1: "Fes-te soci",
      boton2: "Contacta amb nosaltres",
    },
  },

  en: {
    hero: {
      titulo: "Real knowledge.\nBuilt from the inside.",
      subtitulo:
        "XpertAuth was born from 30 years in the special transport sector and a simple question: why is expert knowledge still out of reach for those who need it most?",
    },
    historia: {
      etiqueta: "Our story",
      parrafos: [
        "I've spent over 30 years working in special road transport, most of them in Catalonia. I've managed permits, planned exceptional routes and solved problems that regulations don't always make clear. I learned everything on the ground.",
        "When the time came to close that chapter, my restless mind couldn't stay still. I started training in artificial intelligence. First out of curiosity. Then out of conviction.",
        "That's when it became clear. The AI tools I was studying could transform something that had always been a problem in the sector: access to regulatory knowledge. Searching through hundreds of pages of regulations is not the same as talking to someone who knows them inside out and answers you instantly. That's what AI could do. And I could build it.",
        "But with one non-negotiable condition: AI always supervised by humans. Artificial intelligence is an extraordinary tool, but human experience —and common sense in decision-making— is and will always be necessary. At XpertAuth, agents don't work alone. They work with me.",
        "But there was another problem I couldn't ignore. Senior people face digital barriers every day that the rest of us take for granted. Using the bank app instead of going to the counter. Accessing health services online. Using digital certificates or official IDs for any administrative procedure. For many people, that's a wall.",
        "I decided that a significant part of the association's income would go towards training for seniors. And that this training would always be free. A non-negotiable condition.",
      ],
      firma: "José Luis Echezarreta — Founder of XpertAuth",
    },
    mision: {
      etiqueta: "Mission",
      titulo: "Why we exist",
      texto:
        "XpertAuth is a non-profit association that combines real human expertise and artificial intelligence to democratise access to expert knowledge. We work on three fronts: regulatory management in special transport, AI adoption in SMEs and freelancers, and free digital training for senior people. Always with technology serving people, never the other way around.",
    },
    valores: {
      etiqueta: "Values",
      titulo: "What defines us",
      items: [
        {
          num: "01",
          titulo: "Senior training, always free",
          texto:
            "This is not an economic decision or a marketing strategy. It's a founding commitment. Senior people shouldn't have to pay to learn to use tools that the rest of the world already takes for granted.",
        },
        {
          num: "02",
          titulo: "Radical transparency",
          texto:
            "We use artificial intelligence and we say so openly. We know what AI can do and what it can't. And when we don't know something, we say that too.",
        },
        {
          num: "03",
          titulo: "AI as a tool, humans as the judge",
          texto:
            "XpertAuth's agents don't work alone. Every answer is backed by real experience. Technology amplifies human knowledge; it doesn't replace it.",
        },
        {
          num: "04",
          titulo: "Technological empathy",
          texto:
            "Not everyone arrived at technology at the same time or in the same way. At XpertAuth we don't judge where each person starts from. We start from there.",
        },
      ],
    },
    cta: {
      titulo: "Want to be part of this?",
      subtitulo:
        "XpertAuth is still being built, but the direction is clear. Join as a member or talk to us if you have any questions.",
      boton1: "Become a member",
      boton2: "Contact us",
    },
  },

  fr: {
    hero: {
      titulo: "Un savoir réel.\nConstruit de l'intérieur.",
      subtitulo:
        "XpertAuth est né de 30 ans dans le secteur du transport spécial et d'une question simple : pourquoi l'expertise reste-t-elle inaccessible à ceux qui en ont le plus besoin ?",
    },
    historia: {
      etiqueta: "Notre histoire",
      parrafos: [
        "Je travaille depuis plus de 30 ans dans le transport spécial routier, la plupart du temps en Catalogne. J'ai géré des permis, planifié des itinéraires exceptionnels et résolu des problèmes que la réglementation ne clarifie pas toujours. J'ai tout appris sur le terrain.",
        "Quand est venu le moment de clore ce chapitre, mon esprit curieux n'a pas su rester tranquille. J'ai commencé à me former à l'intelligence artificielle. D'abord par curiosité. Puis par conviction.",
        "C'est là que tout est devenu clair. Les outils d'IA que j'étudiais pouvaient transformer quelque chose qui avait toujours été un problème dans le secteur : l'accès à la connaissance réglementaire. Chercher dans des centaines de pages de règlements n'est pas la même chose que parler à quelqu'un qui les connaît parfaitement et vous répond instantanément. C'est ce que l'IA pouvait faire. Et je pouvais le construire.",
        "Mais avec une condition non négociable : l'IA toujours supervisée par des humains. L'intelligence artificielle est un outil extraordinaire, mais l'expérience humaine —et le bon sens dans la prise de décision— est et sera toujours nécessaire. Chez XpertAuth, les agents ne travaillent pas seuls. Ils travaillent avec moi.",
        "Mais il y avait un autre problème que je ne pouvais pas ignorer. Les personnes seniors font face chaque jour à des barrières numériques que les autres considèrent comme surmontées. Utiliser l'application bancaire plutôt que d'aller au guichet. Accéder aux services de santé en ligne. Utiliser les certificats électroniques pour n'importe quelle démarche officielle. Pour beaucoup de personnes, c'est un mur.",
        "J'ai décidé qu'une part importante des revenus de l'association serait consacrée aux formations pour seniors. Et que ces formations seraient toujours gratuites. Une condition non négociable.",
      ],
      firma: "José Luis Echezarreta — Fondateur de XpertAuth",
    },
    mision: {
      etiqueta: "Mission",
      titulo: "Pourquoi nous existons",
      texto:
        "XpertAuth est une association à but non lucratif qui combine expertise humaine réelle et intelligence artificielle pour démocratiser l'accès au savoir expert. Nous travaillons sur trois fronts : la gestion réglementaire du transport spécial, l'adoption de l'IA dans les PME et les indépendants, et la formation numérique gratuite pour les personnes seniors. Toujours avec la technologie au service des personnes, jamais l'inverse.",
    },
    valores: {
      etiqueta: "Valeurs",
      titulo: "Ce qui nous définit",
      items: [
        {
          num: "01",
          titulo: "La formation senior, toujours gratuite",
          texto:
            "Ce n'est pas une décision économique ni une stratégie de marketing. C'est un engagement fondateur. Les personnes seniors ne devraient pas payer pour apprendre à utiliser des outils que le reste du monde considère déjà comme acquis.",
        },
        {
          num: "02",
          titulo: "Transparence radicale",
          texto:
            "Nous utilisons l'intelligence artificielle et nous le disons ouvertement. Nous savons ce que l'IA peut faire et ce qu'elle ne peut pas faire. Et quand nous ne savons pas quelque chose, nous le disons aussi.",
        },
        {
          num: "03",
          titulo: "L'IA comme outil, l'humain comme critère",
          texto:
            "Les agents de XpertAuth ne travaillent pas seuls. Chaque réponse est soutenue par une expérience réelle. La technologie amplifie la connaissance humaine ; elle ne la remplace pas.",
        },
        {
          num: "04",
          titulo: "Empathie technologique",
          texto:
            "Tout le monde n'est pas arrivé à la technologie au même moment ni de la même façon. Chez XpertAuth, nous ne jugeons pas le point de départ de chaque personne. Nous partons de là.",
        },
      ],
    },
    cta: {
      titulo: "Vous voulez faire partie de ceci ?",
      subtitulo:
        "XpertAuth est encore en construction, mais la direction est claire. Rejoignez-nous comme membre ou parlez-nous si vous avez des questions.",
      boton1: "Devenir membre",
      boton2: "Nous contacter",
    },
  },
};

// ─── URL FOTO JOSÉ LUIS ──────────────────────────────────────────────────────
const FOTO_URL =
  "https://dcuvptwwtdhlepvcttvx.supabase.co/storage/v1/object/public/web-images/equipo/jose-luis_foto_v1.webp";

// ─── COMPONENTE ──────────────────────────────────────────────────────────────

export default function SobreNosotros() {
  const { locale } = useI18n();
  const lang = locale as keyof typeof translations;
  const t = translations[lang] ?? translations.es;

  // Scroll suave al top al montar
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Refs para animaciones de entrada
  const heroRef = useRef<HTMLDivElement>(null);
  const historiaRef = useRef<HTMLDivElement>(null);
  const misionRef = useRef<HTMLDivElement>(null);
  const valoresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("sn-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const els = [
      heroRef.current,
      historiaRef.current,
      misionRef.current,
      valoresRef.current,
      ctaRef.current,
    ];
    els.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleContacto = () => {
    // Abre el ContactModal — misma lógica que el resto de la web
    const btn = document.querySelector<HTMLElement>("[data-open-contact]");
    if (btn) btn.click();
  };

  return (
    <>
      {/* ── ESTILOS ─────────────────────────────────────────────────────── */}
      <style>{`
        /* Animación de entrada */
        .sn-fade { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .sn-fade.sn-visible { opacity: 1; transform: translateY(0); }

        /* Degradado animado en títulos — igual que hero y cta-final */
        .sn-gradient-text {
          background: linear-gradient(135deg, #ffffff 0%, #4D9FEC 40%, #1B4FD8 70%, #ffffff 100%);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: sn-grad-move 6s ease infinite;
        }
        @keyframes sn-grad-move {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Línea decorativa numerada */
        .sn-num {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #1B4FD8;
        }

        /* Separador párrafos historia */
        .sn-parrafo + .sn-parrafo { margin-top: 1.5rem; }

        /* Valor card hover */
        .sn-valor-card {
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .sn-valor-card:hover {
          box-shadow: 0 8px 32px rgba(27,79,216,0.15);
          transform: translateY(-3px);
        }

        /* Botón primario */
        .sn-btn-primary {
          background: #1B4FD8;
          color: #fff;
          border-radius: 0.5rem;
          padding: 0.875rem 2rem;
          font-weight: 600;
          font-size: 0.95rem;
          transition: background 0.2s ease, transform 0.2s ease;
          display: inline-block;
          cursor: pointer;
          border: none;
        }
        .sn-btn-primary:hover { background: #1641b0; transform: translateY(-2px); }

        /* Botón secundario */
        .sn-btn-secondary {
          background: transparent;
          color: #fff;
          border: 1.5px solid rgba(255,255,255,0.5);
          border-radius: 0.5rem;
          padding: 0.875rem 2rem;
          font-weight: 600;
          font-size: 0.95rem;
          transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
          display: inline-block;
          cursor: pointer;
        }
        .sn-btn-secondary:hover {
          border-color: #fff;
          background: rgba(255,255,255,0.08);
          transform: translateY(-2px);
        }

        /* Foto José Luis */
        .sn-foto {
          width: 100%;
          max-width: 380px;
          border-radius: 1rem;
          object-fit: cover;
          aspect-ratio: 3/4;
          box-shadow: 0 20px 60px rgba(0,0,0,0.18);
        }

        /* Etiqueta de sección */
        .sn-label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #4D9FEC;
        }
      `}</style>

      <main style={{ fontFamily: "'Sora', 'Inter', sans-serif" }}>

        {/* ══════════════════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════════════════ */}
        <section
          ref={heroRef}
          className="sn-fade"
          style={{
            background: "#0A0E1A",
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            padding: "120px 24px 80px",
          }}
        >
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            <h1
              className="sn-gradient-text"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: "1.5rem",
                whiteSpace: "pre-line",
              }}
            >
              {t.hero.titulo}
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                lineHeight: 1.75,
                maxWidth: 620,
                margin: "0 auto",
              }}
            >
              {t.hero.subtitulo}
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            HISTORIA
        ══════════════════════════════════════════════════════════════════ */}
        <section
          ref={historiaRef}
          className="sn-fade"
          style={{
            background: "#F4F6FA",
            padding: "80px 24px",
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "start",
            }}
            className="sn-historia-grid"
          >
            {/* Columna foto */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={FOTO_URL}
                alt="José Luis Echezarreta"
                className="sn-foto"
                onError={(e) => {
                  // Fallback si no carga la foto
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              {/* Fallback iniciales */}
              <div
                style={{
                  display: "none",
                  width: 280,
                  height: 380,
                  borderRadius: "1rem",
                  background: "#1B4FD8",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "3rem",
                  fontWeight: 800,
                  color: "#fff",
                }}
              >
                JL
              </div>
            </div>

            {/* Columna texto */}
            <div>
              <p className="sn-label" style={{ marginBottom: "1rem" }}>
                {t.historia.etiqueta}
              </p>
              <div>
                {t.historia.parrafos.map((p, i) => (
                  <p
                    key={i}
                    className="sn-parrafo"
                    style={{
                      color: "#2d3748",
                      fontSize: "1rem",
                      lineHeight: 1.8,
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>
              <p
                style={{
                  marginTop: "2rem",
                  color: "#1B4FD8",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  fontStyle: "italic",
                }}
              >
                {t.historia.firma}
              </p>
            </div>
          </div>

          {/* Responsive: en móvil columna única */}
          <style>{`
            @media (max-width: 768px) {
              .sn-historia-grid {
                grid-template-columns: 1fr !important;
                gap: 2rem !important;
              }
              .sn-foto { max-width: 260px !important; }
            }
          `}</style>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            MISIÓN
        ══════════════════════════════════════════════════════════════════ */}
        <section
          ref={misionRef}
          className="sn-fade"
          style={{
            background: "#fff",
            padding: "80px 24px",
          }}
        >
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            <p className="sn-label" style={{ marginBottom: "1rem" }}>
              {t.mision.etiqueta}
            </p>
            <h2
              className="sn-gradient-text"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 800,
                marginBottom: "1.5rem",
                lineHeight: 1.2,
              }}
            >
              {t.mision.titulo}
            </h2>
            <p
              style={{
                color: "#4a5568",
                fontSize: "1.05rem",
                lineHeight: 1.85,
                maxWidth: 680,
                margin: "0 auto",
              }}
            >
              {t.mision.texto}
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            VALORES
        ══════════════════════════════════════════════════════════════════ */}
        <section
          ref={valoresRef}
          className="sn-fade"
          style={{
            background: "#F4F6FA",
            padding: "80px 24px",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <p className="sn-label" style={{ marginBottom: "1rem" }}>
                {t.valores.etiqueta}
              </p>
              <h2
                className="sn-gradient-text"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  fontWeight: 800,
                  lineHeight: 1.2,
                }}
              >
                {t.valores.titulo}
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {t.valores.items.map((v) => (
                <div
                  key={v.num}
                  className="sn-valor-card"
                  style={{
                    background: "#fff",
                    borderRadius: "1rem",
                    padding: "2rem",
                    border: "1px solid rgba(27,79,216,0.08)",
                  }}
                >
                  <p className="sn-num" style={{ marginBottom: "0.75rem" }}>
                    {v.num}
                  </p>
                  <h3
                    style={{
                      color: "#0A0E1A",
                      fontWeight: 700,
                      fontSize: "1rem",
                      lineHeight: 1.4,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {v.titulo}
                  </h3>
                  <p
                    style={{
                      color: "#4a5568",
                      fontSize: "0.9rem",
                      lineHeight: 1.75,
                    }}
                  >
                    {v.texto}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            CTA FINAL
        ══════════════════════════════════════════════════════════════════ */}
        <section
          ref={ctaRef}
          className="sn-fade"
          style={{
            background: "#0A0E1A",
            padding: "80px 24px",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <h2
              className="sn-gradient-text"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 800,
                lineHeight: 1.2,
                marginBottom: "1.25rem",
              }}
            >
              {t.cta.titulo}
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "1.05rem",
                lineHeight: 1.75,
                marginBottom: "2.5rem",
              }}
            >
              {t.cta.subtitulo}
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                className="sn-btn-primary"
                onClick={() => {
                  window.location.href = `/${locale}/socios`;
                }}
              >
                {t.cta.boton1}
              </button>
              <button
                className="sn-btn-secondary"
                onClick={handleContacto}
              >
                {t.cta.boton2}
              </button>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
