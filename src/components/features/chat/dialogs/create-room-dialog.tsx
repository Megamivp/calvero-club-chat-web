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
import { useCreateChatRoomMutation } from "@/services/api";

const createRoomSchema = z.object({
  name: z.string().min(1, "Room name is required"),
  password: z.string().optional(),
});

type CreateRoomInput = z.infer<typeof createRoomSchema>;

type CreateRoomDialogProps = ComponentProps<typeof DialogTrigger>;

export function CreateRoomDialog(props: CreateRoomDialogProps) {
  const router = useRouter();
  const [createRoom, { isLoading }] = useCreateChatRoomMutation();

  const form = useForm<CreateRoomInput>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const onSubmit = async (data: CreateRoomInput) => {
    try {
      await createRoom({
        name: data.name,
        password: data.password || undefined,
      }).unwrap();

      toast.success("Room created successfully!");
      form.reset();

      router.push("/chats");
    } catch {
      toast.error("Failed to create room");
    }
  };

  return (
    <Dialog>
      <DialogTrigger {...props} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Chat Room</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter room name" {...field} />
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
                      placeholder="Enter password (optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Room"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
