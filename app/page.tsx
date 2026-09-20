import Link from "next/link";
import { audioEpisodes } from "@/content/audio/episodes";
import { topics } from "@/content/topics/topics";
import { siteConfig } from "@/lib/site-config";
import { getAllArticles } from "@/lib/content";

export default function HomePage() {
  const featuredAudio = audioEpisodes[0];
  const popular = getAllArticles().filter((article) => article.frontmatter.featured).slice(0, 6);

  return (
    <>
      <section className="hero shell">
        <p className="eyebrow">{siteConfig.name}</p>
        <h1>{siteConfig.tagline}</h1>
        <p className="lede">Understand the ideas behind difficult physics questions—without needing a physics background first.</p>
        <Link className="text-link" href="/topics/">Explore physics <span aria-hidden="true">→</span></Link>
      </section>

      <section className="section shell" aria-labelledby="popular-heading">
        <div className="section-heading">
          <p className="eyebrow">Start with a question</p>
          <h2 id="popular-heading">Popular questions</h2>
        </div>
        <div className="question-list">
          {popular.map((article) => (
            <Link key={article.frontmatter.slug} href={`/physics/${article.cluster}/${article.frontmatter.slug}/`} className="question-row">
              <span>{article.frontmatter.title}</span><small>{article.frontmatter.topic}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="section shell" aria-labelledby="topics-heading">
        <div className="section-heading">
          <p className="eyebrow">Browse by idea</p>
          <h2 id="topics-heading">Explore physics</h2>
        </div>
        <div className="topic-grid">
          {topics.map((topic, index) => (
            <Link key={topic.slug} href={`/topics/${topic.slug}/`} className="topic-link">
              <span className="topic-number">0{index + 1}</span>
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {featuredAudio && (
        <section className="section shell" aria-labelledby="listen-heading">
          <p className="eyebrow">Listen</p>
          <h2 id="listen-heading">{featuredAudio.title}</h2>
          <p>{featuredAudio.description}</p>
          <Link href={`/audio/${featuredAudio.slug}/`}>Listen to the episode</Link>
        </section>
      )}

      <section className="method-section">
        <div className="shell method-grid">
          <div>
            <p className="eyebrow">Our approach</p>
            <h2>How we explain physics</h2>
          </div>
          <div className="method-copy">
            <p>We begin with the question a reader is actually asking, separate the intuition from the misconception, and add precision only when it helps.</p>
            <Link className="text-link" href="/editorial-policy/">Read our editorial method <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>
    </>
  );
}
