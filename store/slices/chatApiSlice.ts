// store/slices/chatApiSlice.ts
import { apiSlice } from "../apiSlice";

export interface ChatConversation {
  _id: string;
  chatType: string;
  supportId: string;
  participants: string[];
  lastMessage?: {
    content: string;
    timestamp: string;
    senderId: string;
  };
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  _id: string;
  chatType: string;
  supportId: string;
  senderId: string;
  senderName: string;
  message?: string;
  imageUrl?: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
}

export interface GetChatListResponse {
  success: boolean;
  data: ChatConversation[];
  message: string;
}

export interface GetMessagesResponse {
  success: boolean;
  data: ChatMessage[];
  message: string;
}

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChatList: builder.query<GetChatListResponse, string>({
      query: (type) => `/messages/conversations?type=${type}`,
      providesTags: ["Chat"],
    }),

    getMessages: builder.query<
      GetMessagesResponse,
      { supportId: string; page?: number }
    >({
      query: ({ supportId, page = 1 }) => `/messages/${supportId}?page=${page}`,
      providesTags: (result, error, { supportId }) => [
        { type: "Message", id: supportId },
      ],
    }),

    sendMessage: builder.mutation<
      any,
      {
        chatType: string;
        supportId: string;
        message?: string;
        imageUrl?: string;
      }
    >({
      query: (messageData) => ({
        url: "/messages/send",
        method: "POST",
        body: messageData,
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetChatListQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} = chatApiSlice;
