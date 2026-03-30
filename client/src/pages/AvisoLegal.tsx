import { useEffect } from "react";
import { useParams } from "wouter";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const data: Record<string, {
  title: string; updated: string; intro: string;
  items: { id: string; title: string; content: string }[];
}> = {
  es: {
    title: "Aviso Legal",
    updated: "Última actualización: marzo de 2026",
    intro: "Información legal sobre la titularidad, condiciones de uso y responsabilidades asociadas a este sitio web.",
    items: [
      { id: "titular", title: "01 · Titular del sitio web", content: `Nombre: XpertAuth\nNaturaleza jurídica: Asociación sin ánimo de lucro (en proceso de constitución)\nDomicilio: Figueres, Girona, Catalunya, España\nCIF: [pendiente de registro]\nEmail: info@xpertauth.com` },
      { id: "objeto", title: "02 · Objeto y actividad", content: `XpertAuth es una iniciativa sin ánimo de lucro que combina experiencia profesional en transporte especial con inteligencia artificial, con el objetivo de:\n\n• Ofrecer orientación normativa en transporte especial por carretera.\n• Facilitar el acceso a herramientas de IA para PYMEs.\n• Impartir formación digital gratuita para personas mayores.\n\nLa formación senior es siempre gratuita. XpertAuth no persigue beneficio económico.` },
      { id: "propiedad", title: "03 · Propiedad intelectual", content: `Los contenidos de este sitio — textos, imágenes, logotipos, estructura y diseño — son propiedad de XpertAuth o se utilizan con los permisos correspondientes.\n\nQueda prohibida su reproducción sin autorización expresa, salvo para uso personal y no comercial.\n\nParte del contenido ha sido creado con asistencia de Inteligencia Artificial, según se indica en el pie de página.` },
      { id: "responsabilidad", title: "04 · Limitación de responsabilidad", content: `XpertAuth pone el máximo cuidado en la exactitud de la información publicada, pero no garantiza que esté completa, actualizada o libre de errores.\n\nLa información normativa publicada tiene carácter orientativo. Para decisiones con implicaciones legales o económicas, recomendamos consultar fuentes oficiales o profesionales habilitados.` },
      { id: "enlaces", title: "05 · Enlaces externos", content: `Esta web puede contener enlaces a sitios de terceros (DGT, SCT Catalunya, BOE, DOGC, etc.). XpertAuth no controla esos sitios ni se responsabiliza de su contenido.\n\nLa inclusión de un enlace no implica recomendación ni relación comercial con el sitio enlazado.` },
      { id: "legislacion", title: "06 · Legislación aplicable", content: `Este aviso legal se rige por la legislación española vigente, en particular:\n\n• Ley 34/2002, de Servicios de la Sociedad de la Información (LSSI-CE).\n• Reglamento (UE) 2016/679 de Protección de Datos (RGPD).\n• Ley Orgánica 3/2018 de Protección de Datos Personales (LOPDGDD).\n\nPara cualquier controversia, las partes se someten a los juzgados y tribunales de Girona, Catalunya.` },
    ]
  },
  ca: {
    title: "Avís Legal",
    updated: "Darrera actualització: març de 2026",
    intro: "Informació legal sobre la titularitat, condicions d'ús i responsabilitats associades a aquest lloc web.",
    items: [
      { id: "titular", title: "01 · Titular del lloc web", content: `Nom: XpertAuth\nNaturalesa jurídica: Associació sense ànim de lucre (en procés de constitució)\nDomicili: Figueres, Girona, Catalunya, Espanya\nCIF: [pendent de registre]\nEmail: info@xpertauth.com` },
      { id: "objecte", title: "02 · Objecte i activitat", content: `XpertAuth és una iniciativa sense ànim de lucre que combina experiència professional en transport especial amb intel·ligència artificial, amb l'objectiu de:\n\n• Oferir orientació normativa en transport especial per carretera.\n• Facilitar l'accés a eines d'IA per a pimes.\n• Impartir formació digital gratuïta per a persones grans.\n\nLa formació sènior és sempre gratuïta. XpertAuth no persegueix benefici econòmic.` },
      { id: "propietat", title: "03 · Propietat intel·lectual", content: `Els continguts d'aquest lloc — textos, imatges, logotips, estructura i disseny — són propietat de XpertAuth o s'utilitzen amb els permisos corresponents.\n\nQueda prohibida la seva reproducció sense autorització expressa, excepte per a ús personal i no comercial.` },
      { id: "responsabilitat", title: "04 · Limitació de responsabilitat", content: `XpertAuth posa el màxim cura en l'exactitud de la informació publicada, però no garanteix que estigui completa, actualitzada o lliure d'errors.\n\nLa informació normativa publicada té caràcter orientatiu. Per a decisions amb implicacions legals o econòmiques, recomanem consultar fonts oficials o professionals habilitats.` },
      { id: "enllacos", title: "05 · Enllaços externs", content: `Aquest web pot contenir enllaços a llocs de tercers (DGT, SCT Catalunya, BOE, DOGC, etc.). XpertAuth no controla aquests llocs ni es responsabilitza del seu contingut.` },
      { id: "legislacio", title: "06 · Legislació aplicable", content: `Aquest avís legal es regeix per la legislació espanyola vigent, en particular:\n\n• Llei 34/2002, de Serveis de la Societat de la Informació (LSSI-CE).\n• Reglament (UE) 2016/679 de Protecció de Dades (RGPD).\n• Llei Orgànica 3/2018 de Protecció de Dades Personals (LOPDGDD).` },
    ]
  },
  en: {
    title: "Legal Notice",
    updated: "Last updated: March 2026",
    intro: "Legal information about the ownership, terms of use and responsibilities associated with this website.",
    items: [
      { id: "owner", title: "01 · Website Owner", content: `Name: XpertAuth\nLegal form: Non-profit association (in the process of incorporation)\nAddress: Figueres, Girona, Catalonia, Spain\nTax ID: [pending registration]\nEmail: info@xpertauth.com` },
      { id: "purpose", title: "02 · Purpose and activity", content: `XpertAuth is a non-profit initiative combining professional expertise in special transport with artificial intelligence, with the aim of:\n\n• Providing regulatory guidance on special road transport.\n• Facilitating access to AI tools for SMEs.\n• Delivering free digital training for seniors.\n\nSenior training is always free. XpertAuth does not pursue economic profit.` },
      { id: "ip", title: "03 · Intellectual property", content: `The contents of this site — texts, images, logos, structure and design — are the property of XpertAuth or are used with the corresponding permissions.\n\nReproduction without express authorisation is prohibited, except for personal, non-commercial use.` },
      { id: "liability", title: "04 · Limitation of liability", content: `XpertAuth takes the utmost care in the accuracy of published information, but does not guarantee that it is complete, up to date or error-free.\n\nPublished regulatory information is for guidance only. For decisions with legal or economic implications, we recommend consulting official sources or qualified professionals.` },
      { id: "links", title: "05 · External links", content: `This website may contain links to third-party sites. XpertAuth does not control those sites and is not responsible for their content.\n\nThe inclusion of a link does not imply endorsement or any commercial relationship with the linked site.` },
      { id: "law", title: "06 · Applicable law", content: `This legal notice is governed by Spanish law, in particular:\n\n• Law 34/2002 on Information Society Services (LSSI-CE).\n• EU Regulation 2016/679 on Data Protection (GDPR).\n• Organic Law 3/2018 on Personal Data Protection (LOPDGDD).\n\nFor any dispute, the parties submit to the courts and tribunals of Girona, Catalonia.` },
    ]
  },
  fr: {
    title: "Mentions Légales",
    updated: "Dernière mise à jour : mars 2026",
    intro: "Informations légales sur la propriété, les conditions d'utilisation et les responsabilités associées à ce site web.",
    items: [
      { id: "proprietaire", title: "01 · Propriétaire du site", content: `Nom : XpertAuth\nForme juridique : Association à but non lucratif (en cours de constitution)\nAdresse : Figueres, Gérone, Catalogne, Espagne\nNuméro fiscal : [en attente d'enregistrement]\nEmail : info@xpertauth.com` },
      { id: "objet", title: "02 · Objet et activité", content: `XpertAuth est une initiative à but non lucratif combinant expertise professionnelle en transport spécial et intelligence artificielle, avec pour objectif de :\n\n• Fournir des conseils réglementaires sur le transport routier spécial.\n• Faciliter l'accès aux outils d'IA pour les PME.\n• Dispenser une formation numérique gratuite aux seniors.\n\nLa formation senior est toujours gratuite. XpertAuth ne poursuit pas de bénéfice économique.` },
      { id: "propriete", title: "03 · Propriété intellectuelle", content: `Les contenus de ce site — textes, images, logos, structure et design — sont la propriété de XpertAuth ou sont utilisés avec les autorisations correspondantes.\n\nLeur reproduction sans autorisation expresse est interdite, sauf pour usage personnel et non commercial.` },
      { id: "responsabilite", title: "04 · Limitation de responsabilité", content: `XpertAuth apporte le plus grand soin à l'exactitude des informations publiées, mais ne garantit pas qu'elles soient complètes, à jour ou exemptes d'erreurs.\n\nLes informations réglementaires publiées sont indicatives. Pour des décisions ayant des implications juridiques ou économiques, nous recommandons de consulter des sources officielles.` },
      { id: "liens", title: "05 · Liens externes", content: `Ce site peut contenir des liens vers des sites tiers. XpertAuth ne contrôle pas ces sites et n'est pas responsable de leur contenu.` },
      { id: "legislation", title: "06 · Législation applicable", content: `Ces mentions légales sont régies par la législation espagnole en vigueur, notamment :\n\n• Loi 34/2002 sur les services de la société de l'information (LSSI-CE).\n• Règlement (UE) 2016/679 sur la protection des données (RGPD).\n• Loi organique 3/2018 sur la protection des données personnelles (LOPDGDD).` },
    ]
  }
};

export default function AvisoLegal() {
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
