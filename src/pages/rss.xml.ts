import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

import { siteConfig } from "@/config/site";

export async function GET(context: { site?: URL }) {
  const posts = await getCollection("posts", ({ data }) => !data.draft);

  const sortedPosts = posts.sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
  );

  return rss({
    title: siteConfig.name,

    description: siteConfig.description,

    site: context.site ?? siteConfig.url,

    items: sortedPosts.map((post) => ({
      title: post.data.title,

      description: post.data.description,

      pubDate: post.data.publishedAt,

      link: `/${post.id}/`,
    })),

    customData: `
      <language>${siteConfig.language}</language>
    `,
  });
}
