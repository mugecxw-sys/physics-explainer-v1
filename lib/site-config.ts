const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com";

export const siteConfig = {
  name: "SITE_NAME",
  tagline: "Physics without the textbook wall.",
  description:
    "Clear explanations of difficult physics questions for readers without a physics background.",
  url: rawSiteUrl.replace(/\/$/, ""),
  audioBaseUrl: "https://audio.yourdomain.com",
  organization: {
    name: "SITE_NAME",
  },
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteConfig.url}/`).toString();
}
