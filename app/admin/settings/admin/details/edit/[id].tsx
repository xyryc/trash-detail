import ButtonPrimary from "@/components/shared/ButtonPrimary";
import ButtonSecondary from "@/components/shared/ButtonSecondary";
import CustomHeader from "@/components/shared/CustomHeader";
import { useGetUserByIdQuery } from "@/store/slices/adminApiSlice";
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
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";

const EditCustomer = () => {
  const router = useRouter();
  const [value, setValue] = useState<string | null>(null);
  const { id } = useLocalSearchParams();
  const { data, isLoading } = useGetUserByIdQuery(id);
  const adminData = data?.data;

  const roles = [
    { label: "Super Admin", value: "super" },
    { label: "Admin", value: "admin" },
  ];

  const [role, setRole] = useState(adminData?.role);
  const [email, setEmail] = useState(adminData?.email);
  const [password, setPassword] = useState(adminData?.password);

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

              <Dropdown
                data={roles}
                labelField="label"
                valueField="value"
                placeholder="Admin"
                value={role}
                onChange={(item) => setValue(item.value)}
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                containerStyle={styles.containerStyle}
                itemTextStyle={styles.itemTextStyle}
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
              <TextInput
                style={{ fontFamily: "SourceSans3-Medium" }}
                className="border border-neutral-light-active p-3 rounded-lg focus:border-neutral-darker text-neutral-dark"
                value={email}
              />
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
              />
            </View>

            {/* remove  */}
            <View className="mb-5">
              <ButtonSecondary title="Remove" textColor="!text-error-normal" />
            </View>

            {/* edit */}
            <ButtonPrimary
              onPress={() => {
                router.back();
              }}
              title="Save Change"
            />
          </View>
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

export default EditCustomer;
