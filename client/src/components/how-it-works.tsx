import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { UserPlus, Bot, Users, Rocket } from "lucide-react";
import { useTranslations } from "@/i18n/context";

const stepIcons = [UserPlus, Bot, Users, Rocket];
const stepNumbers = [1, 2, 3, 4];

function AnimatedNumber({ target, inView }: { target: number; inView: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const duration = 600;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [inView, target]);

  return <>{String(value).padStart(2, "0")}</>;
}

function PulsingIcon({ icon: Icon, inView }: { icon: typeof UserPlus; inView: boolean }) {
  return (
    <motion.div
      className="relative mx-auto w-16 h-16 rounded-full bg-obsidian border-2 border-arctic/30 flex items-center justify-center"
      animate={inView ? {
        boxShadow: [
          "0 0 0 0px rgba(77, 159, 236, 0)",
          "0 0 0 8px rgba(77, 159, 236, 0.15)",
          "0 0 0 16px rgba(77, 159, 236, 0)",
        ],
      } : {}}
      transition={{ duration: 2, repeat: 2, ease: "easeOut" }}
    >
      <Icon className="w-7 h-7 text-arctic" />
    </motion.div>
  );
}

function ConnectorLine({ inView }: { inView: boolean }) {
  return (
    <div className="absolute top-8 left-8 right-8 h-px overflow-hidden -translate-y-1/2 z-0">
      <div className="w-full h-full bg-arctic/10" />
      <motion.div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-arctic/40 via-arctic/60 to-arctic/40"
        initial={{ width: "0%" }}
        animate={inView ? { width: "100%" } : { width: "0%" }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
      />
    </div>
  );
}

function DesktopStep({ step, index, inView }: { step: any; index: number; inView: boolean }) {
  const Icon = stepIcons[index];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.2, ease: "easeOut" }}
      className="relative z-10"
      data-testid={`step-${index}`}
    >
      <div className="text-center">
        <div className="relative mb-6">
          <PulsingIcon icon={Icon} inView={inView} />
          <span className="absolute -top-2 -right-2 left-auto w-7 h-7 rounded-full bg-xpertblue text-pure text-xs font-bold flex items-center justify-center font-mono"
            style={{ left: "calc(50% + 16px)" }}
          >
            <AnimatedNumber target={stepNumbers[index]} inView={inView} />
          </span>
        </div>
        <h3 className="font-heading font-semibold text-pure text-base mb-1">{step.title}</h3>
        <span className="text-arctic text-xs font-medium">{step.subtitle}</span>
        <p className="mt-3 text-white/40 text-sm leading-relaxed">{step.description}</p>
      </div>
    </motion.div>
  );
}

function MobileStep({ step, index, totalSteps, inView }: { step: any; index: number; totalSteps: number; inView: boolean }) {
  const Icon = stepIcons[index];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      className="flex gap-5"
      data-testid={`step-mobile-${index}`}
    >
      <div className="flex-shrink-0 relative">
        <motion.div
          className="w-14 h-14 rounded-full border-2 border-arctic/30 flex items-center justify-center bg-obsidian"
          animate={inView ? {
            boxShadow: [
              "0 0 0 0px rgba(77, 159, 236, 0)",
              "0 0 0 6px rgba(77, 159, 236, 0.15)",
              "0 0 0 12px rgba(77, 159, 236, 0)",
            ],
          } : {}}
          transition={{ duration: 2, repeat: 2, ease: "easeOut" }}
        >
          <Icon className="w-6 h-6 text-arctic" />
        </motion.div>
        <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-xpertblue text-pure text-[10px] font-bold flex items-center justify-center font-mono">
          <AnimatedNumber target={stepNumbers[index]} inView={inView} />
        </span>
        {index < totalSteps - 1 && (
          <div className="absolute top-16 left-1/2 w-px h-8 overflow-hidden -translate-x-1/2">
            <motion.div
              className="w-full bg-arctic/30"
              initial={{ height: "0%" }}
              animate={inView ? { height: "100%" } : { height: "0%" }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            />
          </div>
        )}
      </div>
      <div className="pt-1">
        <h3 className="font-heading font-semibold text-pure text-base mb-1">{step.title}</h3>
        <span className="text-arctic text-xs font-medium">{step.subtitle}</span>
        <p className="mt-2 text-white/40 text-sm leading-relaxed">{step.description}</p>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const { messages } = useTranslations("howItWorks");
  const m = messages as any;
  const steps = m.steps || [];
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const desktopInView = useInView(desktopRef, { once: true, margin: "-100px" });
  const mobileInView = useInView(mobileRef, { once: true, margin: "-80px" });

  return (
    <section id="como-funciona" className="py-20 sm:py-28 bg-obsidian relative" data-testid="section-como-funciona">
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-light via-obsidian to-obsidian pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-arctic text-xs font-semibold tracking-widest uppercase">{m.label}</span>
          <h2 className="font-heading font-bold text-pure text-3xl sm:text-4xl mt-4">{m.title}</h2>
          <p className="mt-4 text-white/50 text-base max-w-xl mx-auto">{m.subtitle}</p>
        </motion.div>

        <div ref={desktopRef} className="hidden md:block relative">
          <ConnectorLine inView={desktopInView} />
          <div className="grid grid-cols-4 gap-6">
            {steps.map((step: any, i: number) => (
              <DesktopStep key={i} step={step} index={i} inView={desktopInView} />
            ))}
          </div>
        </div>

        <div ref={mobileRef} className="md:hidden space-y-6">
          {steps.map((step: any, i: number) => (
            <MobileStep key={i} step={step} index={i} totalSteps={steps.length} inView={mobileInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
