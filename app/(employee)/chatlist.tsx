import ButtonPrimary from "@/components/shared/ButtonPrimary";
import ChatItem from "@/components/shared/ChatItem";
import EmptySearchList from "@/components/shared/EmptySearchList";
import Header from "@/components/shared/Header";
import SearchBar from "@/components/shared/SearchBar";
import { useSocket } from "@/hooks/useSocket";
import { useGetSupportChatListQuery } from "@/store/slices/chatApiSlice";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SupportChatList = () => {
  const router = useRouter();
  const { socket, connectionStatus, markAsRead } = useSocket();
  const [chatList, setChatList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: chatListData, refetch } = useGetSupportChatListQuery(
    "support",
    {
      pollingInterval: connectionStatus !== "connected" ? 30000 : 0, // Poll when offline
    }
  );

  useFocusEffect(
    useCallback(() => {
      // Refetch chat list when screen comes into focus
      refetch();
    }, [refetch])
  );

  // Handle real-time chat updates
  useEffect(() => {
    if (!socket) return;

    const handleChatUpdated = (updatedChat: any) => {
      setChatList((prevList) => {
        const existingIndex = prevList.findIndex(
          (chat) => chat.id === updatedChat.id
        );

        if (existingIndex >= 0) {
          // Update existing chat
          const newList = [...prevList];
          newList[existingIndex] = {
            ...newList[existingIndex],
            ...updatedChat,
          };
          return newList.sort(
            (a, b) =>
              new Date(b.lastMessageTime).getTime() -
              new Date(a.lastMessageTime).getTime()
          );
        } else {
          // Add new chat
          return [updatedChat, ...prevList].sort(
            (a, b) =>
              new Date(b.lastMessageTime).getTime() -
              new Date(a.lastMessageTime).getTime()
          );
        }
      });
    };

    socket.on("chatUpdated", handleChatUpdated);

    return () => {
      socket.off("chatUpdated", handleChatUpdated);
    };
  }, [socket]);

  // Update local state when API data changes
  useEffect(() => {
    if (chatListData?.data) {
      setChatList(chatListData.data);
    }
  }, [chatListData]);

  // Filter chat list based on search query
  const filteredChatList = useMemo(() => {
    if (!searchQuery.trim()) {
      return chatList;
    }

    const query = searchQuery.toLowerCase().trim();

    return chatList.filter((chat) => {
      // Search in support title
      const titleMatch = chat.supportInfo?.title?.toLowerCase().includes(query);

      // Search in support ID (e.g., S45)
      const idMatch = chat.supportId?.toLowerCase().includes(query);

      // Search in last message
      const messageMatch = chat.lastMessage?.toLowerCase().includes(query);

      // Search in creator name
      const creatorMatch = chat.createdByInfo?.name
        ?.toLowerCase()
        .includes(query);

      // Search in support number/code if available
      const codeMatch = chat.supportInfo?.code?.toLowerCase().includes(query);

      return titleMatch || idMatch || messageMatch || creatorMatch || codeMatch;
    });
  }, [chatList, searchQuery]);

  // Handle search input
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // mark as read
  const handleChatPress = useCallback(
    (chatId: string) => {
      markAsRead({
        chatType: "support",
        chatId: chatId,
      });

      // Navigate to chat
      router.push(`/employee/profile/support/chat/${chatId}`);
    },
    [markAsRead, router]
  );

  const handleRetryConnection = useCallback(() => {
    socket?.connect();
  }, [socket]);

  const ConnectionStatusBanner = () => {
    if (connectionStatus === "connected") return null;

    const getStatusConfig = () => {
      switch (connectionStatus) {
        case "connecting":
          return {
            bgColor: "bg-yellow-100",
            textColor: "text-yellow-800",
            icon: "wifi" as const,
            message: "Connecting to server...",
            showRetry: false,
          };
        case "error":
          return {
            bgColor: "bg-red-100",
            textColor: "text-red-800",
            icon: "error" as const,
            message: "Connection failed. Real-time updates disabled.",
            showRetry: true,
          };
        case "disconnected":
          return {
            bgColor: "bg-orange-100",
            textColor: "text-orange-800",
            icon: "wifi-off" as const,
            message: "Disconnected. Real-time updates paused.",
            showRetry: true,
          };
        default:
          return null;
      }
    };

    const config = getStatusConfig();
    if (!config) return null;

    return (
      <View
        className={`${config.bgColor} px-4 py-3 mx-4 mb-2 rounded-lg flex-row items-center justify-between`}
      >
        <View className="flex-row items-center flex-1">
          <MaterialIcons
            name={config.icon}
            size={16}
            color={
              config.textColor.includes("red")
                ? "#991b1b"
                : config.textColor.includes("yellow")
                  ? "#92400e"
                  : "#9a3412"
            }
          />
          <Text className={`ml-2 text-sm ${config.textColor} flex-1`}>
            {config.message}
          </Text>
        </View>

        {config.showRetry && (
          <TouchableOpacity
            onPress={handleRetryConnection}
            className="ml-2 px-3 py-1 bg-white rounded-md border border-gray-300"
          >
            <Text className="text-xs text-gray-700">Retry</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* chatlist */}
      <View className="flex-1">
        <LinearGradient
          colors={["#EDFDF1", "#FFFFFF"]} // 0% to 100%
          start={{ x: 0, y: 0 }} // Top
          end={{ x: 0, y: 1 }} // Bottom (180deg)
          style={{ paddingHorizontal: 24, paddingBottom: 12 }}
        >
          <Header title="Support" />
          <SearchBar onSearch={handleSearch} />
        </LinearGradient>

        {/* Connection Status Banner */}
        <ConnectionStatusBanner />

        {/* Search Results Info */}
        {searchQuery.trim().length > 0 && (
          <View className="px-6 py-2 bg-gray-50">
            <Text
              className="text-sm text-gray-600"
              style={{ fontFamily: "SourceSans3-Regular" }}
            >
              Found {filteredChatList.length} result
              {filteredChatList.length !== 1 ? "s" : ""} for "{searchQuery}"
            </Text>
          </View>
        )}

        <FlatList
          data={filteredChatList}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ChatItem onPress={() => handleChatPress(item._id)} item={item} />
          )}
          ListEmptyComponent={
            <EmptySearchList
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          }
        />

        {/* open new button */}
        <ButtonPrimary
          title="Open Now"
          className="absolute bottom-16 right-2.5 px-3 py-2.5"
          onPress={() => router.push("/employee/profile/support/start")}
        />
      </View>
    </SafeAreaView>
  );
};

export default SupportChatList;
