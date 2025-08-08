import { z } from "zod";

export const authenticationSchema = z.object({
  id: z.string().optional(),
  identity: z
    .string({
      required_error: "Identity is required for login",
    })
    .min(1, "Identity cannot be empty"),
  token: z.string().optional(),
});

export const createUserSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Username can only contain letters, numbers, underscores, and hyphens",
    )
    .regex(/^[a-zA-Z]/, "Username must start with a letter")
    .regex(/[a-zA-Z0-9]$/, "Username must end with a letter or number")
    .refine(
      (val) => !val.includes("__"),
      "Username cannot contain consecutive underscores",
    )
    .refine(
      (val) => !val.includes("--"),
      "Username cannot contain consecutive hyphens",
    )
    .refine(
      (val) => !/^(admin|root|user|test|guest|null|undefined)$/i.test(val),
      "This username is reserved",
    ),
});

export type AuthenticationSchema = z.infer<typeof authenticationSchema>;
export type CreateUserSchema = z.infer<typeof createUserSchema>;
