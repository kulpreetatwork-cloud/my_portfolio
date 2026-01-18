import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { SkillsShowcase } from "@/components/sections/SkillsShowcase";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <SkillsShowcase />
      <CTASection />
    </>
  );
}
