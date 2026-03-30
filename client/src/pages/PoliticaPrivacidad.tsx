import { useEffect } from "react";
import { useParams } from "wouter";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const data: Record<string, {
  title: string; updated: string; intro: string;
  items: { id: string; title: string; content: string }[];
}> = {
  es: {
    title: "Política de Privacidad",
    updated: "Última actualización: marzo de 2026",
    intro: "En XpertAuth nos tomamos muy en serio la privacidad de las personas que interactúan con nuestra web. Esta política explica qué datos recogemos, por qué y cómo los protegemos.",
    items: [
      { id: "responsable", title: "01 · Responsable del tratamiento", content: `XpertAuth (asociación sin ánimo de lucro en proceso de constitución)\nDomicilio: Figueres, Girona, Catalunya\nEmail: info@xpertauth.com\nCIF: [pendiente de registro]` },
      { id: "datos", title: "02 · Qué datos recogemos", content: `Recogemos únicamente los datos que tú nos proporcionas de forma voluntaria:\n\n• Nombre y teléfono: cuando te apuntas a la formación senior o solicitas información.\n• Email: cuando te suscribes al blog o al newsletter, o cuando contactas con nosotros.\n• Nombre y email de sesión: cuando inicias sesión con Google OAuth para acceder como socio.\n\nNo recogemos datos de navegación, no usamos cookies de publicidad ni vendemos datos a terceros.` },
      { id: "finalidad", title: "03 · Para qué usamos tus datos", content: `• Gestionar tu inscripción a la formación senior y ponernos en contacto contigo.\n• Enviarte el newsletter o las actualizaciones del blog si te has suscrito.\n• Gestionar tu acceso como socio de XpertAuth.\n• Responder a tus consultas a través del formulario de contacto.\n\nNunca usaremos tus datos para fines distintos a los que motivaron su recogida.` },
      { id: "base", title: "04 · Base legal", content: `El tratamiento de tus datos se basa en:\n• Tu consentimiento explícito, cuando marcas la casilla de aceptación o te suscribes voluntariamente.\n• La ejecución de una relación (socio, inscrito) cuando así lo solicitas.\n\nPuedes retirar tu consentimiento en cualquier momento escribiéndonos a info@xpertauth.com.` },
      { id: "conservacion", title: "05 · Cuánto tiempo guardamos tus datos", content: `Guardamos tus datos mientras mantengas tu relación con XpertAuth o hasta que solicites su eliminación.\n\nSi te das de baja o cancelas tu cuenta, eliminamos tus datos en un plazo máximo de 30 días.` },
      { id: "terceros", title: "06 · Proveedores técnicos", content: `• Supabase (base de datos) — servidores en la Unión Europea.\n• Vercel (hosting) — con garantías de transferencia internacional adecuadas.\n• Resend (emails transaccionales) — solo para notificaciones del sistema.\n• Google (autenticación OAuth) — si inicias sesión con Google.\n\nNinguno de estos proveedores usa tus datos para sus propios fines comerciales.` },
      { id: "derechos", title: "07 · Tus derechos", content: `Tienes derecho a acceder, rectificar, eliminar y portar tus datos, así como a oponerte a su tratamiento.\n\nEscríbenos a info@xpertauth.com. Responderemos en un plazo máximo de 30 días.\n\nTambién puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).` },
    ]
  },
  ca: {
    title: "Política de Privacitat",
    updated: "Darrera actualització: març de 2026",
    intro: "A XpertAuth ens prenem molt seriosament la privacitat de les persones que interactuen amb el nostre web. Aquesta política explica quines dades recollim, per què i com les protegim.",
    items: [
      { id: "responsable", title: "01 · Responsable del tractament", content: `XpertAuth (associació sense ànim de lucre en procés de constitució)\nDomicili: Figueres, Girona, Catalunya\nEmail: info@xpertauth.com\nCIF: [pendent de registre]` },
      { id: "dades", title: "02 · Quines dades recollim", content: `Recollim únicament les dades que tu ens proporciones de manera voluntària:\n\n• Nom i telèfon: quan t'apuntes a la formació sènior o sol·licites informació.\n• Email: quan et subscrius al blog o al newsletter, o quan contactes amb nosaltres.\n• Nom i email de sessió: quan inicies sessió amb Google OAuth per accedir com a soci.\n\nNo recollim dades de navegació, no fem servir cookies de publicitat ni venem dades a tercers.` },
      { id: "finalitat", title: "03 · Per a què fem servir les teves dades", content: `• Gestionar la teva inscripció a la formació sènior i posar-nos en contacte amb tu.\n• Enviar-te el newsletter o les actualitzacions del blog si t'hi has subscrit.\n• Gestionar el teu accés com a soci de XpertAuth.\n• Respondre a les teves consultes a través del formulari de contacte.` },
      { id: "base", title: "04 · Base legal", content: `El tractament de les teves dades es basa en:\n• El teu consentiment explícit, quan marques la casella d'acceptació o et subscrius voluntàriament.\n• L'execució d'una relació (soci, inscrit) quan ho sol·licites.\n\nPots retirar el teu consentiment en qualsevol moment escrivint-nos a info@xpertauth.com.` },
      { id: "conservacio", title: "05 · Quant de temps guardem les teves dades", content: `Guardem les teves dades mentre mantinguis la teva relació amb XpertAuth o fins que sol·licitis la seva eliminació.\n\nSi et dones de baixa o cancel·les el teu compte, eliminem les teves dades en un termini màxim de 30 dies.` },
      { id: "tercers", title: "06 · Proveïdors tècnics", content: `• Supabase (base de dades) — servidors a la Unió Europea.\n• Vercel (allotjament) — amb garanties de transferència internacional adequades.\n• Resend (emails transaccionals) — només per a notificacions del sistema.\n• Google (autenticació OAuth) — si inicies sessió amb Google.` },
      { id: "drets", title: "07 · Els teus drets", content: `Tens dret a accedir, rectificar, eliminar i portar les teves dades, així com a oposar-te al seu tractament.\n\nEscriu-nos a info@xpertauth.com. Respondrem en un termini màxim de 30 dies.\n\nTambé pots reclamar davant l'Agència Espanyola de Protecció de Dades (aepd.es).` },
    ]
  },
  en: {
    title: "Privacy Policy",
    updated: "Last updated: March 2026",
    intro: "At XpertAuth, we take the privacy of everyone who interacts with our website very seriously. This policy explains what data we collect, why, and how we protect it.",
    items: [
      { id: "controller", title: "01 · Data Controller", content: `XpertAuth (non-profit association in the process of incorporation)\nAddress: Figueres, Girona, Catalonia, Spain\nEmail: info@xpertauth.com\nTax ID: [pending registration]` },
      { id: "data", title: "02 · What data we collect", content: `We only collect data that you voluntarily provide to us:\n\n• Name and phone: when you sign up for senior training or request information.\n• Email: when you subscribe to the blog or newsletter, or when you contact us.\n• Name and session email: when you log in with Google OAuth as a member.\n\nWe do not collect browsing data, use advertising cookies, or sell data to third parties.` },
      { id: "purpose", title: "03 · How we use your data", content: `• Managing your senior training registration and contacting you.\n• Sending you the newsletter or blog updates if you have subscribed.\n• Managing your access as an XpertAuth member.\n• Responding to your queries through the contact form.` },
      { id: "legal", title: "04 · Legal basis", content: `Processing of your data is based on:\n• Your explicit consent, when you tick the acceptance box or subscribe voluntarily.\n• The execution of a relationship (member, registrant) when you request it.\n\nYou can withdraw your consent at any time by writing to info@xpertauth.com.` },
      { id: "retention", title: "05 · How long we keep your data", content: `We keep your data while you maintain your relationship with XpertAuth or until you request its deletion.\n\nIf you unsubscribe or cancel your account, we delete your data within a maximum of 30 days.` },
      { id: "providers", title: "06 · Technical providers", content: `• Supabase (database) — servers in the European Union.\n• Vercel (hosting) — with adequate international transfer guarantees.\n• Resend (transactional emails) — only for system notifications.\n• Google (OAuth authentication) — if you log in with Google.` },
      { id: "rights", title: "07 · Your rights", content: `You have the right to access, rectify, delete and port your data, as well as to object to its processing.\n\nWrite to us at info@xpertauth.com. We will respond within a maximum of 30 days.\n\nYou may also lodge a complaint with the Spanish Data Protection Agency (aepd.es).` },
    ]
  },
  fr: {
    title: "Politique de Confidentialité",
    updated: "Dernière mise à jour : mars 2026",
    intro: "Chez XpertAuth, nous prenons très au sérieux la confidentialité des personnes qui interagissent avec notre site. Cette politique explique quelles données nous collectons, pourquoi et comment nous les protégeons.",
    items: [
      { id: "responsable", title: "01 · Responsable du traitement", content: `XpertAuth (association à but non lucratif en cours de constitution)\nAdresse : Figueres, Gérone, Catalogne, Espagne\nEmail : info@xpertauth.com\nNuméro fiscal : [en attente d'enregistrement]` },
      { id: "donnees", title: "02 · Données que nous collectons", content: `Nous ne collectons que les données que vous nous fournissez volontairement :\n\n• Nom et téléphone : lors de votre inscription à la formation senior ou d'une demande d'information.\n• Email : lors de votre abonnement au blog ou à la newsletter, ou lors d'un contact.\n• Nom et email de session : lors de la connexion avec Google OAuth en tant que membre.` },
      { id: "finalite", title: "03 · Comment nous utilisons vos données", content: `• Gérer votre inscription à la formation senior et vous contacter.\n• Vous envoyer la newsletter ou les mises à jour du blog si vous êtes abonné.\n• Gérer votre accès en tant que membre XpertAuth.\n• Répondre à vos questions via le formulaire de contact.` },
      { id: "base", title: "04 · Base légale", content: `Le traitement de vos données est basé sur :\n• Votre consentement explicite, lorsque vous cochez la case d'acceptation ou vous abonnez volontairement.\n• L'exécution d'une relation (membre, inscrit) lorsque vous le demandez.\n\nVous pouvez retirer votre consentement à tout moment en nous écrivant à info@xpertauth.com.` },
      { id: "conservation", title: "05 · Durée de conservation", content: `Nous conservons vos données tant que vous maintenez votre relation avec XpertAuth ou jusqu'à ce que vous en demandiez la suppression.\n\nSi vous vous désinscrivez ou annulez votre compte, nous supprimons vos données dans un délai maximum de 30 jours.` },
      { id: "tiers", title: "06 · Prestataires techniques", content: `• Supabase (base de données) — serveurs dans l'Union européenne.\n• Vercel (hébergement) — avec des garanties de transfert international adéquates.\n• Resend (emails transactionnels) — uniquement pour les notifications système.\n• Google (authentification OAuth) — si vous vous connectez avec Google.` },
      { id: "droits", title: "07 · Vos droits", content: `Vous avez le droit d'accéder, de rectifier, de supprimer et de transférer vos données, ainsi que de vous opposer à leur traitement.\n\nÉcrivez-nous à info@xpertauth.com. Nous répondrons dans un délai maximum de 30 jours.\n\nVous pouvez également déposer une plainte auprès de l'Agence espagnole de protection des données (aepd.es).` },
    ]
  }
};

export default function PoliticaPrivacidad() {
  const params = useParams<{ locale: string }>();
  const locale = params.locale && data[params.locale] ? params.locale : "es";
  const s = data[locale];

  useEffect(() => { window.scrollTo(0, 0); }, []);

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
