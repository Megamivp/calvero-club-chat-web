"use client";

import { store } from "@/lib/store";
import { Provider as StoreProvider } from "react-redux";
import { Toaster } from "@/components/ui/primitives/sonner";
import { SessionProvider } from "@/components/providers/session-provider";

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <StoreProvider store={store}>
      <SessionProvider>{children}</SessionProvider>
      <Toaster position="bottom-center" />
    </StoreProvider>
  );
}
