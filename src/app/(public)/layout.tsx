"use client";

import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { Main } from "@/components/ui/react/design-system";
import { ScrollUpButton } from "@/components/ui/react/scroll-up-button";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Main className="mt-24 flex flex-1 flex-col items-center gap-6 lg:gap-10">
        {children}
      </Main>
      <Footer />
      <ScrollUpButton />
    </>
  );
}
