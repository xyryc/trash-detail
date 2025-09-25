// hooks/useSocket.ts
import { useAppDispatch } from "@/store/hooks";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket;

export const useSocket = (authToken: string) => {
  const dispatch = useAppDispatch();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (authToken && !socket) {
      socket = io("https://anik3001.sakibahmad.com/", {
        auth: { token: authToken },
      });
    }

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    return () => {
      if (socket) {
        socket.disconnect();
        socket = null;
      }
    };
  }, [authToken]);

  return { socket, isConnected };
};
