import { StaticPage } from "@/components/static-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Privacy", "The V1 privacy approach for the SITE_NAME static website.", "/privacy/");

export default function PrivacyPage() {
  return <StaticPage title="Privacy" description="V1 is a static publication and does not provide user accounts or public submissions."><h2>Information collected</h2><p>The website does not currently offer accounts, comments, newsletters, or forms. Hosting providers may process standard request data needed to deliver pages securely.</p><h2>Future analytics</h2><p>If privacy-conscious analytics are introduced, this page will be updated to describe what is collected and why.</p></StaticPage>;
}
