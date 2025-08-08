import {
  UserDto,
  AuthenticateDto,
  AuthenticateResponse,
  CreateUserDto,
  CreateUserResponse,
  CreateChatRoomDto,
  JoinChatRoomDto,
  SendMessageDto,
  ChatRoom,
  Message,
} from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "cookies-next";
import { HYDRATE } from "next-redux-wrapper";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      const session = getCookie("session") as string;
      if (session) {
        headers.set("Authorization", session);
      }
      return headers;
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type == HYDRATE) {
      // @ts-expect-error - this is a known issue with RTK Query and Next.js
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["User", "ChatRoom", "Message"],
  endpoints: (builder) => ({
    authentication: builder.mutation<AuthenticateResponse, AuthenticateDto>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    createUser: builder.mutation<CreateUserResponse, CreateUserDto>({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
    }),
    getUser: builder.query<UserDto, void>({
      query: () => ({
        url: "users/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    createChatRoom: builder.mutation<void, CreateChatRoomDto>({
      query: (body) => ({
        url: "chat/rooms",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ChatRoom"],
    }),
    getChatRooms: builder.query<{ data: ChatRoom[] }, void>({
      query: () => ({
        url: "chat/rooms",
        method: "GET",
      }),
      providesTags: ["ChatRoom"],
    }),
    joinChatRoom: builder.mutation<void, JoinChatRoomDto>({
      query: (body) => ({
        url: "chat/rooms/join",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ChatRoom"],
    }),
    getPublicChatRooms: builder.query<ChatRoom[], void>({
      query: () => ({
        url: "chat/rooms/public",
        method: "GET",
      }),
      providesTags: ["ChatRoom"],
    }),
    leaveChatRoom: builder.mutation<void, { chatRoomId: number }>({
      query: ({ chatRoomId }) => ({
        url: `chat/rooms/${chatRoomId}/leave`,
        method: "POST",
      }),
      invalidatesTags: ["ChatRoom"],
    }),
    getChatRoomMessages: builder.query<
      { data: Message[] },
      { chatRoomId: number }
    >({
      query: ({ chatRoomId }) => ({
        url: `chat/rooms/${chatRoomId}/messages`,
        method: "GET",
      }),
      providesTags: (result, error, { chatRoomId }) => [
        { type: "Message", id: chatRoomId },
      ],
    }),
    sendMessage: builder.mutation<void, SendMessageDto>({
      query: (body) => ({
        url: "chat/messages",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { chatRoomId }) => [
        { type: "Message", id: chatRoomId },
      ],
    }),
  }),
});

export const {
  useAuthenticationMutation,
  useCreateUserMutation,
  useGetUserQuery,
  useCreateChatRoomMutation,
  useGetChatRoomsQuery,
  useJoinChatRoomMutation,
  useGetPublicChatRoomsQuery,
  useLeaveChatRoomMutation,
  useGetChatRoomMessagesQuery,
  useSendMessageMutation,
} = api;
