"use client";

import { ComponentProps } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/primitives/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/primitives/form";
import { Input } from "@/components/ui/primitives/input";
import { Button } from "@/components/ui/primitives/button";
import { useJoinChatRoomMutation } from "@/services/api";

const joinRoomSchema = z.object({
  chatRoomId: z.string().min(1, "Room ID is required"),
  password: z.string().optional(),
});

type JoinRoomInput = z.infer<typeof joinRoomSchema>;

type JoinRoomDialogProps = ComponentProps<typeof DialogTrigger>;

export function JoinRoomDialog(props: JoinRoomDialogProps) {
  const router = useRouter();
  const [joinRoom, { isLoading }] = useJoinChatRoomMutation();

  const form = useForm<JoinRoomInput>({
    resolver: zodResolver(joinRoomSchema),
    defaultValues: {
      chatRoomId: "",
      password: "",
    },
  });

  const onSubmit = async (data: JoinRoomInput) => {
    try {
      await joinRoom({
        chatRoomId: parseInt(data.chatRoomId),
        password: data.password || undefined,
      }).unwrap();

      toast.success("Joined room successfully!");
      form.reset();
      router.push(`/chats/${data.chatRoomId}`);
    } catch {
      toast.error("Failed to join room");
    }
  };

  return (
    <Dialog>
      <DialogTrigger {...props}>{props.children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join Chat Room</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="chatRoomId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room ID</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter room ID"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password (if required)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Joining..." : "Join Room"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
