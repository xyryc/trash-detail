import ThreadHeader from "@/components/admin/ThreadHeader";
import ChatItem from "@/components/shared/ChatItem";
import ConnectionStatusBanner from "@/components/shared/ConnectionStatusBanner";
import EmptySearchList from "@/components/shared/EmptySearchList";
import Header from "@/components/shared/Header";
import SearchBar from "@/components/shared/SearchBar";
import { useSocket } from "@/hooks/useSocket";
import { useGetChatThreadByUserIdQuery } from "@/store/slices/chatApiSlice";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Thread = () => {
  const [searchText, setSearchText] = useState("");
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

  const filteredThreads = useMemo(() => {
    if (!chatThread?.data || !searchText.trim()) {
      return chatThread?.data || [];
    }

    const query = searchText.toLowerCase();
    return chatThread.data.filter((thread: any) => {
      const matchesTitle = thread.title?.toLowerCase().includes(query);

      if (type === "support") {
        return matchesTitle || thread.supportId?.toLowerCase().includes(query);
      } else {
        // default to problemId for "problem" or other types
        return matchesTitle || thread.problemId?.toLowerCase().includes(query);
      }
    });
  }, [chatThread?.data, searchText, type]);

  console.log("from thread", chatThread?.data);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* header */}
      <View className="px-6">
        <Header title={`${type} - Thread`} />

        <ThreadHeader customer={chatThread?.data[0].customer} />

        <View className="mt-3">
          <SearchBar onSearch={setSearchText} />
        </View>
      </View>

      {/* problem list */}
      <View className="flex-1 mt-3">
        {/* Connection Status Banner */}
        <ConnectionStatusBanner />

        <FlatList
          data={filteredThreads}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ChatItem
              item={item}
              onPress={() => {
                router.push(`/(admin)/chatlist/${type}/${item._id}`);
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <EmptySearchList
              searchQuery={searchText}
              setSearchQuery={setSearchText}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Thread;
