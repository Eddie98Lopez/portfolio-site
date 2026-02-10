import { createClient } from "@supabase/supabase-js";
import { cache } from "react";
const supabaseUrl = "https://ldrjmzbrinwdylthbzry.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabaseServerKey = process.env.SUPABASE_MESSAGE;

if (!supabaseKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_KEY");
}

if (!supabaseServerKey) {
  throw new Error("Missing SUPABASE_MESSAGE");
}

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
  const { data, error } = await supabasePublic
    .from("projects")
    .select(
      `
      *,
      images:projects_to_images (href, index),
      links (*)
    `,
    )
    .eq("id", id)
    .order("index", { foreignTable: "projects_to_images", ascending: true })
    .single();

  if (error) throw error;

  return data;
});

export const getAllProjects = async () => {
  const { data: projects, error } = await supabasePublic
    .from("projects")
    .select("*")
    .eq("display", true);

  if (error) {
    throw error;
  }

  return { projects };
};
