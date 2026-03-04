import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Bot, Users, Rocket } from "lucide-react";
import { useTranslations } from "@/i18n/context";

const SUPABASE_BASE = "https://dcuvptwwtdhlepvcttvx.supabase.co/storage/v1/object/public/web-images";

const stepIcons = [UserPlus, Bot, Users, Rocket];
const stepImages = [
  `${SUPABASE_BASE}/como-funciona/paso1_registro_v1.webp`,
  `${SUPABASE_BASE}/como-funciona/paso2_ia-chat_v1.webp`,
  `${SUPABASE_BASE}/como-funciona/paso3_experto_v1.webp`,
  `${SUPABASE_BASE}/como-funciona/paso4_comunidad_v1.webp`,
];

const IMAGE_HEIGHT = 500;
const SCROLL_PER_STEP = 600;
const HEADER_SPACE = 220;
const STICKY_TOP = 0;

export default function HowItWorks() {
  const { messages } = useTranslations("howItWorks");
  const m = messages as any;
  const steps = m.steps || [];
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [slideProgress, setSlideProgress] = useState(0);
  const [hovered, setHovered] = useState(false);

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrolled = Math.max(0, -rect.top - HEADER_SPACE);

    const totalSteps = 4;
    const rawStep = scrolled / SCROLL_PER_STEP;
    const currentStep = Math.min(totalSteps - 1, Math.floor(rawStep));
    const progress = rawStep - currentStep;

    setActiveStep(Math.max(0, Math.min(totalSteps - 1, currentStep)));
    setSlideProgress(Math.max(0, Math.min(1, progress)));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const [viewportH, setViewportH] = useState(800);
  useEffect(() => {
    const update = () => setViewportH(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const totalScrollHeight = HEADER_SPACE + SCROLL_PER_STEP * 3 + viewportH;

  const getCurrentTranslateX = () => {
    if (activeStep >= 3) return 0;
    return slideProgress * 100;
  };

  const currentX = getCurrentTranslateX();

  return (
    <section
      ref={sectionRef}
      id="como-funciona"
      className="bg-obsidian relative"
      style={{ height: totalScrollHeight }}
      data-testid="section-como-funciona"
    >
      <div className="sticky" style={{ top: STICKY_TOP, height: "100vh", overflow: "hidden" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian-light via-obsidian to-obsidian pointer-events-none" />

        <div className="relative z-10 h-full flex flex-col">
          <div className="pt-16 sm:pt-20 pb-6 text-center px-4 sm:px-6 lg:px-8">
            <span className="text-arctic text-xs font-semibold tracking-widest uppercase">
              {m.label}
            </span>
            <h2 className="font-heading font-bold text-pure text-3xl sm:text-4xl mt-3">
              {m.title}
            </h2>
            <p className="mt-3 text-white/50 text-sm sm:text-base max-w-xl mx-auto">
              {m.subtitle}
            </p>
          </div>

          <div className="flex-grow flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8">
            <div
              className="relative w-[80%] max-w-5xl overflow-hidden rounded-2xl border border-white/10"
              style={{ height: IMAGE_HEIGHT }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              data-testid="step-image-container"
            >
              {stepImages.map((src, i) => {
                let translateX = 0;

                if (i < activeStep) {
                  translateX = -100;
                } else if (i === activeStep) {
                  translateX = 0;
                  if (activeStep < 3) {
                    translateX = -(currentX);
                  }
                } else if (i === activeStep + 1) {
                  translateX = 100 - currentX;
                } else {
                  translateX = 100;
                }

                return (
                  <div
                    key={i}
                    className="absolute inset-0"
                    style={{
                      transform: `translateX(${translateX}%)`,
                      transition: "transform 0.15s ease-out",
                      willChange: "transform",
                      zIndex: i === activeStep || (i === activeStep + 1 && currentX > 0) ? 2 : 1,
                    }}
                    data-testid={`step-image-${i}`}
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover"
                      style={{
                        filter: hovered ? "grayscale(0)" : "grayscale(1)",
                        transition: "filter 0.4s ease-out",
                      }}
                    />
                    <div
                      className="absolute inset-0 bg-obsidian/30"
                      style={{
                        opacity: hovered ? 0 : 1,
                        transition: "opacity 0.4s ease-out",
                      }}
                    />
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-obsidian/70 backdrop-blur-sm border border-arctic/30 flex items-center justify-center">
                      {(() => {
                        const Icon = stepIcons[i];
                        return <Icon className="w-5 h-5 text-arctic" />;
                      })()}
                    </div>
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-xpertblue flex items-center justify-center">
                      <span className="text-pure text-sm font-bold font-mono">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-2 mt-5 mb-4">
              {steps.map((_: any, i: number) => (
                <div
                  key={i}
                  className="h-1 rounded-full transition-all duration-500 ease-in-out"
                  style={{
                    width: i === activeStep ? 32 : 8,
                    backgroundColor: i === activeStep ? "rgb(77, 159, 236)" : "rgba(255,255,255,0.15)",
                  }}
                  data-testid={`step-dot-${i}`}
                />
              ))}
            </div>

            <div className="w-[80%] max-w-5xl" style={{ minHeight: 80 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="text-center"
                  data-testid={`step-info-${activeStep}`}
                >
                  <h3 className="font-heading font-semibold text-pure text-lg sm:text-xl">
                    {steps[activeStep]?.title}
                  </h3>
                  <span className="text-arctic text-xs font-medium">
                    {steps[activeStep]?.subtitle}
                  </span>
                  <p className="mt-2 text-white/40 text-sm leading-relaxed max-w-lg mx-auto">
                    {steps[activeStep]?.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
