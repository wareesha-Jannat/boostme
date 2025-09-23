import { getUsers } from "@/lib/utils";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FeaturedCreators from "./FeaturedCreators";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import WhyBoostMe from "./WhyBoostMe";
import CTASection from "./CTASection";
import AnimatedSection from "@/components/AnimatedSection";

export default async function Home() {
  const data = await getUsers();

  return (
    <>
      <div className="bg-aurora min-h-[100dvh]">
        <Navbar />
        <main className=" pt-15 max-w-7xl mx-auto ">
          <AnimatedSection>
            <HeroSection data={data?.profiles} />
          </AnimatedSection>

          <div className="divider bg-white h-0.5 opacity-20"></div>
          <AnimatedSection>
            <HowItWorks />
          </AnimatedSection>

          <div className="divider bg-white h-0.5 opacity-20"></div>

          <AnimatedSection>
            <FeaturedCreators creators={data.profiles.slice(0, 6)} />
          </AnimatedSection>

          <div className="divider bg-white h-0.5 opacity-20"></div>
          <AnimatedSection>
            <WhyBoostMe />
          </AnimatedSection>

          <div className="divider bg-white h-0.5 opacity-20"></div>
          <AnimatedSection>
            <CTASection />
          </AnimatedSection>
        </main>
        <Footer />
      </div>
    </>
  );
}
