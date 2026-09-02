import type { APIRoute } from "astro";

import { siteConfig } from "@/config/site";

export const GET: APIRoute = ({ site }) => {
  const baseUrl = site?.toString() ?? siteConfig.url;

  const sitemap = new URL("sitemap-index.xml", baseUrl);

  return new Response(
    ["User-agent: *", "Allow: /", "", `Sitemap: ${sitemap.toString()}`].join(
      "\n",
    ),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    },
  );
};
