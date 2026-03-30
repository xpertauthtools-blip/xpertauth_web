import { useEffect } from "react";
import { useParams } from "wouter";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const data: Record<string, {
  title: string; updated: string; intro: string;
  table: { name: string; type: string; duration: string }[];
  items: { id: string; title: string; content: string }[];
}> = {
  es: {
    title: "Política de Cookies",
    updated: "Última actualización: marzo de 2026",
    intro: "Esta página explica qué son las cookies, cuáles usamos en XpertAuth y cómo puedes gestionarlas.",
    table: [
      { name: "Sesión de usuario", type: "Funcional", duration: "Hasta cerrar sesión" },
      { name: "Idioma preferido", type: "Funcional", duration: "1 año" },
      { name: "Preferencia cookies", type: "Técnica", duration: "1 año" },
    ],
    items: [
      { id: "que-son", title: "01 · ¿Qué son las cookies?", content: `Las cookies son pequeños archivos de texto que los sitios web guardan en tu dispositivo cuando los visitas. Sirven para recordar preferencias, mantener sesiones activas y mejorar la experiencia de navegación.` },
      { id: "cuales", title: "02 · Cookies que usamos", content: `XpertAuth utiliza únicamente cookies técnicas y funcionales, estrictamente necesarias para el funcionamiento del sitio:\n\n• Sesión de usuario (Supabase Auth): si inicias sesión con Google, se almacena un token de sesión para mantenerte autenticado.\n• Preferencia de idioma: guardamos tu idioma seleccionado (ES / CA / EN / FR).\n• Preferencia de cookies: guardamos si has aceptado o rechazado esta política.\n\nNo usamos cookies de publicidad, seguimiento ni analítica de terceros.` },
      { id: "no-usamos", title: "03 · Lo que NO hacemos", content: `• No instalamos cookies de Google Analytics ni de ninguna herramienta de analítica.\n• No usamos píxeles de seguimiento de Meta, X ni ninguna red social.\n• No compartimos datos de navegación con terceros.\n• No mostramos publicidad personalizada.` },
      { id: "gestion", title: "04 · Cómo gestionar las cookies", content: `Puedes gestionar o eliminar las cookies desde la configuración de tu navegador:\n\n• Chrome: Configuración → Privacidad y seguridad → Cookies\n• Safari: Preferencias → Privacidad\n• Firefox: Opciones → Privacidad y seguridad\n• Edge: Configuración → Privacidad, búsqueda y servicios` },
      { id: "cambios", title: "05 · Cambios en esta política", content: `Si en el futuro incorporamos nuevas funcionalidades que impliquen cookies adicionales, actualizaremos esta política y volveremos a solicitar tu consentimiento si fuera necesario.\n\nPara cualquier duda: info@xpertauth.com` },
    ]
  },
  ca: {
    title: "Política de Cookies",
    updated: "Darrera actualització: març de 2026",
    intro: "Aquesta pàgina explica què són les cookies, quines fem servir a XpertAuth i com les pots gestionar.",
    table: [
      { name: "Sessió d'usuari", type: "Funcional", duration: "Fins a tancar sessió" },
      { name: "Idioma preferit", type: "Funcional", duration: "1 any" },
      { name: "Preferència cookies", type: "Tècnica", duration: "1 any" },
    ],
    items: [
      { id: "que-son", title: "01 · Què són les cookies?", content: `Les cookies són petits fitxers de text que els llocs web guarden al teu dispositiu quan els visites. Serveixen per recordar preferències, mantenir sessions actives i millorar l'experiència de navegació.` },
      { id: "quines", title: "02 · Cookies que fem servir", content: `XpertAuth utilitza únicament cookies tècniques i funcionals, estrictament necessàries per al funcionament del lloc:\n\n• Sessió d'usuari (Supabase Auth): si inicies sessió amb Google, s'emmagatzema un token de sessió.\n• Preferència d'idioma: guardem el teu idioma seleccionat (ES / CA / EN / FR).\n• Preferència de cookies: guardem si has acceptat o rebutjat aquesta política.\n\nNo fem servir cookies de publicitat, seguiment ni analítica de tercers.` },
      { id: "no-fem", title: "03 · El que NO fem", content: `• No instal·lem cookies de Google Analytics ni de cap eina d'analítica.\n• No fem servir píxels de seguiment de Meta, X ni cap xarxa social.\n• No compartim dades de navegació amb tercers.\n• No mostrem publicitat personalitzada.` },
      { id: "gestio", title: "04 · Com gestionar les cookies", content: `Pots gestionar o eliminar les cookies des de la configuració del teu navegador:\n\n• Chrome: Configuració → Privadesa i seguretat → Cookies\n• Safari: Preferències → Privadesa\n• Firefox: Opcions → Privadesa i seguretat\n• Edge: Configuració → Privadesa, cerca i serveis` },
      { id: "canvis", title: "05 · Canvis en aquesta política", content: `Si en el futur incorporem noves funcionalitats que impliquin cookies addicionals, actualitzarem aquesta política.\n\nPer a qualsevol dubte: info@xpertauth.com` },
    ]
  },
  en: {
    title: "Cookie Policy",
    updated: "Last updated: March 2026",
    intro: "This page explains what cookies are, which ones we use at XpertAuth and how you can manage them.",
    table: [
      { name: "User session", type: "Functional", duration: "Until logout" },
      { name: "Language preference", type: "Functional", duration: "1 year" },
      { name: "Cookie preference", type: "Technical", duration: "1 year" },
    ],
    items: [
      { id: "what", title: "01 · What are cookies?", content: `Cookies are small text files that websites store on your device when you visit them. They are used to remember preferences, maintain active sessions and improve the browsing experience.` },
      { id: "which", title: "02 · Cookies we use", content: `XpertAuth uses only technical and functional cookies, strictly necessary for the site to work:\n\n• User session (Supabase Auth): if you log in with Google, a session token is stored to keep you authenticated.\n• Language preference: we store your selected language (ES / CA / EN / FR).\n• Cookie preference: we store whether you have accepted or rejected this policy.\n\nWe do not use advertising, tracking or third-party analytics cookies.` },
      { id: "not", title: "03 · What we do NOT do", content: `• We do not install Google Analytics or any analytics tool cookies.\n• We do not use tracking pixels from Meta, X or any social network.\n• We do not share browsing data with third parties.\n• We do not show personalised advertising.` },
      { id: "manage", title: "04 · How to manage cookies", content: `You can manage or delete cookies from your browser settings:\n\n• Chrome: Settings → Privacy and security → Cookies\n• Safari: Preferences → Privacy\n• Firefox: Options → Privacy and security\n• Edge: Settings → Privacy, search and services` },
      { id: "changes", title: "05 · Changes to this policy", content: `If we incorporate new features that involve additional cookies in the future, we will update this policy and request your consent again if necessary.\n\nFor any questions: info@xpertauth.com` },
    ]
  },
  fr: {
    title: "Politique de Cookies",
    updated: "Dernière mise à jour : mars 2026",
    intro: "Cette page explique ce que sont les cookies, lesquels nous utilisons chez XpertAuth et comment vous pouvez les gérer.",
    table: [
      { name: "Session utilisateur", type: "Fonctionnel", duration: "Jusqu'à déconnexion" },
      { name: "Langue préférée", type: "Fonctionnel", duration: "1 an" },
      { name: "Préférence cookies", type: "Technique", duration: "1 an" },
    ],
    items: [
      { id: "quoi", title: "01 · Que sont les cookies ?", content: `Les cookies sont de petits fichiers texte que les sites web enregistrent sur votre appareil lors de votre visite. Ils servent à mémoriser les préférences, maintenir les sessions actives et améliorer l'expérience de navigation.` },
      { id: "lesquels", title: "02 · Cookies que nous utilisons", content: `XpertAuth utilise uniquement des cookies techniques et fonctionnels, strictement nécessaires au fonctionnement du site :\n\n• Session utilisateur (Supabase Auth) : si vous vous connectez avec Google, un token de session est stocké.\n• Préférence de langue : nous enregistrons votre langue sélectionnée (ES / CA / EN / FR).\n• Préférence cookies : nous enregistrons si vous avez accepté ou refusé cette politique.\n\nNous n'utilisons pas de cookies publicitaires, de suivi ou d'analyse tiers.` },
      { id: "non", title: "03 · Ce que nous ne faisons PAS", content: `• Nous n'installons pas de cookies Google Analytics ni d'outil d'analyse.\n• Nous n'utilisons pas de pixels de suivi de Meta, X ou tout réseau social.\n• Nous ne partageons pas de données de navigation avec des tiers.\n• Nous n'affichons pas de publicité personnalisée.` },
      { id: "gerer", title: "04 · Comment gérer les cookies", content: `Vous pouvez gérer ou supprimer les cookies depuis les paramètres de votre navigateur :\n\n• Chrome : Paramètres → Confidentialité et sécurité → Cookies\n• Safari : Préférences → Confidentialité\n• Firefox : Options → Vie privée et sécurité\n• Edge : Paramètres → Confidentialité, recherche et services` },
      { id: "changements", title: "05 · Modifications de cette politique", content: `Si nous incorporons de nouvelles fonctionnalités impliquant des cookies supplémentaires, nous mettrons à jour cette politique.\n\nPour toute question : info@xpertauth.com` },
    ]
  }
};

