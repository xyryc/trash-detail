// hooks/useChat.ts
import { useAppDispatch } from "@/store/hooks";
import socketService from "@/store/services/socketService";
import { chatApiSlice } from "@/store/slices/chatApiSlice";
import { useEffect, useRef } from "react";

export const useChat = (supportId?: string, chatType: string = "support") => {
  const dispatch = useAppDispatch();
  const hasJoinedRoom = useRef(false);

  useEffect(() => {
    const initializeSocket = async () => {
      try {
        await socketService.connect();

        // Set up chat list updates
        socketService.onChatListUpdate((data) => {
          console.log("Chat list update received:", data);
          if (data.type === chatType) {
            dispatch(chatApiSlice.util.invalidateTags(["Chat"]));
          }
        });

        // Join room if supportId is provided
        if (supportId && !hasJoinedRoom.current) {
          socketService.joinRoom({ chatType, supportId });
          hasJoinedRoom.current = true;

          // Set up new message listener
          socketService.onNewMessage((messageData) => {
            console.log("New message received:", messageData);
            dispatch(
              chatApiSlice.util.invalidateTags([
                { type: "Message", id: supportId },
                "Chat",
              ])
            );
          });
        }
      } catch (error) {
        console.error("Socket initialization failed:", error);
      }
    };

    initializeSocket();

    return () => {
      if (supportId) {
        hasJoinedRoom.current = false;
      }
    };
  }, [supportId, chatType, dispatch]);

  const sendMessage = (message?: string, imageUrl?: string) => {
    if (supportId) {
      socketService.sendMessage({
        chatType,
        supportId,
        message,
        imageUrl,
      });
    }
  };

  return { sendMessage };
};
