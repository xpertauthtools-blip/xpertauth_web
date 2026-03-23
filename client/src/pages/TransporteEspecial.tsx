import { useState, useRef, useCallback } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ContactModal from "@/components/ContactModal";
import { ArrowRight, ExternalLink, FileCheck, Map, MessageSquare, ShieldCheck } from "lucide-react";

// ─── Paleta ───────────────────────────────────────────────────────────────────
const gradientStyle: React.CSSProperties = {
  background: "linear-gradient(135deg,#ffffff 0%,#4D9FEC 40%,#1B4FD8 70%,#ffffff 100%)",
  backgroundSize: "300% 300%",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: "snGrad 6s ease infinite",
};

// ─── Tilt 3D Card ─────────────────────────────────────────────────────────────
function TiltCard({
  title,
  description,
  url,
  icon,
  accentColor,
}: {
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  accentColor: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg)");
  const [shine, setShine] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 12;
    const rotateX = -((y - centerY) / centerY) * 12;
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04,1.04,1.04)`);
    setShine({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 0.15 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)");
    setShine((s) => ({ ...s, opacity: 0 }));
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: "transform 0.15s ease-out",
        transformStyle: "preserve-3d",
      }}
      className="relative flex flex-col justify-between p-8 rounded-2xl overflow-hidden cursor-pointer"
      onClick={() => window.open(url, "_blank", "noopener noreferrer")}
    >
      {/* Borde degradado */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `linear-gradient(135deg, ${accentColor}55 0%, transparent 60%)`,
          border: `1px solid ${accentColor}40`,
        }}
      />
      {/* Fondo base */}
      <div className="absolute inset-0 rounded-2xl bg-white/[0.03]" />

      {/* Brillo que sigue el cursor */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.18) 0%, transparent 60%)`,
          opacity: shine.opacity,
        }}
      />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col h-full gap-6">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{ background: `${accentColor}20`, border: `1px solid ${accentColor}40` }}
        >
          {icon}
        </div>

        <div className="flex-grow">
          <h3 className="font-heading font-bold text-pure text-xl mb-3">{title}</h3>
          <p className="text-white/60 text-sm leading-relaxed">{description}</p>
        </div>

        <div
          className="flex items-center gap-2 text-sm font-semibold mt-2 transition-all duration-200 group-hover:gap-3"
          style={{ color: accentColor }}
        >
          <span>Abrir herramienta</span>
          <ExternalLink className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

