import { CreateUserForm } from "@/components/features/auth/forms/create-user-form";
import { FormBox } from "@/components/ui/forms/form-box";
import { generateMeta } from "@/utils/meta/generate-meta";
import Link from "next/link";

export const metadata = generateMeta({
  meta: {
    title: "Register",
    description:
      "Create your Calvero ID to access exclusive features and content. Join our community today!",
  },
  slug: ["register"],
});

export default async function Page() {
  return (
    <FormBox>
      <h1 data-slot="title">Create Your Calvero ID</h1>
      <p data-slot="description">
        Join the Calvero community and unlock exclusive features by creating
        your ID. Your journey starts here.
      </p>
      <CreateUserForm />
      <p data-slot="footer">
        Already part of Calvero? <Link href="/login">Sign In</Link>
      </p>
    </FormBox>
  );
}
