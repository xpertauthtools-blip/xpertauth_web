import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ContactModal from "@/components/ContactModal";
import { useAgent } from "@/App";

const gradientStyle: React.CSSProperties = {
  background: "linear-gradient(135deg,#ffffff 0%,#4D9FEC 40%,#1B4FD8 70%,#ffffff 100%)",
  backgroundSize: "300% 300%",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: "snGrad 6s ease infinite",
};

// ─── Datos casos de uso ───────────────────────────────────────────────────────
const casosUso = [
  {
    num: "01",
    titulo: "Clasificar emails y registrar incidencias",
    descripcion: "Cada email de cliente se clasifica por tipo automaticamente. Las incidencias se registran en Sheets y se confirma la recepcion al cliente sin intervenir.",
    herramientas: [
      { nombre: "Gmail", color: "#EA4335" },
      { nombre: "Sheets", color: "#34A853" },
      { nombre: "Gmail", color: "#EA4335" },
    ],
    transporte: false,
  },
  {
    num: "02",
    titulo: "Nuevo lead entra solo en CRM con bienvenida",
    descripcion: "El formulario web crea el contacto en tu CRM y dispara un email de bienvenida personalizado. Sin tocar nada.",
    herramientas: [
      { nombre: "Formulario", color: "#7B68EE" },
      { nombre: "HubSpot", color: "#FF6B35" },
      { nombre: "Gmail", color: "#EA4335" },
    ],
    transporte: false,
  },
  {
    num: "03",
    titulo: "Mensaje de cliente genera tarea al equipo",
    descripcion: "Un mensaje de cliente en WhatsApp crea automaticamente una tarea en Notion y notifica al responsable en Slack.",
    herramientas: [
      { nombre: "WhatsApp", color: "#25D366" },
      { nombre: "Notion", color: "#888888" },
      { nombre: "Slack", color: "#4A154B" },
    ],
    transporte: false,
  },
  {
    num: "04",
    titulo: "Extrae datos de facturas a tu hoja de costes",
    descripcion: "Subes la factura PDF a Drive. La IA extrae importe, proveedor y fecha. Los datos se vuelcan solos en tu hoja de contabilidad.",
    herramientas: [
      { nombre: "Drive", color: "#4285F4" },
      { nombre: "IA", color: "#8B5CF6" },
      { nombre: "Sheets", color: "#34A853" },
    ],
    transporte: false,
  },
  {
    num: "05",
    titulo: "Recordatorio automatico de cita al cliente",
    descripcion: "Creas el evento en Calendar. 24h antes el cliente recibe automaticamente un WhatsApp con la confirmacion y los detalles.",
    herramientas: [
      { nombre: "Calendar", color: "#4285F4" },
      { nombre: "WhatsApp", color: "#25D366" },
    ],
    transporte: false,
  },
  {
    num: "06",
    titulo: "Informe semanal de ventas sin tocarlo",
    descripcion: "Cada lunes a las 8h se genera el informe de ventas de la semana anterior y se envia automaticamente a los responsables.",
    herramientas: [
      { nombre: "Sheets", color: "#34A853" },
      { nombre: "PDF", color: "#F72585" },
      { nombre: "Gmail", color: "#EA4335" },
    ],
    transporte: false,
  },
  {
    num: "07",
    titulo: "Recepcion de eCMR y registro automatico",
    descripcion: "El eCMR llega por email. La IA extrae matricula, origen, destino y fecha. Se registra en tu hoja de servicios y se archiva en Drive.",
    herramientas: [
      { nombre: "Email", color: "#EA4335" },
      { nombre: "IA", color: "#8B5CF6" },
      { nombre: "Sheets", color: "#34A853" },
      { nombre: "Drive", color: "#4285F4" },
    ],
    transporte: true,
  },
  {
    num: "08",
    titulo: "Facturacion automatica al cerrar el servicio",
    descripcion: "Al marcar el servicio como completado en Sheets, se genera la factura en Sage y se envia automaticamente al cliente por email.",
    herramientas: [
      { nombre: "Sheets", color: "#34A853" },
      { nombre: "Sage", color: "#00DC82" },
      { nombre: "Gmail", color: "#EA4335" },
    ],
    transporte: true,
  },
];

