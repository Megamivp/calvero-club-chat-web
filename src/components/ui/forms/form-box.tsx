"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

function FormBox({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.ComponentProps<typeof motion.div>>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn("mx-auto my-8 max-w-lg space-y-4", className)}
      {...props}
    >
      <div
        className={cn(
          "space-y-4",
          "[&_[data-slot=title]]:text-center [&_[data-slot=title]]:text-4xl [&_[data-slot=title]]:font-medium",
          "[&_[data-slot=description]]:text-center [&_[data-slot=description]]:text-base [&_[data-slot=description]]:text-muted-foreground",
          "[&_[data-slot=footer]>a]:font-medium [&_[data-slot=footer]>a]:text-foreground [&_[data-slot=footer]>a]:hover:underline [&_[data-slot=footer]]:text-sm [&_[data-slot=footer]]:text-muted-foreground",
        )}
      >
        {children}
      </div>
      <Link className="text-sm text-muted-foreground" href="/">
        &larr; Back to home
      </Link>
    </motion.div>
  );
}

export { FormBox };
