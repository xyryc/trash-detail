import ButtonPrimary from "@/components/shared/ButtonPrimary";
import CustomHeader from "@/components/shared/CustomHeader";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const EmployeeProfileEditScreen = () => {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  const router = useRouter();

  const states = [
    { label: "AL", value: "AL" },
    { label: "AK", value: "AK" },
    { label: "ZA", value: "ZA" },
    { label: "CA", value: "CA" },
    { label: "CO", value: "CO" },
    { label: "FL", value: "FL" },
    { label: "GA", value: "GA" },
    { label: "NY", value: "NY" },
    { label: "TX", value: "TX" },
    { label: "WA", value: "WA" },
  ];
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="flex-1 px-6">
        {/* header */}
        <CustomHeader text="Edit Profile" />

        {/* main content */}
        <ScrollView
          contentContainerClassName="pb-10"
          showsVerticalScrollIndicator={false}
        >
          <View className="border border-neutral-light-hover p-4 rounded-lg">
            {/* first row */}
            <View>
              <Text
                style={{ fontFamily: "SourceSans3-Regular" }}
                className="text-neutral-normal mb-2"
              >
                ID:
              </Text>
              <Text
                style={{ fontFamily: "SourceSans3-SemiBold" }}
                className="text-neutral-dark-active"
              >
                E45
              </Text>
            </View>

            {/* divider */}
            <View className="h-px bg-neutral-light-hover my-5" />

            {/* second row */}
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
                defaultValue={"Anik"}
              />
            </View>

            {/* divider */}
            <View className="h-px bg-neutral-light-hover my-5" />

            {/* third row */}
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
                defaultValue={"amdanikzz@gmail.com"}
              />
            </View>

            {/* divider */}
            <View className="h-px bg-neutral-light-hover my-5" />

            {/* fourth row */}
            <View>
              <Text
                style={{ fontFamily: "SourceSans3-Medium" }}
                className="text-neutral-normal mb-2"
              >
                Number
              </Text>
              <TextInput
                style={{ fontFamily: "SourceSans3-Medium" }}
                className="border border-neutral-light-active p-3 rounded-lg focus:border-neutral-darker text-neutral-dark"
                defaultValue={"+8801570233979"}
              />
            </View>

            {/* divider */}
            <View className="h-px bg-neutral-light-hover my-5" />

            {/* fifth row */}
            <View>
              <Text
                style={{ fontFamily: "SourceSans3-Medium" }}
                className="text-neutral-normal mb-2"
              >
                Address Line 1
              </Text>
              <TextInput
                style={{ fontFamily: "SourceSans3-Medium" }}
                className="border border-neutral-light-active p-3 rounded-lg focus:border-neutral-darker text-neutral-dark"
                defaultValue={"5th Avenue"}
              />
            </View>

            {/* divider */}
            <View className="h-px bg-neutral-light-hover my-5" />

            {/* sixth row */}
            <View>
              <View className="flex-row gap-1">
                <Text
                  style={{ fontFamily: "SourceSans3-Medium" }}
                  className="text-neutral-normal mb-2"
                >
                  Address Line 2
                </Text>

                <Text
                  style={{ fontFamily: "SourceSans3-Medium" }}
                  className="text-neutral-normal mb-2"
                >
                  (optional)
                </Text>
              </View>
              <TextInput
                style={{ fontFamily: "SourceSans3-Medium" }}
                className="border border-neutral-light-active p-3 rounded-lg focus:border-neutral-darker text-neutral-dark"
                defaultValue={"Bay City Avenue"}
              />
            </View>

            {/* divider */}
            <View className="h-px bg-neutral-light-hover my-5" />

            {/* seventh row */}
            <View className="mb-5 flex-row gap-5">
              {/* city */}
              <View className="flex-1">
                <Text
                  style={{ fontFamily: "SourceSans3-Medium" }}
                  className="text-neutral-normal mb-2"
                >
                  City
                </Text>
                <TextInput
                  style={{ fontFamily: "SourceSans3-Medium" }}
                  className="border border-neutral-light-active p-3 rounded-lg focus:border-neutral-darker text-neutral-dark"
                  defaultValue={"New York"}
                />
              </View>

              {/* state */}
              <View className="flex-1">
                <Text
                  style={{ fontFamily: "SourceSans3-Medium" }}
                  className="text-neutral-normal mb-2"
                >
                  State
                </Text>

                <Dropdown
                  data={states}
                  labelField="label"
                  valueField="value"
                  placeholder="Select state"
                  value={value}
                  onChange={(item) => setValue(item.value)}
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  containerStyle={styles.containerStyle}
                  itemTextStyle={styles.itemTextStyle}
                />
              </View>
            </View>

            {/* zip code */}
            <View className="mb-5">
              <Text
                style={{ fontFamily: "SourceSans3-Medium" }}
                className="text-neutral-normal mb-2"
              >
                ZIP Code
              </Text>
              <TextInput
                style={{ fontFamily: "SourceSans3-Medium" }}
                className="border border-neutral-light-active p-3 rounded-lg focus:border-neutral-darker text-neutral-dark"
                defaultValue={"343431"}
              />
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

export default EmployeeProfileEditScreen;
