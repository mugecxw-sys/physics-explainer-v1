import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ArticleFrontmatter } from "@/lib/types";

const articlesRoot = path.join(process.cwd(), "content", "articles");

export type ArticleDocument = {
  frontmatter: ArticleFrontmatter;
  content: string;
  cluster: string;
};

function articleFiles() {
  if (!fs.existsSync(articlesRoot)) return [];
  return fs
    .readdirSync(articlesRoot, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => path.join(entry.parentPath, entry.name));
}

export function getAllArticles(): ArticleDocument[] {
  return articleFiles()
    .map((filePath) => {
      const source = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(source);
      const cluster = path.basename(path.dirname(filePath));
      return {
        frontmatter: data as ArticleFrontmatter,
        content,
        cluster,
      };
    })
    .sort((a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title));
}

export function getArticle(cluster: string, slug: string) {
  return getAllArticles().find(
    (article) => article.cluster === cluster && article.frontmatter.slug === slug,
  );
}

export function getArticlesForCluster(cluster: string) {
  return getAllArticles().filter((article) => article.cluster === cluster);
}
