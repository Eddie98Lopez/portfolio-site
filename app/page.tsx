import { Section } from "@/components/ui/section";
import Hero from "@/components/Home/hero";
import { ContactForm } from "@/components/forms/contact-form";
import { getFeaturedProjects } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import About from "./about/page";
import { Item } from "@/components/ui/item";
import { Palette, CodeXml, Monitor } from "lucide-react";

export const metadata: Metadata = {
  title: "Frontend Developer & Designer | Eddie Lopez",
  description:
    "Frontend developer with a graphic design background. I build clean, responsive, design-driven web experiences with modern frontend tools.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Frontend Developer & Designer | Eddie Lopez",
    description:
      "Frontend developer with a graphic design background. I build clean, responsive, design-driven web experiences with modern frontend tools.",
    type: "website",
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
    <div className="bg-transparent">
      <Hero />

      <Section
        className="min-h-[60vh] background-invert text-secondary space-y-10"
        id="projects"
      >
        <h2 className="text-[5rem]">Projects</h2>
        <div className=" grid lg:grid-cols-2 gap-8">
          {projects.projects.map((project) => (
            <div
              key={`project-${project.id}`}
              className="w-full aspect-16/9 rounded-lg overflow-hidden flex place-content-center content-center items-center "
            >
              {" "}
              <Link href={`/projects/${project.id}`}>
                <Image
                  src={project.cover_image}
                  width={1080}
                  height={1080}
                  alt={project.title}
                  className="object-cover w-full block transition-transform duration-300 hover:scale-105"
                />
              </Link>
            </div>
          ))}
        </div>
        {/* <Button variant={"secondary"} className="space-y-8">
          See All Projects
        </Button> */}
        {/* <div className="min-h-[200px] w-full"> {"   "}</div> */}
      </Section>

      <Section className="background-invert py-25" id="services">
        <div className="lg:grid lg:grid-cols-3 flex flex-col  gap-8 w-full h-full">
          <Item
            variant={"outline"}
            className="flex-col min-h-[200px] text-secondary py-8 border-secondary"
          >
            <div>
              <Palette className="size-16" />
            </div>
            <h3 className="text-3xl">Design</h3>
            <p>
              I value good, intentional design that creates an experience and
              doesn't just look pretty. Wether its UI or branding.
            </p>
          </Item>
          <Item
            variant={"outline"}
            className="flex-col min-h-[200px] text-secondary py-8 border-secondary"
          >
            <div>
              <CodeXml className="size-16" />
            </div>
            <h3 className="text-3xl">Web Apps</h3>
            <p>
              I engineer web apps when a website isn’t enough and something more
              functional is needed.
            </p>
          </Item>
          <Item
            variant={"outline"}
            className="flex-col min-h-[200px] text-secondary py-8 border-secondary"
          >
            <div>
              <Monitor className="size-16" />
            </div>
            <h3 className="text-3xl">Websites</h3>
            <p>
              I combine my experience in design and dev to create branded
              digital experiences for the web.
            </p>
          </Item>
        </div>
      </Section>

      <About />
      <Section className="min-h-[60vh]" id="contact">
        <h2 className="text-[5rem]">Contact Me</h2>
        <ContactForm />
      </Section>
    </div>
  );
}
