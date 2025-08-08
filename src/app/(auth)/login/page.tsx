import { AuthenticationForm } from "@/components/features/auth/forms/authentication-form";
import { FormBox } from "@/components/ui/forms/form-box";
import { generateMeta } from "@/utils/meta/generate-meta";
import Link from "next/link";

export const metadata = generateMeta({
  meta: {
    title: "Access Calvero",
    description:
      "Sign in to your Calvero ID to access exclusive features and content.",
  },
  slug: ["login"],
});

export default async function Page() {
  return (
    <FormBox>
      <h1 data-slot="title">Welcome Back to Calvero</h1>
      <p data-slot="description">
        Sign in to your Calvero ID to access exclusive features and content.
        Your journey continues here.
      </p>
      <AuthenticationForm />
      <p data-slot="footer">
        New to Calvero? <Link href="/register">Create Your ID</Link>
      </p>
    </FormBox>
  );
}
