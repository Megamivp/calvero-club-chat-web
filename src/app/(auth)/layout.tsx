import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { Container, Section } from "@/components/ui/react/design-system";

import type { PropsWithChildren } from "react";

export default async function AuthLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="mt-24 flex-1">
        <Section>
          <Container>{children}</Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
