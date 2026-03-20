import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useTranslations } from "@/i18n/context";
import { useLocation } from "wouter";

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{
      x: number; y: number; vx: number; vy: number; size: number; opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const initParticles = () => {
      particles.length = 0;
      const count = Math.min(70, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 12000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.8,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(77, 159, 236, ${p.opacity})`;
        ctx.fill();
      });

      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(77, 159, 236, ${0.18 * (1 - dist / 160)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    resize();
    initParticles();
    animate();

    const handleResize = () => { resize(); initParticles(); };
    window.addEventListener("resize", handleResize);
    return () => { cancelAnimationFrame(animationId); window.removeEventListener("resize", handleResize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.8 }} />;
}

export default function Hero() {
  const { t, locale } = useTranslations("hero");
  const [, navigate] = useLocation();
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-obsidian overflow-hidden" data-testid="section-hero">

      {/* Gradiente animado de fondo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 50%, rgba(27, 79, 216, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 80% 30%, rgba(77, 159, 236, 0.08) 0%, transparent 55%),
            radial-gradient(ellipse 50% 50% at 50% 80%, rgba(27, 79, 216, 0.06) 0%, transparent 50%)
          `,
          animation: "heroGlow 10s ease-in-out infinite alternate",
        }}
      />

      <ParticleField />

      {/* Gradiente fade hacia abajo */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-obsidian/70 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-32">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8">
            <div className="w-2 h-2 rounded-full bg-arctic animate-pulse" />
            <span className="text-white/60 text-xs font-medium tracking-wide uppercase">{t("badge")}</span>
          </div>

          <h1 className="font-heading font-bold text-pure text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight">
            {t("title1")}
            <br />
            <span
              style={{
                background: "linear-gradient(135deg,#4D9FEC 0%,#ffffff 35%,#4D9FEC 55%,#1B4FD8 75%,#4D9FEC 100%)",
                backgroundSize: "400% 400%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "heroTitleGrad 10s ease-in-out infinite",
              }}
            >
              {t("title2")}
            </span>
          </h1>

          <p className="mt-6 sm:mt-8 text-white/60 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">{t("subtitle")}</p>

          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigate(`/${locale}/socios`)} className="group px-8 py-3.5 bg-xpertblue text-pure font-semibold rounded-md text-sm sm:text-base transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center" data-testid="button-hero-socio">
              {t("cta1")}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button onClick={() => scrollTo("#servicios")} className="px-8 py-3.5 border border-white/20 text-pure/90 font-medium rounded-md text-sm sm:text-base transition-all duration-300 w-full sm:w-auto" data-testid="button-hero-servicios">
              {t("cta2")}
            </button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <button onClick={() => scrollTo("#problema-solucion")} className="text-white/30 animate-bounce" aria-label="Desplazar hacia abajo" data-testid="button-scroll-down">
            <ChevronDown className="w-6 h-6" />
          </button>
        </motion.div>
      </div>

      <style>{`
        @keyframes heroGlow {
          0% {
            background:
              radial-gradient(ellipse 80% 60% at 20% 50%, rgba(27, 79, 216, 0.12) 0%, transparent 60%),
              radial-gradient(ellipse 60% 80% at 80% 30%, rgba(77, 159, 236, 0.08) 0%, transparent 55%),
              radial-gradient(ellipse 50% 50% at 50% 80%, rgba(27, 79, 216, 0.06) 0%, transparent 50%);
          }
          33% {
            background:
              radial-gradient(ellipse 70% 70% at 70% 40%, rgba(27, 79, 216, 0.10) 0%, transparent 60%),
              radial-gradient(ellipse 80% 50% at 15% 60%, rgba(77, 159, 236, 0.10) 0%, transparent 55%),
              radial-gradient(ellipse 60% 40% at 60% 20%, rgba(27, 79, 216, 0.07) 0%, transparent 50%);
          }
          66% {
            background:
              radial-gradient(ellipse 60% 80% at 50% 20%, rgba(77, 159, 236, 0.09) 0%, transparent 60%),
              radial-gradient(ellipse 70% 60% at 30% 70%, rgba(27, 79, 216, 0.11) 0%, transparent 55%),
              radial-gradient(ellipse 80% 60% at 80% 60%, rgba(77, 159, 236, 0.07) 0%, transparent 50%);
          }
          100% {
            background:
              radial-gradient(ellipse 80% 60% at 20% 50%, rgba(27, 79, 216, 0.12) 0%, transparent 60%),
              radial-gradient(ellipse 60% 80% at 80% 30%, rgba(77, 159, 236, 0.08) 0%, transparent 55%),
              radial-gradient(ellipse 50% 50% at 50% 80%, rgba(27, 79, 216, 0.06) 0%, transparent 50%);
          }
        }

        @keyframes heroTitleGrad {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}
