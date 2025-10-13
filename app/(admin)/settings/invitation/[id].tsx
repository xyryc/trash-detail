import ButtonPrimary from "@/components/shared/ButtonPrimary";
import CustomHeader from "@/components/shared/CustomHeader";
import { useInviteUserMutation } from "@/store/slices/adminApiSlice";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";

const SendInvitation = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [inviteUser, { isLoading }] = useInviteUserMutation();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(id);
  const [password, setPassword] = useState("123456");

  const roles = [
    { label: "Admin", value: "admin" },
    { label: "Super Admin", value: "superadmin" },
  ];

  const handleSendInvite = async () => {
    const payload = { email, role, password };

    try {
      const response = await inviteUser(payload).unwrap();

      if (response.success) {
        Alert.alert("Invitation sent!", response.message);
        router.back();
      }
    } catch (error: any) {
      Alert.alert(
        "Login Failed",
        error.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="flex-1 px-6">
        <CustomHeader text={`Add ${id}`} />

        {/* input fields */}
        <ScrollView
          contentContainerClassName="border-[0.5px] border-neutral-light p-4 rounded-lg"
          showsVerticalScrollIndicator={false}
        >
          {/* email */}
          <View className="mb-5">
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
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* role */}
          {id === "admin" && (
            <View className="mb-5">
              <Text
                style={{ fontFamily: "SourceSans3-Medium" }}
                className="text-neutral-normal mb-2"
              >
                State
              </Text>

              <Dropdown
                data={roles}
                labelField="label"
                valueField="value"
                placeholder="Select Role"
                value={role}
                onChange={(item) => setRole(item.value)}
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                containerStyle={styles.containerStyle}
                itemTextStyle={styles.itemTextStyle}
              />
            </View>
          )}

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
              value={password}
              onChangeText={setPassword}
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
            onPress={handleSendInvite}
            isLoading={isLoading}
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
    padding: 10,
  },
  placeholderStyle: {
    fontFamily: "SourceSans3-Medium",
    fontSize: 14,
    color: "#9CA3AF",
  },
  selectedTextStyle: {
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
