import { Section } from "@/components/ui/section";
import { StyledWindowWrapper } from "@/components/Home/ide-wrapper";
import { Badge } from "@/components/ui/badge";
import ImageCarousel from "@/components/ui/image-carousel";
import { Github, GlobeIcon, Figma } from "lucide-react";
import Link from "next/link";
import { getProject } from "@/lib/supabase";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  // fetch post information
  const project = await getProject(id);

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
      canonical: `/projects/${id}`,
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
          <Tooltip key={`${link.platform}-${i}`}>
            <TooltipTrigger>
              <li className="size-8 rounded-[500px] bg-secondary flex items-center content-center">
                <Link href={link.url} className=" w-full block" target="_blank">
                  <GlobeIcon color="var(--primary,black)" className="m-auto" />
                </Link>
              </li>
            </TooltipTrigger>
            <TooltipContent className="border boreder-secondary">
              {link.platform}
            </TooltipContent>
          </Tooltip>
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
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);
  console.log(project);

  return (
    <div>
      <Section className="background-invert text-secondary">
        <StyledWindowWrapper>
          <div className="flex flex-col gap-6 p-0 m-0">
            <h1 className="lg:text-[10rem] text-[5rem] leading-none">
              {project.title}
            </h1>
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
        {/*         <div className="mt-8 mb-8">
          <h3 className="text-2xl mb-4">credits</h3>
          <ul className="flex gap-16">
            <li className=" ">
              <div className="font-bold uppercase leading-none text-xs">
                Christopher
              </div>
              <div className="font-bold uppercase text-xs">Christopherson</div>
              <div className="italic text-xs">Role</div>
            </li>
            <li className="">
              <div className="font-bold uppercase leading-none text-xs">
                Christopher
              </div>
              <div className="font-bold uppercase text-xs">Christopherson</div>
              <div className="italic text-xs">Role</div>
            </li>
          </ul>
        </div> */}
      </Section>
    </div>
  );
}
