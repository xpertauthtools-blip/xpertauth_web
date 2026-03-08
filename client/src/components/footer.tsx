import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { SiLinkedin } from "react-icons/si";
import { useTranslations } from "@/i18n/context";

export default function Footer() {
  const { messages } = useTranslations("footer");
  const m = messages as any;
  const { t: navT } = useTranslations("nav");

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const quickLinks = [
    { label: navT("servicios"), href: "#servicios" },
    { label: navT("comoFunciona"), href: "#como-funciona" },
    { label: navT("formacionSenior"), href: "#formacion-senior" },
    { label: navT("blog"), href: "#blog" },
    { label: navT("hazteSocio"), href: "#hazte-socio" },
  ];

  const schedule = [
    { day: m.scheduleMonday, hours: "16:00 – 18:30" },
    { day: m.scheduleTueWedFri, hours: "09:00 – 13:00 / 16:00 – 18:30" },
  ];

  return (
    <footer id="contacto" className="bg-obsidian-deep pt-16 pb-8" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/[0.06]">

          {/* Columna 1 — Logo + descripción + LinkedIn */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-xpertblue flex items-center justify-center">
                <span className="font-heading font-bold text-pure text-sm">X</span>
              </div>
              <span className="font-heading font-semibold text-pure text-lg">
                Xpert<span className="text-arctic">Auth</span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">{m.description}</p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/josé-luis-echezarreta-fabregó-633b691b5"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-md bg-white/[0.05] flex items-center justify-center text-white/40 hover:text-arctic transition-colors"
                data-testid="link-linkedin"
                aria-label="LinkedIn"
              >
                <SiLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Columna 2 — Links rápidos */}
          <div>
            <h4 className="font-heading font-semibold text-pure text-sm mb-4 uppercase tracking-wider">
              {m.quickLinks}
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-white/50 text-sm hover:text-white/80 transition-colors"
                    data-testid={`link-footer-${link.href.replace("#", "")}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3 — Contacto */}
          <div>
            <h4 className="font-heading font-semibold text-pure text-sm mb-4 uppercase tracking-wider">
              {m.contact}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-arctic flex-shrink-0" />
                <a
                  href="mailto:info@xpertauth.com"
                  className="text-white/50 text-sm hover:text-white/80 transition-colors"
                  data-testid="link-footer-email"
                >
                  info@xpertauth.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-arctic flex-shrink-0" />
                <a
                  href="tel:+34625897546"
                  className="text-white/50 text-sm hover:text-white/80 transition-colors"
                  data-testid="link-footer-phone"
                >
                  +34 625 897 546
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-arctic flex-shrink-0 mt-0.5" />
                <span className="text-white/50 text-sm">{m.spain}</span>
              </li>
            </ul>
          </div>

          {/* Columna 4 — Horario de atención */}
          <div>
            <h4 className="font-heading font-semibold text-pure text-sm mb-4 uppercase tracking-wider">
              {m.scheduleTitle}
            </h4>
            <ul className="space-y-3 mb-5">
              {schedule.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-arctic flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white/70 text-xs font-medium">{item.day}</p>
                    <p className="text-white/50 text-xs">{item.hours}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex items-start gap-3">
              <div className="w-4 h-4 flex-shrink-0 mt-0.5 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-arctic animate-pulse" />
              </div>
              <div>
                <p className="text-white/70 text-xs font-medium">{m.scheduleAgents}</p>
                <p className="text-arctic text-xs font-semibold">24/7</p>
              </div>
            </div>
            <p className="mt-4 text-white/50 text-xs leading-relaxed">
              {m.scheduleResponse}
            </p>
          </div>

        </div>

        {/* Barra inferior */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/30 text-xs">
            <a href="#" className="hover:text-white/60 transition-colors" data-testid="link-privacy">
              {m.privacy}
            </a>
            <span>|</span>
            <a href="#" className="hover:text-white/60 transition-colors" data-testid="link-legal">
              {m.legal}
            </a>
            <span>|</span>
            <a href="#" className="hover:text-white/60 transition-colors" data-testid="link-cookies">
              {m.cookies}
            </a>
          </div>
          <p className="text-white/30 text-xs text-center md:text-right">{m.aiDisclosure}</p>
        </div>

        <div className="mt-4 text-center">
          <p className="text-white/20 text-xs">
            &copy; {new Date().getFullYear()} XpertAuth. {m.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
