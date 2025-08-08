"use client";

import {
  MessageSquareIcon,
  ShieldIcon,
  ZapIcon,
  EyeIcon,
  UsersIcon,
  LockIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui/react/design-system";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/primitives/card";

interface FeatureCardProps {
  feature: {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
  };
}

function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-xl border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          {feature.icon}
        </div>
        <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-center text-muted-foreground">
          {feature.description}
        </p>
      </CardContent>
    </Card>
  );
}

function FeaturesBlock() {
  const features = [
    {
      id: 1,
      title: "End-to-End Encryption",
      description:
        "Your messages can only be read by you and the recipient. No one, not even us, can see your messages.",
      icon: <LockIcon className="size-8" />,
    },
    {
      id: 2,
      title: "Secure Group Chats",
      description:
        "Have secure group conversations with friends and family. All group messages are encrypted.",
      icon: <UsersIcon className="size-8" />,
    },
    {
      id: 3,
      title: "No Read Receipts",
      description:
        "No one knows when your messages are read. Your privacy is completely protected.",
      icon: <EyeIcon className="size-8" />,
    },
    {
      id: 4,
      title: "Fast & Reliable",
      description:
        "Don't lose speed due to encryption. Your messages are delivered instantly and securely.",
      icon: <ZapIcon className="size-8" />,
    },
    {
      id: 5,
      title: "Zero Knowledge Policy",
      description:
        "We don't store any of your personal data. Your records are only kept on your device.",
      icon: <ShieldIcon className="size-8" />,
    },
    {
      id: 6,
      title: "Persistent Messages",
      description:
        "Your messages are stored securely and you can access them whenever you want.",
      icon: <MessageSquareIcon className="size-8" />,
    },
  ];

  return (
    <Section>
      <Container>
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.h2
            className="mb-4 text-3xl font-bold tracking-tight lg:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Why Choose <span className="text-primary">Calvero</span>?
          </motion.h2>
          <motion.p
            className="text-muted-foreground lg:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            We use advanced encryption technologies to make your messaging
            experience secure, fast, and private.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <FeatureCard feature={feature} />
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export { FeatureCard, FeaturesBlock };
export type { FeatureCardProps };
