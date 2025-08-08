import { z } from "zod";

export const createChatRoomSchema = z.object({
  name: z
    .string({
      required_error: "Room name is required",
    })
    .min(1, "Room name is required")
    .min(3, "Room name must be at least 3 characters")
    .max(50, "Room name must not exceed 50 characters")
    .regex(
      /^[a-zA-Z0-9\s\-_]+$/,
      "Room name can only contain letters, numbers, spaces, hyphens, and underscores",
    ),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters if provided")
    .optional(),
});

export const joinChatRoomSchema = z.object({
  chatRoomId: z.coerce
    .number({
      required_error: "Room ID is required",
    })
    .positive("Room ID must be a positive number"),
  password: z.string().optional(),
});

export const sendMessageSchema = z.object({
  content: z
    .string({
      required_error: "Message content is required",
    })
    .min(1, "Message cannot be empty")
    .max(1000, "Message must not exceed 1000 characters")
    .trim(),
});

export type CreateChatRoomInput = z.infer<typeof createChatRoomSchema>;
export type JoinChatRoomInput = z.infer<typeof joinChatRoomSchema>;
export type SendMessageInput = z.infer<typeof sendMessageSchema>;
