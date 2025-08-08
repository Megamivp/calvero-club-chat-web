"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { communities } from "@/constants/data";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: "easeOut" as const,
    },
  }),
};

function CommunityBlock() {
  return (
    <div className="flex flex-col items-center gap-6 lg:gap-10">
      <div className="container mb-10 grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {communities.map(({ name, description, icon: Icon, href }, i) => (
          <motion.div
            key={name}
            data-slot="card"
            className="group flex flex-1 flex-col items-center gap-6 rounded-2xl border bg-background p-8 text-card-foreground shadow-sm transition-shadow duration-200 hover:shadow-lg"
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
          >
            <Link
              href={href}
              target="_blank"
              className="flex flex-col items-center"
            >
              <span className="relative mb-4 flex size-16 items-center justify-center rounded-full border-2 border-dotted border-muted-foreground/40 bg-primary text-primary-foreground transition-colors duration-200 group-hover:bg-muted group-hover:text-foreground group-hover:[&>span]:opacity-0">
                <Icon className="z-10 size-8" />
                <span className="absolute z-0 size-12 animate-ping rounded-full bg-primary"></span>
              </span>
              <h5 className="mb-1 text-lg font-semibold">{name}</h5>
              <p className="mb-2 text-center text-base text-muted-foreground">
                {description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export { CommunityBlock };
