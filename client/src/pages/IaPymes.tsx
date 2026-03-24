import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ContactModal from "@/components/ContactModal";
import { useAgent } from "@/App";
import { AutomatizacionCarousel } from "@/components/AutomatizacionCarousel";

const gradientStyle: React.CSSProperties = {
  background: "linear-gradient(135deg,#ffffff 0%,#4D9FEC 40%,#1B4FD8 70%,#ffffff 100%)",
  backgroundSize: "300% 300%",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: "snGrad 6s ease infinite",
};

function ServiceCard({
  number, title, description, claim, badge,
}: {
  number: string; title: string; description: string; claim: string; badge?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transition: "all 0.35s cubic-bezier(0.34,1.2,0.64,1)",
        transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
      }}
      className={`p-6 rounded-xl border transition-colors duration-300 overflow-hidden ${
        hovered
          ? "bg-[#1B4FD8]/10 border-[#1B4FD8]/40 shadow-lg shadow-[#1B4FD8]/10"
          : "bg-white/[0.03] border-white/[0.08]"
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[#4D9FEC] text-xs font-bold tracking-widest font-mono">{number}</span>
        {badge && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#4D9FEC]/20 text-[#4D9FEC]">
            {badge}
          </span>
        )}
      </div>
      <h3 className="text-white font-semibold text-base mb-2">{title}</h3>
      <p className="text-white/60 text-sm leading-relaxed">{description}</p>
      <div
        style={{
          maxHeight: hovered ? "56px" : "0px",
          opacity: hovered ? 1 : 0,
          transition: "max-height 0.3s ease, opacity 0.3s ease 0.05s",
          overflow: "hidden",
        }}
      >
        <p className="text-[#4D9FEC] text-xs italic leading-relaxed pt-2 border-t border-[#4D9FEC]/20">
          — {claim}
        </p>
      </div>
    </div>
  );
}

const texts: Record<string, {
  heroTitle1: string; heroTitle2: string; heroSubtitle: string;
  heroCtaSocio: string; heroCtaContacto: string;
  serviciosLabel: string; serviciosTitle: string; serviciosSubtitle: string;
  s: { num: string; badge?: string; title: string; body: string; claim: string }[];
  automatizacionLabel: string; automatizacionTitle: string; automatizacionSubtitle: string;
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
    s: [
      { num: "01", badge: "Gratuita", title: "Auditoria inicial", body: "Antes de proponer nada, escuchamos. Mapeamos como trabajas, donde se acumula la friccion y que tareas te quitan tiempo sin aportarte valor. Sin compromiso, sin coste.", claim: "Diagnosticamos problemas reales y ofrecemos soluciones." },
      { num: "02", title: "Consultoria de implementacion", body: "Te ayudamos a elegir que herramienta encaja con tu empresa, como integrarla y como medir si realmente resuelve el problema. El equipo humano revisa cada caso antes de recomendar nada.", claim: "Criterio humano, respaldado por IA." },
      { num: "03", title: "Automatizacion de procesos", body: "Automatizamos las tareas repetitivas que identificamos en la auditoria. Sin cambiar tu forma de trabajar de golpe, sin grandes inversiones. Los resultados se notan desde el primer mes.", claim: "NOVA analiza tu flujo de trabajo y propone soluciones concretas." },
      { num: "04", title: "Formacion practica del equipo", body: "Tres sesiones para que tu equipo entienda y use la IA sin miedo. Sin jerga, sin teoria vacia. Solo herramientas reales aplicadas a tu sector, desde el primer dia.", claim: "Maximo 6 personas por grupo. A vuestro ritmo." },
    ],
    automatizacionLabel: "Casos reales",
    automatizacionTitle: "Esto ya lo estamos haciendo.",
    automatizacionSubtitle: "Ejemplos de automatizaciones reales que implementamos en PYMEs. Arrastra para explorar.",
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
    s: [
      { num: "01", badge: "Gratuita", title: "Auditoria inicial", body: "Abans de proposar res, escoltem. Mapegem com treballes, on s'acumula la friccio i quines tasques et treuen temps sense aportar-te valor. Sense compromis, sense cost.", claim: "Diagnostiquem problemes reals i oferim solucions." },
      { num: "02", title: "Consultoria d'implementacio", body: "T'ajudem a triar quina eina encaixa amb la teva empresa, com integrar-la i com mesurar si realment resol el problema. L'equip huma revisa cada cas abans de recomanar res.", claim: "Criteri huma, recolzat per IA." },
      { num: "03", title: "Automatitzacio de processos", body: "Automatitzem les tasques repetitives que identifiquem a l'auditoria. Sense canviar la teva forma de treballar de cop, sense grans inversions. Els resultats es noten des del primer mes.", claim: "NOVA analitza el teu flux de treball i proposa solucions concretes." },
      { num: "04", title: "Formacio practica de l'equip", body: "Tres sessions perque el teu equip entengui i usi la IA sense por. Sense argot, sense teoria buida. Nomes eines reals aplicades al teu sector, des del primer dia.", claim: "Maxim 6 persones per grup. Al vostre ritme." },
    ],
    automatizacionLabel: "Casos reals",
    automatizacionTitle: "Aixo ja ho estem fent.",
    automatizacionSubtitle: "Exemples d'automatitzacions reals que implementem en PIMEs. Arrossega per explorar.",
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
    s: [
      { num: "01", badge: "Free", title: "Initial audit", body: "Before proposing anything, we listen. We map how you work, where friction builds up, and which tasks drain your time without adding value. No commitment, no cost.", claim: "We diagnose real problems and offer solutions." },
      { num: "02", title: "Implementation consulting", body: "We help you choose which tool fits your company, how to integrate it, and how to measure whether it actually solves the problem. Our human team reviews each case before recommending anything.", claim: "Human judgement, backed by AI." },
      { num: "03", title: "Process automation", body: "We automate the repetitive tasks we identify during the audit. Without overhauling how you work overnight, without major investments. Results show from the first month.", claim: "NOVA analyses your workflow and proposes concrete solutions." },
      { num: "04", title: "Practical team training", body: "Three sessions so your team understands and uses AI without fear. No jargon, no empty theory. Only real tools applied to your sector, from day one.", claim: "Maximum 6 people per group. At your own pace." },
    ],
    automatizacionLabel: "Real cases",
    automatizacionTitle: "We are already doing this.",
    automatizacionSubtitle: "Real automation examples we implement in SMEs. Drag to explore.",
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
    s: [
      { num: "01", badge: "Gratuit", title: "Audit initial", body: "Avant de proposer quoi que ce soit, nous ecoutons. Nous cartographions votre facon de travailler, ou la friction s'accumule et quelles taches vous font perdre du temps sans valeur ajoutee. Sans engagement, sans cout.", claim: "Nous diagnostiquons de vrais problemes et proposons des solutions." },
      { num: "02", title: "Conseil en implementation", body: "Nous vous aidons a choisir l'outil adapte a votre entreprise, comment l'integrer et comment mesurer s'il resout vraiment le probleme. L'equipe humaine examine chaque cas avant de recommander quoi que ce soit.", claim: "Jugement humain, soutenu par l'IA." },
      { num: "03", title: "Automatisation des processus", body: "Nous automatisons les taches repetitives identifiees lors de l'audit. Sans bouleverser votre facon de travailler du jour au lendemain, sans investissements majeurs. Les resultats se voient des le premier mois.", claim: "NOVA analyse votre flux de travail et propose des solutions concretes." },
      { num: "04", title: "Formation pratique de l'equipe", body: "Trois sessions pour que votre equipe comprenne et utilise l'IA sans crainte. Sans jargon, sans theorie creuse. Uniquement des outils reels appliques a votre secteur, des le premier jour.", claim: "Maximum 6 personnes par groupe. A votre rythme." },
    ],
    automatizacionLabel: "Cas reels",
    automatizacionTitle: "Nous le faisons deja.",
    automatizacionSubtitle: "Exemples d'automatisations reelles que nous mettons en oeuvre dans les PME. Faites glisser pour explorer.",
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

      {/* SERVICIOS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A0E1A] border-t border-white/[0.05]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#4D9FEC] text-xs font-semibold tracking-widest uppercase">{t.serviciosLabel}</span>
            <h2 className="font-bold text-3xl sm:text-4xl mt-4" style={gradientStyle}>
              {t.serviciosTitle}
            </h2>
            <p className="mt-4 text-white/60 max-w-xl mx-auto">{t.serviciosSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.s.map((srv, i) => (
              <ServiceCard
                key={i}
                number={srv.num}
                badge={srv.badge}
                title={srv.title}
                description={srv.body}
                claim={srv.claim}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CARRUSEL AUTOMATIZACIONES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0F1628] border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#4D9FEC] text-xs font-semibold tracking-widest uppercase">{t.automatizacionLabel}</span>
            <h2 className="font-bold text-3xl sm:text-4xl mt-4" style={gradientStyle}>
              {t.automatizacionTitle}
            </h2>
            <p className="mt-4 text-white/60 max-w-xl mx-auto">{t.automatizacionSubtitle}</p>
          </div>
          <AutomatizacionCarousel />
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
