import ButtonPrimary from "@/components/shared/ButtonPrimary";
import ButtonSecondary from "@/components/shared/ButtonSecondary";
import CustomDropdown from "@/components/shared/CustomDropDown";
import CustomHeader from "@/components/shared/CustomHeader";
import { ROLES } from "@/constants/Roles";
import {
  useGetUserByIdQuery,
  useUpdateProfileMutation,
} from "@/store/slices/adminApiSlice";
import { useLocalSearchParams, useRouter } from "expo-router";
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

const EditAdmin = () => {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useGetUserByIdQuery(id);
  const adminData = data?.data;

  const [email, setEmail] = useState(adminData?.email);
  const [password, setPassword] = useState("");

  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateProfileMutation();

  const handleUpdateProfile = async () => {
    const payload = {
      role,
      password,
    };

    try {
      const response = await updateUserProfile({
        userId: adminData?._id,
        payload,
      }).unwrap();

      if (response.success) {
        Alert.alert("Success", "Profile updated successfully");
        router.back();
      }
    } catch (error: any) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", error.data.message);
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="flex-1 px-6">
        {/* header */}
        <CustomHeader text="Edit Admin" />

        {/* main content */}
        <ScrollView
          contentContainerClassName="pb-10"
          showsVerticalScrollIndicator={false}
        >
          <View className="border border-neutral-light-hover p-4 rounded-lg">
            {/* first row */}
            <View>
              <Text
                style={{ fontFamily: "SourceSans3-Medium" }}
                className="text-neutral-normal mb-2"
              >
                Select Role
              </Text>

              <CustomDropdown
                value={role}
                onValueChange={setRole}
                items={ROLES}
                placeholder={adminData?.role}
              />
            </View>

            {/* divider */}
            <View className="h-px bg-neutral-light-hover my-5" />

            {/* second row */}
            <View>
              <Text
                style={{ fontFamily: "SourceSans3-Medium" }}
                className="text-neutral-normal mb-2"
              >
                Email
              </Text>

              <Text
                style={{ fontFamily: "SourceSans3-Medium" }}
                className="border border-neutral-light-active p-3 rounded-lg focus:border-neutral-darker text-neutral-dark"
              >
                {email}
              </Text>
            </View>

            {/* divider */}
            <View className="h-px bg-neutral-light-hover my-5" />

            {/* third row */}
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
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Enter a new temporary password"
              />
            </View>

            {/* remove  */}
            <View className="mb-5">
              <ButtonSecondary title="Remove" textColor="!text-error-normal" />
            </View>

            {/* edit */}
            <ButtonPrimary
              onPress={handleUpdateProfile}
              title="Save Change"
              isLoading={isUpdating || isLoading}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EditAdmin;
