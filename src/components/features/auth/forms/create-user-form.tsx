"use client";

import { useState } from "react";
import { toast } from "sonner";

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
import { createUserSchema } from "@/utils/validations/auth";

import { useCreateUserMutation } from "@/services/api";

import type { CreateUserSchema } from "@/utils/validations/auth";
import { PartyPopperIcon, CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/primitives/button";

function CreateUserForm() {
  const [step, setStep] = useState("create");
  const [identity, setIdentity] = useState("");

  const form = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      username: "",
    },
  });

  const [createUser, { error, isLoading }] = useCreateUserMutation();

  async function onSubmit(values: CreateUserSchema) {
    try {
      const response = await createUser(values).unwrap();

      const userIdentity =
        response?.data?.identity || `${values.username}#FALLBACK`;

      setIdentity(userIdentity);
      toast.success("Welcome to Calvero. Your profile has been created.");
      setStep("show-identity");
    } catch (error: unknown) {
      const apiError = error as {
        status?: number;
        data?: { message?: string };
      };
      if (apiError?.status === 409) {
        toast.error(
          "Username already exists. Please choose a different username.",
        );
      } else if (apiError?.status === 400) {
        toast.error("Invalid username. Please check the requirements.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  }

  return step == "create" ? (
    <Form {...form}>
      <form className="my-6 grid gap-6" onSubmit={form.handleSubmit(onSubmit)}>
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
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Choose a unique username for your Calvero identity. This will be
                used to identify you across the platform.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton
          loading={form.formState.isSubmitting || isLoading}
          text="Activate Calvero Identity"
        />
      </form>
    </Form>
  ) : step === "show-identity" ? (
    <div className="my-10 space-y-6">
      <div className="flex flex-col items-center justify-between rounded-lg border p-4">
        <PartyPopperIcon className="size-8 text-green-500" />
        <div className="mt-4 flex-1">
          <h3 className="text-center text-lg font-semibold">
            Account Created Successfully!
          </h3>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            This is your Identity Code. Use it to login to your account.
          </p>
          <div className="mt-4 text-center">
            <span className="select-all rounded-lg border bg-secondary p-2 font-mono text-lg text-secondary-foreground underline underline-offset-4">
              {identity}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4 text-center">
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm text-amber-800">
            <strong>Important:</strong> Save this Identity Code safely.
            You&apos;ll need it to login to your account.
          </p>
        </div>

        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => {
              navigator.clipboard.writeText(identity);
              toast.success("Identity copied to clipboard!");
            }}
          >
            <CopyIcon className="mr-2 h-4 w-4" />
            Copy Identity
          </Button>

          <Button onClick={() => (window.location.href = "/login")}>
            Continue to Login
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div className="my-10 flex flex-col items-center justify-center space-y-4 rounded-lg border p-6">
      <PartyPopperIcon className="size-12 text-green-500" />
      <div className="text-center">
        <h3 className="text-lg font-semibold">Ready to Chat!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          You can now login with your Identity Code and start chatting.
        </p>
      </div>
      <Button
        onClick={() => (window.location.href = "/login")}
        className="mt-4"
      >
        Go to Login
      </Button>
    </div>
  );
}

export { CreateUserForm };
