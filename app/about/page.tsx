import { StaticPage } from "@/components/static-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("About", "Why SITE_NAME explains physics for readers without a specialist background.", "/about/");

export default function AboutPage() {
  return <StaticPage title="About" description="A place to understand physics without studying physics."><h2>What this site is for</h2><p>SITE_NAME is designed for readers who have a real question about the physical world but do not want a textbook course before they can understand the answer.</p><h2>What we publish</h2><p>Each article focuses on one question, gives the direct answer early, and adds precision without hiding the central idea behind unnecessary terminology.</p></StaticPage>;
}
