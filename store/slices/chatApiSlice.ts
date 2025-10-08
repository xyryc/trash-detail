// store/slices/chatApiSlice.ts
import { ChatHistory } from "@/types";
import { apiSlice } from "../apiSlice";

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChatHistoryThread: builder.query({
      query: (type) => `/messages/conversations?type=${type}`,
      providesTags: ["GroupThread"],
    }),

    getChatList: builder.query({
      query: (type) => `/messages/conversations?type=${type}`,
      providesTags: ["ChatList"],
    }),

    getChatHistory: builder.query<
      ChatHistory,
      { chatId: string; chatType: string }
    >({
      query: ({ chatId, chatType }) =>
        `/messages/${chatId}?chatType=${chatType}`,
      providesTags: (result, error, { chatId }) => [
        { type: "Message", id: chatId },
        { type: "ChatHistory", id: chatId },
      ],
    }),

    sendMessage: builder.mutation({
      query: (messageData) => ({
        url: "/messages/send",
        method: "POST",
        body: messageData,
      }),
      invalidatesTags: (result, error, { chatId }) => [
        { type: "Message", id: chatId },
        { type: "ChatHistory", id: chatId },
        "ChatList",
      ],
    }),
  }),
});

export const {
  useGetChatHistoryThreadQuery,
  useGetChatHistoryQuery,
  useSendMessageMutation,
  useGetChatListQuery,
} = chatApiSlice;
