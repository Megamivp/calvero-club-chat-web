"use client";

import { useRouter } from "next/navigation";
import { Plus, MessageSquare, Lock, Users, HashIcon } from "lucide-react";
import { Button } from "@/components/ui/primitives/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarSeparator,
} from "@/components/ui/primitives/sidebar";
import {
  useGetChatRoomsQuery,
  useGetPublicChatRoomsQuery,
  useJoinChatRoomMutation,
} from "@/services/api";
import { ChatRoom } from "@/types";
import { toast } from "sonner";
import { CreateRoomDialog } from "./dialogs/create-room-dialog";
import { JoinRoomDialog } from "./dialogs/join-room-dialog";

export function ChatSidebar() {
  const router = useRouter();

  const {
    data: userRooms,
    isLoading: isLoadingUserRooms,
    refetch: refetchUserRooms,
  } = useGetChatRoomsQuery();
  const { data: publicRooms, isLoading: isLoadingPublicRooms } =
    useGetPublicChatRoomsQuery();
  const [joinChatRoom] = useJoinChatRoomMutation();

  const handleRoomClick = async (room: ChatRoom) => {
    const isAlreadyMember = userRooms?.data?.some(
      (userRoom) => userRoom.id === room.id,
    );

    if (isAlreadyMember) {
      router.push(`/chats/${room.id}`);
      return;
    }

    if (!room.isPublic) {
      return;
    }

    try {
      await joinChatRoom({
        chatRoomId: room.id,
      }).unwrap();

      toast.success("Joined chat room successfully");
      refetchUserRooms();
      router.push(`/chats/${room.id}`);
    } catch (error: unknown) {
      const errorData = error as {
        status?: number;
        data?: { message?: string };
      };
      if (errorData?.status === 409) {
        router.push(`/chats/${room.id}`);
      } else {
        toast.error("Failed to join chat room");
      }
    }
  };

  return (
    <Sidebar collapsible="offcanvas" className="w-80">
      <SidebarHeader className="border-b">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Chat Rooms</h2>
        </div>
        <div className="space-y-2">
          <CreateRoomDialog asChild>
            <Button className="w-full" size="lg">
              <Plus className="mr-2 h-4 w-4" />
              Create Room
            </Button>
          </CreateRoomDialog>

          <JoinRoomDialog asChild>
            <Button variant="outline" className="w-full" size="lg">
              <MessageSquare className="mr-2 h-4 w-4" />
              Join Room
            </Button>
          </JoinRoomDialog>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>My Rooms</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {isLoadingUserRooms ? (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuSkeleton
                      showIcon
                      className="[&>*:last-child]:w-3/4"
                    />
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuSkeleton
                      showIcon
                      className="[&>*:last-child]:w-2/3"
                    />
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuSkeleton
                      showIcon
                      className="[&>*:last-child]:w-5/6"
                    />
                  </SidebarMenuItem>
                </>
              ) : userRooms?.data && userRooms.data.length > 0 ? (
                userRooms.data.map((room: ChatRoom) => (
                  <SidebarMenuItem key={room.id}>
                    <SidebarMenuButton
                      onClick={() => handleRoomClick(room)}
                      className="w-full justify-start overflow-hidden"
                    >
                      {!room.isPublic && (
                        <Lock className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                      )}
                      <span className="min-w-0 flex-1 truncate">
                        {room.name}
                      </span>
                      <div className="ml-auto flex flex-shrink-0 items-center text-xs text-muted-foreground">
                        <Users className="mr-1 h-3 w-3" />
                        {room.memberCount}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                <div className="break-words px-2 py-4 text-sm text-muted-foreground">
                  No rooms joined yet
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Public Rooms</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {isLoadingPublicRooms ? (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuSkeleton
                      showIcon
                      className="[&>*:last-child]:w-4/5"
                    />
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuSkeleton
                      showIcon
                      className="[&>*:last-child]:w-3/5"
                    />
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuSkeleton
                      showIcon
                      className="[&>*:last-child]:w-2/4"
                    />
                  </SidebarMenuItem>
                </>
              ) : publicRooms && publicRooms.length > 0 ? (
                publicRooms.map((room: ChatRoom) => (
                  <SidebarMenuItem key={room.id}>
                    <SidebarMenuButton
                      onClick={() => handleRoomClick(room)}
                      className="w-full justify-start overflow-hidden"
                    >
                      <HashIcon className="h-4 w-4 flex-shrink-0" />
                      <span className="min-w-0 flex-1 truncate">
                        {room.name}
                      </span>
                      <div className="ml-auto flex flex-shrink-0 items-center text-xs text-muted-foreground">
                        <Users className="mr-1 h-3 w-3" />
                        {room.memberCount}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                <div className="break-words px-2 py-4 text-sm text-muted-foreground">
                  No public rooms available
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
