import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AudioPlayer } from "@/components/audio-player";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { StructuredData } from "@/components/structured-data";
import { audioEpisodes } from "@/content/audio/episodes";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site-config";
import { breadcrumbSchema } from "@/lib/schema";
import { getTopicByCluster } from "@/content/topics/topics";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return audioEpisodes.map((episode) => ({ slug: episode.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const episode = audioEpisodes.find((item) => item.slug === slug);
  if (!episode) return {};
  return pageMetadata(episode.title, episode.description, `/audio/${episode.slug}/`);
}

export default async function AudioEpisodePage({ params }: PageProps) {
  const { slug } = await params;
  const episode = audioEpisodes.find((item) => item.slug === slug);
  if (!episode) notFound();

  const pagePath = `/audio/${episode.slug}/`;
  const topic = getTopicByCluster(episode.cluster);
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Audio" },
    { label: episode.breadcrumbLabel },
  ];
  const audioSchema = {
    "@context": "https://schema.org",
    "@type": "AudioObject",
    "@id": absoluteUrl(`${pagePath}#audio`),
    name: episode.title,
    description: episode.description,
    contentUrl: absoluteUrl(episode.audioUrl),
    encodingFormat: "audio/mpeg",
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema(breadcrumbItems.map((item) => ({ name: item.label, path: item.href ?? pagePath })))} />
      <StructuredData data={audioSchema} />
      <article className="audio-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <header className="audio-header">
          <p className="eyebrow">Audio Explainer</p>
          <h1>{episode.title}</h1>
          {episode.intro.map((paragraph) => <p className="audio-intro" key={paragraph}>{paragraph}</p>)}
        </header>

        <section className="audio-player-panel" aria-label="Audio player">
          <p className="eyebrow">Audio Explainer</p>
            <p>{topic?.title ?? episode.cluster}</p>
          <AudioPlayer src={episode.audioUrl} slug={episode.slug} title={`Audio player: ${episode.title}`} />
        </section>

        <div className="audio-copy">
          <section aria-labelledby="understand-heading">
            <h2 id="understand-heading">What you&apos;ll understand</h2>
            <p>{episode.whatYoullUnderstand}</p>
          </section>

          <section aria-labelledby="chapters-heading">
            <h2 id="chapters-heading">Chapters</h2>
            <ol className="chapters">
              {episode.chapters.map((chapter) => (
                <li key={chapter.title}>
                  {chapter.time && <time>{chapter.time}</time>}
                  <span>{chapter.title}</span>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="related-reading-heading">
            <h2 id="related-reading-heading">Related Reading</h2>
            <div className="question-list">
              {episode.relatedArticles.map((article) => (
                <Link className="question-row" href={article.href} key={article.href}>
                  <span>{article.title}</span>
                  <small>{topic?.title ?? episode.cluster}</small>
                </Link>
              ))}
            </div>
          </section>

          <section aria-labelledby="about-audio-heading">
            <h2 id="about-audio-heading">About this audio</h2>
            {episode.aboutAudio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        </div>

        <section className="article-support sources" aria-labelledby="sources-heading">
          <h2 id="sources-heading">Sources</h2>
          <ol>
            {episode.sources.map((source) => (
              <li key={source.url}><a href={source.url}>{source.title}</a>{source.publisher ? ` — ${source.publisher}` : ""}</li>
            ))}
          </ol>
        </section>
        {topic && <p className="parent-topic">Parent topic: <Link href={`/topics/${topic.slug}/`}>{topic.title}</Link></p>}
      </article>
    </>
  );
}
