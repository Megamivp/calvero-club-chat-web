"use client";

import { Fragment } from "react";
import { LinkPreview } from "@/components/ui/react/link-preview";
import { extractUrls, detectLinks } from "@/utils/link-detection";

interface MessageContentProps {
  content: string;
  className?: string;
}

export function MessageContent({
  content,
  className = "",
}: MessageContentProps) {
  const urls = extractUrls(content);

  if (urls.length === 0) {
    return <p className={className}>{content}</p>;
  }

  const links = detectLinks(content);
  const parts: Array<{ text: string; isLink: boolean; url?: string }> = [];
  let lastIndex = 0;

  links.forEach((link) => {
    if (link.start > lastIndex) {
      parts.push({
        text: content.slice(lastIndex, link.start),
        isLink: false,
      });
    }

    parts.push({
      text: link.url,
      isLink: true,
      url: link.url,
    });

    lastIndex = link.end;
  });

  if (lastIndex < content.length) {
    parts.push({
      text: content.slice(lastIndex),
      isLink: false,
    });
  }

  return (
    <div className={className}>
      <p className="break-words leading-relaxed">
        {parts.map((part, index) => (
          <Fragment key={index}>
            {part.isLink ? (
              <a
                href={part.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                {part.text}
              </a>
            ) : (
              part.text
            )}
          </Fragment>
        ))}
      </p>

      {urls.length > 0 && (
        <div className="mt-3 space-y-2">
          {urls.slice(0, 3).map((url, index) => (
            <LinkPreview key={`${url}-${index}`} url={url} />
          ))}
          {urls.length > 3 && (
            <p className="text-xs text-muted-foreground">
              +{urls.length - 3} more link{urls.length - 3 > 1 ? "s" : ""}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
