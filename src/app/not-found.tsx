import Image from "next/image";
import Link from "next/link";

import { generateMeta } from "@/utils/meta/generate-meta";

import { Button } from "@/components/ui/primitives/button";

export const metadata = generateMeta({
  meta: {
    title: "Page Not Found - 404",
    description:
      "The page you are looking for could not be found. Please check the URL or navigate back to the homepage.",
  },
});

export default async function Page() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden py-32">
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <Image
          alt="background"
          src="/images/patterns/square-alt-grid.svg"
          className="opacity-90 [mask-image:radial-gradient(75%_75%_at_center,white,transparent)]"
          width={1000}
          height={1000}
        />
      </div>
      <div className="container relative z-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="rounded-xl bg-background/30 p-4 shadow-sm backdrop-blur-sm">
              <Image
                src="/favicon.ico"
                alt="logo"
                className="h-16"
                width={64}
                height={64}
              />
            </div>
            <div>
              <h1 className="mb-6 text-pretty font-manrope text-2xl font-bold tracking-tight lg:text-5xl">
                <span className="text-primary">404</span> - Page Not Found
              </h1>
              <p className="mx-auto max-w-3xl font-manrope text-muted-foreground lg:text-xl">
                The page you are looking for could not be found. It might have
                been moved, deleted, or you entered the wrong URL.
              </p>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <Link href="/">
                <Button className="shadow-sm transition-shadow hover:shadow">
                  Go to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
