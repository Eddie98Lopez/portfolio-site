import { Section } from "@/components/ui/section";
import { StyledWindowWrapper } from "@/components/Home/ide-wrapper";
import { Badge } from "@/components/ui/badge";
import { Github, GlobeIcon, Figma } from "lucide-react";
import { getProject } from "@/lib/supabase";
import Image from "next/image";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
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

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);
  //console.log(id);
  //console.log(project);
  return (
    <div>
      <Section className="background-invert text-secondary">
        <StyledWindowWrapper>
          <div className="flex flex-col gap-6 p-0 m-0">
            <h1 className="lg:text-[10rem] text-[5rem] leading-none">
              {project.title}
            </h1>
            <ul className="flex gap-2">
              {project.technologies.map((badge, i) => (
                <Badge
                  key={`tech-badge-${badge}-${i}`}
                  variant={"secondary"}
                  className="font-bold"
                >
                  {badge}
                </Badge>
              ))}
              {project.wip && (
                <Badge variant={"secondary"} className="font-bold">
                  WIP
                </Badge>
              )}
            </ul>
            <p className="whitespace-pre-wrap text-left">
              {project.description}
            </p>
            <ul className="flex gap-2">
              <li className="size-8 rounded-[500px] bg-secondary flex items-center content-center">
                <GlobeIcon color="var(--primary,black)" className="m-auto" />
              </li>
              <li className="size-8 rounded-[500px] bg-secondary flex items-center content-center">
                <GlobeIcon color="var(--primary,black)" className="m-auto" />
              </li>
              <li className="size-8 rounded-[500px] bg-secondary flex items-center content-center">
                <GlobeIcon color="var(--primary,black)" className="m-auto" />
              </li>
            </ul>

            <div
              id="gallery-wrapper"
              className="md:grid flex flex-col md:grid-cols-2 lg:grid-cols-3 gap-5  w-full m-auto"
            >
              {project.images.map((image, i) => {
                const length = project.images.length;
                const last = project.images.length - 1;
                const classStyles =
                  i % 3 == 0
                    ? "aspect-7/5 col-span-2"
                    : "aspect-4/5 lg:aspect-auto col-span-1";

                return (
                  <div
                    key={project.title + " " + image.index}
                    className={`w-full overflow-hidden flex content-center items-center bg-gray-500 rounded-md ${classStyles}`}
                  >
                    <Image
                      src={image.href}
                      width={1080}
                      height={1080}
                      alt={project.title + " " + image.index}
                      className="object-cover h-full"
                    />
                  </div>
                );
              })}
            </div>
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
      <Section
        id="project-image-gallery"
        className="relative p-0 pb-0 pt-0 m-0 min-h-0 "
      >
        <div>Did ya like this project?</div>
      </Section>
    </div>
  );
}
