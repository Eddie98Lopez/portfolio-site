import { Section } from "@/components/ui/section";
import Hero, { ProjectsSection } from "@/components/Home/hero";
import { ContactForm } from "@/components/forms/contact-form";
import { getFeaturedProjects } from "@/lib/supabase";
import { Metadata } from "next";
import BookSection from "@/components/Home/books";
import { HighlightedText } from "@/components/ui/highlighted-text";
import FeatureCard from "@/components/feature-card";
import HireMe from "@/components/ui/hire-me";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Frontend Developer & Designer | Eddie Lopez",
  description:
    "Frontend developer with a graphic design background. I build clean, responsive, design-driven web experiences with modern frontend tools.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.lopezed.com/ ", // resolves to https://www.lopezed.com/ because of metadataBase
  },
  openGraph: {
    title: "Frontend Developer & Designer | Eddie Lopez",
    description:
      "Frontend developer with a graphic design background. I build clean, responsive, design-driven web experiences with modern frontend tools.",
    type: "website",
    url: "/", // also resolves via metadataBase
  },

  twitter: {
    card: "summary_large_image",
    title: "Frontend Developer & Designer | Eddie Lopez",
    description:
      "Frontend developer with a graphic design background. I build clean, responsive, design-driven web experiences with modern frontend tools.",
  },

  keywords: [
    "eduardo lopez",
    "eduardo",
    "eddie98lopez",
    "frontend developer",
    "front end developer",
    "fresno",
    "ca",
    "frontend engineer",
    "ui developer",
    "web developer",
    "javascript developer",
    "react developer",
    "next.js developer",
    "typescript developer",
    "tailwind css developer",
    "shadcn ui",
    "modern frontend",
    "responsive web design",
    "ui ux developer",
    "design driven development",
    "graphic designer turned developer",
    "design focused frontend developer",
    "creative frontend developer",
    "web interface design",
    "component based ui",
    "accessible web design",
    "performance focused frontend",
    "portfolio frontend developer",
  ],
};

export default async function Home() {
  const projects = await getFeaturedProjects();
  // console.log(projects);
  return (
    <div className="bg-transparent ">
      <Hero />
      <Section className="texture" data-pattern="graph">
        <div className="w-full h-full flex flex-col gap-8">
          <h2 className="text-display-small text-center">
            Design that <HighlightedText>ships</HighlightedText> exactly as
            imagined.
          </h2>
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <FeatureCard image="/images/identity.png" alt="human-eye">
              Visual Identity
            </FeatureCard>
            <FeatureCard image="/images/system.png" alt="building-bricks">
              Design Systems
            </FeatureCard>

            <FeatureCard image="/images/mvp.png" alt="">
              Production MVPs
            </FeatureCard>
          </div>
          <p className="text-headline text-center">
            No handoff. No translation loss.
          </p>
        </div>
      </Section>

      <Section className="flex justify-center items-center bg-(--secondary-base)">
        <div className="w-[60%] text-body-large font-bold text-center m-auto">
          I began my career in design and marketing, creating web experiences.
          But over time, I found myself wanting more control over how those
          experiences were built, not just how they looked. I didn’t want to
          settle for “that’s not possible in the template.” This pushed me to
          learn a completely new domain space so I could own a product from
          design to code implementation.
          <Button>more about me</Button>
        </div>
      </Section>
      <Section className="bg-(--background-emphasis)">
        <div>
          <h2 className="text-display-small text-center mb-8">
            <HighlightedText>Projects</HighlightedText>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(300px,1fr)] gap-4">
            <div className="bg-(--surface-subtle) text-(--text-inverse)">1</div>
            <div className="bg-(--surface-subtle) text-(--text-inverse)">1</div>
            <div className="bg-(--surface-subtle) text-(--text-inverse)">1</div>
            <div className="bg-(--surface-subtle) text-(--text-inverse)">1</div>
            <div className="bg-(--surface-subtle) text-(--text-inverse)">1</div>
            <div className="bg-(--surface-subtle) text-(--text-inverse)">1</div>
          </div>
        </div>
      </Section>

      <HireMe />
    </div>
  );
}
