import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ChatSidebar } from "@/components/features/chat/chat-sidebar";
import { SignalRProvider } from "@/components/providers/signalr-provider";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/primitives/sidebar";

interface ChatsLayoutProps {
  children: React.ReactNode;
}

export default async function ChatsLayout({ children }: ChatsLayoutProps) {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) {
    redirect("/login");
  }

  return (
    <SignalRProvider>
      <SidebarProvider>
        <ChatSidebar />
        <SidebarInset className="flex h-screen flex-col">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1">
              <h1 className="text-lg font-semibold">Chat</h1>
            </div>
          </header>
          <main className="min-h-0 flex-1">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </SignalRProvider>
  );
}