// ─── Componente acordeon ──────────────────────────────────────────────────────
function CasoAcordeon({ caso }: { caso: typeof casosUso[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`rounded-xl border overflow-hidden transition-colors duration-200 ${
        open ? "border-[#1B4FD8]/40 bg-[#1B4FD8]/5" : "border-white/[0.08] bg-white/[0.02]"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left"
      >
        <span className="text-[#4D9FEC] text-xs font-bold tracking-widest font-mono flex-shrink-0">
          {caso.num}
        </span>
        <span className="text-white text-sm font-medium flex-1 leading-snug">
          {caso.titulo}
        </span>
        {caso.transporte && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#4D9FEC]/20 text-[#4D9FEC] flex-shrink-0">
            Transporte
          </span>
        )}
        <span
          className="text-white/40 text-lg flex-shrink-0 transition-transform duration-200"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          ›
        </span>
      </button>

      <div
        style={{
          maxHeight: open ? "200px" : "0px",
          opacity: open ? 1 : 0,
          transition: "max-height 0.3s ease, opacity 0.25s ease",
          overflow: "hidden",
        }}
      >
        <div className="px-5 pb-5 border-t border-white/[0.06]">
          <div className="flex items-center gap-2 flex-wrap mt-4 mb-3">
            {caso.herramientas.map((h, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="flex items-center gap-1.5 bg-white/[0.06] border border-white/[0.08] rounded-md px-2.5 py-1">
                  <div
                    className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                    style={{ backgroundColor: h.color }}
                  />
                  <span className="text-white/70 text-xs font-medium">{h.nombre}</span>
                </div>
                {i < caso.herramientas.length - 1 && (
                  <span className="text-white/30 text-xs">→</span>
                )}
              </div>
            ))}
          </div>
          <p className="text-white/50 text-sm leading-relaxed">{caso.descripcion}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Tarjeta Problema/Solucion ────────────────────────────────────────────────
function ServiceCard({
  number, title, subtitle, problema, solucion, badge,
}: {
  number: string; title: string; subtitle: string;
  problema: string; solucion: string; badge: string; 
}) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#1B4FD8]/20 border border-[#1B4FD8]/30 flex items-center justify-center flex-shrink-0">
          <span className="text-[#4D9FEC] text-xs font-bold">{number}</span>
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm leading-snug">{title}</h3>
          <p className="text-white/40 text-xs mt-0.5">{subtitle}</p>
        </div>
      </div>

      <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3">
        <p className="text-red-400 text-xs font-bold uppercase tracking-widest mb-1">El problema</p>
        <p className="text-red-300/80 text-xs leading-relaxed">{problema}</p>
      </div>

      <div className="rounded-lg bg-[#1B4FD8]/10 border border-[#1B4FD8]/20 px-4 py-3">
        <p className="text-[#4D9FEC] text-xs font-bold uppercase tracking-widest mb-1">La solucion</p>
        <p className="text-[#4D9FEC]/80 text-xs leading-relaxed">{solucion}</p>
      </div>

      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#4D9FEC]/10 text-[#4D9FEC] self-start">
        {badge}
      </span>
    </div>
  );
}

// ─── Textos por idioma ────────────────────────────────────────────────────────
const texts: Record<string, {
  heroTitle1: string; heroTitle2: string; heroSubtitle: string;
  heroCtaSocio: string; heroCtaContacto: string;
  serviciosLabel: string; serviciosTitle: string; serviciosSubtitle: string;
  servicios: { num: string; title: string; subtitle: string; problema: string; solucion: string; badge: string }[];
  casosLabel: string; casosTitle: string; casosSubtitle: string;
  novaLabel: string; novaTitle: string; novaBody: string; novaBtn: string;
  novaPreguntas: string[];
  ctaTitle: string; ctaSubtitle: string; ctaSocio: string; ctaContacto: string;
}> = {
  es: {
    heroTitle1: "La IA no es para",
    heroTitle2: "grandes empresas.",
    heroSubtitle: "Automatizamos tus procesos, formamos a tu equipo y resolvemos los cuellos de botella reales de tu negocio. Sin vender tecnologia. Sin humo.",
    heroCtaSocio: "Hazte socio",
    heroCtaContacto: "Contacta con nosotros",
    serviciosLabel: "Lo que hacemos",
    serviciosTitle: "No vendemos soluciones. Resolvemos problemas.",
    serviciosSubtitle: "Antes de proponer nada, entendemos como trabajas.",
    servicios: [
      {
        num: "01", title: "Auditoria inicial", subtitle: "Gratuita · Sin compromiso",
        problema: "No sabes por donde empezar con la IA. Ves que otros la usan pero no tienes claro si te sirve a ti o que cambiarias primero.",
        solucion: "Mapeamos tu flujo de trabajo real, identificamos los cuellos de botella y te decimos exactamente donde la IA te ahorraria tiempo y dinero.",
        badge: "Sin coste · Sin presion",
      },
      {
        num: "02", title: "Consultoria de implementacion", subtitle: "Elegir bien antes de gastar",
        problema: "El mercado esta lleno de herramientas de IA. No sabes cual elegir, cual se integra con lo que ya tienes o si realmente vale lo que cuesta.",
        solucion: "El equipo humano analiza tu caso y recomienda solo lo que tiene sentido para ti. Sin comisiones, sin afiliados, sin intereses ocultos.",
        badge: "Criterio humano · Respaldado por IA",
      },
      {
        num: "03", title: "Automatizacion de procesos", subtitle: "Resultados desde el primer mes",
        problema: "Tu equipo pierde horas en tareas repetitivas: copiar datos, enviar emails de seguimiento, generar informes. Trabajo que no aporta valor.",
        solucion: "Automatizamos esas tareas sin tocar tu forma de trabajar de golpe. Cambios pequenos, resultados medibles desde el primer mes.",
        badge: "NOVA analiza · Nosotros implementamos",
      },
      {
        num: "04", title: "Formacion practica del equipo", subtitle: "Maximo 6 personas · A vuestro ritmo",
        problema: "Compras una herramienta de IA y nadie del equipo la usa. O la usan mal. La tecnologia sin formacion es dinero tirado.",
        solucion: "Tres sesiones practicas con herramientas reales aplicadas a tu sector. El equipo sale sabiendo usarlas, no solo conociendo su existencia.",
        badge: "Sin jerga · Sin teoria vacia",
      },
    ],
    casosLabel: "Casos reales",
    casosTitle: "Esto ya lo estamos haciendo.",
    casosSubtitle: "Automatizaciones reales que implementamos en PYMEs. Haz clic para ver como funciona cada una.",
    novaLabel: "Agente IA",
    novaTitle: "NOVA, tu consultor de IA disponible 24/7.",
    novaBody: "NOVA es el agente de XpertAuth especializado en IA para PYMEs. Practica, directa y sin humo. Resuelve dudas sobre automatizacion, herramientas y procesos en tiempo real.",
    novaBtn: "Pregunta a NOVA",
    novaPreguntas: [
      "Que procesos de mi empresa se pueden automatizar facilmente?",
      "Cuanto cuesta implementar IA en una PYME pequena?",
      "Que herramientas de IA son utiles para gestionar clientes?",
    ],
    ctaTitle: "Da el primer paso.",
    ctaSubtitle: "La auditoria es gratuita. Sin compromiso. Sin presion.",
    ctaSocio: "Hazte socio",
    ctaContacto: "Contacta con nosotros",
  },
  ca: {
    heroTitle1: "La IA no es per a",
    heroTitle2: "grans empreses.",
    heroSubtitle: "Automatitzem els teus processos, formem el teu equip i resolem els colls d'ampolla reals del teu negoci. Sense vendre tecnologia. Sense fum.",
    heroCtaSocio: "Fes-te soci",
    heroCtaContacto: "Contacta amb nosaltres",
    serviciosLabel: "El que fem",
    serviciosTitle: "No venem solucions. Resolem problemes.",
    serviciosSubtitle: "Abans de proposar res, entenem com treballes.",
    servicios: [
      {
        num: "01", title: "Auditoria inicial", subtitle: "Gratuita · Sense compromis",
        problema: "No saps per on comenar amb la IA. Veus que altres la usen pero no tens clar si et serveix a tu o que canviaries primer.",
        solucion: "Mapegem el teu flux de treball real, identifiquem els colls d'ampolla i et diem exactament on la IA t'estalviaria temps i diners.",
        badge: "Sense cost · Sense pressio",
      },
      {
        num: "02", title: "Consultoria d'implementacio", subtitle: "Triar be abans de gastar",
        problema: "El mercat esta ple d'eines de IA. No saps quina triar, quina s'integra amb el que ja tens o si realment val el que costa.",
        solucion: "L'equip huma analitza el teu cas i recomana nomes el que te sentit per a tu. Sense comissions, sense afiliats, sense interessos ocults.",
        badge: "Criteri huma · Recolzat per IA",
      },
      {
        num: "03", title: "Automatitzacio de processos", subtitle: "Resultats des del primer mes",
        problema: "El teu equip perd hores en tasques repetitives: copiar dades, enviar emails de seguiment, generar informes. Feina que no aporta valor.",
        solucion: "Automatitzem aquestes tasques sense canviar la teva forma de treballar de cop. Canvis petits, resultats mesurables des del primer mes.",
        badge: "NOVA analitza · Nosaltres implementem",
      },
      {
        num: "04", title: "Formacio practica de l'equip", subtitle: "Maxim 6 persones · Al vostre ritme",
        problema: "Compres una eina de IA i ningu de l'equip la fa servir. O la fan servir malament. La tecnologia sense formacio es diners tirats.",
        solucion: "Tres sessions practiques amb eines reals aplicades al teu sector. L'equip surt sabent usar-les, no nomes coneixent la seva existencia.",
        badge: "Sense argot · Sense teoria buida",
      },
    ],
    casosLabel: "Casos reals",
    casosTitle: "Aixo ja ho estem fent.",
    casosSubtitle: "Automatitzacions reals que implementem en PIMEs. Fes clic per veure com funciona cada una.",
    novaLabel: "Agent IA",
    novaTitle: "NOVA, el teu consultor de IA disponible 24/7.",
    novaBody: "NOVA es l'agent de XpertAuth especialitzat en IA per a PYMEs. Practica, directa i sense fum. Resol dubtes sobre automatitzacio, eines i processos en temps real.",
    novaBtn: "Pregunta a NOVA",
    novaPreguntas: [
      "Quins processos de la meva empresa es poden automatitzar facilment?",
      "Quant costa implementar IA en una PIME petita?",
      "Quines eines de IA son utiles per gestionar clients?",
    ],
    ctaTitle: "Fes el primer pas.",
    ctaSubtitle: "L'auditoria es gratuita. Sense compromis. Sense pressio.",
    ctaSocio: "Fes-te soci",
    ctaContacto: "Contacta amb nosaltres",
  },
  en: {
    heroTitle1: "AI is not just for",
    heroTitle2: "big companies.",
    heroSubtitle: "We automate your processes, train your team and solve the real bottlenecks in your business. No technology sales pitch. No hype.",
    heroCtaSocio: "Become a member",
    heroCtaContacto: "Contact us",
    serviciosLabel: "What we do",
    serviciosTitle: "We don't sell solutions. We solve problems.",
    serviciosSubtitle: "Before proposing anything, we understand how you work.",
    servicios: [
      {
        num: "01", title: "Initial audit", subtitle: "Free · No commitment",
        problema: "You don't know where to start with AI. You see others using it but you're not sure if it works for you or what you'd change first.",
        solucion: "We map your real workflow, identify the bottlenecks and tell you exactly where AI would save you time and money.",
        badge: "No cost · No pressure",
      },
      {
        num: "02", title: "Implementation consulting", subtitle: "Choose well before spending",
        problema: "The market is full of AI tools. You don't know which to choose, which integrates with what you already have, or if it's worth the cost.",
        solucion: "Our human team analyses your case and recommends only what makes sense for you. No commissions, no affiliates, no hidden interests.",
        badge: "Human judgement · Backed by AI",
      },
      {
        num: "03", title: "Process automation", subtitle: "Results from the first month",
        problema: "Your team wastes hours on repetitive tasks: copying data, sending follow-up emails, generating reports. Work that adds no value.",
        solucion: "We automate those tasks without overhauling how you work overnight. Small changes, measurable results from the first month.",
        badge: "NOVA analyses · We implement",
      },
      {
        num: "04", title: "Practical team training", subtitle: "Max 6 people · At your own pace",
        problema: "You buy an AI tool and nobody on the team uses it. Or they use it badly. Technology without training is money wasted.",
        solucion: "Three practical sessions with real tools applied to your sector. The team leaves knowing how to use them, not just knowing they exist.",
        badge: "No jargon · No empty theory",
      },
    ],
    casosLabel: "Real cases",
    casosTitle: "We are already doing this.",
    casosSubtitle: "Real automations we implement in SMEs. Click to see how each one works.",
    novaLabel: "AI Agent",
    novaTitle: "NOVA, your AI consultant available 24/7.",
    novaBody: "NOVA is XpertAuth's agent specialised in AI for SMEs. Practical, direct, and no hype. Answers questions about automation, tools, and processes in real time.",
    novaBtn: "Ask NOVA",
    novaPreguntas: [
      "Which processes in my business can be easily automated?",
      "How much does it cost to implement AI in a small SME?",
      "What AI tools are useful for managing customers?",
    ],
    ctaTitle: "Take the first step.",
    ctaSubtitle: "The audit is free. No commitment. No pressure.",
    ctaSocio: "Become a member",
    ctaContacto: "Contact us",
  },
  fr: {
    heroTitle1: "L'IA n'est pas reservee aux",
    heroTitle2: "grandes entreprises.",
    heroSubtitle: "Nous automatisons vos processus, formons votre equipe et resolvons les vrais goulots d'etranglement de votre activite. Sans vendre de technologie. Sans enfumage.",
    heroCtaSocio: "Devenir membre",
    heroCtaContacto: "Nous contacter",
    serviciosLabel: "Ce que nous faisons",
    serviciosTitle: "Nous ne vendons pas de solutions. Nous resolvons des problemes.",
    serviciosSubtitle: "Avant de proposer quoi que ce soit, nous comprenons comment vous travaillez.",
    servicios: [
      {
        num: "01", title: "Audit initial", subtitle: "Gratuit · Sans engagement",
        problema: "Vous ne savez pas par ou commencer avec l'IA. Vous voyez que d'autres l'utilisent mais vous ne savez pas si cela vous convient.",
        solucion: "Nous cartographions votre flux de travail reel, identifions les goulots d'etranglement et vous disons exactement ou l'IA vous ferait gagner du temps.",
        badge: "Sans cout · Sans pression",
      },
      {
        num: "02", title: "Conseil en implementation", subtitle: "Bien choisir avant de depenser",
        problema: "Le marche regorge d'outils IA. Vous ne savez pas lequel choisir, lequel s'integre avec ce que vous avez deja ou s'il vaut vraiment son prix.",
        solucion: "Notre equipe humaine analyse votre cas et ne recommande que ce qui a du sens pour vous. Sans commissions, sans affilies, sans interets caches.",
        badge: "Jugement humain · Soutenu par IA",
      },
      {
        num: "03", title: "Automatisation des processus", subtitle: "Resultats des le premier mois",
        problema: "Votre equipe perd des heures sur des taches repetitives: copier des donnees, envoyer des emails de suivi, generer des rapports.",
        solucion: "Nous automatisons ces taches sans bouleverser votre facon de travailler. Petits changements, resultats mesurables des le premier mois.",
        badge: "NOVA analyse · Nous implementons",
      },
      {
        num: "04", title: "Formation pratique de l'equipe", subtitle: "Max 6 personnes · A votre rythme",
        problema: "Vous achetez un outil IA et personne dans l'equipe ne l'utilise. Ou ils l'utilisent mal. La technologie sans formation est de l'argent gaspille.",
        solucion: "Trois sessions pratiques avec de vrais outils appliques a votre secteur. L'equipe repart en sachant les utiliser, pas seulement en connaissant leur existence.",
        badge: "Sans jargon · Sans theorie creuse",
      },
    ],
    casosLabel: "Cas reels",
    casosTitle: "Nous le faisons deja.",
    casosSubtitle: "Automatisations reelles que nous mettons en oeuvre dans les PME. Cliquez pour voir comment chacune fonctionne.",
    novaLabel: "Agent IA",
    novaTitle: "NOVA, votre consultant IA disponible 24/7.",
    novaBody: "NOVA est l'agent XpertAuth specialise dans l'IA pour les PME. Pratique, direct et sans enfumage. Il repond aux questions sur l'automatisation, les outils et les processus en temps reel.",
    novaBtn: "Demandez a NOVA",
    novaPreguntas: [
      "Quels processus de mon entreprise peuvent etre facilement automatises ?",
      "Combien coute la mise en place de l'IA dans une petite PME ?",
      "Quels outils IA sont utiles pour gerer les clients ?",
    ],
    ctaTitle: "Faites le premier pas.",
    ctaSubtitle: "L'audit est gratuit. Sans engagement. Sans pression.",
    ctaSocio: "Devenir membre",
    ctaContacto: "Nous contacter",
  },
};

// ─── Pagina principal ─────────────────────────────────────────────────────────
export default function IaPymes() {
  const [location] = useLocation();
  const locale = location.split("/")[1] || "es";
  const t = texts[locale] || texts.es;
  const { abrirAgente } = useAgent();
  const [contactOpen, setContactOpen] = useState(false);
  const rutaSocios = "/" + locale + "/socios";

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#0A0E1A]">
      <Navbar />

      {/* HERO */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-[#0A0E1A]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            <span style={gradientStyle}>{t.heroTitle1}</span>
            <br />
            <span style={gradientStyle}>{t.heroTitle2}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = rutaSocios}
              className="px-7 py-3.5 bg-[#1B4FD8] hover:bg-[#1B4FD8]/90 text-white font-semibold rounded-lg transition-all duration-200"
            >
              {t.heroCtaSocio}
            </button>
            <button
              onClick={() => setContactOpen(true)}
              className="px-7 py-3.5 bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 text-white font-semibold rounded-lg transition-all duration-200"
            >
              {t.heroCtaContacto}
            </button>
          </div>
        </div>
      </section>

      {/* SERVICIOS — Problema/Solucion */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A0E1A] border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#4D9FEC] text-xs font-semibold tracking-widest uppercase">{t.serviciosLabel}</span>
            <h2 className="font-bold text-3xl sm:text-4xl mt-4" style={gradientStyle}>
              {t.serviciosTitle}
            </h2>
            <p className="mt-4 text-white/60 max-w-xl mx-auto">{t.serviciosSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {t.servicios.map((srv, i) => (
              <ServiceCard key={i} {...srv} />
            ))}
          </div>
        </div>
      </section>

      {/* CASOS DE USO — Acordeon */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0F1628] border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#4D9FEC] text-xs font-semibold tracking-widest uppercase">{t.casosLabel}</span>
            <h2 className="font-bold text-3xl sm:text-4xl mt-4" style={gradientStyle}>
              {t.casosTitle}
            </h2>
            <p className="mt-4 text-white/60 max-w-xl mx-auto">{t.casosSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {casosUso.map((caso, i) => (
              <CasoAcordeon key={i} caso={caso} />
            ))}
          </div>
        </div>
      </section>

      {/* NOVA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A0E1A] border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#4D9FEC] text-xs font-semibold tracking-widest uppercase">{t.novaLabel}</span>
            <h2 className="font-bold text-3xl sm:text-4xl mt-4" style={gradientStyle}>
              {t.novaTitle}
            </h2>
            <p className="mt-4 text-white/60 max-w-2xl mx-auto leading-relaxed">
              {t.novaBody}
            </p>
          </div>
          <div className="bg-[#0F1628] border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#4D9FEC]/20 flex items-center justify-center">
                <span className="text-[#4D9FEC] text-xs font-bold">N</span>
              </div>
              <span className="text-white font-semibold text-sm">NOVA · XpertAuth</span>
              <span className="ml-auto px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">Activo</span>
            </div>
            <div className="space-y-3">
              {t.novaPreguntas.map((q, i) => (
                <button
                  key={i}
                  onClick={() => abrirAgente("NOVA")}
                  className="w-full text-left px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.06] text-white/60 text-sm hover:border-[#4D9FEC]/30 hover:text-white/80 transition-all duration-200"
                >
                  {q}
                </button>
              ))}
            </div>
            <p className="mt-4 text-white/30 text-xs text-center">Ejemplos de consultas · Haz clic para preguntar</p>
          </div>
          <div className="text-center">
            <button
              onClick={() => abrirAgente("NOVA")}
              className="px-7 py-3.5 bg-[#4D9FEC] hover:bg-[#4D9FEC]/90 text-white font-semibold rounded-lg transition-all duration-200"
            >
              {t.novaBtn}
            </button>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070A12] border-t border-white/[0.05]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-bold text-3xl sm:text-4xl mb-5" style={gradientStyle}>
            {t.ctaTitle}
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">{t.ctaSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = rutaSocios}
              className="px-7 py-3.5 bg-[#1B4FD8] hover:bg-[#1B4FD8]/90 text-white font-semibold rounded-lg transition-all duration-200"
            >
              {t.ctaSocio}
            </button>
            <button
              onClick={() => setContactOpen(true)}
              className="px-7 py-3.5 bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 text-white font-semibold rounded-lg transition-all duration-200"
            >
              {t.ctaContacto}
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
