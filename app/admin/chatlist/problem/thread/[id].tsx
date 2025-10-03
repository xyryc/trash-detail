import ThreadHeader from "@/components/admin/ThreadHeader";
import ChatItem from "@/components/shared/ChatItem";
import Header from "@/components/shared/Header";
import SearchBar from "@/components/shared/SearchBar";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { FlatList, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProblemThread = () => {
  const { id, customerData } = useLocalSearchParams();
  const router = useRouter();

  const parsedData = useMemo(() => {
    if (customerData && typeof customerData === "string") {
      return JSON.parse(customerData);
    }
    return null;
  }, [customerData]);

  const customerChats = parsedData?.chats || [];
  const customer = parsedData?.customer;
  // console.log(customer);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* header */}
      <View className="px-6">
        <Header title="Problem - Thread" />

        <ThreadHeader customer={customer} />

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
