import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "animate-pulse rounded-md bg-accent text-accent-foreground",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
