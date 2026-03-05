import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import TeamSection from "@/components/TeamSection";
import Services from "@/components/services";
import HowItWorks from "@/components/how-it-works";
import Pricing from "@/components/pricing";
import SocialProof from "@/components/social-proof";
import SeniorTraining from "@/components/senior-training";
import BlogNewsletter from "@/components/blog-newsletter";
import CtaFinal from "@/components/cta-final";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <TeamSection />
      <Services />
      <HowItWorks />
      <Pricing />
      <SocialProof />
      <SeniorTraining />
      <BlogNewsletter />
      <CtaFinal />
      <Footer />
    </div>
  );
}

