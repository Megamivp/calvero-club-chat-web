import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChatRoom } from "@/components/features/chat/chat-room";
import { generateMeta } from "@/utils/meta/generate-meta";

interface ChatRoomPageProps {
  params: Promise<{ roomId: string }>;
}

export async function generateMetadata({
  params,
}: ChatRoomPageProps): Promise<Metadata> {
  const { roomId } = await params;

  return generateMeta({
    meta: {
      title: `Chat Room ${roomId}`,
      description: `Join and participate in chat room ${roomId}`,
      keywords: ["chat", "room", "conversation", roomId],
    },
    slug: ["chats", roomId],
  });
}

export default async function ChatRoomPage({ params }: ChatRoomPageProps) {
  const { roomId } = await params;
  const roomIdNumber = parseInt(roomId);

  if (isNaN(roomIdNumber)) {
    notFound();
  }

  try {
    return <ChatRoom roomId={roomIdNumber} />;
  } catch {
    notFound();
  }
}
