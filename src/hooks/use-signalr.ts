import { useEffect, useRef, useState } from "react";
import { signalRService } from "@/services/signalr";
import { Message } from "@/types";

export interface UseSignalROptions {
  autoConnect?: boolean;
  chatRoomId?: number;
}

export interface SignalRState {
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
}

export function useSignalR(options: UseSignalROptions = {}) {
  const { autoConnect = true, chatRoomId } = options;
  const [state, setState] = useState<SignalRState>({
    isConnected: false,
    isConnecting: false,
    error: null,
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const cleanupFunctions = useRef<(() => void)[]>([]);

  const connect = async () => {
    setState((prev) => ({ ...prev, isConnecting: true, error: null }));

    try {
      await signalRService.connect();
      setState((prev) => ({
        ...prev,
        isConnected: true,
        isConnecting: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isConnecting: false,
        error: error instanceof Error ? error.message : "Connection failed",
      }));
    }
  };

  const disconnect = async () => {
    await signalRService.disconnect();
    setState((prev) => ({ ...prev, isConnected: false }));
  };

  const setupEventListeners = () => {
    cleanupFunctions.current.forEach((cleanup) => cleanup());
    cleanupFunctions.current = [];

    const messageCleanup = signalRService.onMessageReceived((message) => {
      setMessages((prev) => [...prev, message]);
    });
    cleanupFunctions.current.push(messageCleanup);

    const userJoinedCleanup = signalRService.onUserJoined(() => {});
    cleanupFunctions.current.push(userJoinedCleanup);

    const userLeftCleanup = signalRService.onUserLeft(() => {});
    cleanupFunctions.current.push(userLeftCleanup);

    const chatRoomCreatedCleanup = signalRService.onChatRoomCreated(() => {});
    cleanupFunctions.current.push(chatRoomCreatedCleanup);
  };

  const joinChatRoom = async (roomId: number) => {
    try {
      await signalRService.joinChatRoom(roomId);
    } catch {}
  };

  const leaveChatRoom = async (roomId: number) => {
    try {
      await signalRService.leaveChatRoom(roomId);
    } catch {}
  };

  const sendMessage = async (roomId: number, content: string) => {
    try {
      await signalRService.sendMessage(roomId, content);
    } catch {}
  };

  const clearMessages = () => {
    setMessages([]);
  };

  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    return () => {
      cleanupFunctions.current.forEach((cleanup) => cleanup());
    };
  }, [autoConnect]);

  useEffect(() => {
    if (state.isConnected) {
      setupEventListeners();
    }
  }, [state.isConnected]);

  useEffect(() => {
    let mounted = true;

    if (state.isConnected && chatRoomId) {
      const timer = setTimeout(async () => {
        if (mounted) {
          try {
            await joinChatRoom(chatRoomId);
          } catch {}
        }
      }, 100);

      return () => {
        mounted = false;
        clearTimeout(timer);
        if (chatRoomId) {
          leaveChatRoom(chatRoomId).catch(() => {});
        }
      };
    }

    return () => {
      mounted = false;
    };
  }, [state.isConnected, chatRoomId]);

  return {
    ...state,
    messages,
    connect,
    disconnect,
    joinChatRoom,
    leaveChatRoom,
    sendMessage,
    clearMessages,
  };
}
