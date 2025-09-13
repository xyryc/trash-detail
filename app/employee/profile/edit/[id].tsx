import ButtonPrimary from "@/components/shared/ButtonPrimary";
import CustomHeader from "@/components/shared/CustomHeader";
import { useGetLoggedInUserDataQuery } from "@/store/slices/authApiSlice";
import { useUpdateProfileMutation } from "@/store/slices/employeeApiSlice";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
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

const EmployeeProfileEditScreen = () => {
  const router = useRouter();
  const { data, isLoading } = useGetLoggedInUserDataQuery();
  const userData = data?.data;

  const [email, setEmail] = useState(userData?.email);
  const [name, setName] = useState(userData?.name);
  const [number, setNumber] = useState(userData?.number);
  const [addressLane1, setAddressLane1] = useState(userData?.addressLane1);
  const [addressLane2, setAddressLane2] = useState(userData?.addressLane2);
  const [city, setCity] = useState(userData?.city);
  const [state, setState] = useState(userData?.state);
  const [zipCode, setZipCode] = useState(userData?.zipCode);

  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateProfileMutation();

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

  const handleUpdateProfile = async () => {
    const payload = {
      name,
      number,
      addressLane1,
      addressLane2,
      city,
      zipCode,
      state,
    };
    // console.log("payload", payload);

    try {
      const response = await updateUserProfile({
        userId: userData?._id,
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
        <CustomHeader text="Edit Profile" />

        {/* main content */}
        {isLoading ? (
          <SafeAreaView className="flex-1 justify-center items-center bg-white">
            <ActivityIndicator size="large" color="#E2F2E5" />
          </SafeAreaView>
        ) : (
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
                  {userData?.userId}
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
                  Email
                </Text>

                <Text
                  style={{ fontFamily: "SourceSans3-SemiBold" }}
                  className="text-neutral-dark-active"
                >
                  {email}
                </Text>
              </View>

              {/* divider */}
              <View className="h-px bg-neutral-light-hover my-5" />

              {/* third row */}
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
                  placeholder="Name"
                  value={name}
                  onChangeText={setName}
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
                  placeholder="Phone Number"
                  value={number}
                  onChangeText={setNumber}
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
                  placeholder="Address Line 1"
                  value={addressLane1}
                  onChangeText={setAddressLane1}
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
                  placeholder="Address Line 2"
                  value={addressLane2}
                  onChangeText={setAddressLane2}
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
                    placeholder="City"
                    value={city}
                    onChangeText={setCity}
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
                    value={state}
                    onChange={(item) => setState(item.value)}
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
                  placeholder="Zip Code"
                  value={zipCode}
                  onChangeText={setZipCode}
                />
              </View>

              {/* edit */}
              <ButtonPrimary
                onPress={handleUpdateProfile}
                title="Save Change"
                isLoading={isLoading || isUpdating}
              />
            </View>
          </ScrollView>
        )}
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

export default EmployeeProfileEditScreen;
