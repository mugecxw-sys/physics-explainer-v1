export const productionSiteUrl = "https://physicsplainly.com";

const deployment = process.env.SITE_DEPLOYMENT ?? "preview";
const rawSiteUrl = deployment === "production"
  ? productionSiteUrl
  : process.env.NEXT_PUBLIC_SITE_URL ?? productionSiteUrl;
const rawAudioBaseUrl = process.env.NEXT_PUBLIC_AUDIO_BASE_URL?.trim();

export const siteConfig = {
  name: "Physics, Plainly.",
  tagline: "Physics without the textbook wall.",
  description:
    "Clear explanations of difficult physics questions for readers without a physics background.",
  url: rawSiteUrl.replace(/\/$/, ""),
  audioBaseUrl: rawAudioBaseUrl ? rawAudioBaseUrl.replace(/\/$/, "") : null,
  organization: {
    name: "Physics, Plainly.",
  },
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteConfig.url}/`).toString();
}
