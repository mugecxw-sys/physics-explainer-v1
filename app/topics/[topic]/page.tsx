import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { StructuredData } from "@/components/structured-data";
import { audioEpisodes } from "@/content/audio/episodes";
import { getTopic, topics } from "@/content/topics/topics";
import { getArticlesForCluster } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";

type PageProps = { params: Promise<{ topic: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return topics.map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topic: slug } = await params;
  const topic = getTopic(slug);
  if (!topic) return {};
  const path = `/topics/${topic.slug}/`;
  return {
    title: topic.title,
    description: topic.description,
    alternates: { canonical: path },
    openGraph: { title: topic.title, description: topic.description, url: path },
    twitter: { card: "summary", title: topic.title, description: topic.description },
  };
}

export default async function TopicPage({ params }: PageProps) {
  const { topic: slug } = await params;
  const topic = getTopic(slug);
  if (!topic) notFound();
  const articles = getArticlesForCluster(topic.cluster);
  const startHere = (topic.startHere ?? []).map((articleSlug) => articles.find((article) => article.frontmatter.slug === articleSlug)).filter(Boolean);
  const relatedAudio = audioEpisodes.filter((episode) => episode.cluster === topic.cluster);
  const hasLearningPath = articles.some((article) => (article.frontmatter.prerequisites?.length ?? 0) > 0 || article.frontmatter.next);

  return (
    <>
      <StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Topics", path: "/topics/" }, { name: topic.title, path: `/topics/${topic.slug}/` }])} />
      <div className="hub-shell shell">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Topics", href: "/topics/" }, { label: topic.title }]} />
        <header className="hub-header">
          <p className="eyebrow">Physics topic</p>
          <h1>{topic.title}</h1>
          <p>{topic.description}</p>
        </header>

        {startHere.length > 0 && (
          <section className="hub-section" aria-labelledby="start-heading">
            <p className="eyebrow">A clear entry point</p><h2 id="start-heading">Start here</h2>
            {startHere.map((article) => article && <Link className="featured-question" key={article.frontmatter.slug} href={`/physics/${article.cluster}/${article.frontmatter.slug}/`}>{article.frontmatter.title}<span aria-hidden="true">→</span></Link>)}
          </section>
        )}

        <section className="hub-section" aria-labelledby="questions-heading">
          <p className="eyebrow">Published explanations</p><h2 id="questions-heading">Questions in this topic</h2>
          {articles.length > 0 ? (
            <div className="question-list">
              {articles.map((article) => <Link className="question-row" key={article.frontmatter.slug} href={`/physics/${article.cluster}/${article.frontmatter.slug}/`}><span>{article.frontmatter.title}</span><small>Read</small></Link>)}
            </div>
          ) : <p className="quiet-note">No articles are published in this topic yet.</p>}
        </section>

        {hasLearningPath && <section className="hub-section"><h2>Suggested learning path</h2><p>Relationships supplied by the content team will appear here.</p></section>}
        {relatedAudio.length > 0 && <section className="hub-section"><h2>Related audio</h2>{relatedAudio.map((episode) => <Link key={episode.slug} href={`/audio/${episode.slug}/`}>{episode.title}</Link>)}</section>}
      </div>
    </>
  );
}
