import type { MetadataRoute } from "next";
import { topics } from "@/content/topics/topics";
import { audioEpisodes } from "@/content/audio/episodes";
import { getAllArticles } from "@/lib/content";
import { absoluteUrl } from "@/lib/site-config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/topics/", "/about/", "/editorial-policy/", "/scientific-review/", "/sources/", "/privacy/"];
  const topicPaths = topics.map((topic) => `/topics/${topic.slug}/`);
  const articlePaths = getAllArticles().map((article) => `/physics/${article.cluster}/${article.frontmatter.slug}/`);
  const audioPaths = audioEpisodes.length >= 3 ? ["/audio/", ...audioEpisodes.map((episode) => `/audio/${episode.slug}/`)] : audioEpisodes.map((episode) => `/audio/${episode.slug}/`);
  return [...staticPaths, ...topicPaths, ...articlePaths, ...audioPaths].map((route) => ({ url: absoluteUrl(route) }));
}
