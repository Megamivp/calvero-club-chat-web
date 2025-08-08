"use client";

import { useGetUserQuery } from "@/services/api";
import { getCookie } from "cookies-next";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const session = getCookie("session");
  const [mounted, setMounted] = useState(false);

  const {
    data: user,
    isLoading,
    error,
  } = useGetUserQuery(undefined, {
    skip: !session,
  });

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isChatsPage = pathname.startsWith("/chats");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (user && isAuthPage) {
      router.push("/chats");
      return;
    }

    if (!isLoading && !user && isChatsPage && error) {
      router.push("/login");
      return;
    }
  }, [
    mounted,
    session,
    user,
    error,
    isAuthPage,
    router,
    isChatsPage,
    isLoading,
  ]);

  if (!mounted) {
    return <>{children}</>;
  }

  if (session && isLoading && !isAuthPage) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (session && isLoading && isChatsPage) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading chat...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
