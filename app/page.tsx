import { Section } from "@/components/ui/section";
import Hero from "@/components/Home/hero";
import { getFeaturedProjects } from "@/lib/supabase";
import { Metadata } from "next";
import { HighlightedText } from "@/components/ui/highlighted-text";
import FeatureCard from "@/components/feature-card";
import HireMe from "@/components/ui/hire-me";
import Link from "next/link";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";

const title = "Design Engineer | Eddie Lopez";
const description =
  "UX, Design, Software Engineer & Frontend developer with a graphic design background. I build clean, responsive, design-driven web experiences with modern frontend tools.";

const ogImage = {
  url: "/images/og_image.png",
  width: 1500,
  height: 1330,
  alt: "Eddie Lopez — Frontend Developer & Designer",
};
const siteUrl = "https://www.lopezed.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  authors: [{ name: "Eddie Lopez", url: siteUrl }],
  creator: "Eddie Lopez",
  openGraph: {
    title,
    description,
    type: "website",
    url: "/",
    siteName: "Eddie Lopez",
    locale: "en_US",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
  keywords: [
    // name
    "eddie lopez",
    "eduardo lopez",
    "eddie98lopez",
    "lopezed",

    // primary titles
    "design engineer",
    "product engineer",
    "ux engineer",
    "design technologist",
    "frontend developer",
    "frontend engineer",
    "ui engineer",
    "software engineer",

    // the intersection — your actual differentiator
    "designer who codes",
    "design engineering",
    "design to code",
    "design systems engineer",
    "design driven development",
    "graphic designer turned software engineer",
    "design and engineering hybrid",
    "end to end product design and development",

    // stack
    "react developer",
    "next.js developer",
    "typescript developer",
    "tailwind css",
    "shadcn ui",
    "design systems",
    "component libraries",
    "web accessibility",
    "wcag compliance",
    "responsive web design",
    "web performance optimization",
    "core web vitals",

    // location + availability
    "fresno ca",
    "central valley california",
    "remote design engineer",
    "remote frontend developer",
    "freelance frontend developer",
    "contract frontend developer",
    "available for hire",
    "open to relocation",
  ],
};

export default async function Home() {
  const { projects } = await getFeaturedProjects();
  console.log(projects);
  return (
    <div className="bg-transparent ">
      <Hero />
      <Section className="texture hidden" data-pattern="graph" id="services">
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

      <Section
        className="flex justify-center items-center bg-(--secondary-base)"
        id="about"
      >
        <div className="w-[60%] text-body-large font-bold text-center m-auto">
          I began my career in design and marketing, creating web experiences.
          But over time, I found myself wanting more control over how those
          experiences were built, not just how they looked. I didn’t want to
          settle for “that’s not possible in the template.” This pushed me to
          learn a completely new domain space so I could own a product from
          design to code implementation.
        </div>
      </Section>
      <Section className="bg-(--background-emphasis)" id="projects">
        <div>
          <h2 className="text-display-small text-center mb-8">
            <HighlightedText>Projects</HighlightedText>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
            {projects.map((project) => {
              return (
                <Link
                  key={`project-${project.id}`}
                  href={`/projects/${project.id}`}
                >
                  <Card className="bg-transparent overflow-hidden w-full h-full p-0 aspect-3/2 hover:border-secondary hover:border-10 transition-all transition-3 rounded">
                    <CardContent className="grid grid-cols-1 grid-rows-1 h-full w-full p-0 bg-transparent">
                      <div className="col-start-1 row-start-1 relative w-full h-full ">
                        <Image
                          src={project.cover_image}
                          fill
                          alt={`${project.title} thumbnail`}
                          className="object-cover"
                        />
                      </div>

                      <div className="col-start-1 row-start-1 flex items-center justify-center p-6 sr-only ">
                        <CardTitle className="text-white text-center text-xl md:text-2xl drop-shadow-md">
                          {project.title}
                        </CardTitle>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </Section>

      <HireMe />
    </div>
  );
}
