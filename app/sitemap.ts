import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { projects } = await getAllProjects();

  const project_sitemap = projects.map((project) => {
    return {
      url: `https://www.lopezed.com/projects/${project.id}`,
      lastModified: project.updated_at
        ? new Date(project.updated_at)
        : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });
  return [
    {
      url: "https://www.lopezed.com",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://www.lopezed.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    ...project_sitemap,
  ];
}
