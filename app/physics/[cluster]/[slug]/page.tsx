import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArticleLayout } from "@/components/article-layout";
import { mdxComponents } from "@/components/article-components";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import { getAllArticles, getArticle } from "@/lib/content";

type PageProps = { params: Promise<{ cluster: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ cluster: article.cluster, slug: article.frontmatter.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { cluster, slug } = await params;
  const article = getArticle(cluster, slug);
  if (!article) return {};
  const canonicalPath = `/physics/${cluster}/${slug}/`;
  const { frontmatter } = article;
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: "article",
      title: frontmatter.title,
      description: frontmatter.description,
      url: absoluteUrl(canonicalPath),
      siteName: siteConfig.name,
      publishedTime: frontmatter.datePublished,
      modifiedTime: frontmatter.dateModified,
      ...(frontmatter.image ? { images: [{ url: absoluteUrl(frontmatter.image) }] } : {}),
    },
    twitter: {
      card: frontmatter.image ? "summary_large_image" : "summary",
      title: frontmatter.title,
      description: frontmatter.description,
      ...(frontmatter.image ? { images: [absoluteUrl(frontmatter.image)] } : {}),
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { cluster, slug } = await params;
  const article = getArticle(cluster, slug);
  if (!article) notFound();
  return <ArticleLayout article={article}><MDXRemote source={article.content} components={mdxComponents} /></ArticleLayout>;
}
