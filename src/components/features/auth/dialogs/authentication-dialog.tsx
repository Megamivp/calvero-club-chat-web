import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/primitives/dialog";
import { AuthenticationForm } from "@/components/features/auth/forms/authentication-form";
import { Button } from "@/components/ui/primitives/button";

export function AuthenticationDialog(
  props: React.ComponentProps<typeof DialogTrigger>,
) {
  return (
    <Dialog>
      <DialogTrigger {...props} />
      <DialogContent>
        <DialogHeader className="border-b">
          <DialogTitle>Welcome to Calvero</DialogTitle>
          <DialogDescription>
            Sign in to your Calvero ID and return to where you belong — among
            the bold.
          </DialogDescription>
        </DialogHeader>
        <AuthenticationForm />
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          New to Calvero?
          <Link href="/join">
            <Button size="clear" variant="link">
              Create Your ID
            </Button>
          </Link>
        </p>
      </DialogContent>
    </Dialog>
  );
}
