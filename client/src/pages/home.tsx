import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import TeamSection from "@/components/TeamSection";
import Services from "@/components/services";
import HowItWorks from "@/components/how-it-works";
import SocialProof from "@/components/social-proof";
import SeniorTraining from "@/components/senior-training";
import BlogNewsletter from "@/components/blog-newsletter";
import CtaFinal from "@/components/cta-final";
import Footer from "@/components/footer";
import { motion } from "framer-motion";
import { useTranslations, useI18n } from "@/i18n/context";

function HazteSocioCta() {
  const { messages } = useTranslations("nav");
  const { locale } = useI18n();
  const m = messages as any;

  return (
    <section className="py-16 bg-obsidian" data-testid="section-hazte-socio-cta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <a
            href={`/${locale}/socios`}
            className="inline-flex items-center px-10 py-4 bg-xpertblue text-pure font-semibold rounded-lg text-base transition-all duration-300 hover:bg-xpertblue/90"
            data-testid="button-hazte-socio"
          >
            {m.hazteSocio}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <TeamSection />
      <Services />
      <HowItWorks />
      <HazteSocioCta />
      <SocialProof />
      <SeniorTraining />
      <BlogNewsletter />
      <CtaFinal />
      <Footer />
    </div>
  );
}
