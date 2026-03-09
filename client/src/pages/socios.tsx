import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const PLANES = [
  {
    id: "gratuito",
    nombre: "Usuario abierto",
    precio: "Gratis",
    desc: "Para explorar XpertAuth sin compromiso.",
    items: [
      "Blog y recursos públicos",
      "3 consultas/mes al agente IA",
      "Acceso a webinars abiertos",
    ],
    cta: "Empezar gratis",
    highlight: false,
  },
  {
    id: "individual",
    nombre: "Socio individual",
    precio: "5€/mes",
    precioAnual: "50€/año",
    desc: "Para profesionales que quieren respuestas reales.",
    items: [
      "Consultas ilimitadas al agente IA",
      "2h/año con José Luis",
      "Comunidad privada de socios",
      "Webinars exclusivos",
      "Acceso anticipado a nuevos servicios",
    ],
    cta: "Hazte socio",
    highlight: true,
  },
  {
    id: "corporativo",
    nombre: "Socio corporativo",
    precio: "Desde 300€/mes",
    desc: "Para empresas que necesitan soporte continuo.",
    items: [
      "Todo lo del plan individual",
      "Planificación de rutas y permisos",
      "Formación in-company en IA",
      "Soporte prioritario",
      "Factura mensual",
    ],
    cta: "Contactar",
    highlight: false,
  },
];

type FormState = "idle" | "loading" | "success" | "error";

