import chatListData from "@/assets/data/chatListData.json";
import ThreadHeader from "@/components/admin/ThreadHeader";
import ChatItem from "@/components/shared/ChatItem";
import Header from "@/components/shared/Header";
import SearchBar from "@/components/shared/SearchBar";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { FlatList, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProblemThread = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const customerChats = chatListData.filter(
    (chat) => chat.customerId === id && chat.category === "problem"
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* header */}
      <View className="px-6">
        <Header title="Problem Thread" />

        <ThreadHeader customerChats={customerChats} />

        <View className="mt-3">
          <SearchBar />
        </View>
      </View>

      {/* problem list */}
      <View className="flex-1 mt-3">
        <FlatList
          data={customerChats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatItem
              item={item}
              onPress={() =>
                router.push(`/admin/chatlist/chat/${customerChats[0].id}`)
              }
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProblemThread;
