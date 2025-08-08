import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/primitives/accordion";
import { generateMeta } from "@/utils/meta/generate-meta";
import { MediumImpactHero } from "@/components/heroes/medium-impact";
import { Container, Section } from "@/components/ui/react/design-system";

export const metadata = generateMeta({
  meta: {
    title: "Secure Messaging Support",
    description:
      "Get help with Calvero secure messaging. Find answers about encryption, privacy, and how to use our secure chat features safely.",
  },
  slug: ["help"],
});

export default function Page() {
  return (
    <>
      <MediumImpactHero
        title="Secure Messaging Support"
        description="Get help with Calvero secure messaging. Find answers about encryption, privacy, and how to use our secure chat features safely."
      />

      <Section className="bg-muted/20 py-12">
        <Container className="flex w-full flex-col items-center">
          <Accordion type="multiple">
            {[
              {
                value: "encryption",
                question: "How does Calvero's end-to-end encryption work?",
                answer:
                  "Calvero uses advanced AES-256 encryption to secure your messages. Only you and the recipient can read them - not even we can access your conversations.",
              },
              {
                value: "privacy",
                question: "What data does Calvero collect about me?",
                answer:
                  "We follow a zero-knowledge policy. We only store your encrypted username and connection data. Your messages, contacts, and personal information remain private.",
              },
              {
                value: "group-chats",
                question: "Are group chats also encrypted?",
                answer:
                  "Yes, all group conversations use the same end-to-end encryption. Each message is individually encrypted for every participant in the group.",
              },
              {
                value: "message-storage",
                question: "Where are my messages stored?",
                answer:
                  "Messages are stored locally on your device and encrypted in our secure servers. We cannot access the content of your messages.",
              },
              {
                value: "account-setup",
                question: "How do I create a secure Calvero account?",
                answer:
                  "Simply download the app, choose a unique username, and create a strong password. No phone number or email required for maximum privacy.",
              },
              {
                value: "device-security",
                question: "Can I use Calvero on multiple devices?",
                answer:
                  "Yes, you can sync your account across devices. Each device generates its own encryption keys for added security.",
              },
              {
                value: "message-deletion",
                question: "How do I delete messages permanently?",
                answer:
                  "You can delete messages locally from your device. For complete removal, both participants need to delete the conversation.",
              },
              {
                value: "read-receipts",
                question: "Does Calvero show read receipts?",
                answer:
                  "No, we don't show read receipts by default to protect your privacy. You can optionally enable them in settings.",
              },
              {
                value: "backup-recovery",
                question: "How can I backup and recover my messages?",
                answer:
                  "You can create encrypted local backups. Recovery requires your backup passphrase - we cannot recover lost data for you.",
              },
              {
                value: "blocking-users",
                question: "How do I block or report users?",
                answer:
                  "You can block users directly from the chat interface. Reported users are reviewed while maintaining your anonymity.",
              },
              {
                value: "app-security",
                question: "How often is the Calvero app updated for security?",
                answer:
                  "We regularly release security updates and new features. Enable auto-updates to ensure you have the latest protection.",
              },
              {
                value: "contact-support",
                question: "How can I contact Calvero support?",
                answer:
                  "Contact us at support@calvero.com for technical issues. For urgent security concerns, use our encrypted contact form in the app.",
              },
              {
                value: "store-locator",
                question: "Where can I find Calvero products in stores?",
                answer:
                  "Visit our website’s Store Locator to find authorized retailers and boutiques near you.",
              },
              {
                value: "password-security",
                question: "What if I forget my password?",
                answer:
                  "For security reasons, we cannot reset passwords. You'll need to create a new account. Consider using a secure password manager.",
              },
            ].map((item) => (
              <AccordionItem
                key={item.value}
                value={item.value}
                className="md:w-2xl"
              >
                <AccordionTrigger className="w-full text-lg font-semibold text-foreground transition-all duration-300 ease-in-out hover:underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Section>
    </>
  );
}
