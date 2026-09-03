import { Section } from "@/components/ui/section";
import { StyledWindowWrapper } from "@/components/Home/ide-wrapper";
import { Badge } from "@/components/ui/badge";
import ImageCarousel from "@/components/ui/image-carousel";
import { Github, GlobeIcon, Figma } from "lucide-react";
import Link from "next/link";
import { getProject } from "@/lib/supabase";
import Image from "next/image";
import type { Metadata } from "next";
import HireMe from "@/components/ui/hire-me";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // fetch post information
  const project = await getProject(slug);

  return {
    title: project.title + " | Eddie Lopez",
    description: project.short_description,
    keywords: project.keywords.concat(project.technologies),
    openGraph: {
      title: project.title + " | Eddie Lopez",
      description: project.short_description,
      type: "website",
      images: [project.cover_image],
    },
    twitter: {
      title: project.title + " | Eddie Lopez",
      description: project.short_description,
      card: "summary_large_image",
      images: [project.cover_image],
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: `/projects/${slug}`,
    },
  };
}

const ProjectLinks = ({
  links,
}: {
  links: { url: string; platform: string }[];
}) => {
  return (
    <ul className="flex gap-2">
      {links.map((link: { url: string; platform: string }, i: number) => {
        return (
          <Badge key={`${link.platform}-${i}`}>
            <li className="flex items-center content-center">
              <Link
                href={link.url}
                className=" w-full block flex gap-2 items-center uppercase font-bold"
                target="_blank"
              >
                {link.platform === "github" && <Github className="m-auto" />}
                {link.platform.includes("live") && (
                  <GlobeIcon className="m-auto" />
                )}{" "}
                <span className="pr-1">{link.platform}</span>
              </Link>
            </li>
          </Badge>
        );
      })}
    </ul>
  );
};

const ProjectTechStack = ({
  technologies,
  wip,
}: {
  technologies: string[];
  wip: boolean;
}) => {
  return (
    <ul className="flex gap-2 flex-wrap">
      {technologies.map((badge: string, i: number) => (
        <Badge
          key={`tech-badge-${badge}-${i}`}
          variant={"secondary"}
          className="font-bold"
        >
          {badge}
        </Badge>
      ))}
      {wip && (
        <Badge variant={"secondary"} className="font-bold">
          WIP
        </Badge>
      )}
    </ul>
  );
};

const ProjectImageGallery = ({
  images,
  projectTitle,
}: {
  images: { href: string; index: number }[];
  projectTitle: string;
}) => {
  return (
    <div
      id="gallery-wrapper"
      className="md:grid flex flex-col md:grid-cols-2 lg:grid-cols-3 gap-5  w-full m-auto"
    >
      {images.map((image: { href: string; index: number }, i: number) => {
        const classStyles =
          i % 3 == 0
            ? "aspect-7/5 col-span-2"
            : "aspect-4/5 lg:aspect-auto col-span-1";

        return (
          <ImageCarousel
            images={images}
            startIndex={i}
            key={"project_image" + image.index}
          >
            <div
              className={`w-full overflow-hidden flex content-center items-center bg-gray-500 rounded-md ${classStyles}`}
            >
              <Image
                src={image.href}
                width={1080}
                height={1080}
                alt={projectTitle + " " + image.index}
                className="object-cover h-full"
              />
            </div>
          </ImageCarousel>
        );
      })}
    </div>
  );
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  return (
    <div>
      <Section className="texture" data-pattern="graph">
        <StyledWindowWrapper>
          <div className="flex flex-col p-4 gap-6 md:p-8 m-0">
            <h1 className="text-display-large">{project.title}</h1>
            <ProjectTechStack
              technologies={project.technologies}
              wip={project.wip}
            />
            <p className="whitespace-pre-wrap text-left">
              {project.description}
            </p>
            <ProjectLinks links={project.links} />
            <ProjectImageGallery
              images={project.images}
              projectTitle={project.title}
            />
          </div>
        </StyledWindowWrapper>
      </Section>
      <HireMe />
    </div>
  );
}
