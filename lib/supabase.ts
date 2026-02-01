import { createClient } from "@supabase/supabase-js";
import { cache } from "react";
const supabaseUrl = "https://ldrjmzbrinwdylthbzry.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabaseServerKey = process.env.SUPABASE_MESSAGE;

export const supabasePublic = createClient(supabaseUrl, supabaseKey);
export const supabaseServer = createClient(supabaseUrl, supabaseServerKey);

export const getFeaturedProjects = async () => {
  const { data: projects, error } = await supabasePublic
    .from("projects")
    .select("title,cover_image,id")
    .eq("featured", true);

  if (error) {
    throw error;
  }

  return { projects };
};

export const getProject = cache(async (id: string) => {
  const { data: project, error: project_error } = await supabasePublic
    .from("projects")
    .select("*")
    .eq("id", id);
  if (project_error) {
    throw project_error;
  }
  const { data: images, error: images_error } = await supabasePublic
    .from("projects_to_images")
    .select("href, index")
    .eq("project_id", id)
    .order("index", { ascending: true });

  if (images_error) {
    throw images_error;
  }

  return { ...project[0], images };
});
