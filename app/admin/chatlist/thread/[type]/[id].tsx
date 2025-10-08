import ThreadHeader from "@/components/admin/ThreadHeader";
import ChatItem from "@/components/shared/ChatItem";
import ConnectionStatusBanner from "@/components/shared/ConnectionStatusBanner";
import Header from "@/components/shared/Header";
import SearchBar from "@/components/shared/SearchBar";
import { useSocket } from "@/hooks/useSocket";
import { useGetChatThreadByUserIdQuery } from "@/store/slices/chatApiSlice";
import { useLocalSearchParams, useRouter } from "expo-router";

import { FlatList, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Thread = () => {
  const { type, id } = useLocalSearchParams();
  const { socket, connectionStatus, markAsRead } = useSocket();
  const router = useRouter();
  const {
    data: chatThread,
    refetch,
    isFetching,
  } = useGetChatThreadByUserIdQuery(
    {
      userId: id,
      type,
    },
    {
      pollingInterval: connectionStatus !== "connected" ? 30000 : 0,
    }
  );
  // console.log("from thread", chatThread?.data);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* header */}
      <View className="px-6">
        <Header title={`${type} - Thread`} />

        <ThreadHeader customer={chatThread?.data[0].customer} />

        <View className="mt-3">
          <SearchBar />
        </View>
      </View>

      {/* problem list */}
      <View className="flex-1 mt-3">
        {/* Connection Status Banner */}
        <ConnectionStatusBanner />

        <FlatList
          data={chatThread?.data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatItem
              item={item}
              onPress={() => {
                router.push(`/admin/chatlist/${type}/${item.id}`);
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

export default Thread;
