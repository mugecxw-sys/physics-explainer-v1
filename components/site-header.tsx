import Link from "next/link";
import { audioEpisodes } from "@/content/audio/episodes";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="wordmark" href="/">{siteConfig.name}</Link>
        <nav aria-label="Primary navigation">
          <Link href="/topics/">Topics</Link>
          {audioEpisodes.length >= 3 && <Link href="/audio/">Audio</Link>}
          <Link href="/about/">About</Link>
        </nav>
      </div>
    </header>
  );
}
