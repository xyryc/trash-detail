// services/socketService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io, Socket } from "socket.io-client";

class SocketService {
  private socket: Socket | null = null;
  private readonly baseUrl = "https://anik3001.sakibahmad.com";

  async connect(): Promise<Socket> {
    if (this.socket?.connected) {
      return this.socket;
    }

    const token = await AsyncStorage.getItem("auth_token");

    this.socket = io(this.baseUrl, {
      auth: { token },
      transports: ["websocket", "polling"],
      timeout: 20000,
    });

    this.socket.on("connect", () => {
      console.log("Socket connected:", this.socket?.id);
    });

    this.socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    this.socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    return this.socket;
  }

  joinRoom(roomData: { chatType: string; supportId: string }) {
    if (this.socket?.connected) {
      this.socket.emit("joinRoom", roomData);
      console.log("Joined room:", roomData);
    }
  }

  sendMessage(messageData: {
    chatType: string;
    supportId: string;
    message?: string;
    imageUrl?: string;
  }) {
    if (this.socket?.connected) {
      this.socket.emit("sendMessage", messageData);
      console.log("Message sent:", messageData);
    }
  }

  onNewMessage(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on("newMessage", callback);
    }
  }

  onChatListUpdate(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on("updateChatList", callback);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket(): Socket | null {
    return this.socket;
  }
}

export default new SocketService();
