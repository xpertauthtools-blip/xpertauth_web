import { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n/context";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ContactModal from "@/components/ContactModal";
import { cn } from "@/lib/utils";

// ─── TRADUCCIONES ─────────────────────────────────────────────────────────────

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
      fotoAlt: "José Luis Echezarreta — Fundador de XpertAuth (placeholder)",
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
      hint: "Haz clic en una tarjeta para leerla",
      items: [
        {
          num: "01",
          titulo: "La formación senior, siempre gratuita",
          texto: "No es una decisión económica ni una estrategia de captación. Es un compromiso fundacional. Las personas seniors no deberían pagar por aprender a usar las herramientas que el resto del mundo ya da por sentadas.",
        },
        {
          num: "02",
          titulo: "Transparencia radical",
          texto: "Usamos inteligencia artificial y lo decimos abiertamente. Sabemos lo que la IA puede hacer y lo que no puede hacer. Y cuando no sabemos algo, también lo decimos.",
        },
        {
          num: "03",
          titulo: "La IA como herramienta, el humano como criterio",
          texto: "Los agentes de XpertAuth no trabajan solos. Cada respuesta está respaldada por experiencia real. La tecnología amplifica el conocimiento humano; no lo sustituye.",
        },
        {
          num: "04",
          titulo: "Empatía tecnológica",
          texto: "No todo el mundo llegó a la tecnología al mismo tiempo ni de la misma manera. En XpertAuth no juzgamos desde dónde empieza cada persona. Empezamos desde ahí.",
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
      fotoAlt: "José Luis Echezarreta — Fundador de XpertAuth (placeholder)",
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
      hint: "Fes clic en una targeta per llegir-la",
      items: [
        {
          num: "01",
          titulo: "La formació senior, sempre gratuïta",
          texto: "No és una decisió econòmica ni una estratègia de captació. És un compromís fundacional. Les persones seniors no haurien de pagar per aprendre a usar les eines que la resta del món ja dona per descomptades.",
        },
        {
          num: "02",
          titulo: "Transparència radical",
          texto: "Usem intel·ligència artificial i ho diem obertament. Sabem el que la IA pot fer i el que no pot fer. I quan no sabem alguna cosa, també ho diem.",
        },
        {
          num: "03",
          titulo: "La IA com a eina, l'humà com a criteri",
          texto: "Els agents de XpertAuth no treballen sols. Cada resposta està avalada per experiència real. La tecnologia amplifica el coneixement humà; no el substitueix.",
        },
        {
          num: "04",
          titulo: "Empatia tecnològica",
          texto: "No tothom va arribar a la tecnologia al mateix temps ni de la mateixa manera. A XpertAuth no jutgem des d'on comença cada persona. Comencem des d'allà.",
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
      fotoAlt: "José Luis Echezarreta — Founder of XpertAuth (placeholder)",
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
      hint: "Click a card to read it",
      items: [
        {
          num: "01",
          titulo: "Senior training, always free",
          texto: "This is not an economic decision or a marketing strategy. It's a founding commitment. Senior people shouldn't have to pay to learn to use tools that the rest of the world already takes for granted.",
        },
        {
          num: "02",
          titulo: "Radical transparency",
          texto: "We use artificial intelligence and we say so openly. We know what AI can do and what it can't. And when we don't know something, we say that too.",
        },
        {
          num: "03",
          titulo: "AI as a tool, humans as the judge",
          texto: "XpertAuth's agents don't work alone. Every answer is backed by real experience. Technology amplifies human knowledge; it doesn't replace it.",
        },
        {
          num: "04",
          titulo: "Technological empathy",
          texto: "Not everyone arrived at technology at the same time or in the same way. At XpertAuth we don't judge where each person starts from. We start from there.",
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
        "Mais il y avait un autre problème que je ne pouvais pas ignorer. Les personnes seniors font face chaque jour à des barrières numériques que les autres considèrent comme surmontées. Utiliser l'application bancaire plutôt que d'aller au guichet. Accéder à la Meva Salut. Utiliser les certificats électroniques pour n'importe quelle démarche officielle. Pour beaucoup de personnes, c'est un mur.",
        "J'ai décidé qu'une part importante des revenus de l'association serait consacrée aux formations pour seniors. Et que ces formations seraient toujours gratuites. Une condition non négociable.",
      ],
      firma: "José Luis Echezarreta — Fondateur de XpertAuth",
      fotoAlt: "José Luis Echezarreta — Fondateur de XpertAuth (placeholder)",
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
      hint: "Cliquez sur une carte pour la lire",
      items: [
        {
          num: "01",
          titulo: "La formation senior, toujours gratuite",
          texto: "Ce n'est pas une décision économique ni une stratégie de marketing. C'est un engagement fondateur. Les personnes seniors ne devraient pas payer pour apprendre à utiliser des outils que le reste du monde considère déjà comme acquis.",
        },
        {
          num: "02",
          titulo: "Transparence radicale",
          texto: "Nous utilisons l'intelligence artificielle et nous le disons ouvertement. Nous savons ce que l'IA peut faire et ce qu'elle ne peut pas faire. Et quand nous ne savons pas quelque chose, nous le disons aussi.",
        },
        {
          num: "03",
          titulo: "L'IA comme outil, l'humain comme critère",
          texto: "Les agents de XpertAuth ne travaillent pas seuls. Chaque réponse est soutenue par une expérience réelle. La technologie amplifie la connaissance humaine ; elle ne la remplace pas.",
        },
        {
          num: "04",
          titulo: "Empathie technologique",
          texto: "Tout le monde n'est pas arrivé à la technologie au même moment ni de la même façon. Chez XpertAuth, nous ne jugeons pas le point de départ de chaque personne. Nous partons de là.",
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

// ─── PLACEHOLDER foto — sustituir por foto real cuando esté disponible ─────────
const FOTO_URL =
  "https://dcuvptwwtdhlepvcttvx.supabase.co/storage/v1/object/public/web-images/equipo/jose-luis_foto_v1.webp";

// ─── DISPLAY CARDS CON CLIC AL FRENTE ────────────────────────────────────────

interface ValorItem {
  num: string;
  titulo: string;
  texto: string;
}

function ValoresStack({ items, hint }: { items: ValorItem[]; hint: string }) {
  // orden[0] = índice de la tarjeta que está al frente
  // Empezamos con [0,1,2,3] → tarjeta 01 al frente
  const [order, setOrder] = useState([0, 1, 2, 3]);

  // Al hacer clic en una tarjeta, la trae al frente
  function traerAlFrente(idx: number) {
    setOrder((prev) => {
      const rest = prev.filter((i) => i !== idx);
      return [idx, ...rest];
    });
  }

  // Posiciones de cada slot en la pila (de atrás hacia delante)
  const slotStyle = (slot: number): React.CSSProperties => {
    // slot 0 = frente, slot 3 = fondo
    const offsetX = (3 - slot) * 28;
    const offsetY = (3 - slot) * 20;
    return {
      position: "absolute",
      transform: `translateX(${offsetX}px) translateY(${offsetY}px) skewY(-6deg)`,
      zIndex: slot + 1,
      transition: "transform 0.45s cubic-bezier(0.34,1.56,0.64,1), z-index 0s",
      cursor: slot === 0 ? "default" : "pointer",
    };
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
      {/* Pila de tarjetas */}
      <div
        style={{
          position: "relative",
          width: "26rem",
          height: "13rem",
          marginBottom: "3rem",
        }}
      >
        {/* Renderizamos de atrás hacia delante: order[3] primero, order[0] último */}
        {[...order].reverse().map((itemIdx, renderPos) => {
          const slot = order.length - 1 - renderPos; // slot real (0=frente)
          const item = items[itemIdx];
          const isFrente = slot === 0;

          return (
            <div
              key={itemIdx}
              style={slotStyle(slot)}
              onClick={() => !isFrente && traerAlFrente(itemIdx)}
            >
              <div
                style={{
                  width: "24rem",
                  height: "11rem",
                  borderRadius: "0.875rem",
                  border: isFrente
                    ? "1px solid rgba(77,159,236,0.4)"
                    : "1px solid rgba(255,255,255,0.08)",
                  background: isFrente
                    ? "rgba(27,79,216,0.12)"
                    : "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(8px)",
                  padding: "1.25rem 1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: isFrente
                    ? "0 8px 32px rgba(27,79,216,0.2)"
                    : "none",
                  transition: "border 0.3s, background 0.3s, box-shadow 0.3s",
                  filter: isFrente ? "none" : "brightness(0.6)",
                }}
              >
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "#4D9FEC",
                  }}
                >
                  {item.num}
                </span>
                <p
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: "#fff",
                    lineHeight: 1.4,
                  }}
                >
                  {item.titulo}
                </p>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.65,
                  }}
                >
                  {item.texto}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Indicadores de navegación */}
      <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => traerAlFrente(idx)}
            style={{
              width: order[0] === idx ? "2rem" : "0.5rem",
              height: "0.5rem",
              borderRadius: "9999px",
              background: order[0] === idx ? "#1B4FD8" : "rgba(255,255,255,0.2)",
              border: "none",
              cursor: "pointer",
              transition: "width 0.3s, background 0.3s",
              padding: 0,
            }}
            title={item.num}
          />
        ))}
      </div>

      {/* Hint */}
      <p
        style={{
          fontSize: "0.72rem",
          color: "rgba(255,255,255,0.3)",
          letterSpacing: "0.05em",
          marginTop: "0.25rem",
        }}
      >
        {hint}
      </p>
    </div>
  );
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────

export default function SobreNosotros() {
  const { locale } = useI18n();
  const lang = locale as keyof typeof translations;
  const t = translations[lang] ?? translations.es;

  // ContactModal propio
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Animaciones entrada
  const heroRef    = useRef<HTMLElement>(null);
  const historiaRef = useRef<HTMLElement>(null);
  const misionRef  = useRef<HTMLElement>(null);
  const valoresRef = useRef<HTMLElement>(null);
  const ctaRef     = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("sn-visible");
      }),
      { threshold: 0.1 }
    );
    [heroRef, historiaRef, misionRef, valoresRef, ctaRef].forEach(
      (r) => r.current && observer.observe(r.current)
    );
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .sn-fade { opacity:0; transform:translateY(28px); transition:opacity .7s ease,transform .7s ease; }
        .sn-fade.sn-visible { opacity:1; transform:translateY(0); }

        /* Degradado animado — igual que hero y cta-final */
        .sn-grad {
          background: linear-gradient(135deg,#ffffff 0%,#4D9FEC 40%,#1B4FD8 70%,#ffffff 100%);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: snGrad 6s ease infinite;
        }
        @keyframes snGrad {
          0%   { background-position:0% 50%; }
          50%  { background-position:100% 50%; }
          100% { background-position:0% 50%; }
        }

        /* Foto B&N → color en hover */
        .sn-foto {
          width:100%; max-width:320px; aspect-ratio:3/4; object-fit:cover;
          border-radius:1rem;
          filter:grayscale(100%);
          transition:filter .6s ease,transform .6s ease;
          box-shadow:0 20px 60px rgba(0,0,0,.35);
          display:block;
          cursor:pointer;
        }
        .sn-foto:hover { filter:grayscale(0%); transform:scale(1.02); }

        /* Etiqueta sección */
        .sn-label {
          display:block; font-size:.7rem; font-weight:700;
          letter-spacing:.15em; text-transform:uppercase;
          color:#4D9FEC; margin-bottom:.75rem;
        }

        /* Párrafos historia */
        .sn-p + .sn-p { margin-top:1.25rem; }

        /* Botones */
        .sn-btn-1 {
          background:#1B4FD8; color:#fff; border:none;
          border-radius:.5rem; padding:.875rem 2rem;
          font-family:'Sora',sans-serif; font-weight:600; font-size:.95rem;
          cursor:pointer; transition:background .2s,transform .2s;
        }
        .sn-btn-1:hover { background:#1641b0; transform:translateY(-2px); }

        .sn-btn-2 {
          background:transparent; color:#fff;
          border:1.5px solid rgba(255,255,255,.4);
          border-radius:.5rem; padding:.875rem 2rem;
          font-family:'Sora',sans-serif; font-weight:600; font-size:.95rem;
          cursor:pointer; transition:border-color .2s,background .2s,transform .2s;
        }
        .sn-btn-2:hover { border-color:#fff; background:rgba(255,255,255,.07); transform:translateY(-2px); }

        /* Separador secciones */
        .sn-sep { border:none; border-top:1px solid rgba(255,255,255,.07); margin:0; }

        /* Responsive */
        @media(max-width:768px){
          .sn-grid-historia { grid-template-columns:1fr !important; }
          .sn-foto { max-width:200px !important; margin:0 auto; }
          .sn-stack-wrap { transform:scale(.65) !important; transform-origin:top center; }
        }
      `}</style>

      {/* NAVBAR */}
      <Navbar />

      <main style={{ fontFamily:"'Sora','Inter',sans-serif" }}>

        {/* ══ HERO ══════════════════════════════════════════════════════ */}
        <section
          ref={heroRef}
          className="sn-fade"
          style={{
            background:"#0A0E1A",
            minHeight:"55vh",
            display:"flex",
            alignItems:"center",
            padding:"140px 24px 80px",
          }}
        >
          <div style={{ maxWidth:760, margin:"0 auto", textAlign:"center" }}>
            <h1
              className="sn-grad"
              style={{
                fontSize:"clamp(2rem,5vw,3.4rem)",
                fontWeight:800,
                lineHeight:1.15,
                marginBottom:"1.5rem",
                whiteSpace:"pre-line",
              }}
            >
              {t.hero.titulo}
            </h1>
            <p style={{
              color:"rgba(255,255,255,.6)",
              fontSize:"clamp(.95rem,2vw,1.15rem)",
              lineHeight:1.8,
              maxWidth:620,
              margin:"0 auto",
            }}>
              {t.hero.subtitulo}
            </p>
          </div>
        </section>

        {/* ══ HISTORIA ══════════════════════════════════════════════════ */}
        <section
          ref={historiaRef}
          className="sn-fade"
          style={{ background:"#0A0E1A", padding:"80px 24px" }}
        >
          <hr className="sn-sep" />
          <div style={{ height:"80px" }} />
          <div
            className="sn-grid-historia"
            style={{
              maxWidth:1100,
              margin:"0 auto",
              display:"grid",
              gridTemplateColumns:"1fr 1.4fr",
              gap:"4rem",
              alignItems:"start",
            }}
          >
            {/* Foto */}
            <div style={{ display:"flex", justifyContent:"center" }}>
              <img
                src={FOTO_URL}
                alt={t.historia.fotoAlt}
                className="sn-foto"
                onError={(e) => {
                  const el = e.currentTarget;
                  el.style.display = "none";
                  const fb = el.nextElementSibling as HTMLElement;
                  if (fb) fb.style.display = "flex";
                }}
              />
              {/* Fallback iniciales */}
              <div style={{
                display:"none", width:280, height:373, borderRadius:"1rem",
                background:"#1B4FD8", alignItems:"center", justifyContent:"center",
                fontSize:"3rem", fontWeight:800, color:"#fff",
              }}>
                JL
              </div>
            </div>

            {/* Texto */}
            <div>
              <span className="sn-label">{t.historia.etiqueta}</span>
              {t.historia.parrafos.map((p, i) => (
                <p key={i} className="sn-p" style={{ color:"rgba(255,255,255,.75)", fontSize:".97rem", lineHeight:1.85 }}>
                  {p}
                </p>
              ))}
              <p style={{ marginTop:"2rem", color:"#4D9FEC", fontWeight:700, fontSize:".88rem", fontStyle:"italic" }}>
                {t.historia.firma}
              </p>
            </div>
          </div>
        </section>

        {/* ══ MISIÓN ════════════════════════════════════════════════════ */}
        <section
          ref={misionRef}
          className="sn-fade"
          style={{ background:"#0F1628", padding:"80px 24px" }}
        >
          <div style={{ maxWidth:720, margin:"0 auto", textAlign:"center" }}>
            <span className="sn-label">{t.mision.etiqueta}</span>
            <h2
              className="sn-grad"
              style={{
                fontSize:"clamp(1.7rem,3.5vw,2.6rem)",
                fontWeight:800,
                lineHeight:1.2,
                marginBottom:"1.5rem",
              }}
            >
              {t.mision.titulo}
            </h2>
            <p style={{ color:"rgba(255,255,255,.6)", fontSize:"1.02rem", lineHeight:1.9 }}>
              {t.mision.texto}
            </p>
          </div>
        </section>

        {/* ══ VALORES — Display Cards clicables ═════════════════════════ */}
        <section
          ref={valoresRef}
          className="sn-fade"
          style={{ background:"#0A0E1A", padding:"80px 24px 140px" }}
        >
          <hr className="sn-sep" />
          <div style={{ height:"80px" }} />
          <div style={{ maxWidth:1100, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:"4rem" }}>
              <span className="sn-label">{t.valores.etiqueta}</span>
              <h2
                className="sn-grad"
                style={{
                  fontSize:"clamp(1.7rem,3.5vw,2.6rem)",
                  fontWeight:800,
                  lineHeight:1.2,
                }}
              >
                {t.valores.titulo}
              </h2>
            </div>

            <div
              className="sn-stack-wrap"
              style={{ display:"flex", justifyContent:"center" }}
            >
              <ValoresStack items={t.valores.items} hint={t.valores.hint} />
            </div>
          </div>
        </section>

        {/* ══ CTA FINAL ═════════════════════════════════════════════════ */}
        <section
          ref={ctaRef}
          className="sn-fade"
          style={{
            background:"#070A12",
            padding:"80px 24px",
            textAlign:"center",
            borderTop:"1px solid rgba(255,255,255,.06)",
          }}
        >
          <div style={{ maxWidth:600, margin:"0 auto" }}>
            <h2
              className="sn-grad"
              style={{
                fontSize:"clamp(1.7rem,3.5vw,2.6rem)",
                fontWeight:800,
                lineHeight:1.2,
                marginBottom:"1.25rem",
              }}
            >
              {t.cta.titulo}
            </h2>
            <p style={{
              color:"rgba(255,255,255,.55)",
              fontSize:"1rem",
              lineHeight:1.8,
              marginBottom:"2.5rem",
            }}>
              {t.cta.subtitulo}
            </p>
            <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
              <button
                className="sn-btn-1"
                onClick={() => { window.location.href = `/${locale}/socios`; }}
              >
                {t.cta.boton1}
              </button>
              <button
                className="sn-btn-2"
                onClick={() => setContactOpen(true)}
              >
                {t.cta.boton2}
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <Footer />

      {/* ContactModal — instancia propia de esta página */}
      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  );
}
