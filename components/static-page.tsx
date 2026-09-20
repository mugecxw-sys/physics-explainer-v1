import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema } from "@/lib/schema";

export function StaticPage({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <>
      <StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: title, path: `/${title.toLowerCase().replaceAll(" ", "-")}/` }])} />
      <article className="static-page shell">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
        <header>
          <h1>{title}</h1>
          <p className="article-description">{description}</p>
        </header>
        <div className="article-body">{children}</div>
      </article>
    </>
  );
}
