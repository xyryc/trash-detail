import ButtonPrimary from "@/components/shared/ButtonPrimary";
import CustomHeader from "@/components/shared/CustomHeader";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StatusBar, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const StartChat = () => {
  const router = useRouter();
  const supportID = "S45";

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="flex-1 px-6">
        {/* header */}
        <CustomHeader text="Support" />

        {/* main content */}
        <ScrollView
          contentContainerClassName="border-[0.5px] border-neutral-light p-4 rounded-lg"
          showsVerticalScrollIndicator={false}
        >
          {/* support title */}
          <View>
            <Text
              style={{ fontFamily: "SourceSans3-Medium" }}
              className="text-neutral-normal mb-2"
            >
              Name
            </Text>
            <TextInput
              style={{ fontFamily: "SourceSans3-Medium" }}
              className="border border-neutral-light-active p-3 rounded-lg focus:border-neutral-darker text-neutral-dark"
              placeholder="John Doe"
            />
          </View>

          {/* details */}
          <View className="my-5">
            <Text
              style={{ fontFamily: "SourceSans3-Regular" }}
              className="text-neutral-normal mb-2"
            >
              Additional Notes:
            </Text>

            <TextInput
              style={{
                fontFamily: "SourceSans3-Medium",
                textAlignVertical: "top",
              }}
              className=" border border-neutral-light-active p-3 rounded-lg focus:border-neutral-darker text-neutral-dark h-32"
              placeholder="Add more details about your inquiry"
              multiline={true}
              numberOfLines={6}
            />
          </View>

          <ButtonPrimary
            title="Start Chat"
            onPress={() =>
              router.push(`/employee/profile/support/chat/${supportID}`)
            }
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default StartChat;