export default function PoliticaCookies() {
  const params = useParams<{ locale: string }>();
  const locale = params.locale && data[params.locale] ? params.locale : "es";
  const s = data[locale];

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const tableHeaders: Record<string, [string, string, string]> = {
    es: ["Cookie", "Tipo", "Duración"],
    ca: ["Cookie", "Tipus", "Durada"],
    en: ["Cookie", "Type", "Duration"],
    fr: ["Cookie", "Type", "Durée"],
  };
  const [h1, h2, h3] = tableHeaders[locale];

  return (
    <div className="min-h-screen bg-[#0A0E1A]">
      <style>{`
        .legal-card { transition: border-color 0.2s ease; }
        .legal-card:hover { border-color: rgba(77,159,236,0.3); }
      `}</style>
      <Navbar />
      <section className="pt-32 pb-12 px-6 bg-[#0A0E1A]">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block text-xs font-semibold tracking-widest text-[#4D9FEC] uppercase mb-4 border border-[#4D9FEC]/30 px-3 py-1 rounded-full">Legal</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{s.title}</h1>
          <p className="text-white/40 text-sm">{s.updated}</p>
          <p className="text-white/60 text-lg mt-6 leading-relaxed">{s.intro}</p>
        </div>
      </section>
      <section className="px-6 pb-8 bg-[#0A0E1A]">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#0F1628] border border-white/8 rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 bg-white/5 px-5 py-3 text-xs font-bold text-white/40 uppercase tracking-wider">
              <span>{h1}</span><span>{h2}</span><span>{h3}</span>
            </div>
            {s.table.map((row, i) => (
              <div key={i} className="grid grid-cols-3 px-5 py-3.5 border-t border-white/5 text-sm text-white/60">
                <span className="text-white/80 font-medium">{row.name}</span>
                <span className="text-[#4D9FEC]">{row.type}</span>
                <span>{row.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-6 pb-8 bg-[#0A0E1A]">
        <div className="max-w-3xl mx-auto flex flex-wrap gap-2">
          {s.items.map(item => (
            <a key={item.id} href={"#" + item.id} className="text-xs text-white/40 hover:text-[#4D9FEC] border border-white/10 hover:border-[#4D9FEC]/30 px-3 py-1.5 rounded-full transition-all">
              {item.title.split(" · ")[1]}
            </a>
          ))}
        </div>
      </section>
      <section className="px-6 pb-20 bg-[#0A0E1A]">
        <div className="max-w-3xl mx-auto space-y-4">
          {s.items.map(item => (
            <div key={item.id} id={item.id} className="legal-card bg-[#0F1628] border border-white/8 rounded-xl p-7 scroll-mt-24">
              <h2 className="text-xs font-bold text-[#4D9FEC] mb-4 tracking-wide uppercase">{item.title}</h2>
              <div className="text-white/65 text-sm leading-relaxed whitespace-pre-line">{item.content}</div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
