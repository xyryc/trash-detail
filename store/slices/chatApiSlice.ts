// store/slices/chatApiSlice.ts
import { apiSlice } from "../apiSlice";

export interface ChatMessage {
  _id: string;
  supportId: string;
  chatType: string;
  senderId: {
    _id: string;
    name: string;
    email: string;
  };
  message: string;
  readBy: string[];
  createdAt: string;
}

export interface ChatHistory {
  success: boolean;
  data: {
    supportInfo: {
      id: string;
      title: string;
    };
    createdByInfo: {
      createdById: string;
      name: string;
      email: string;
    };
    messages: ChatMessage[];
  };
}

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChatList: builder.query({
      query: (type) => `/messages/conversations?type=${type}`,
      providesTags: ["ChatList"],
    }),

    getChatHistory: builder.query<
      ChatHistory,
      { supportId: string; chatType: string }
    >({
      query: ({ supportId, chatType }) =>
        `/messages/${supportId}?chatType=${chatType}`,
      providesTags: (result, error, { supportId }) => [
        { type: "Message", id: supportId },
        { type: "ChatHistory", id: supportId },
      ],
    }),

    sendMessage: builder.mutation({
      query: (messageData) => ({
        url: "/messages/send",
        method: "POST",
        body: messageData,
      }),
      invalidatesTags: (result, error, { supportId }) => [
        { type: "Message", id: supportId },
        { type: "ChatHistory", id: supportId },
        "ChatList",
      ],
    }),
  }),
});

export const {
  useGetChatHistoryQuery,
  useSendMessageMutation,
  useGetChatListQuery,
} = chatApiSlice;
