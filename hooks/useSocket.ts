import { useAppSelector } from "@/store/hooks";
import { UseSocketReturn } from "@/types/chat";
import { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = (): UseSocketReturn => {
  const socketRef = useRef<Socket | null>(null); // Use ref to persist socket
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "disconnected" | "error"
  >("disconnected");
  const { token } = useAppSelector((state) => state.auth);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;

  const connect = useCallback(() => {
    // Don't create new socket if already connected
    if (socketRef.current?.connected) {
      // console.log("Socket already connected");
      return;
    }

    // Disconnect old socket if exists
    if (socketRef.current) {
      // console.log("Disconnecting old socket");
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    // console.log("Creating new socket connection");
    // console.log("Socket URL:", process.env.EXPO_PUBLIC_SOCKET_URL);
    setConnectionStatus("connecting");

    const newSocket = io(
      process.env.EXPO_PUBLIC_SOCKET_URL || "http://localhost:3000",
      {
        auth: { token },
        transports: ["websocket", "polling"], // Try polling as fallback
        timeout: 20000,
        reconnection: false, // We handle reconnection manually
        forceNew: true, // Force new connection
        upgrade: false, // Don't try to upgrade from polling to websocket
      }
    );

    newSocket.on("connect", () => {
      // console.log("✅ Socket connected successfully");
      setConnectionStatus("connected");
      reconnectAttemptsRef.current = 0;
    });

    newSocket.on("disconnect", (reason) => {
      // console.log("❌ Socket disconnected:", reason);
      setConnectionStatus("disconnected");

      // Auto-reconnect for most disconnect reasons
      if (
        reason === "io server disconnect" ||
        reason === "transport close" ||
        reason === "transport error" ||
        reason === "ping timeout"
      ) {
        // console.log("🔄 Will attempt to reconnect...");
        handleReconnect();
      }
    });

    newSocket.on("connect_error", (error) => {
      console.error("❌ Socket connection error:", error.message);
      setConnectionStatus("error");
      handleReconnect();
    });

    newSocket.on("authentication_error", (error) => {
      console.error("❌ Socket authentication error:", error);
      setConnectionStatus("error");
    });

    socketRef.current = newSocket;
    setSocket(newSocket);
  }, [token]);

  const handleReconnect = useCallback(() => {
    if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
      // console.log("❌ Max reconnect attempts reached");
      setConnectionStatus("error");
      return;
    }

    const delay = Math.min(
      1000 * Math.pow(2, reconnectAttemptsRef.current),
      30000
    );

    // console.log(
    //   `🔄 Reconnecting in ${delay}ms (attempt ${reconnectAttemptsRef.current + 1})`
    // );

    reconnectTimeoutRef.current = setTimeout(() => {
      reconnectAttemptsRef.current++;
      connect();
    }, delay);
  }, [connect]);

  const disconnect = useCallback(() => {
    // console.log("🔌 Disconnecting socket");
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    socketRef.current?.disconnect();
    socketRef.current = null;
    setSocket(null);
    setConnectionStatus("disconnected");
  }, []);

  const emit = useCallback((event: string, data: any) => {
    if (socketRef.current?.connected) {
      // console.log("📤 Emitting:", event, data);
      socketRef.current.emit(event, data);
    } else {
      console.warn("⚠️ Socket not connected, cannot emit:", event);
    }
  }, []);

  const joinRoom = useCallback(
    (roomData: {
      chatType: string;
      problemId?: string;
      supportId?: string;
    }) => {
      // console.log("🚪 Joining room:", roomData);
      if (socketRef.current?.connected) {
        socketRef.current.emit("joinRoom", roomData);
      } else {
        console.warn("⚠️ Socket not connected, cannot join room");
      }
    },
    []
  );

  const sendTyping = useCallback(
    (data: {
      chatType: string;
      problemId?: string;
      supportId?: string;
      userId: string;
    }) => {
      if (socketRef.current?.connected) {
        socketRef.current.emit("typing", data);
      } else {
        console.warn("⚠️ Socket not connected, cannot send typing");
      }
    },
    []
  );

  const stopTyping = useCallback(
    (data: {
      chatType: string;
      problemId?: string;
      supportId?: string;
      userId: string;
    }) => {
      if (socketRef.current?.connected) {
        socketRef.current.emit("stop_typing", data);
      } else {
        console.warn("⚠️ Socket not connected, cannot stop typing");
      }
    },
    []
  );

  const markAsRead = useCallback(
    (data: { chatType: string; chatId: string }) => {
      if (socketRef.current?.connected) {
        socketRef.current.emit("markChatAsRead", data);
      } else {
        console.warn("⚠️ Socket not connected, can't mark as read.");
      }
    },
    []
  );

  // Initialize socket connection
  useEffect(() => {
    if (token) {
      // console.log("🔌 Token available, connecting socket");
      connect();
    } else {
      // console.log("❌ No token, disconnecting socket");
      disconnect();
    }

    // Cleanup on unmount
    return () => {
      // console.log("🧹 Cleaning up socket");
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [token, connect, disconnect]);

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
