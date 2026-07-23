import { Section } from "@/components/ui/section";
import { getAllProjects } from "@/lib/supabase";
import { HighlightedText } from "@/components/ui/highlighted-text";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default async function Page() {
  const { projects } = await getAllProjects();
  console.log(projects);
  return (
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
  );
}
