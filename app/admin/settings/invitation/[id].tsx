import ButtonPrimary from "@/components/shared/ButtonPrimary";
import CustomHeader from "@/components/shared/CustomHeader";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SendInvitation = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [value, setValue] = useState<string | null>(null);

  const states = [
    { label: "Super Admin", value: "super" },
    { label: "Admin", value: "admin" },
  ];

  console.log(id);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="flex-1 px-6">
        <CustomHeader text={`Add ${id}`} />

        {/* input fields */}
        <ScrollView
          contentContainerClassName="border-[0.5px] border-neutral-light p-4 rounded-lg"
          showsVerticalScrollIndicator={false}
        >
          {/* email */}
          <View>
            <Text
              style={{ fontFamily: "SourceSans3-Medium" }}
              className="text-neutral-normal mb-2"
            >
              Email
            </Text>
            <TextInput
              style={{ fontFamily: "SourceSans3-Medium" }}
              className="border border-neutral-light-active p-3 rounded-lg focus:border-neutral-darker text-neutral-dark"
              placeholder="mdtalathunnabi@gmail.com"
            />
          </View>

          {/* role */}

          {/* password */}
          <View className="mb-5">
            <Text
              style={{ fontFamily: "SourceSans3-Medium" }}
              className="text-neutral-normal mb-2"
            >
              Temporary Password
            </Text>

            <TextInput
              style={{ fontFamily: "SourceSans3-Medium" }}
              className="border border-neutral-light-active p-3 rounded-lg focus:border-neutral-darker text-neutral-dark"
              placeholder="123456"
            />
          </View>

          <ButtonPrimary
            title="Send Invitation"
            icon={
              <Image
                source={require("@/assets/images/send.svg")}
                style={{ width: 24, height: 24 }}
              />
            }
            onPress={() => {
              console.log(`invitation send to:`, id);
              router.back();
            }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    fontFamily: "SourceSans3-Medium",

    borderWidth: 1,
    borderColor: "#D0D3D9",
    borderRadius: 8,
    padding: 12,
  },
  placeholderStyle: {
    fontFamily: "SourceSans3-Medium",
    fontSize: 14,
    color: "#9CA3AF",
  },
  selectedTextStyle: {
    fontFamily: "SourceSans3-Medium",
    fontSize: 14,
    color: "#4D5464",
  },
  containerStyle: {
    borderRadius: 8,
    backgroundColor: "white",
  },
  itemTextStyle: {
    fontSize: 14,
    color: "#3D3D3D",
    fontFamily: "SourceSans3-Medium",
  },
});

export default SendInvitation;
