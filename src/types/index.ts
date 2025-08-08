export interface User {
  id: number;
  identity: string;
  permission: string;
}

export interface AuthenticateDto {
  identity: string;
}

export interface AuthenticateResponse {
  data: {
    token: string;
  };
}

export interface CreateUserDto {
  username: string;
}

export interface CreateUserResponse {
  data: {
    identity: string;
  };
}

export interface CreateChatRoomDto {
  name: string;
  password?: string;
}

export interface JoinChatRoomDto {
  chatRoomId: number;
  password?: string;
}

export interface SendMessageDto {
  chatRoomId: number;
  content: string;
}

export interface UserDto {
  data: {
    id: number;
    identity: string;
    permission: string;
  };
}

export interface ChatRoom {
  id: number;
  name: string;
  isPublic: boolean;
  createdAt: string;
  memberCount: number;
}

export interface Message {
  id: number;
  content: string;
  userId: number;
  userName: string;
  chatRoomId: number;
  authorUsername: string;
  sentAt: string;
  author: {
    id: number;
    username: string;
  };
}

export interface ProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
}
