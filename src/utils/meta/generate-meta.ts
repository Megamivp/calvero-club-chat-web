import { mergeOpenGraph } from "./open-graph";

import type { Metadata } from "next";

export const generateMeta = async (args: {
  meta?: {
    title?: string;
    description?: string;
    keywords?: string | string[];
  };
  slug?: string | string[];
}): Promise<Metadata> => {
  const { meta, slug } = args;

  const title = meta?.title
    ? `${meta?.title} · ${process.env.NEXT_PUBLIC_SITE_TITLE}`
    : process.env.NEXT_PUBLIC_SITE_TITLE;

  return {
    description: meta?.description,
    keywords: Array.isArray(meta?.keywords)
      ? meta?.keywords.join(", ")
      : meta?.keywords,
    openGraph: mergeOpenGraph({
      description: meta?.description || "",
      title,
      url: Array.isArray(slug) ? slug.join("/") : "/",
    }),
    title,
  };
};
