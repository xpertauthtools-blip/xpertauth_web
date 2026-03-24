import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ContactModal from "../components/ContactModal";
import { useAgent } from "../App";

const texts: Record<string, {
  heroTitle1: string; heroTitle2: string; heroSubtitle: string;
  heroCtaSocio: string; heroCtaContacto: string;
  serviciosLabel: string; serviciosTitle: string; serviciosSubtitle: string;
  s: { num: string; badge?: string; title: string; body: string; claim: string }[];
  comoLabel: string; comoTitle: string;
  pasos: { num: string; title: string; body: string }[];
  novaLabel: string; novaTitle: string; novaBody: string; novaBtn: string;
  novaPreguntas: string[];
  ctaTitle: string; ctaSubtitle: string; ctaSocio: string; ctaContacto: string;
}> = {
  es: {
    heroTitle1: "La IA no es para",
    heroTitle2: "grandes empresas.",
    heroSubtitle: "Automatizamos tus procesos, formamos a tu equipo y resolvemos los cuellos de botella reales de tu negocio. Sin vender tecnología. Sin humo.",
    heroCtaSocio: "Hazte socio",
    heroCtaContacto: "Contacta",
    serviciosLabel: "Lo que hacemos",
    serviciosTitle: "No vendemos soluciones. Resolvemos problemas.",
    serviciosSubtitle: "Antes de proponer nada, entendemos cómo trabajas.",
    s: [
      { num: "01", badge: "Gratuita", title: "Auditoría inicial", body: "Antes de proponer nada, escuchamos. Mapeamos cómo trabajas, dónde se acumula la fricción y qué tareas te quitan tiempo sin aportarte valor. Sin compromiso, sin coste.", claim: "No vendemos soluciones. Diagnosticamos problemas reales." },
      { num: "02", title: "Consultoría de implementación", body: "Te ayudamos a elegir qué herramienta encaja con tu empresa, cómo integrarla y cómo medir si realmente resuelve el problema. El equipo humano revisa cada caso antes de recomendar nada.", claim: "Criterio humano, respaldado por IA." },
      { num: "03", title: "Automatización de procesos", body: "Automatizamos las tareas repetitivas que identificamos en la auditoría. Sin cambiar tu forma de trabajar de golpe, sin grandes inversiones. Los resultados se notan desde el primer mes.", claim: "NOVA analiza tu flujo de trabajo y propone soluciones concretas." },
      { num: "04", title: "Formación práctica del equipo", body: "Tres sesiones para que tu equipo entienda y use la IA sin miedo. Sin jerga, sin teoría vacía. Solo herramientas reales aplicadas a tu sector, desde el primer día.", claim: "Máximo 6 personas por grupo. A vuestro ritmo." },
    ],
    comoLabel: "El proceso",
    comoTitle: "Cuatro pasos, resultados reales.",
    pasos: [
      { num: "01", title: "Nos reunimos", body: "Una llamada o reunión presencial para entender tu negocio. Sin formularios previos, sin presentaciones comerciales." },
      { num: "02", title: "Auditamos tu flujo", body: "Observamos cómo trabajas y dónde se pierden tiempo y energía. Te presentamos un diagnóstico claro y honesto." },
      { num: "03", title: "Proponemos y ejecutamos", body: "Solo recomendamos lo que tiene sentido para tu caso. Si hay automatización posible, la implementamos nosotros." },
      { num: "04", title: "Formamos y acompañamos", body: "Formamos a tu equipo para que usen las herramientas con autonomía. No te dejamos con tecnología que nadie sabe manejar." },
    ],
    novaLabel: "Agente IA",
    novaTitle: "NOVA, tu consultor de IA disponible 24/7.",
    novaBody: "NOVA es el agente de XpertAuth especializado en IA para PYMEs. Práctica, directa y sin humo. Resuelve dudas sobre automatización, herramientas y procesos en tiempo real.",
    novaBtn: "Pregunta a NOVA",
    novaPreguntas: [
      "¿Qué procesos de mi empresa se pueden automatizar fácilmente?",
      "¿Cuánto cuesta implementar IA en una PYME pequeña?",
      "¿Qué herramientas de IA son útiles para gestionar clientes?",
    ],
    ctaTitle: "Da el primer paso.",
    ctaSubtitle: "La auditoría es gratuita. Sin compromiso. Sin presión.",
    ctaSocio: "Hazte socio",
    ctaContacto: "Contacta con nosotros",
  },
  ca: {
    heroTitle1: "La IA no és per a",
    heroTitle2: "grans empreses.",
    heroSubtitle: "Automatitzem els teus processos, formem el teu equip i resolem els colls d'ampolla reals del teu negoci. Sense vendre tecnologia. Sense fum.",
    heroCtaSocio: "Fes-te soci",
    heroCtaContacto: "Contacta",
    serviciosLabel: "El que fem",
    serviciosTitle: "No venem solucions. Resolem problemes.",
    serviciosSubtitle: "Abans de proposar res, entenem com treballes.",
    s: [
      { num: "01", badge: "Gratuïta", title: "Auditoria inicial", body: "Abans de proposar res, escoltem. Mapegem com treballes, on s'acumula la fricció i quines tasques et treuen temps sense aportar-te valor. Sense compromís, sense cost.", claim: "No venem solucions. Diagnostiquem problemes reals." },
      { num: "02", title: "Consultoria d'implementació", body: "T'ajudem a triar quina eina encaixa amb la teva empresa, com integrar-la i com mesurar si realment resol el problema. L'equip humà revisa cada cas abans de recomanar res.", claim: "Criteri humà, recolzat per IA." },
      { num: "03", title: "Automatització de processos", body: "Automatitzem les tasques repetitives que identifiquem a l'auditoria. Sense canviar la teva forma de treballar de cop, sense grans inversions. Els resultats es noten des del primer mes.", claim: "NOVA analitza el teu flux de treball i proposa solucions concretes." },
      { num: "04", title: "Formació pràctica de l'equip", body: "Tres sessions perquè el teu equip entengui i usi la IA sense por. Sense argot, sense teoria buida. Només eines reals aplicades al teu sector, des del primer dia.", claim: "Màxim 6 persones per grup. Al vostre ritme." },
    ],
    comoLabel: "El procés",
    comoTitle: "Quatre passos, resultats reals.",
    pasos: [
      { num: "01", title: "Ens reunim", body: "Una trucada o reunió presencial per entendre el teu negoci. Sense formularis previs, sense presentacions comercials." },
      { num: "02", title: "Auditem el teu flux", body: "Observem com treballes i on es perden temps i energia. Et presentem un diagnòstic clar i honest." },
      { num: "03", title: "Proposem i executem", body: "Només recomanem el que té sentit per al teu cas. Si hi ha automatització possible, la implementem nosaltres." },
      { num: "04", title: "Formem i acompanyem", body: "Formem el teu equip perquè usin les eines amb autonomia. No et deixem amb tecnologia que ningú sap fer servir." },
    ],
    novaLabel: "Agent IA",
    novaTitle: "NOVA, el teu consultor de IA disponible 24/7.",
    novaBody: "NOVA és l'agent de XpertAuth especialitzat en IA per a PYMEs. Pràctica, directa i sense fum. Resol dubtes sobre automatització, eines i processos en temps real.",
    novaBtn: "Pregunta a NOVA",
    novaPreguntas: [
      "Quins processos de la meva empresa es poden automatitzar fàcilment?",
      "Quant costa implementar IA en una PIME petita?",
      "Quines eines de IA són útils per gestionar clients?",
    ],
    ctaTitle: "Fes el primer pas.",
    ctaSubtitle: "L'auditoria és gratuïta. Sense compromís. Sense pressió.",
    ctaSocio: "Fes-te soci",
    ctaContacto: "Contacta amb nosaltres",
  },
  en: {
    heroTitle1: "AI isn't just for",
    heroTitle2: "big companies.",
    heroSubtitle: "We automate your processes, train your team, and solve the real bottlenecks in your business. No technology sales pitch. No hype.",
    heroCtaSocio: "Become a member",
    heroCtaContacto: "Contact us",
    serviciosLabel: "What we do",
    serviciosTitle: "We don't sell solutions. We solve problems.",
    serviciosSubtitle: "Before proposing anything, we understand how you work.",
    s: [
      { num: "01", badge: "Free", title: "Initial audit", body: "Before proposing anything, we listen. We map how you work, where friction builds up, and which tasks drain your time without adding value. No commitment, no cost.", claim: "We don't sell solutions. We diagnose real problems." },
      { num: "02", title: "Implementation consulting", body: "We help you choose which tool fits your company, how to integrate it, and how to measure whether it actually solves the problem. Our human team reviews each case before recommending anything.", claim: "Human judgement, backed by AI." },
      { num: "03", title: "Process automation", body: "We automate the repetitive tasks we identify during the audit. Without overhauling how you work overnight, without major investments. Results show from the first month.", claim: "NOVA analyses your workflow and proposes concrete solutions." },
      { num: "04", title: "Practical team training", body: "Three sessions so your team understands and uses AI without fear. No jargon, no empty theory. Only real tools applied to your sector, from day one.", claim: "Maximum 6 people per group. At your own pace." },
    ],
    comoLabel: "The process",
    comoTitle: "Four steps, real results.",
    pasos: [
      { num: "01", title: "We meet", body: "A call or in-person meeting to understand your business. No prior forms, no sales presentations." },
      { num: "02", title: "We audit your workflow", body: "We observe how you work and where time and energy are lost. We present a clear, honest diagnosis." },
      { num: "03", title: "We propose and execute", body: "We only recommend what makes sense for your case. If automation is possible, we implement it ourselves." },
      { num: "04", title: "We train and support", body: "We train your team to use the tools independently. We don't leave you with technology nobody knows how to use." },
    ],
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
    heroTitle1: "L'IA n'est pas réservée aux",
    heroTitle2: "grandes entreprises.",
    heroSubtitle: "Nous automatisons vos processus, formons votre équipe et résolvons les vrais goulots d'étranglement de votre activité. Sans vendre de technologie. Sans enfumage.",
    heroCtaSocio: "Devenir membre",
    heroCtaContacto: "Nous contacter",
    serviciosLabel: "Ce que nous faisons",
    serviciosTitle: "Nous ne vendons pas de solutions. Nous résolvons des problèmes.",
    serviciosSubtitle: "Avant de proposer quoi que ce soit, nous comprenons comment vous travaillez.",
    s: [
      { num: "01", badge: "Gratuit", title: "Audit initial", body: "Avant de proposer quoi que ce soit, nous écoutons. Nous cartographions votre façon de travailler, où la friction s'accumule et quelles tâches vous font perdre du temps sans valeur ajoutée. Sans engagement, sans coût.", claim: "Nous ne vendons pas de solutions. Nous diagnostiquons de vrais problèmes." },
      { num: "02", title: "Conseil en implémentation", body: "Nous vous aidons à choisir l'outil adapté à votre entreprise, comment l'intégrer et comment mesurer s'il résout vraiment le problème. L'équipe humaine examine chaque cas avant de recommander quoi que ce soit.", claim: "Jugement humain, soutenu par l'IA." },
      { num: "03", title: "Automatisation des processus", body: "Nous automatisons les tâches répétitives identifiées lors de l'audit. Sans bouleverser votre façon de travailler du jour au lendemain, sans investissements majeurs. Les résultats se voient dès le premier mois.", claim: "NOVA analyse votre flux de travail et propose des solutions concrètes." },
      { num: "04", title: "Formation pratique de l'équipe", body: "Trois sessions pour que votre équipe comprenne et utilise l'IA sans crainte. Sans jargon, sans théorie creuse. Uniquement des outils réels appliqués à votre secteur, dès le premier jour.", claim: "Maximum 6 personnes par groupe. À votre rythme." },
    ],
    comoLabel: "Le processus",
    comoTitle: "Quatre étapes, des résultats concrets.",
    pasos: [
      { num: "01", title: "Nous nous rencontrons", body: "Un appel ou une réunion en personne pour comprendre votre activité. Sans formulaires préalables, sans présentations commerciales." },
      { num: "02", title: "Nous auditons votre flux", body: "Nous observons comment vous travaillez et où le temps et l'énergie se perdent. Nous vous présentons un diagnostic clair et honnête." },
      { num: "03", title: "Nous proposons et exécutons", body: "Nous ne recommandons que ce qui a du sens pour votre cas. Si une automatisation est possible, nous la mettons en œuvre nous-mêmes." },
      { num: "04", title: "Nous formons et accompagnons", body: "Nous formons votre équipe pour qu'elle utilise les outils en autonomie. Nous ne vous laissons pas avec une technologie que personne ne sait utiliser." },
    ],
    novaLabel: "Agent IA",
    novaTitle: "NOVA, votre consultant IA disponible 24/7.",
    novaBody: "NOVA est l'agent XpertAuth spécialisé dans l'IA pour les PME. Pratique, direct et sans enfumage. Il répond aux questions sur l'automatisation, les outils et les processus en temps réel.",
    novaBtn: "Demandez à NOVA",
    novaPreguntas: [
      "Quels processus de mon entreprise peuvent être facilement automatisés ?",
      "Combien coûte la mise en place de l'IA dans une petite PME ?",
      "Quels outils IA sont utiles pour gérer les clients ?",
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
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Degradado animado en títulos
  const gradStyle: React.CSSProperties = {
    background: "linear-gradient(90deg, #ffffff 0%, #4D9FEC 40%, #1B4FD8 70%, #ffffff 100%)",
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    animation: "snGrad 6s linear infinite",
    display: "inline-block",
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A]">
      <style>{`
        @keyframes snGrad {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      <Navbar />

      {/* HERO */}
      <section className="pt-32 pb-20 px-6 bg-[#0A0E1A]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            <span style={gradStyle}>{t.heroTitle1}</span>
            <br />
            <span style={gradStyle}>{t.heroTitle2}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
              href={`/${locale}/socios`}
              className="px-8 py-3 bg-[#1B4FD8] hover:bg-[#1640b0] text-white font-semibold rounded-lg transition-colors"
            >
              {t.heroCtaSocio}
            </a>
            <button
              onClick={() => setContactOpen(true)}
              className="px-8 py-3 border border-white/30 hover:border-white/60 text-white font-semibold rounded-lg transition-colors"
            >
              {t.heroCtaContacto}
            </button>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="py-20 px-6 bg-[#0A0E1A]">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#4D9FEC] text-sm font-semibold uppercase tracking-widest mb-4 text-center">
            {t.serviciosLabel}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-3" style={gradStyle}>
            {t.serviciosTitle}
          </h2>
          <p className="text-gray-400 text-center mb-14 text-lg">{t.serviciosSubtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.s.map((srv, i) => (
              <div
                key={i}
                className="relative rounded-xl border border-white/10 p-6 cursor-default transition-all duration-300 overflow-hidden"
                style={{
                  background: hoveredCard === i ? "#1B4FD8" : "rgba(255,255,255,0.03)",
                  transform: hoveredCard === i ? "translateY(-4px)" : "translateY(0)",
                  borderColor: hoveredCard === i ? "#4D9FEC" : "rgba(255,255,255,0.1)",
                }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[#4D9FEC] text-sm font-semibold tracking-widest">
                    {srv.num}
                  </span>
                  {srv.badge && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#4D9FEC]/20 text-[#4D9FEC]">
                      {srv.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-white font-semibold text-base mb-3">{srv.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{srv.body}</p>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: hoveredCard === i ? "56px" : "0px" }}
                >
                  <p className="text-[#4D9FEC] text-xs italic">{srv.claim}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="py-20 px-6 bg-[#0F1628]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#4D9FEC] text-sm font-semibold uppercase tracking-widest mb-4 text-center">
            {t.comoLabel}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14" style={gradStyle}>
            {t.comoTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.pasos.map((paso, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-full border border-[#1B4FD8] flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#4D9FEC] font-bold text-sm">{paso.num}</span>
                </div>
                <h3 className="text-white font-semibold mb-2">{paso.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{paso.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN NOVA */}
      <section className="py-20 px-6 bg-[#0A0E1A]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#4D9FEC] text-sm font-semibold uppercase tracking-widest mb-4 text-center">
            {t.novaLabel}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6" style={gradStyle}>
            {t.novaTitle}
          </h2>
          <p className="text-gray-300 text-center text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            {t.novaBody}
          </p>

          {/* Panel decorativo preguntas */}
          <div className="bg-[#0F1628] border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#4D9FEC]/20 flex items-center justify-center">
                <span className="text-[#4D9FEC] text-xs font-bold">N</span>
              </div>
              <span className="text-white font-semibold">NOVA</span>
              <span className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>
            <div className="space-y-3">
              {t.novaPreguntas.map((q, i) => (
                <button
                  key={i}
                  onClick={() => abrirAgente("NOVA")}
                  className="w-full text-left px-4 py-3 rounded-lg border border-white/10 hover:border-[#4D9FEC]/50 hover:bg-[#4D9FEC]/5 text-gray-300 text-sm transition-all duration-200"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => abrirAgente("NOVA")}
              className="px-8 py-3 bg-[#4D9FEC] hover:bg-[#3a8fd9] text-white font-semibold rounded-lg transition-colors"
            >
              {t.novaBtn}
            </button>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 px-6 bg-[#070A12]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4" style={gradStyle}>
            {t.ctaTitle}
          </h2>
          <p className="text-gray-400 text-lg mb-10">{t.ctaSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
              href={`/${locale}/socios`}
              className="px-8 py-3 bg-[#1B4FD8] hover:bg-[#1640b0] text-white font-semibold rounded-lg transition-colors"
            >
              {t.ctaSocio}
            </a>
            <button
              onClick={() => setContactOpen(true)}
              className="px-8 py-3 border border-white/30 hover:border-white/60 text-white font-semibold rounded-lg transition-colors"
            >
              {t.ctaContacto}
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} locale={locale} />
    </div>
  );
}
