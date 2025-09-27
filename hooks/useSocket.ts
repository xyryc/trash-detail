import { useAppSelector } from "@/store/hooks";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface UseSocketReturn {
  socket: Socket | null;
  connectionStatus: "connecting" | "connected" | "disconnected" | "error";
  connect: () => void;
  disconnect: () => void;
  emit: (event: string, data: any) => void;
  joinRoom: (roomData: {
    chatType: string;
    problemId?: string;
    supportId?: string;
  }) => void;
  sendTyping: (data: {
    chatType: string;
    problemId?: string;
    supportId?: string;
    userId: string;
  }) => void;
  stopTyping: (data: {
    chatType: string;
    problemId?: string;
    supportId?: string;
    userId: string;
  }) => void;
  markAsRead: (data: { chatType: string; chatId: string }) => void;
}

export const useSocket = (): UseSocketReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "disconnected" | "error"
  >("disconnected");
  const { token } = useAppSelector((state) => state.auth);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;

  const connect = () => {
    if (socket?.connected) return;

    setConnectionStatus("connecting");

    const newSocket = io(
      process.env.EXPO_PUBLIC_SOCKET_URL || "http://localhost:3000",
      {
        auth: { token },
        transports: ["websocket"],
        timeout: 20000,
      }
    );

    newSocket.on("connect", () => {
      console.log("Socket connected");
      setConnectionStatus("connected");
      reconnectAttemptsRef.current = 0;
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      setConnectionStatus("disconnected");

      // Auto-reconnect for certain disconnect reasons
      if (reason === "io server disconnect" || reason === "transport close") {
        handleReconnect();
      }
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setConnectionStatus("error");
      handleReconnect();
    });

    newSocket.on("authentication_error", (error) => {
      console.error("Socket authentication error:", error);
      setConnectionStatus("error");
    });

    setSocket(newSocket);
  };

  const handleReconnect = () => {
    if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
      setConnectionStatus("error");
      return;
    }

    const delay = Math.min(
      1000 * Math.pow(2, reconnectAttemptsRef.current),
      30000
    );
    reconnectTimeoutRef.current = setTimeout(() => {
      reconnectAttemptsRef.current++;
      connect();
    }, delay);
  };

  const disconnect = () => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    socket?.disconnect();
    setSocket(null);
    setConnectionStatus("disconnected");
  };

  const emit = (event: string, data: any) => {
    if (socket?.connected) {
      socket.emit(event, data);
    } else {
      console.warn("Socket not connected, cannot emit:", event);
    }
  };

  const joinRoom = (roomData: {
    chatType: string;
    problemId?: string;
    supportId?: string;
  }) => {
    console.log("Joining room:", roomData);
    if (socket?.connected) {
      socket.emit("joinRoom", roomData);
    } else {
      console.warn("Socket not connected, cannot join room");
    }
  };

  const sendTyping = (data: {
    chatType: string;
    problemId?: string;
    supportId?: string;
    userId: string;
  }) => {
    if (socket?.connected) {
      socket.emit("typing", data);
    } else {
      console.warn("Socket not connected, cannot send typing");
    }
  };

  const stopTyping = (data: {
    chatType: string;
    problemId?: string;
    supportId?: string;
    userId: string;
  }) => {
    if (socket?.connected) {
      socket.emit("stop_typing", data);
    } else {
      console.warn("Socket not connected, cannot stop typing");
    }
  };

  const markAsRead = (data: { chatType: string; chatId: string }) => {
    if (socket?.connected) {
      socket.emit("markChatAsRead", data);
    } else {
      console.warn("Socket not connected, can't mark as read.");
    }
  };

  useEffect(() => {
    if (token) {
      connect();
    }

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      socket?.disconnect();
    };
  }, [token]);

  return {
    socket,
    connectionStatus,
    connect,
    disconnect,
    emit,
    joinRoom,
    sendTyping,
    stopTyping,
    markAsRead,
  };
};
