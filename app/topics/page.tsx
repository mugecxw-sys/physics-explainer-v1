import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { topics } from "@/content/topics/topics";

export const metadata: Metadata = {
  title: "Physics Topics",
  description: "Browse clear explanations by area of physics, from quantum physics to thermodynamics.",
  alternates: { canonical: "/topics/" },
  openGraph: { title: "Physics Topics", description: "Browse clear explanations by area of physics.", url: "/topics/" },
  twitter: { card: "summary", title: "Physics Topics", description: "Browse clear explanations by area of physics." },
};

export default function TopicsPage() {
  return (
    <div className="hub-shell shell">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Topics" }]} />
      <header className="hub-header">
        <p className="eyebrow">Explore physics</p>
        <h1>Start with the question, then build the picture.</h1>
        <p>Browse published explanations by topic. Each hub includes only articles with real content.</p>
      </header>
      <div className="topic-index">
        {topics.map((topic) => (
          <Link href={`/topics/${topic.slug}/`} key={topic.slug}>
            <h2>{topic.title}</h2><p>{topic.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
