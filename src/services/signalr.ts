import * as signalR from "@microsoft/signalr";
import { getCookie } from "cookies-next";
import { Message, ChatRoom } from "@/types";

export class SignalRService {
  private connection: signalR.HubConnection | null = null;
  private isConnecting = false;
  private currentRoomId: number | null = null;

  async connect(): Promise<signalR.HubConnection> {
    if (
      this.connection &&
      this.connection.state === signalR.HubConnectionState.Connected
    ) {
      return this.connection;
    }

    if (this.isConnecting) {
      while (this.isConnecting) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      if (this.connection) return this.connection;
    }

    this.isConnecting = true;

    try {
      const session = getCookie("session") as string;

      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(`${process.env.NEXT_PUBLIC_API_URL}/chathub`, {
          accessTokenFactory: () => session || "",
          headers: session
            ? {
                Authorization: session,
              }
            : undefined,
          withCredentials: true,
          transport:
            signalR.HttpTransportType.WebSockets |
            signalR.HttpTransportType.LongPolling,
        })
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: (retryContext) => {
            if (retryContext.previousRetryCount === 0) {
              return 0;
            }
            return Math.min(
              1000 * Math.pow(2, retryContext.previousRetryCount),
              30000,
            );
          },
        })
        .configureLogging(signalR.LogLevel.Information)
        .build();

      this.connection.onreconnecting(() => {});

      this.connection.onreconnected(async () => {
        if (this.currentRoomId) {
          try {
            await this.connection?.invoke("JoinChatRoom", this.currentRoomId);
          } catch {}
        }
      });

      this.connection.onclose(() => {
        this.connection = null;
        this.isConnecting = false;
      });

      await this.connection.start();

      this.isConnecting = false;
      return this.connection;
    } catch (error) {
      this.isConnecting = false;
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.stop();
      this.connection = null;
    }
  }

  getConnection(): signalR.HubConnection | null {
    return this.connection;
  }

  isConnected(): boolean {
    return this.connection?.state === signalR.HubConnectionState.Connected;
  }

  async joinChatRoom(chatRoomId: number): Promise<void> {
    const connection = await this.connect();
    await connection.invoke("JoinChatRoom", chatRoomId);
    this.currentRoomId = chatRoomId;
  }

  async leaveChatRoom(chatRoomId: number): Promise<void> {
    const connection = await this.connect();
    await connection.invoke("LeaveChatRoom", chatRoomId);
    if (this.currentRoomId === chatRoomId) {
      this.currentRoomId = null;
    }
  }

  async sendMessage(chatRoomId: number, content: string): Promise<void> {
    const connection = await this.connect();
    await connection.invoke("SendMessage", chatRoomId, content);
  }

  onMessageReceived(callback: (message: Message) => void): () => void {
    if (!this.connection) return () => {};

    this.connection.on("ReceiveMessage", callback);

    return () => {
      this.connection?.off("ReceiveMessage", callback);
    };
  }

  onUserJoined(
    callback: (data: { username: string; chatRoomId: number }) => void,
  ): () => void {
    if (!this.connection) return () => {};

    this.connection.on("UserJoined", callback);

    return () => {
      this.connection?.off("UserJoined", callback);
    };
  }

  onUserLeft(
    callback: (data: { username: string; chatRoomId: number }) => void,
  ): () => void {
    if (!this.connection) return () => {};

    this.connection.on("UserLeft", callback);

    return () => {
      this.connection?.off("UserLeft", callback);
    };
  }

  onChatRoomCreated(callback: (chatRoom: ChatRoom) => void): () => void {
    if (!this.connection) return () => {};

    this.connection.on("ChatRoomCreated", callback);

    return () => {
      this.connection?.off("ChatRoomCreated", callback);
    };
  }
}

export const signalRService = new SignalRService();
