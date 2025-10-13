import ButtonPrimary from "@/components/shared/ButtonPrimary";
import CustomHeader from "@/components/shared/CustomHeader";
import { useCreateSupportChatMutation } from "@/store/slices/employeeApiSlice";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const StartChat = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const [createSupportChat, { isLoading }] = useCreateSupportChatMutation();

  const handleCreateSupportChat = async () => {
    const payload = { title, details };

    try {
      const response = await createSupportChat(payload);
      const result = response.data;
      // console.log(result);

      if (result?.success) {
        router.push(`/(employee)/profile/support/chat/${result?.data?._id}`);
      }
    } catch (error: any) {
      Alert.alert(
        "Failed to start support chat",
        error.data?.message || "Something went wrong"
      );
    }
  };

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
              Support Title
            </Text>
            <TextInput
              style={{ fontFamily: "SourceSans3-Medium" }}
              className="border border-neutral-light-active p-3 rounded-lg focus:border-neutral-darker text-neutral-dark"
              placeholder="Write about your problem"
              onChangeText={setTitle}
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
              className="border border-neutral-light-active p-3 rounded-lg focus:border-neutral-darker text-neutral-dark h-32"
              placeholder="Add more details about your inquiry"
              multiline={true}
              numberOfLines={6}
              onChangeText={setDetails}
            />
          </View>

          <ButtonPrimary
            title="Start Chat"
            onPress={handleCreateSupportChat}
            isLoading={isLoading}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default StartChat;
