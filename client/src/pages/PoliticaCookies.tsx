import { useEffect } from "react";
import { useParams } from "wouter";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const sections = {
  es: {
    title: "Política de Cookies",
    updated: "Última actualización: marzo de 2026",
    intro: "Esta página explica qué son las cookies, cuáles usamos en XpertAuth y cómo puedes gestionarlas.",
    items: [
      {
        id: "que-son",
        title: "01 · ¿Qué son las cookies?",
        content: `Las cookies son pequeños archivos de texto que los sitios web guardan en tu dispositivo cuando los visitas. Sirven para recordar preferencias, mantener sesiones activas y mejorar la experiencia de navegación.`
      },
      {
        id: "cuales-usamos",
        title: "02 · Cookies que usamos",
        content: `XpertAuth utiliza únicamente cookies técnicas y funcionales, estrictamente necesarias para el funcionamiento del sitio:

• Sesión de usuario (Supabase Auth): si inicias sesión con Google, se almacena un token de sesión para mantenerte autenticado. Se elimina al cerrar sesión o al expirar.

• Preferencia de idioma: guardamos tu idioma seleccionado (ES / CA / EN / FR) para que no tengas que elegirlo en cada visita.

• Preferencia de cookies: guardamos si has aceptado o rechazado esta política para no mostrarte el banner repetidamente.

No usamos cookies de publicidad, seguimiento ni analítica de terceros.`
      },
      {
        id: "no-usamos",
        title: "03 · Lo que NO hacemos",
        content: `• No instalamos cookies de Google Analytics ni de ninguna otra herramienta de analítica.
• No usamos píxeles de seguimiento de Meta, X ni ninguna red social.
• No compartimos datos de navegación con terceros.
• No mostramos publicidad personalizada.`
      },
      {
        id: "gestion",
        title: "04 · Cómo gestionar las cookies",
        content: `Puedes gestionar o eliminar las cookies desde la configuración de tu navegador:

• Chrome: Configuración → Privacidad y seguridad → Cookies
• Safari: Preferencias → Privacidad
• Firefox: Opciones → Privacidad y seguridad
• Edge: Configuración → Privacidad, búsqueda y servicios

Ten en cuenta que desactivar las cookies técnicas puede afectar al funcionamiento del sitio, especialmente el inicio de sesión.`
      },
      {
        id: "cambios",
        title: "05 · Cambios en esta política",
        content: `Si en el futuro incorporamos nuevas funcionalidades que impliquen cookies adicionales, actualizaremos esta política y volveremos a solicitar tu consentimiento si fuera necesario.

Para cualquier duda: info@xpertauth.com`
      },
    ]
  }
};

export default function PoliticaCookies() {
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

      {/* TABLA RESUMEN */}
      <section className="px-6 pb-8 bg-[#0A0E1A]">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#0F1628] border border-white/8 rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 bg-white/5 px-5 py-3 text-xs font-bold text-white/40 uppercase tracking-wider">
              <span>Cookie</span>
              <span>Tipo</span>
              <span>Duración</span>
            </div>
            {[
              ["Sesión de usuario", "Funcional", "Hasta cerrar sesión"],
              ["Idioma preferido", "Funcional", "1 año"],
              ["Preferencia cookies", "Técnica", "1 año"],
            ].map(([name, type, duration], i) => (
              <div key={i} className="grid grid-cols-3 px-5 py-3.5 border-t border-white/5 text-sm text-white/60">
                <span className="text-white/80 font-medium">{name}</span>
                <span className="text-[#4D9FEC]">{type}</span>
                <span>{duration}</span>
              </div>
            ))}
          </div>
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
