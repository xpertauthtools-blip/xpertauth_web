import { useState } from "react";
import { Mail, Phone, MapPin, Loader2, CheckCircle } from "lucide-react";
import { SiLinkedin, SiInstagram } from "react-icons/si";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useTranslations } from "@/i18n/context";

export default function Footer() {
  const { t, messages } = useTranslations("footer");
  const m = messages as any;
  const { t: navT } = useTranslations("nav");

  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: { email: string }) => {
      const res = await apiRequest("POST", "/api/newsletter", data);
      return res.json();
    },
    onSuccess: () => { setSuccess(true); setEmail(""); },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    mutation.mutate({ email });
  };

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

  return (
    <footer className="bg-obsidian-deep pt-16 pb-8" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-xpertblue flex items-center justify-center">
                <span className="font-heading font-bold text-pure text-sm">X</span>
              </div>
              <span className="font-heading font-semibold text-pure text-lg">Xpert<span className="text-arctic">Auth</span></span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6">{m.description}</p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-md bg-white/[0.05] flex items-center justify-center text-white/40 transition-colors" data-testid="link-linkedin" aria-label="LinkedIn"><SiLinkedin className="w-4 h-4" /></a>
              <a href="#" className="w-9 h-9 rounded-md bg-white/[0.05] flex items-center justify-center text-white/40 transition-colors" data-testid="link-instagram" aria-label="Instagram"><SiInstagram className="w-4 h-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-pure text-sm mb-4 uppercase tracking-wider">{m.quickLinks}</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button onClick={() => scrollTo(link.href)} className="text-white/40 text-sm transition-colors" data-testid={`link-footer-${link.href.replace("#", "")}`}>{link.label}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-pure text-sm mb-4 uppercase tracking-wider">{m.contact}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-arctic flex-shrink-0" />
                <a href="mailto:info@xpertauth.com" className="text-white/40 text-sm transition-colors" data-testid="link-footer-email">info@xpertauth.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-arctic flex-shrink-0" />
                <a href="tel:+34625897546" className="text-white/40 text-sm transition-colors" data-testid="link-footer-phone">+34 625 897 546</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-arctic flex-shrink-0 mt-0.5" />
                <span className="text-white/40 text-sm">{m.spain}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-pure text-sm mb-4 uppercase tracking-wider">{m.newsletter}</h4>
            <p className="text-white/40 text-sm mb-4">{m.newsletterSubtitle}</p>
            {success ? (
              <div className="flex items-center gap-2 text-arctic text-sm"><CheckCircle className="w-4 h-4" />{m.subscribed}</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={m.subscribePlaceholder} required className="w-full px-3 py-2.5 rounded-md bg-white/[0.05] border border-white/10 text-pure text-sm placeholder:text-white/20 focus:outline-none focus:border-arctic/40 transition-colors" data-testid="input-footer-newsletter" />
                <button type="submit" disabled={mutation.isPending} className="w-full py-2.5 bg-xpertblue text-pure text-sm font-semibold rounded-md transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2" data-testid="button-footer-newsletter">
                  {mutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : m.subscribeButton}
                </button>
                {mutation.isError && (
                  <p className="text-red-400 text-xs">
                    {(mutation.error as Error)?.message?.includes("409") ? m.subscribeErrorDuplicate : m.subscribeErrorGeneric}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/25 text-xs">
            <a href="#" data-testid="link-privacy">{m.privacy}</a>
            <span>|</span>
            <a href="#" data-testid="link-legal">{m.legal}</a>
            <span>|</span>
            <a href="#" data-testid="link-cookies">{m.cookies}</a>
          </div>
          <p className="text-white/20 text-xs text-center md:text-right">{m.aiDisclosure}</p>
        </div>

        <div className="mt-4 text-center">
          <p className="text-white/15 text-xs">&copy; {new Date().getFullYear()} XpertAuth. {m.rights}</p>
        </div>
      </div>
    </footer>
  );
}
