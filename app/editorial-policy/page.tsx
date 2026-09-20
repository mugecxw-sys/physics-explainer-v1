import { StaticPage } from "@/components/static-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Editorial Policy", "How Physics, Plainly. structures, edits, and updates physics explanations.", "/editorial-policy/");

export default function EditorialPolicyPage() {
  return <StaticPage title="Editorial Policy" description="How explanations are shaped for clarity without pretending the physics is simpler than it is."><h2>Question first</h2><p>Every article begins with a specific reader question. Section structure is chosen for that question rather than imposed as a universal template.</p><h2>Clarity and precision</h2><p>We distinguish useful intuition from literal description, identify common misconceptions, and provide sources for claims that need support.</p><h2>Corrections and updates</h2><p>Published pages display their last-updated date. Substantive corrections should update both the article and its modification date.</p></StaticPage>;
}
