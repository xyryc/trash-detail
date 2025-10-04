import GroupCard from "@/components/admin/GroupCard";
import Header from "@/components/shared/Header";
import SearchBar from "@/components/shared/SearchBar";
import { useSocket } from "@/hooks/useSocket";
import { useGetChatListQuery } from "@/store/slices/chatApiSlice";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatList = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedTab, setSelectedTab] = useState("problem");
  const router = useRouter();
  const { socket, connectionStatus, markAsRead } = useSocket();
  const [chatList, setChatList] = useState<any[]>([]);

  const { data: chatListData, refetch } = useGetChatListQuery(selectedTab, {
    pollingInterval: connectionStatus !== "connected" ? 30000 : 0, // Poll when offline
  });

  // Update local state when API data changes
  useEffect(() => {
    if (chatListData?.data) {
      setChatList(chatListData.data);
    }
  }, [chatListData]);

  // Group chats by customerId
  const groupedChats = useMemo(() => {
    const groups: { [key: string]: any } = {};

    chatList.forEach((item) => {
      const customerId = item.customer?.customerId;
      if (!customerId) return;

      if (!groups[customerId]) {
        groups[customerId] = {
          customer: item.customer,
          chats: [],
          totalIncomingMessages: 0,
          latestMessageTime: item.lastMessageTime,
          type: item.type, // Use first chat's type
          types: new Set(), // Keep for tracking multiple types if needed
        };
      }

      groups[customerId].chats.push(item);
      groups[customerId].totalIncomingMessages += item.incomingMessages || 0;

      // Update latest message time
      if (
        item.lastMessageTime &&
        (!groups[customerId].latestMessageTime ||
          new Date(item.lastMessageTime) >
            new Date(groups[customerId].latestMessageTime))
      ) {
        groups[customerId].latestMessageTime = item.lastMessageTime;
      }

      // Track chat types
      groups[customerId].types.add(item.type);
    });

    return Object.values(groups).sort(
      (a, b) =>
        new Date(b.latestMessageTime).getTime() -
        new Date(a.latestMessageTime).getTime()
    );
  }, [chatList]);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="flex-1">
        <LinearGradient
          colors={["#EDFDF1", "#FFFFFF"]} // 0% to 100%
          start={{ x: 0, y: 0 }} // Top
          end={{ x: 0, y: 1 }} // Bottom (180deg)
          style={{
            paddingHorizontal: 24,
            paddingBottom: 12,
          }}
        >
          <Header title={"Chat List"} />

          <SearchBar />
        </LinearGradient>

        {/* Tabs */}
        <View className="flex-row gap-3 px-6">
          <Pressable
            onPress={() => setSelectedTab("problem")}
            className={`px-3.5 py-3 ${selectedTab === "problem" ? "border-b-2 border-green-normal" : ""}`}
          >
            <Text
              className={`text-sm ${
                selectedTab === "problem"
                  ? "text-green-normal"
                  : "text-neutral-normal"
              }`}
              style={{ fontFamily: "SourceSans3-Medium" }}
            >
              Problem
            </Text>
            {/* Red dot indicator */}
            <View className="absolute top-2.5 right-1 w-2 h-2 bg-error-normal-hover rounded-full" />
          </Pressable>

          <Pressable
            onPress={() => setSelectedTab("support")}
            className={`px-3.5 py-3 ${selectedTab === "support" ? "border-b-2 border-green-normal" : ""}`}
          >
            <Text
              className={`text-sm ${
                selectedTab === "support"
                  ? "text-green-normal"
                  : "text-neutral-normal"
              }`}
              style={{ fontFamily: "SourceSans3-Medium" }}
            >
              Support
            </Text>

            {/* Red dot indicator */}
            <View className="absolute top-2.5 right-1 w-2 h-2 bg-error-normal-hover rounded-full" />
          </Pressable>
        </View>

        {/* Chat List */}
        <FlatList
          data={groupedChats}
          renderItem={({ item: customerGroup }) => (
            <GroupCard customerGroup={customerGroup} />
          )}
          keyExtractor={(item) => item.customer.customerId}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 100 }}
          ListEmptyComponent={
            <View className="items-center justify-center h-[60vh]">
              <Ionicons name="chatbubbles-outline" size={64} color="#D1D5DB" />
              <Text
                className="text-gray-500 text-lg mt-4"
                style={{ fontFamily: "SourceSans3-Regular" }}
              >
                No chats found
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatList;
