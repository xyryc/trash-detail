import ButtonPrimary from "@/components/shared/ButtonPrimary";
import SearchBar from "@/components/shared/SearchBar";
import SupportHeader from "@/components/shared/SupportHeader";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SupportChatList = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* chatlist */}
      <View className="flex-1">
        <View className="px-6">
          {/* support header */}
          <SupportHeader />

          <View className="pt-8 pb-6">
            <SearchBar />
          </View>
        </View>

        <ScrollView>
          {/* item-1 */}
          <View className="bg-neutral-light py-4 px-6 flex-row justify-between items-center border-b border-b-neutral-light-active">
            {/* message content */}
            <View className="flex-row gap-4">
              <View>
                <AntDesign
                  className="p-2 bg-white rounded-lg border border-neutral-light-hover"
                  name="questioncircleo"
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
                  name="questioncircleo"
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
                  name="questioncircleo"
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
                  name="questioncircleo"
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

        {/* open new button */}
        <ButtonPrimary
          title="Open Now"
          className="absolute bottom-24 right-2.5 px-3 py-2.5"
          onPress={() => router.push("/employee/profile/support/start")}
        />
      </View>
    </SafeAreaView>
  );
};

export default SupportChatList;
