"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { MousePointerIcon } from "lucide-react";
import { useRef, useEffect, useState } from "react";

function PointerHighlight({
  children,
  rectangleClassName,
  pointerClassName,
  containerClassName,
}: {
  children: React.ReactNode;
  rectangleClassName?: string;
  pointerClassName?: string;
  containerClassName?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div
      className={cn("relative w-fit", containerClassName)}
      ref={containerRef}
    >
      {children}
      {dimensions.width > 0 && dimensions.height > 0 && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 0.95, originX: 0, originY: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            className={cn("absolute inset-0 border", rectangleClassName)}
            initial={{
              width: 0,
              height: 0,
            }}
            whileInView={{
              width: dimensions.width,
              height: dimensions.height,
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="pointer-events-none absolute"
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              x: dimensions.width,
              y: dimensions.height,
            }}
            transition={{
              opacity: { duration: 0.1, ease: "easeInOut" },
              duration: 1,
              ease: "easeInOut",
            }}
          >
            <MousePointerIcon
              className={cn("size-5 text-primary", pointerClassName)}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export { PointerHighlight };
