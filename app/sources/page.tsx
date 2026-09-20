import { StaticPage } from "@/components/static-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Sources", "The source standards used by SITE_NAME physics explanations.", "/sources/");

export default function SourcesPage() {
  return <StaticPage title="Sources" description="Sources are attached to the article they support."><h2>Source standards</h2><p>We prefer primary materials, established textbooks, university resources, scientific institutions, and careful reference works. A source link is not a substitute for explaining the idea clearly.</p><h2>Article-level references</h2><p>Each published explanation lists its own relevant sources. This keeps evidence close to the claims and makes updates easier to audit.</p></StaticPage>;
}