// ─── Tarjeta de servicio ───────────────────────────────────────────────────────
function ServiceCard({
  number,
  title,
  description,
  icon,
}: {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-xpertblue/30 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-xpertblue/10 border border-xpertblue/20 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div>
          <span className="text-xpertblue text-xs font-bold tracking-widest font-mono">{number}</span>
          <h3 className="font-heading font-semibold text-pure text-base mt-1 mb-2">{title}</h3>
          <p className="text-white/60 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Página principal ──────────────────────────────────────────────────────────
export default function TransporteEspecial() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-obsidian text-pure font-sans">
      <style>{`
        @keyframes snGrad {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      <Navbar />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-obsidian">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-arctic text-xs font-semibold tracking-widest uppercase mb-6">
            Servicios · Transporte Especial
          </span>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6" style={gradientStyle}>
            30 años desactivando problemas en carretera.
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Permisos AE, AEG y AET. Interpretación normativa DGT y SCT. Planificación de itinerarios.
            Sin sorpresas legales, sin demoras innecesarias.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = "/es/socios"}
              className="px-7 py-3.5 bg-xpertblue hover:bg-xpertblue/90 text-pure font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              Hazte socio <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setContactOpen(true)}
              className="px-7 py-3.5 bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 text-pure font-semibold rounded-lg transition-all duration-200"
            >
              Contacta con nosotros
            </button>
          </div>
        </div>
      </section>

      {/* ── SERVICIOS ────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: "#0F1628" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-arctic text-xs font-semibold tracking-widest uppercase">Lo que hacemos</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl mt-4" style={gradientStyle}>
              Experiencia que se traduce en resultados
            </h2>
            <p className="mt-4 text-white/60 max-w-xl mx-auto">
              Cada carga excepcional tiene su propia normativa, su propio itinerario y su propio riesgo.
              Nosotros los conocemos todos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <ServiceCard
              number="01"
              icon={<FileCheck className="w-5 h-5 text-xpertblue" />}
              title="Permisos AE, AEG y AET"
              description="Tramitación completa ante DGT y SCT. Autorizaciones especiales, especiales de carácter genérico y excepcionales. Plazos reales, sin sorpresas."
            />
            <ServiceCard
              number="02"
              icon={<ShieldCheck className="w-5 h-5 text-xpertblue" />}
              title="Interpretación normativa"
              description="Lectura experta de la normativa DGT y SCT Catalunya. Instrucciones TV, resoluciones de restricción, catálogo de prescripciones. Criterio humano donde la IA no llega."
            />
            <ServiceCard
              number="03"
              icon={<Map className="w-5 h-5 text-xpertblue" />}
              title="Planificación de itinerarios"
              description="Rutas adaptadas a las dimensiones y peso de cada vehículo. Restricciones horarias, pasos especiales, coordinación con Guardia Civil y Mossos d'Esquadra."
            />
          </div>
        </div>
      </section>

      {/* ── HERRAMIENTAS SCT ─────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-obsidian">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-arctic text-xs font-semibold tracking-widest uppercase">SCT Catalunya</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl mt-4" style={gradientStyle}>
              Herramientas oficiales de la Generalitat
            </h2>
            <p className="mt-4 text-white/60 max-w-xl mx-auto">
              Consulta itinerarios y el estado del tráfico en tiempo real directamente
              desde las plataformas oficiales de la SCT.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ perspective: "1200px" }}>
            <TiltCard
              title="Visor d'Itineraris SCT"
              description="Consulta y planifica itinerarios de transporte especial en Catalunya. Verifica rutas, restricciones de paso y condiciones específicas por tramo."
              url="https://visoritineraris.transit.gencat.cat/visorte/"
              accentColor="#1B4FD8"
              icon={<Map className="w-6 h-6 text-xpertblue" />}
            />
            <TiltCard
              title="Mapa Continu de Trànsit"
              description="Estado del tráfico en tiempo real en la red viaria de Catalunya. Incidencias, obras, restricciones activas y cámaras de tráfico."
              url="https://mct.gencat.cat/"
              accentColor="#4D9FEC"
              icon={<ExternalLink className="w-6 h-6 text-arctic" />}
            />
          </div>
        </div>
      </section>

      {/* ── LEX ──────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: "#0F1628" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            <div className="flex-1">
              <span className="text-arctic text-xs font-semibold tracking-widest uppercase">Agente IA</span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl mt-4 mb-5" style={gradientStyle}>
                LEX — Tu experto normativo 24/7
              </h2>
              <p className="text-white/60 leading-relaxed mb-4">
                LEX tiene acceso a más de 7.400 fragmentos de normativa de transporte especial:
                leyes marco, instrucciones DGT, resoluciones SCT, mercancías peligrosas y jornadas de conducción.
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                Pregunta sobre permisos, restricciones horarias, velocidades máximas o trámites
                con la SCT. LEX cita siempre la fuente exacta.
              </p>
              <button
                onClick={() => {
                  const btn = document.querySelector("[data-open-agent]") as HTMLElement | null;
                  if (btn) btn.click();
                  else window.location.href = "/es#agente";
                }}
                className="px-7 py-3.5 bg-xpertblue hover:bg-xpertblue/90 text-pure font-semibold rounded-lg transition-all duration-200 flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Pregunta a LEX
              </button>
            </div>

            {/* Panel decorativo LEX */}
            <div className="flex-1 w-full max-w-sm lg:max-w-none">
              <div className="rounded-2xl border border-xpertblue/20 bg-xpertblue/5 p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-full bg-xpertblue flex items-center justify-center">
                    <span className="text-pure text-xs font-bold">L</span>
                  </div>
                  <span className="text-pure font-semibold text-sm">LEX · XpertAuth</span>
                  <span className="ml-auto px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">Activo</span>
                </div>
                <div className="space-y-3">
                  {[
                    "¿Qué velocidad máxima tiene un VERTE genérico en autopista?",
                    "¿Cuáles son las restricciones horarias SCT en agosto?",
                    "¿Qué formulario necesito para un AET en Catalunya?",
                  ].map((q, i) => (
                    <div key={i} className="px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/60 text-sm">
                      {q}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-white/30 text-xs text-center">Ejemplos de consultas a LEX</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: "#070A12" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-5" style={gradientStyle}>
            ¿Tienes una carga que gestionar?
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
            Hazte socio y accede a LEX sin límites. O contáctanos directamente
            y te orientamos sin compromiso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = "/es/socios"}
              className="px-7 py-3.5 bg-xpertblue hover:bg-xpertblue/90 text-pure font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              Hazte socio <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setContactOpen(true)}
              className="px-7 py-3.5 bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 text-pure font-semibold rounded-lg transition-all duration-200"
            >
              Contacta con nosotros
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
