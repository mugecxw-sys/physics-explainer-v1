export type Person = {
  name: string;
  url?: string;
};

export type Source = {
  title: string;
  url: string;
  publisher?: string;
};

export type ArticleRelation = {
  slug: string;
  title: string;
};

export type ArticleFrontmatter = {
  title: string;
  description: string;
  slug: string;
  topic: string;
  datePublished: string;
  dateModified: string;
  author?: Person | null;
  reviewedBy?: Person | null;
  scientificReviewStatus?: "not-reviewed" | "reviewed";
  image?: string | null;
  prerequisites?: ArticleRelation[];
  related?: ArticleRelation[];
  next?: ArticleRelation | null;
  sources?: Source[];
  featured?: boolean;
};

export type Topic = {
  slug: string;
  cluster: string;
  title: string;
  description: string;
  startHere?: string[];
};

export type AudioEpisode = {
  slug: string;
  title: string;
  description: string;
  breadcrumbLabel: string;
  intro: string[];
  whatYoullUnderstand: string;
  aboutAudio: string[];
  cluster: string;
  audioUrl: string;
  chapters: { title: string; time?: string }[];
  relatedArticles: { title: string; href: string }[];
  sources: Source[];
};
