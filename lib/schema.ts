import { absoluteUrl, siteConfig } from "@/lib/site-config";
import type { ArticleDocument } from "@/lib/content";

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleSchema(article: ArticleDocument) {
  const { frontmatter } = article;
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.datePublished,
    dateModified: frontmatter.dateModified,
    mainEntityOfPage: absoluteUrl(`/physics/${article.cluster}/${frontmatter.slug}/`),
    publisher: { "@type": "Organization", name: siteConfig.organization.name },
  };

  if (frontmatter.author?.name) {
    schema.author = {
      "@type": "Person",
      name: frontmatter.author.name,
      ...(frontmatter.author.url ? { url: frontmatter.author.url } : {}),
    };
  }
  if (frontmatter.reviewedBy) {
    schema.reviewedBy = {
      "@type": "Person",
      name: frontmatter.reviewedBy.name,
      ...(frontmatter.reviewedBy.url ? { url: frontmatter.reviewedBy.url } : {}),
    };
  }
  if (frontmatter.image) schema.image = absoluteUrl(frontmatter.image);
  return schema;
}
