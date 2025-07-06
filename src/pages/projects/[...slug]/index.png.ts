import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import { getPath } from "@/utils/getPath";
import { generateOgImageForPost } from "@/utils/generateOgImages";
import { SITE } from "@/config";

export async function getStaticPaths() {
  if (!SITE.dynamicOgImage) {
    return [];
  }

  const projects = await getCollection("projects").then(p =>
    p.filter(({ data }) => !data.draft && !data.ogImage)
  );

  return projects.map(project => ({
    params: { slug: getPath(project.id, project.filePath, false) },
    props: project,
  }));
}

export const GET: APIRoute = async ({ props }) => {
  if (!SITE.dynamicOgImage) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  return new Response(
    await generateOgImageForPost(props as CollectionEntry<"projects">),
    {
      headers: { "Content-Type": "image/png" },
    }
  );
};
