import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { StructuredData } from "@/components/structured-data";
import type { ArticleDocument } from "@/lib/content";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { getTopicByCluster } from "@/content/topics/topics";

function Relations({ article }: { article: ArticleDocument }) {
  const { prerequisites = [], related = [], next } = article.frontmatter;
  const hasRelations = prerequisites.length > 0 || related.length > 0 || Boolean(next);
  if (!hasRelations) return null;

  const articleHref = (slug: string) => `/physics/${article.cluster}/${slug}/`;
  return (
    <section className="article-support" aria-labelledby="go-deeper-heading">
      <h2 id="go-deeper-heading">Go deeper</h2>
      <div className="relation-grid">
        {prerequisites.length > 0 && <div><h3>Prerequisites</h3>{prerequisites.map((item) => <Link key={item.slug} href={articleHref(item.slug)}>{item.title}</Link>)}</div>}
        {related.length > 0 && <div><h3>Related questions</h3>{related.map((item) => <Link key={item.slug} href={articleHref(item.slug)}>{item.title}</Link>)}</div>}
        {next && <div><h3>Next</h3><Link href={articleHref(next.slug)}>{next.title}</Link></div>}
      </div>
    </section>
  );
}

export function ArticleLayout({ article, children }: { article: ArticleDocument; children: ReactNode }) {
  const topic = getTopicByCluster(article.cluster);
  const { frontmatter } = article;
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: topic?.title ?? frontmatter.topic, href: topic ? `/topics/${topic.slug}/` : "/topics/" },
    { label: frontmatter.title },
  ];
  const schemaItems = breadcrumbItems.map((item) => ({ name: item.label, path: item.href ?? `/physics/${article.cluster}/${frontmatter.slug}/` }));

  return (
    <>
      <StructuredData data={breadcrumbSchema(schemaItems)} />
      <StructuredData data={articleSchema(article)} />
      <article className="article-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <header className="article-header">
          <p className="eyebrow">{topic?.title ?? frontmatter.topic}</p>
          <h1>{frontmatter.title}</h1>
          <p className="article-description">{frontmatter.description}</p>
          <div className="article-meta">
            {frontmatter.author?.name && <span>By {frontmatter.author.name}</span>}
            <span>Last updated <time dateTime={frontmatter.dateModified}>{frontmatter.dateModified}</time></span>
            <Link href="/editorial-policy/">Editorial method</Link>
          </div>
        </header>
        <div className="article-body">{children}</div>
        {frontmatter.sources && frontmatter.sources.length > 0 && (
          <section className="article-support sources" aria-labelledby="sources-heading">
            <h2 id="sources-heading">Sources</h2>
            <ol>{frontmatter.sources.map((source) => <li key={source.url}><a href={source.url}>{source.title}</a>{source.publisher ? ` — ${source.publisher}` : ""}</li>)}</ol>
          </section>
        )}
        <Relations article={article} />
        {topic && <p className="parent-topic">Parent topic: <Link href={`/topics/${topic.slug}/`}>{topic.title}</Link></p>}
      </article>
    </>
  );
}