export default function Socios() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tipo_socio: "individual",
    empresa: "",
    mensaje: "",
    acepta_privacidad: false,
  });
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [planSeleccionado, setPlanSeleccionado] = useState("individual");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handlePlan = (id: string) => {
    setPlanSeleccionado(id);
    setForm(prev => ({ ...prev, tipo_socio: id }));
    // Scroll al formulario
    document.getElementById("formulario-socio")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.acepta_privacidad) {
      setErrorMsg("Debes aceptar la política de privacidad para continuar.");
      return;
    }
    setFormState("loading");
    setErrorMsg("");

    const { error } = await supabase.from("socios").insert([
      {
        nombre: form.nombre,
        email: form.email,
        telefono: form.telefono || null,
        tipo_socio: form.tipo_socio,
        empresa: form.empresa || null,
        mensaje: form.mensaje || null,
        acepta_privacidad: form.acepta_privacidad,
        estado: "pendiente",
      },
    ]);

    if (error) {
      setFormState("error");
      setErrorMsg("Ha ocurrido un error. Por favor inténtalo de nuevo.");
    } else {
      setFormState("success");
    }
  };

  return (
    <div className="min-h-screen bg-obsidian">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 text-white/50 text-xs font-medium tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-arctic inline-block" />
              Membresía
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-pure leading-tight mb-6">
              El conocimiento experto<br />
              <span className="text-xpertblue">al alcance de todos.</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Elige el plan que mejor se adapta a ti. Sin permanencias. Cancela cuando quieras.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Planes */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANES.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.highlight
                  ? "bg-xpertblue border border-xpertblue shadow-2xl shadow-xpertblue/20 scale-105"
                  : "bg-white/5 border border-white/10"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-arctic text-obsidian text-xs font-bold px-3 py-1 rounded-full">
                    Más popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${plan.highlight ? "text-white/70" : "text-white/40"}`}>
                  {plan.nombre}
                </p>
                <p className={`font-heading text-3xl font-bold ${plan.highlight ? "text-pure" : "text-pure"}`}>
                  {plan.precio}
                </p>
                {plan.precioAnual && (
                  <p className="text-white/60 text-sm mt-1">o {plan.precioAnual}</p>
                )}
                <p className={`text-sm mt-3 ${plan.highlight ? "text-white/80" : "text-white/50"}`}>
                  {plan.desc}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className={`mt-0.5 text-lg leading-none ${plan.highlight ? "text-white" : "text-arctic"}`}>
                      ✓
                    </span>
                    <span className={`text-sm ${plan.highlight ? "text-white/90" : "text-white/60"}`}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePlan(plan.id)}
                className={`w-full py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  plan.highlight
                    ? "bg-pure text-obsidian hover:bg-white/90"
                    : "bg-white/10 text-pure hover:bg-white/20 border border-white/10"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Distribución de la cuota */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-8">Cómo se distribuye tu cuota de 5€/mes</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { pct: "40%", label: "Programas gratuitos para mayores" },
              { pct: "35%", label: "Infraestructura tecnológica" },
              { pct: "15%", label: "Seguros y administración" },
              { pct: "10%", label: "Fondo de reserva" },
            ].map((item) => (
              <div key={item.pct} className="text-center">
                <p className="font-heading text-3xl font-bold text-arctic">{item.pct}</p>
                <p className="text-white/50 text-xs mt-2 leading-snug">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulario */}
      <section id="formulario-socio" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl font-bold text-pure text-center mb-2">
              Solicitar membresía
            </h2>
            <p className="text-white/50 text-center text-sm mb-10">
              Rellena el formulario y te contactaremos en menos de 24 horas.
            </p>

            {formState === "success" ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="font-heading text-xl font-bold text-pure mb-2">¡Solicitud recibida!</h3>
                <p className="text-white/60 text-sm">
                  Gracias por tu interés en XpertAuth. Te contactaremos en menos de 24 horas.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Plan */}
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">
                    Plan seleccionado
                  </label>
                  <select
                    name="tipo_socio"
                    value={form.tipo_socio}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-pure text-sm focus:outline-none focus:border-arctic transition-colors"
                  >
                    <option value="gratuito">Usuario abierto — Gratis</option>
                    <option value="individual">Socio individual — 5€/mes</option>
                    <option value="corporativo">Socio corporativo — Desde 300€/mes</option>
                  </select>
                </div>

                {/* Nombre */}
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">
                    Nombre y apellidos *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Tu nombre completo"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-pure text-sm placeholder-white/20 focus:outline-none focus:border-arctic transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="tu@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-pure text-sm placeholder-white/20 focus:outline-none focus:border-arctic transition-colors"
                  />
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">
                    Teléfono <span className="normal-case text-white/30">(opcional)</span>
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    placeholder="+34 600 000 000"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-pure text-sm placeholder-white/20 focus:outline-none focus:border-arctic transition-colors"
                  />
                </div>

                {/* Empresa (solo corporativo) */}
                {form.tipo_socio === "corporativo" && (
                  <div>
                    <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">
                      Empresa
                    </label>
                    <input
                      type="text"
                      name="empresa"
                      value={form.empresa}
                      onChange={handleChange}
                      placeholder="Nombre de tu empresa"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-pure text-sm placeholder-white/20 focus:outline-none focus:border-arctic transition-colors"
                    />
                  </div>
                )}

                {/* Mensaje */}
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">
                    ¿En qué podemos ayudarte? <span className="normal-case text-white/30">(opcional)</span>
                  </label>
                  <textarea
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Cuéntanos brevemente tu situación o necesidad..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-pure text-sm placeholder-white/20 focus:outline-none focus:border-arctic transition-colors resize-none"
                  />
                </div>

                {/* Privacidad */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="acepta_privacidad"
                    id="acepta_privacidad"
                    checked={form.acepta_privacidad}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 accent-arctic"
                  />
                  <label htmlFor="acepta_privacidad" className="text-xs text-white/50 leading-relaxed">
                    He leído y acepto la{" "}
                    <a href="/es/privacidad" className="text-arctic underline underline-offset-2">
                      Política de Privacidad
                    </a>{" "}
                    y los{" "}
                    <a href="/es/terminos" className="text-arctic underline underline-offset-2">
                      Términos de Uso
                    </a>{" "}
                    de XpertAuth. *
                  </label>
                </div>

                {errorMsg && (
                  <p className="text-red-400 text-xs">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="w-full py-4 bg-xpertblue text-pure font-semibold rounded-lg text-sm transition-all duration-200 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formState === "loading" ? "Enviando..." : "Enviar solicitud"}
                </button>

                <p className="text-white/30 text-xs text-center">
                  XpertAuth está en proceso de constitución. Los pagos se activarán próximamente.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
