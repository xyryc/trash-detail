import Header from "@/components/shared/Header";
import SearchBar from "@/components/shared/SearchBar";
import ThreadCard from "@/components/shared/ThreadCard";
import { useSocket } from "@/hooks/useSocket";
import { useGetChatListQuery } from "@/store/slices/chatApiSlice";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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

  // console.log(chatList);

  // Handle navigation based on card type
  const handleCardPress = (item: any) => {
    if (item.type === "problem") {
      // Navigate to problem thread
      router.push(`/admin/chatlist/problem/thread/${item?.customer?.id}`);
      console.log("navigating to problem details");
    } else if (item.type === "support") {
      // Navigate to support thread
      router.push(`/admin/chatlist/support/thread/${item?.customer?.id}`);
      console.log("navigating to support details");
    }
  };

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
          <TouchableOpacity
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
          </TouchableOpacity>

          <TouchableOpacity
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
          </TouchableOpacity>
        </View>

        {/* Chat List */}
        <FlatList
          data={chatList}
          renderItem={({ item }) => (
            <ThreadCard
              item={item}
              onPress={() => handleCardPress(item)}
              category={item.category}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
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
