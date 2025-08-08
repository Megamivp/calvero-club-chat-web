"use client";

import { useState, useEffect, useRef } from "react";
import { SendIcon } from "lucide-react";
import { Button } from "@/components/ui/primitives/button";
import { Input } from "@/components/ui/primitives/input";
import { ScrollArea } from "@/components/ui/primitives/scroll-area";
import { Skeleton } from "@/components/ui/primitives/skeleton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/primitives/form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/primitives/tooltip";
import { useSignalR } from "@/hooks/use-signalr";
import {
  useGetChatRoomMessagesQuery,
  useLeaveChatRoomMutation,
} from "@/services/api";
import { Message } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendMessageSchema, SendMessageInput } from "@/utils/validations/chat";
import { EmojiPicker } from "@/components/ui/react/emoji-picker";
import { MessageContent } from "@/components/ui/react/message-content";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { cn } from "@/lib/utils";

interface ChatRoomProps {
  roomId: number;
}

export function ChatRoom({ roomId }: ChatRoomProps) {
  const router = useRouter();

  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialMessagesProcessedRef = useRef(false);

  const currentUser = useSelector((state: RootState) => state.session.user);

  const {
    isConnected,
    isConnecting,
    messages: realtimeMessages,
    sendMessage,
    leaveChatRoom,
    clearMessages,
    joinChatRoom,
  } = useSignalR({ autoConnect: true, chatRoomId: roomId });

  const { data: initialMessages, isLoading: isLoadingMessages } =
    useGetChatRoomMessagesQuery({ chatRoomId: roomId });
  const [leaveRoom, { isLoading: isLeaving }] = useLeaveChatRoomMutation();

  const messageForm = useForm<SendMessageInput>({
    resolver: zodResolver(sendMessageSchema),
    defaultValues: {
      content: "",
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  useEffect(() => {
    if (isConnected && roomId) {
      const timer = setTimeout(() => {
        joinChatRoom(roomId).catch(() => {});
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [isConnected, roomId, joinChatRoom]);

  useEffect(() => {
    if (initialMessages?.data && !initialMessagesProcessedRef.current) {
      setAllMessages(initialMessages.data);
      clearMessages();
      initialMessagesProcessedRef.current = true;
    }
  }, [initialMessages, clearMessages]);

  useEffect(() => {
    if (realtimeMessages.length > 0) {
      setAllMessages((prev) => {
        const newMessages = realtimeMessages.filter(
          (msg) => !prev.some((existing) => existing.id === msg.id),
        );
        return [...prev, ...newMessages];
      });
    }
  }, [realtimeMessages]);

  const handleSendMessage = async (data: SendMessageInput) => {
    try {
      if (!data.content?.trim()) {
        toast.error("Message cannot be empty");
        return;
      }
      await sendMessage(roomId, data.content);
      messageForm.reset();
    } catch {
      toast.error("Failed to send message");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      messageForm.handleSubmit(handleSendMessage)();
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    const currentContent = messageForm.getValues("content");
    messageForm.setValue("content", currentContent + emoji);
  };

  const handleLeaveRoom = async () => {
    try {
      await leaveRoom({ chatRoomId: roomId }).unwrap();
      await leaveChatRoom(roomId);
      toast.success("Left chat room");
      router.push("/chats");
    } catch {
      toast.error("Failed to leave room");
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex shrink-0 items-center justify-between border-b bg-card p-3 md:p-4">
        <div className="flex items-center space-x-3">
          <div>
            <h1 className="text-sm font-semibold md:text-base">
              Room {roomId}
            </h1>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground md:text-sm">
              <span className="flex items-center space-x-1">
                {isConnecting ? (
                  <>
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-500"></div>
                    <span>Connecting...</span>
                  </>
                ) : isConnected ? (
                  <>
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                    <span>Connected • {allMessages.length} messages</span>
                  </>
                ) : (
                  <>
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500"></div>
                    <span>Disconnected</span>
                  </>
                )}
              </span>
              {realtimeMessages.length > 0 && (
                <span>• Real-time: {realtimeMessages.length}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1 md:space-x-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleLeaveRoom}
            disabled={isLeaving}
            className="text-xs md:text-sm"
          >
            <span className={cn("hidden md:inline")}>
              {isLeaving ? "Leaving..." : "Leave Room"}
            </span>
            <span className={cn("md:hidden")}>
              {isLeaving ? "..." : "Leave"}
            </span>
          </Button>
        </div>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <div className="p-3 md:p-4">
          {isLoadingMessages ? (
            <div className="space-y-3 md:space-y-4">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="flex animate-pulse items-start space-x-2 md:space-x-3"
                >
                  <Skeleton className="h-6 w-6 rounded-full md:h-8 md:w-8" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-3 w-16 md:h-4 md:w-20" />
                      <Skeleton className="h-3 w-12 md:h-4 md:w-14" />
                    </div>
                    <Skeleton
                      className={cn(
                        "h-3 md:h-4",
                        index % 3 === 0
                          ? "w-3/4"
                          : index % 3 === 1
                            ? "w-1/2"
                            : "w-2/3",
                      )}
                    />
                    {index % 4 === 0 && (
                      <Skeleton className="h-3 w-1/3 md:h-4" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {allMessages.map((message) => {
                const isOwnMessage =
                  currentUser?.id.toString() === message.author.id.toString();

                return (
                  <div
                    key={message.id}
                    className={cn(
                      "flex w-full",
                      isOwnMessage ? "justify-end" : "justify-start",
                    )}
                  >
                    <div
                      className={cn(
                        "min-w-0 max-w-[75%]",
                        isOwnMessage && "text-right",
                      )}
                    >
                      <div
                        className={cn(
                          "mb-1 flex items-center space-x-2",
                          isOwnMessage && "flex-row-reverse space-x-reverse",
                        )}
                      >
                        <span className="truncate text-xs font-medium md:text-sm">
                          {isOwnMessage ? "You" : message.author.username}
                        </span>
                        <span className="flex-shrink-0 text-xs text-muted-foreground">
                          {formatTime(message.sentAt)}
                        </span>
                      </div>
                      <div
                        className={cn(
                          "flex w-full",
                          isOwnMessage ? "justify-end" : "justify-start",
                        )}
                      >
                        <div className="w-fit rounded-lg bg-accent px-3 py-2 text-sm text-accent-foreground">
                          <MessageContent
                            content={message.content}
                            className="text-xs leading-relaxed md:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="shrink-0 border-t bg-card p-3 md:p-4">
        <Form {...messageForm}>
          <form
            onSubmit={messageForm.handleSubmit(handleSendMessage)}
            className="flex space-x-2"
          >
            <FormField
              control={messageForm.control}
              name="content"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...field}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      disabled={!isConnected}
                      className="text-sm"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <EmojiPicker onEmojiSelect={handleEmojiSelect} />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="submit"
                  disabled={
                    !isConnected || !messageForm.watch("content")?.trim()
                  }
                  size="icon"
                >
                  <SendIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send message</p>
              </TooltipContent>
            </Tooltip>
          </form>
        </Form>
        {!isConnected && (
          <div className="mt-2 flex items-center space-x-2 text-xs text-muted-foreground">
            <div className="flex space-x-1">
              <div className="h-1 w-1 animate-bounce rounded-full bg-current [animation-delay:-0.3s]"></div>
              <div className="h-1 w-1 animate-bounce rounded-full bg-current [animation-delay:-0.15s]"></div>
              <div className="h-1 w-1 animate-bounce rounded-full bg-current"></div>
            </div>
            <span>Reconnecting to chat...</span>
          </div>
        )}
      </div>
    </div>
  );
}
