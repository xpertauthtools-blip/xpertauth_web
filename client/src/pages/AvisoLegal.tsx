import { useEffect } from "react";
import { useParams } from "wouter";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const sections = {
  es: {
    title: "Aviso Legal",
    updated: "Última actualización: marzo de 2026",
    intro: "Información legal sobre la titularidad, condiciones de uso y responsabilidades asociadas a este sitio web.",
    items: [
      {
        id: "titular",
        title: "01 · Titular del sitio web",
        content: `Nombre: XpertAuth
Naturaleza jurídica: Asociación sin ánimo de lucro (en proceso de constitución)
Domicilio: Figueres, Girona, Catalunya, España
CIF: [pendiente de registro]
Email: info@xpertauth.com
Web: https://xpertauth-web.vercel.app`
      },
      {
        id: "objeto",
        title: "02 · Objeto y actividad",
        content: `XpertAuth es una iniciativa sin ánimo de lucro que combina experiencia profesional en transporte especial de mercancías con herramientas de inteligencia artificial, con el objetivo de:

• Ofrecer orientación normativa y asesoría en transporte especial por carretera.
• Facilitar el acceso a herramientas de IA para pequeñas y medianas empresas.
• Impartir formación digital gratuita para personas mayores.

La formación senior es siempre gratuita. XpertAuth no persigue beneficio económico.`
      },
      {
        id: "propiedad",
        title: "03 · Propiedad intelectual",
        content: `Los contenidos de este sitio web — textos, imágenes, logotipos, estructura y diseño — son propiedad de XpertAuth o se utilizan con los permisos correspondientes.

Queda prohibida su reproducción, distribución o comunicación pública sin autorización expresa, salvo para uso personal y no comercial.

Parte del contenido ha sido creado con asistencia de Inteligencia Artificial, según se indica en el pie de página.`
      },
      {
        id: "responsabilidad",
        title: "04 · Limitación de responsabilidad",
        content: `XpertAuth pone el máximo cuidado en la exactitud de la información publicada, pero no garantiza que esté completa, actualizada o libre de errores.

La información normativa publicada (DGT, SCT, legislación de transporte) tiene carácter orientativo. Para decisiones con implicaciones legales o económicas, recomendamos consultar fuentes oficiales o profesionales habilitados.

XpertAuth no se responsabiliza de los daños que puedan derivarse del uso de la información contenida en este sitio.`
      },
      {
        id: "enlaces",
        title: "05 · Enlaces externos",
        content: `Esta web puede contener enlaces a sitios de terceros (DGT, SCT Catalunya, BOE, DOGC, herramientas de IA, etc.). XpertAuth no controla esos sitios ni se responsabiliza de su contenido o políticas de privacidad.

La inclusión de un enlace no implica recomendación ni relación comercial con el sitio enlazado.`
      },
      {
        id: "legislacion",
        title: "06 · Legislación aplicable",
        content: `Este aviso legal se rige por la legislación española vigente, en particular:

• Ley 34/2002, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE).
• Reglamento (UE) 2016/679 de Protección de Datos (RGPD).
• Ley Orgánica 3/2018 de Protección de Datos Personales (LOPDGDD).

Para cualquier controversia, las partes se someten a los juzgados y tribunales de Girona, Catalunya.`
      },
    ]
  }
};

export default function AvisoLegal() {
  const params = useParams<{ locale: string }>();
  const locale = "es";
  const s = sections[locale];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0E1A]">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.5s ease forwards; }
        .legal-card { transition: border-color 0.2s ease; }
        .legal-card:hover { border-color: rgba(77,159,236,0.3); }
      `}</style>

      <Navbar />

      {/* HERO */}
      <section className="pt-32 pb-12 px-6 bg-[#0A0E1A]">
        <div className="max-w-3xl mx-auto fade-up">
          <span className="inline-block text-xs font-semibold tracking-widest text-[#4D9FEC] uppercase mb-4 border border-[#4D9FEC]/30 px-3 py-1 rounded-full">
            Legal
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {s.title}
          </h1>
          <p className="text-white/40 text-sm">{s.updated}</p>
          <p className="text-white/60 text-lg mt-6 leading-relaxed">{s.intro}</p>
        </div>
      </section>

      {/* ÍNDICE */}
      <section className="px-6 pb-8 bg-[#0A0E1A]">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {s.items.map(item => (
              <a
                key={item.id}
                href={"#" + item.id}
                className="text-xs text-white/40 hover:text-[#4D9FEC] border border-white/10 hover:border-[#4D9FEC]/30 px-3 py-1.5 rounded-full transition-all"
              >
                {item.title.split(" · ")[1]}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIONES */}
      <section className="px-6 pb-20 bg-[#0A0E1A]">
        <div className="max-w-3xl mx-auto space-y-4">
          {s.items.map((item, i) => (
            <div
              key={item.id}
              id={item.id}
              className="legal-card bg-[#0F1628] border border-white/8 rounded-xl p-7 scroll-mt-24"
              style={{ animationDelay: (i * 0.05) + "s" }}
            >
              <h2 className="text-xs font-bold text-[#4D9FEC] mb-4 tracking-wide uppercase">
                {item.title}
              </h2>
              <div className="text-white/65 text-sm leading-relaxed whitespace-pre-line">
                {item.content}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
