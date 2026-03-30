import { useEffect } from "react";
import { useParams } from "wouter";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const sections = {
  es: {
    title: "Política de Privacidad",
    updated: "Última actualización: marzo de 2026",
    intro: "En XpertAuth nos tomamos muy en serio la privacidad de las personas que interactúan con nuestra web. Esta política explica qué datos recogemos, por qué y cómo los protegemos.",
    items: [
      {
        id: "responsable",
        title: "01 · Responsable del tratamiento",
        content: `XpertAuth (asociación sin ánimo de lucro en proceso de constitución)
Domicilio: Figueres, Girona, Catalunya
Email de contacto: info@xpertauth.com
CIF: [pendiente de registro]`
      },
      {
        id: "datos",
        title: "02 · Qué datos recogemos",
        content: `Recogemos únicamente los datos que tú nos proporcionas de forma voluntaria:

• Nombre y teléfono: cuando te apuntas a la formación senior o solicitas información.
• Email: cuando te suscribes al blog o al newsletter, o cuando contactas con nosotros.
• Nombre y email de sesión: cuando inicias sesión con Google OAuth para acceder como socio.

No recogemos datos de navegación, no usamos cookies de publicidad ni vendemos datos a terceros.`
      },
      {
        id: "finalidad",
        title: "03 · Para qué usamos tus datos",
        content: `• Gestionar tu inscripción a la formación senior y ponernos en contacto contigo.
• Enviarte el newsletter o las actualizaciones del blog si te has suscrito.
• Gestionar tu acceso como socio de XpertAuth.
• Responder a tus consultas a través del formulario de contacto.

Nunca usaremos tus datos para fines distintos a los que motivaron su recogida.`
      },
      {
        id: "base",
        title: "04 · Base legal",
        content: `El tratamiento de tus datos se basa en:
• Tu consentimiento explícito, cuando marcas la casilla de aceptación o te suscribes voluntariamente.
• La ejecución de una relación (socio, inscrito) cuando así lo solicitas.

Puedes retirar tu consentimiento en cualquier momento escribiéndonos a info@xpertauth.com.`
      },
      {
        id: "conservacion",
        title: "05 · Cuánto tiempo guardamos tus datos",
        content: `Guardamos tus datos mientras mantengas tu relación con XpertAuth (suscripción activa, condición de socio, etc.) o hasta que solicites su eliminación.

Si te das de baja de una lista o cancelas tu cuenta, eliminamos tus datos en un plazo máximo de 30 días.`
      },
      {
        id: "terceros",
        title: "06 · Proveedores técnicos",
        content: `Para operar la web utilizamos los siguientes proveedores, que actúan como encargados del tratamiento:

• Supabase (base de datos) — servidores en la Unión Europea.
• Vercel (hosting y despliegue) — con garantías de transferencia internacional adecuadas.
• Resend (envío de emails transaccionales) — solo para notificaciones del sistema.
• Google (autenticación OAuth) — si inicias sesión con Google.

Ninguno de estos proveedores usa tus datos para sus propios fines comerciales.`
      },
      {
        id: "derechos",
        title: "07 · Tus derechos",
        content: `Tienes derecho a:
• Acceder a los datos que tenemos sobre ti.
• Rectificarlos si son incorrectos.
• Solicitar su eliminación.
• Oponerte a su tratamiento o solicitar su portabilidad.

Para ejercer cualquiera de estos derechos, escríbenos a info@xpertauth.com. Responderemos en un plazo máximo de 30 días.

También puedes presentar una reclamación ante la Agencia Española de Protección de Datos (aepd.es) si consideras que tus derechos no han sido atendidos.`
      },
    ]
  }
};

export default function PoliticaPrivacidad() {
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
        .legal-card {
          transition: border-color 0.2s ease;
        }
        .legal-card:hover {
          border-color: rgba(77,159,236,0.3);
        }
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
              <h2 className="text-base font-bold text-[#4D9FEC] mb-4 tracking-wide uppercase text-xs">
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
