"use client";

import { createContext, useContext, ReactNode } from "react";
import { useSignalR } from "@/hooks/use-signalr";

interface SignalRContextType {
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  joinChatRoom: (roomId: number) => Promise<void>;
  leaveChatRoom: (roomId: number) => Promise<void>;
  sendMessage: (roomId: number, content: string) => Promise<void>;
}

const SignalRContext = createContext<SignalRContextType | null>(null);

interface SignalRProviderProps {
  children: ReactNode;
}

export function SignalRProvider({ children }: SignalRProviderProps) {
  const signalR = useSignalR({ autoConnect: true });

  return (
    <SignalRContext.Provider value={signalR}>
      {children}
    </SignalRContext.Provider>
  );
}

export function useSignalRContext() {
  const context = useContext(SignalRContext);
  if (!context) {
    throw new Error("useSignalRContext must be used within a SignalRProvider");
  }
  return context;
}
