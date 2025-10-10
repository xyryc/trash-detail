import ButtonPrimary from "@/components/shared/ButtonPrimary";
import ChatItem from "@/components/shared/ChatItem";
import Header from "@/components/shared/Header";
import SearchBar from "@/components/shared/SearchBar";
import { useSocket } from "@/hooks/useSocket";
import { useGetChatListQuery } from "@/store/slices/chatApiSlice";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  RefreshControl,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatList = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedTab, setSelectedTab] = useState("problem");
  const router = useRouter();
  const { socket, connectionStatus, markAsRead } = useSocket();

  const {
    data: chatListData,
    refetch,
    isFetching,
  } = useGetChatListQuery(selectedTab, {
    pollingInterval: connectionStatus !== "connected" ? 30000 : 0,
  });
  const chatlist = chatListData?.data;
  console.log("from customer chatlist", chatlist);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="flex-1 relative">
        {/* open now button */}
        {selectedTab === "support" && (
          <ButtonPrimary
            title="Open Now"
            className="absolute bottom-8 right-6 px-3 z-10"
            onPress={() => router.push("/customer/support/start")}
          />
        )}

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
          data={chatlist}
          renderItem={({ item }) => (
            <ChatItem
              item={item}
              onPress={() => {
                router.push(`/customer/chat/${item.id}`);
              }}
            />
          )}
          keyExtractor={(item) => item._id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 100 }}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={refetch}
              colors={["#22C55E"]}
              tintColor="#22C55E"
            />
          }
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-20">
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
