import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link className="wordmark" href="/">{siteConfig.name}</Link>
          <p>{siteConfig.description}</p>
        </div>
        <div>
          <h2>Explore</h2>
          <Link href="/topics/">Topics</Link>
          <Link href="/topics/quantum/">Quantum Physics</Link>
          <Link href="/topics/relativity/">Relativity</Link>
          <Link href="/topics/atomic-physics/">Atomic Physics</Link>
          <Link href="/topics/thermodynamics/">Thermodynamics</Link>
        </div>
        <div>
          <h2>Standards</h2>
          <Link href="/editorial-policy/">Editorial Policy</Link>
          <Link href="/scientific-review/">Scientific Review</Link>
          <Link href="/sources/">Sources</Link>
          <Link href="/privacy/">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
