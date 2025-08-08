"use client";

import { toast } from "sonner";
import { setCookie } from "cookies-next";

import { SubmitButton } from "@/components/ui/forms/submit-button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/primitives/form";
import { Input } from "@/components/ui/primitives/input";
import { Alert, AlertDescription } from "@/components/ui/primitives/alert";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authenticationSchema } from "@/utils/validations/auth";
import { useRouter } from "next/navigation";

import { useAuthenticationMutation } from "@/services/api";

import type { AuthenticationSchema } from "@/utils/validations/auth";

function AuthenticationForm() {
  const router = useRouter();
  const [authenticate, { isLoading, error }] = useAuthenticationMutation();

  const form = useForm<AuthenticationSchema>({
    resolver: zodResolver(authenticationSchema),
    defaultValues: {
      identity: "",
    },
  });

  async function onSubmit(values: AuthenticationSchema) {
    try {
      const result = await authenticate(values).unwrap();

      setCookie("token", result.data?.token);
      setCookie("session", `Bearer ${result.data?.token}`);

      toast.success("Login successful!");
      router.push("/chats");
    } catch (error: unknown) {
      const apiError = error as {
        status?: number;
        data?: { message?: string };
      };
      if (apiError?.status === 401) {
        toast.error(
          "Invalid credentials. Please check your identity and try again.",
        );
      } else if (apiError?.status === 400) {
        toast.error("Invalid request. Please check your input.");
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  }

  return (
    <Form {...form}>
      <form
        className="my-6 grid w-full gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {error && (
          <Alert variant="destructive">
            <AlertDescription>
              {"data" in error &&
              error.data &&
              typeof error.data === "object" &&
              "message" in error.data
                ? (error.data.message as string) ||
                  "Access denied. Invalid credentials."
                : "Something went wrong. Please try again."}
            </AlertDescription>
          </Alert>
        )}
        <FormField
          name="identity"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Identity</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Your unique identity code. This is required to access your
                account.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton loading={isLoading} text="Enter Calvero" />
      </form>
    </Form>
  );
}

export { AuthenticationForm };
