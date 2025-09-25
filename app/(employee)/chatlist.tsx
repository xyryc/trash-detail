import ButtonPrimary from "@/components/shared/ButtonPrimary";
import ChatItem from "@/components/shared/ChatItem";
import Header from "@/components/shared/Header";
import SearchBar from "@/components/shared/SearchBar";
import { useSocket } from "@/hooks/useSocket";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useGetSupportChatListQuery } from "@/store/slices/employeeApiSlice";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SupportChatList = () => {
  const router = useRouter();
  const chatType = "support";
  const dispatch = useAppDispatch();
  const {
    data: chatlist,
    refetch,
    isFetching,
  } = useGetSupportChatListQuery(chatType);
  const authToken = useAppSelector((state) => state.auth.token);
  const { socket, isConnected } = useSocket(authToken);
  console.log(isConnected);

  useEffect(() => {
    if (!socket || !isConnected) {
      console.log("Socket not ready:", { socket: !!socket, isConnected });
      return;
    }

    const handleChatUpdate = (data: any) => {
      console.log("Received updateChatList:", data);
      if (data.type === chatType) {
        console.log("Refetching chat list for type:", chatType);
        refetch();
      }
    };

    // Listen for the exact event your backend sends
    socket.on("updateChatList", handleChatUpdate);

    // Test if socket is working
    socket.emit("test", { message: "Hello from client" });

    return () => {
      socket.off("updateChatList", handleChatUpdate);
    };
  }, [socket, isConnected, chatType, refetch]);

  // console.log(chatlist);

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

          <SearchBar />
        </LinearGradient>

        {/* support chatlist */}
        <ScrollView className="hidden">
          {/* item-1 */}
          <View className="bg-neutral-light py-4 px-6 flex-row justify-between items-center border-b border-b-neutral-light-active">
            {/* message content */}
            <View className="flex-row gap-4">
              <View>
                <AntDesign
                  className="p-2 bg-white rounded-lg border border-neutral-light-hover"
                  name="question-circle"
                  size={24}
                  color="black"
                />
              </View>

              <View>
                <View className="flex-row items-center">
                  <Text
                    style={{ fontFamily: "SourceSans3-Medium" }}
                    className="text-green-normal"
                  >
                    S45
                  </Text>

                  <Entypo name="dot-single" size={16} color="#667085" />

                  <Text
                    style={{ fontFamily: "SourceSans3-Medium" }}
                    className="text-neutral-normal text-xs"
                  >
                    Just now
                  </Text>
                </View>

                <Text
                  style={{ fontFamily: "SourceSans3-Medium" }}
                  className="text-lg"
                >
                  Car Blocked
                </Text>

                <Text
                  style={{ fontFamily: "SourceSans3-Medium" }}
                  className="mt-2 text-xs text-neutral-normal-active"
                >
                  hi this is your employ mr mahmud id ...
                </Text>
              </View>
            </View>

            {/* notification  */}
            <View className="size-6 rounded-full overflow-hidden">
              <Text
                style={{ fontFamily: "SourceSans3-Bold" }}
                className="text-xs p-1 bg-error-normal text-white text-center"
              >
                2
              </Text>
            </View>
          </View>

          {/* item-2 */}
          <View className="py-4 px-6 flex-row justify-between items-center border-b border-b-neutral-light-active">
            {/* message content */}
            <View className="flex-row gap-4">
              <View>
                <AntDesign
                  className="p-2 bg-white rounded-lg border border-neutral-light-hover"
                  name="question-circle"
                  size={24}
                  color="black"
                />
              </View>

              <View>
                <View className="flex-row items-center">
                  <Text
                    style={{ fontFamily: "SourceSans3-Medium" }}
                    className="text-green-normal"
                  >
                    S45
                  </Text>

                  <Entypo name="dot-single" size={16} color="#667085" />

                  <Text
                    style={{ fontFamily: "SourceSans3-Medium" }}
                    className="text-neutral-normal text-xs"
                  >
                    Just now
                  </Text>
                </View>

                <Text
                  style={{ fontFamily: "SourceSans3-Medium" }}
                  className="text-lg"
                >
                  Car Blocked
                </Text>

                <Text
                  style={{ fontFamily: "SourceSans3-Medium" }}
                  className="mt-2 text-xs text-neutral-normal-active"
                >
                  hi this is your employ mr mahmud id ...
                </Text>
              </View>
            </View>

            {/* notification  */}
            <View className="size-6 rounded-full overflow-hidden hidden">
              <Text
                style={{ fontFamily: "SourceSans3-Bold" }}
                className="text-xs p-1 bg-error-normal text-white text-center"
              >
                2
              </Text>
            </View>
          </View>

          {/* item-3 */}
          <View className="py-4 px-6 flex-row justify-between items-center border-b border-b-neutral-light-active">
            {/* message content */}
            <View className="flex-row gap-4">
              <View>
                <AntDesign
                  className="p-2 bg-white rounded-lg border border-neutral-light-hover"
                  name="question-circle"
                  size={24}
                  color="black"
                />
              </View>

              <View>
                <View className="flex-row items-center">
                  <Text
                    style={{ fontFamily: "SourceSans3-Medium" }}
                    className="text-green-normal"
                  >
                    S45
                  </Text>

                  <Entypo name="dot-single" size={16} color="#667085" />

                  <Text
                    style={{ fontFamily: "SourceSans3-Medium" }}
                    className="text-neutral-normal text-xs"
                  >
                    Just now
                  </Text>
                </View>

                <Text
                  style={{ fontFamily: "SourceSans3-Medium" }}
                  className="text-lg"
                >
                  Car Blocked
                </Text>

                <Text
                  style={{ fontFamily: "SourceSans3-Medium" }}
                  className="mt-2 text-xs text-neutral-normal-active"
                >
                  hi this is your employ mr mahmud id ...
                </Text>
              </View>
            </View>

            {/* notification  */}
            <View className="size-6 rounded-full overflow-hidden hidden">
              <Text
                style={{ fontFamily: "SourceSans3-Bold" }}
                className="text-xs p-1 bg-error-normal text-white text-center"
              >
                2
              </Text>
            </View>
          </View>

          {/* item-4 */}
          <View className="bg-neutral-light-active py-4 px-6 flex-row justify-between items-center border-b border-b-neutral-light-active">
            {/* message content */}
            <View className="flex-row gap-4">
              <View>
                <AntDesign
                  className="p-2 bg-white rounded-lg border border-neutral-light-hover"
                  name="question-circle"
                  size={24}
                  color="black"
                />
              </View>

              <View>
                <View className="flex-row items-center">
                  <Text
                    style={{ fontFamily: "SourceSans3-Medium" }}
                    className="text-green-normal"
                  >
                    S45
                  </Text>

                  <Entypo name="dot-single" size={16} color="#667085" />

                  <Text
                    style={{ fontFamily: "SourceSans3-Medium" }}
                    className="text-neutral-normal text-xs"
                  >
                    Just now
                  </Text>
                </View>

                <Text
                  style={{ fontFamily: "SourceSans3-Medium" }}
                  className="text-lg"
                >
                  Car Blocked
                </Text>

                <Text
                  style={{ fontFamily: "SourceSans3-Medium" }}
                  className="mt-2 text-xs text-neutral-normal-active"
                >
                  hi this is your employ mr mahmud id ...
                </Text>
              </View>
            </View>

            {/* notification  */}
            <View className="size-6 rounded-full overflow-hidden">
              <Text
                style={{ fontFamily: "SourceSans3-Bold" }}
                className="text-xs p-1 bg-error-normal text-white text-center"
              >
                2
              </Text>
            </View>
          </View>
        </ScrollView>

        <FlatList
          data={chatlist?.data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ChatItem item={item} />}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={refetch}
              colors={["#22C55E"]}
              tintColor="#22C55E"
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
