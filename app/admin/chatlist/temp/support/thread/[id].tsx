import ThreadHeader from "@/components/admin/ThreadHeader";
import ChatItem from "@/components/shared/ChatItem";
import ConnectionStatusBanner from "@/components/shared/ConnectionStatusBanner";
import Header from "@/components/shared/Header";
import SearchBar from "@/components/shared/SearchBar";
import { useSocket } from "@/hooks/useSocket";
import { useGetChatThreadByUserIdQuery } from "@/store/slices/chatApiSlice";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { FlatList, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SupportThread = () => {
  const { id, selectedTab } = useLocalSearchParams();
  console.log(id, selectedTab);
  const router = useRouter();
  const { socket, connectionStatus, markAsRead } = useSocket();

  const {
    data: chatThread,
    refetch,
    isFetching,
  } = useGetChatThreadByUserIdQuery(selectedTab, {
    pollingInterval: connectionStatus !== "connected" ? 30000 : 0,
  });

  console.log("from user id screen", chatThread);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* header */}
      <View className="px-6">
        <Header title="Support - Thread" />

        <ThreadHeader customer={customer} />

        <View className="mt-3">
          <SearchBar />
        </View>
      </View>

      {/* problem list */}
      <View className="flex-1 mt-3">
        {/* Connection Status Banner */}
        <ConnectionStatusBanner />

        <FlatList
          data={customerChats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatItem
              item={item}
              onPress={() => {
                router.push(
                  `/admin/chatlist/${customerChats[0]?.type}/${item.id}` as any
                );
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SupportThread;
