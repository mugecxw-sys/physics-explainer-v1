import { StaticPage } from "@/components/static-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Scientific Review", "How SITE_NAME represents scientific review without overstating expert involvement.", "/scientific-review/");

export default function ScientificReviewPage() {
  return <StaticPage title="Scientific Review" description="Review status is shown only when a real, named reviewer has completed the review."><h2>No implied endorsement</h2><p>Automated checks, internal editing, and source review are not presented as expert scientific review.</p><h2>Reviewer information</h2><p>When a qualified reviewer is added, the article may display the reviewer’s name and relevant profile. If no reviewer is recorded, no review badge or equivalent claim is shown.</p></StaticPage>;
}
