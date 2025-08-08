import { MediumImpactHero } from "@/components/heroes/medium-impact";
import { Button } from "@/components/ui/primitives/button";
import { generateMeta } from "@/utils/meta/generate-meta";
import Link from "next/link";

export const metadata = generateMeta({
  meta: {
    title: "Calvero - Secure & Encrypted Messaging",
    description:
      "Your messages are completely encrypted and secure with Calvero. Protect your privacy with end-to-end encryption - no one can read your conversations.",
  },
});

export default async function Page() {
  return (
    <MediumImpactHero
      title="Calvero Secure Messaging"
      description="Your messages are completely encrypted and secure. With end-to-end encryption technology, no one can read your conversations. Communicate safely with your loved ones while protecting your privacy."
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button asChild size="lg" className="font-semibold">
          <Link href="/register">Start Free</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="font-semibold">
          <Link href="/help">Learn More</Link>
        </Button>
      </div>
    </MediumImpactHero>
  );
}
