"use client";

import { useState, useEffect } from "react";
import { ExternalLink, Image as ImageIcon, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/primitives/card";
import { Skeleton } from "@/components/ui/primitives/skeleton";

interface LinkMetadata {
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
  url: string;
}

interface LinkPreviewProps {
  url: string;
  className?: string;
}

export function LinkPreview({ url, className = "" }: LinkPreviewProps) {
  const [metadata, setMetadata] = useState<LinkMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(
          `/api/metadata?url=${encodeURIComponent(url)}`,
        );

        if (response.ok) {
          const data = await response.json();
          setMetadata({
            title: data.title,
            description: data.description,
            image: data.image,
            siteName: data.domain,
            url: data.url,
          });
        } else {
          throw new Error("Failed to fetch metadata");
        }
      } catch {
        try {
          const urlObj = new URL(url);
          const hostname = urlObj.hostname;

          let title = hostname;
          if (urlObj.pathname !== "/") {
            const pathParts = urlObj.pathname.split("/").filter(Boolean);
            if (pathParts.length > 0) {
              title = pathParts[pathParts.length - 1].replace(/-|_/g, " ");
            }
          }

          let image = undefined;
          if (hostname.includes("github.com")) {
            image = "https://github.com/favicon.ico";
            title = `GitHub: ${title}`;
          } else if (
            hostname.includes("youtube.com") ||
            hostname.includes("youtu.be")
          ) {
            image = "https://www.youtube.com/favicon.ico";
            title = `YouTube: ${title}`;
          } else if (
            hostname.includes("twitter.com") ||
            hostname.includes("x.com")
          ) {
            image = "https://twitter.com/favicon.ico";
            title = `Twitter: ${title}`;
          } else if (hostname.includes("linkedin.com")) {
            image = "https://linkedin.com/favicon.ico";
            title = `LinkedIn: ${title}`;
          }

          setMetadata({
            title: title,
            description: `Visit ${hostname}`,
            image: image,
            siteName: hostname,
            url: url,
          });
        } catch {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [url]);

  const handleClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <Card
        className={`max-w-md cursor-pointer transition-colors hover:bg-accent ${className}`}
      >
        <CardContent className="p-3">
          <div className="flex space-x-3">
            <Skeleton className="h-16 w-16 rounded" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !metadata) {
    return (
      <Card
        className={`max-w-md cursor-pointer transition-colors hover:bg-accent ${className}`}
        onClick={handleClick}
      >
        <CardContent className="p-3">
          <div className="flex items-center space-x-3">
            <div className="flex h-16 w-16 items-center justify-center rounded bg-muted">
              <ExternalLink className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-blue-600 hover:text-blue-800">
                {url}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Click to open link
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`max-w-md cursor-pointer transition-colors hover:bg-accent ${className}`}
      onClick={handleClick}
    >
      <CardContent className="p-3">
        <div className="flex space-x-3">
          {metadata.image ? (
            <div className="relative h-16 w-16 flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={metadata.image}
                alt={metadata.title || "Link preview"}
                className="h-full w-full rounded object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <div className="hidden h-full w-full items-center justify-center rounded bg-muted">
                <ImageIcon className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
          ) : (
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded bg-muted">
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
          )}

          <div className="min-w-0 flex-1">
            {metadata.title && (
              <h4 className="mb-1 line-clamp-2 text-sm font-medium">
                {metadata.title}
              </h4>
            )}

            {metadata.description && (
              <p className="mb-1 line-clamp-2 text-xs text-muted-foreground">
                {metadata.description}
              </p>
            )}

            <div className="flex items-center text-xs text-muted-foreground">
              <ExternalLink className="mr-1 h-3 w-3" />
              <span className="truncate">{metadata.siteName}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
