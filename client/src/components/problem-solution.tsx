import { motion } from "framer-motion";
import { Truck, Brain, Smartphone } from "lucide-react";

const cards = [
  {
    icon: Truck,
    color: "text-arctic",
    bgColor: "bg-arctic/10",
    borderColor: "border-arctic/20",
    problem: "¿Pierdes tiempo interpretando normativa de la DGT?",
    solution: "Te damos respuestas claras y actualizadas en segundos, avaladas por 30 años de experiencia en transporte especial.",
  },
  {
    icon: Brain,
    color: "text-xpertblue",
    bgColor: "bg-xpertblue/10",
    borderColor: "border-xpertblue/20",
    problem: "¿Tu empresa todavía trabaja sin IA?",
    solution: "Implementamos soluciones de IA a medida para tu PYME, sin complicaciones. Desde automatización a análisis inteligente.",
  },
  {
    icon: Smartphone,
    color: "text-ember",
    bgColor: "bg-ember/10",
    borderColor: "border-ember/20",
    problem: "¿La tecnología te genera más estrés que ayuda?",
    solution: "Nuestro programa de formación gratuito para mayores te enseña a dominar la tecnología paso a paso, sin prisas.",
  },
];

export default function ProblemSolution() {
  return (
    <section
      id="problema-solucion"
      className="py-20 sm:py-28 bg-obsidian-light"
      data-testid="section-problema-solucion"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-arctic text-xs font-semibold tracking-widest uppercase">
            El problema
          </span>
          <h2 className="font-heading font-bold text-pure text-3xl sm:text-4xl mt-4">
            ¿Te suena alguna de estas situaciones?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`group relative p-6 sm:p-8 rounded-xl border ${card.borderColor} bg-white/[0.02] backdrop-blur-sm transition-all duration-500`}
              data-testid={`card-problem-${i}`}
            >
              <div className={`w-12 h-12 rounded-lg ${card.bgColor} flex items-center justify-center mb-6`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>

              <h3 className="font-heading font-semibold text-pure text-lg sm:text-xl mb-4 leading-snug">
                {card.problem}
              </h3>

              <div className="w-12 h-px bg-gradient-to-r from-white/20 to-transparent mb-4" />

              <p className="text-white/50 text-sm leading-relaxed">
                {card.solution}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
