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
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Audio" },
    { label: "Quantum Measurement" },
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
          <p className="audio-intro">Quantum measurement is often explained as if reality changes because someone looks at it. That is not what the physics requires.</p>
          <p className="audio-intro">This audio explainer connects three closely related ideas: what an “observer” really means in quantum mechanics, why measurement creates a deeper conceptual problem, and why quantum entanglement still cannot be used to send messages faster than light.</p>
        </header>

        <section className="audio-player-panel" aria-label="Audio player">
          <p className="eyebrow">Audio Explainer</p>
          <p>Quantum Physics</p>
          <AudioPlayer src={episode.audioUrl} slug={episode.slug} title={`Audio player: ${episode.title}`} />
        </section>

        <div className="audio-copy">
          <section aria-labelledby="understand-heading">
            <h2 id="understand-heading">What you&apos;ll understand</h2>
            <p>Why the word “observer” can be misleading, why conscious awareness is not required, and why a measurement creates a deeper conceptual problem. It also explains what decoherence does—and does not—settle, and why entanglement produces remarkable correlations without creating a faster-than-light message channel.</p>
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
                  <small>Quantum Physics</small>
                </Link>
              ))}
            </div>
          </section>

          <section aria-labelledby="about-audio-heading">
            <h2 id="about-audio-heading">About this audio</h2>
            <p>This audio combines several related Physics, Plainly. explainers into one continuous plain-English explanation. It is written for listening rather than as a word-for-word reading of the individual articles.</p>
            <p>For the underlying explanations and sources, continue with the related reading above.</p>
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
        <p className="parent-topic">Parent topic: <Link href="/topics/quantum/">Quantum Physics</Link></p>
      </article>
    </>
  );
}
