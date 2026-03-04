import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { UserPlus, Bot, Users, Rocket } from "lucide-react";
import { useTranslations } from "@/i18n/context";

import stepRegisterImg from "@assets/stock_images/step_register.jpg";
import stepAiChatImg from "@assets/stock_images/step_ai_chat.jpg";
import stepExpertImg from "@assets/stock_images/step_expert_phone.jpg";
import stepCommunityImg from "@assets/stock_images/step_community.jpg";

const stepIcons = [UserPlus, Bot, Users, Rocket];
const stepNumbers = [1, 2, 3, 4];
const stepImages = [stepRegisterImg, stepAiChatImg, stepExpertImg, stepCommunityImg];

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

function ConnectorLine({ inView }: { inView: boolean }) {
  return (
    <div className="absolute top-[72px] left-8 right-8 h-px overflow-hidden z-0">
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

function StepCard({ step, index, inView }: { step: any; index: number; inView: boolean }) {
  const Icon = stepIcons[index];
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.2, ease: "easeOut" }}
      className="relative z-10 group"
      data-testid={`step-${index}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="text-center">
        <motion.div
          className="relative mx-auto w-[120px] h-[120px] rounded-2xl overflow-hidden mb-6 border-2 border-arctic/20"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.2, ease: "easeOut" }}
        >
          <img
            src={stepImages[index]}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: hovered ? "grayscale(0)" : "grayscale(1)", transition: "filter 0.4s ease-out" }}
          />
          <div
            className="absolute inset-0 bg-obsidian/50"
            style={{ opacity: hovered ? 0 : 0.4, transition: "opacity 0.4s ease-out" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-12 h-12 rounded-full bg-obsidian/70 backdrop-blur-sm border border-arctic/30 flex items-center justify-center"
              animate={inView ? {
                boxShadow: [
                  "0 0 0 0px rgba(77, 159, 236, 0)",
                  "0 0 0 6px rgba(77, 159, 236, 0.2)",
                  "0 0 0 12px rgba(77, 159, 236, 0)",
                ],
              } : {}}
              transition={{ duration: 2, repeat: 2, ease: "easeOut", delay: 0.4 + index * 0.2 }}
            >
              <Icon className="w-5 h-5 text-arctic" />
            </motion.div>
          </div>
          <span className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-xpertblue text-pure text-xs font-bold flex items-center justify-center font-mono z-10">
            <AnimatedNumber target={stepNumbers[index]} inView={inView} />
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.4, delay: 0.5 + index * 0.2, ease: "easeOut" }}
        >
          <h3 className="font-heading font-semibold text-pure text-base mb-1">{step.title}</h3>
          <span className="text-arctic text-xs font-medium">{step.subtitle}</span>
          <p className="mt-3 text-white/40 text-sm leading-relaxed">{step.description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function MobileStep({ step, index, totalSteps, inView }: { step: any; index: number; totalSteps: number; inView: boolean }) {
  const Icon = stepIcons[index];
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.4, delay: index * 0.15, ease: "easeOut" }}
      className="flex gap-5"
      data-testid={`step-mobile-${index}`}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
    >
      <div className="flex-shrink-0 relative">
        <motion.div
          className="w-16 h-16 rounded-xl overflow-hidden border-2 border-arctic/20 relative"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.15, ease: "easeOut" }}
        >
          <img
            src={stepImages[index]}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: hovered ? "grayscale(0)" : "grayscale(1)", transition: "filter 0.4s ease-out" }}
          />
          <div
            className="absolute inset-0 bg-obsidian/50"
            style={{ opacity: hovered ? 0 : 0.4, transition: "opacity 0.4s ease-out" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-9 h-9 rounded-full bg-obsidian/70 backdrop-blur-sm border border-arctic/30 flex items-center justify-center"
              animate={inView ? {
                boxShadow: [
                  "0 0 0 0px rgba(77, 159, 236, 0)",
                  "0 0 0 4px rgba(77, 159, 236, 0.2)",
                  "0 0 0 8px rgba(77, 159, 236, 0)",
                ],
              } : {}}
              transition={{ duration: 2, repeat: 2, ease: "easeOut" }}
            >
              <Icon className="w-4 h-4 text-arctic" />
            </motion.div>
          </div>
        </motion.div>
        <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-xpertblue text-pure text-[10px] font-bold flex items-center justify-center font-mono z-10">
          <AnimatedNumber target={stepNumbers[index]} inView={inView} />
        </span>
        {index < totalSteps - 1 && (
          <div className="absolute top-[72px] left-1/2 w-px h-6 overflow-hidden -translate-x-1/2">
            <motion.div
              className="w-full bg-arctic/30"
              initial={{ height: "0%" }}
              animate={inView ? { height: "100%" } : { height: "0%" }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            />
          </div>
        )}
      </div>
      <motion.div
        className="pt-1"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.4, delay: 0.3 + index * 0.15, ease: "easeOut" }}
      >
        <h3 className="font-heading font-semibold text-pure text-base mb-1">{step.title}</h3>
        <span className="text-arctic text-xs font-medium">{step.subtitle}</span>
        <p className="mt-2 text-white/40 text-sm leading-relaxed">{step.description}</p>
      </motion.div>
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
              <StepCard key={i} step={step} index={i} inView={desktopInView} />
            ))}
          </div>
        </div>

        <div ref={mobileRef} className="md:hidden space-y-8">
          {steps.map((step: any, i: number) => (
            <MobileStep key={i} step={step} index={i} totalSteps={steps.length} inView={mobileInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
