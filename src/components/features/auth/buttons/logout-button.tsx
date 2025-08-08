"use client";

import { Button } from "@/components/ui/primitives/button";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie("session");

    toast.success("Logged out successfully");

    router.push("/login");
  };

  return (
    <Button variant="outline" onClick={handleLogout} size="sm">
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  );
}

export { LogoutButton };
