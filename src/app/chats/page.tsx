import { ChatWelcome } from "@/components/features/chat/chat-welcome";
import { generateMeta } from "@/utils/meta/generate-meta";

export const metadata = generateMeta({
  meta: {
    title: "Chat Rooms",
    description: "Join chat rooms and start conversations",
    keywords: ["chat", "rooms", "conversations"],
  },
  slug: ["chats"],
});

export default function ChatsPage() {
  return <ChatWelcome />;
}
