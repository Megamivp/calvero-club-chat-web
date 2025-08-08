"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/primitives/button";
import { Nav } from "@/components/ui/react/design-system";
import { useSelector } from "@/lib/redux";

function BrandItem() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 font-manrope text-3xl font-bold"
    >
      <Image
        src="/favicon.ico"
        width={32}
        height={32}
        alt={process.env.NEXT_PUBLIC_SITE_TITLE!}
        className="not-sr-only h-8 w-8 flex-shrink-0 invert-0 lg:sr-only"
      />
      <span className="sr-only lg:not-sr-only">
        {process.env.NEXT_PUBLIC_SITE_TITLE}
      </span>
    </Link>
  );
}

function Header() {
  const { isLoggedIn } = useSelector((state) => state.session);
  const pathname = usePathname();

  const lastScrollY = useRef(0);

  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setHidden(true);
        lastScrollY.current = currentScrollY;
        return;
      }
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setHidden(false);
      } else if (currentScrollY < lastScrollY.current) {
        setHidden(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: hidden ? 0 : -100 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed top-0 z-50 mx-auto flex h-16 w-full items-center justify-center border-b bg-background"
      role="navigation"
      aria-label="Main navigation"
      style={{ pointerEvents: hidden ? "auto" : "none" }}
    >
      <Nav containerClassName="flex items-center gap-4 justify-between">
        <BrandItem />
        <div className="flex gap-2">
          {isLoggedIn ? (
            <Link href="/chats">
              <Button size="lg">See Your Chats</Button>
            </Link>
          ) : (
            <Link href={pathname === "/login" ? "/register" : "/login"}>
              <Button size="lg">
                {pathname === "/login" ? "Create Calvero ID" : "Start Free"}
              </Button>
            </Link>
          )}
        </div>
      </Nav>
    </motion.div>
  );
}

export { Header };
