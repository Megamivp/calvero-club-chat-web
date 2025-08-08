import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "URL parameter is required" },
      { status: 400 },
    );
  }

  try {
    new URL(url);

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate",
        Connection: "keep-alive",
        "Cache-Control": "no-cache",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const metadata = {
      title:
        $('meta[property="og:title"]').attr("content") ||
        $('meta[name="twitter:title"]').attr("content") ||
        $("title").text() ||
        "",

      description:
        $('meta[property="og:description"]').attr("content") ||
        $('meta[name="twitter:description"]').attr("content") ||
        $('meta[name="description"]').attr("content") ||
        "",

      image:
        $('meta[property="og:image"]').attr("content") ||
        $('meta[name="twitter:image"]').attr("content") ||
        $('meta[name="twitter:image:src"]').attr("content") ||
        "",

      siteName:
        $('meta[property="og:site_name"]').attr("content") ||
        new URL(url).hostname,

      url: url,

      type: $('meta[property="og:type"]').attr("content") || "website",

      favicon:
        $('link[rel="icon"]').attr("href") ||
        $('link[rel="shortcut icon"]').attr("href") ||
        $('link[rel="apple-touch-icon"]').attr("href") ||
        `/favicon.ico`,
    };

    if (metadata.image && !metadata.image.startsWith("http")) {
      const baseUrl = new URL(url);
      metadata.image = new URL(metadata.image, baseUrl.origin).href;
    }

    if (metadata.favicon && !metadata.favicon.startsWith("http")) {
      const baseUrl = new URL(url);
      metadata.favicon = new URL(metadata.favicon, baseUrl.origin).href;
    }

    metadata.title = metadata.title.trim().substring(0, 200);
    metadata.description = metadata.description.trim().substring(0, 300);

    return NextResponse.json(metadata);
  } catch {
    try {
      const urlObj = new URL(url);
      const fallbackMetadata = {
        title: urlObj.hostname,
        description: `Visit ${urlObj.hostname}`,
        image: "",
        siteName: urlObj.hostname,
        url: url,
        type: "website",
        favicon: `${urlObj.origin}/favicon.ico`,
      };

      return NextResponse.json(fallbackMetadata);
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }
  }
}
