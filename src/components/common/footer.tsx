"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { fastNavigations, communities } from "@/constants/data";
import { ScrollVelocity } from "@/components/ui/text-animations/scroll-velocity";
import { CommunityBlock } from "@/components/blocks/community";
import { MailIcon } from "lucide-react";

const listItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      ease: "easeOut" as const,
      duration: 0.3,
    },
  }),
};

const headingVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function Footer() {
  return (
    <>
      <hr className="my-6 lg:my-10" />
      <CommunityBlock />
      <hr className="mb-6 lg:mb-10" />
      <ScrollVelocity texts={[process.env.NEXT_PUBLIC_SITE_TITLE!]} />
      <hr className="my-6 lg:my-10" />
      <div className="container">
        <footer>
          <div className="grid grid-cols-2 gap-6 lg:gap-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h3 className="mb-4 font-bold" variants={headingVariants}>
                Fast Navigation
              </motion.h3>
              <ul className="space-y-4 text-muted-foreground">
                {fastNavigations.map((item, i) => (
                  <motion.li
                    key={item.label}
                    className="font-medium hover:text-primary"
                    custom={i}
                    variants={listItemVariants}
                  >
                    <Link passHref target="_blank" href={item.path}>
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.3 }}
              className="col-span-2 lg:col-span-1"
            >
              <motion.p className="mb-4 font-bold" variants={headingVariants}>
                Follow us
              </motion.p>
              <ul className="mb-6 flex flex-wrap items-center gap-2 text-muted-foreground">
                {communities.map((item, i) => (
                  <motion.li
                    key={item.name}
                    custom={i}
                    variants={listItemVariants}
                    className="flex"
                  >
                    <Link
                      passHref
                      target="_blank"
                      href={item.href}
                      className="flex size-12 items-center justify-center rounded-full bg-muted transition-colors hover:text-primary"
                    >
                      <item.icon width="30" height="30" />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.p
                className="mb-4 mt-6 font-bold"
                variants={headingVariants}
              >
                Contact Us
              </motion.p>
              <ul className="flex flex-wrap items-center gap-2 text-muted-foreground">
                <motion.li
                  variants={listItemVariants}
                  className="flex flex-wrap"
                >
                  <p className="flex w-full select-all items-center rounded-lg bg-muted p-2 font-mono text-sm text-muted-foreground transition-colors hover:text-primary">
                    <MailIcon className="mr-2 inline-flex size-6" />{" "}
                    business@calvero.club
                  </p>
                </motion.li>
              </ul>
            </motion.div>
          </div>
        </footer>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.4, duration: 0.3, ease: "easeOut" }}
        className="mt-6 border-t py-6 lg:mt-10 lg:py-10"
      >
        <p className="text-center text-sm font-medium text-muted-foreground">
          © {new Date().getFullYear()}{" "}
          {new URL(process.env.NEXT_PUBLIC_SITE_URL!).host}. All rights
          reserved.
        </p>
      </motion.div>
    </>
  );
}
