"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { y: -40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 8,
      mass: 0.5,
    },
  },
};

export function MediumImpactHero({
  title,
  description,
  children,
}: React.PropsWithChildren<{
  title: string;
  description: string;
}>) {
  const firstWord = title.split(" ").shift();
  const restTitle = title.split(" ").slice(1).join(" ");
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      className="relative overflow-hidden py-10 lg:py-32"
    >
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <Image
          alt="background"
          src="/images/pattern/square-alt-grid.svg"
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
                <span className="text-primary">{firstWord}</span> {restTitle}
              </h1>
              <p className="mx-auto max-w-3xl font-manrope text-muted-foreground lg:text-xl">
                {description}
              </p>
            </div>
            <div className="mt-6 flex justify-center gap-3">{children}</div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
