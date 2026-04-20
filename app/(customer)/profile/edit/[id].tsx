import ButtonPrimary from "@/components/shared/ButtonPrimary";
import CustomHeader from "@/components/shared/CustomHeader";
import { useGetLoggedInUserDataQuery } from "@/store/slices/authApiSlice";
import { useUpdateProfileMutation } from "@/store/slices/customerApiSlice";
import { toast } from "@baronha/ting";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CustomerProfileEditScreen = () => {
  const router = useRouter();

  const { data, isLoading } = useGetLoggedInUserDataQuery();
  const userData = data?.data;
  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateProfileMutation();

  const [email, setEmail] = useState(userData?.email);
  const [stateValue, setStateValue] = useState(userData?.state || "");
  const [name, setName] = useState(userData?.name);
  const [number, setNumber] = useState(userData?.number);
  const [addressLane1, setAddressLane1] = useState(userData?.addressLane1);
  const [addressLane2, setAddressLane2] = useState(userData?.addressLane2);
  const [city, setCity] = useState(userData?.city);
  const [zipCode, setZipCode] = useState(userData?.zipCode);
  const [isLocating, setIsLocating] = useState(false);

  const handleUpdateProfile = async () => {
    const payload = {
      name,
      email,
      number,
      addressLane1,
      addressLane2,
      city,
      zipCode,
      state: stateValue || null,
    };

    try {
      const response = await updateUserProfile({
        userId: userData?._id,
        payload,
      }).unwrap();

      if (response.success) {
        toast({
          title: "Success",
          message: "Profile updated successfully",
          preset: "done",
          haptic: "success",
          backgroundColor: "#1F2937",
          titleColor: "#FFFFFF",
          messageColor: "#E5E7EB",
        });
        router.back();
      }
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        message: error.data?.message || "Failed to update profile",
        preset: "error",
        haptic: "error",
        backgroundColor: "#1F2937",
        titleColor: "#FFFFFF",
        messageColor: "#E5E7EB",
      });
    }
  };

  const handleLocateMe = useCallback(async () => {
    try {
      if (isLocating) return;
      setIsLocating(true);

      const permission =
        await Location.requestForegroundPermissionsAsync();
      if (permission.status !== "granted") {
        toast({
          title: "Permission required",
          message: "Enable location access to autofill your address.",
          preset: "error",
          haptic: "error",
          backgroundColor: "#1F2937",
          titleColor: "#FFFFFF",
          messageColor: "#E5E7EB",
        });
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const [place] = await Location.reverseGeocodeAsync({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      if (!place) {
        toast({
          title: "Error",
          message: "Couldn't find an address for your location.",
          preset: "error",
          haptic: "error",
          backgroundColor: "#1F2937",
          titleColor: "#FFFFFF",
          messageColor: "#E5E7EB",
        });
        return;
      }

      const line1 = [place.streetNumber, place.street]
        .filter(Boolean)
        .join(" ")
        .trim();

      if (line1) setAddressLane1(line1);
      else if (place.name) setAddressLane1(place.name);

      if (place.city) setCity(place.city);
      else if (place.subregion) setCity(place.subregion);

      if (place.postalCode) setZipCode(place.postalCode);

      if (place.region) setStateValue(place.region);
    } catch (error) {
      console.error("Locate me error:", error);
      toast({
        title: "Error",
        message: "Couldn't get your current location.",
        preset: "error",
        haptic: "error",
        backgroundColor: "#1F2937",
        titleColor: "#FFFFFF",
        messageColor: "#E5E7EB",
      });
    } finally {
      setIsLocating(false);
    }
  }, [isLocating]);

  // console.log("customer profile", userData, id);

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="flex-1 px-6">
        {/* header */}
        <CustomHeader text="Edit Profile" />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
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
                  Name
                </Text>
                <TextInput
                  style={{ fontFamily: "SourceSans3-Medium" }}
                  className="border border-neutral-light-active p-3 rounded-lg focus:border-neutral-darker text-neutral-dark"
                  value={name}
                  onChangeText={setName}
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
                  value={email}
                  onChangeText={setEmail}
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
                  value={number}
                  onChangeText={setNumber}
                />
              </View>

              {/* divider */}
              <View className="h-px bg-neutral-light-hover my-5" />

              {/* fifth row */}
              <View>
                <View className="flex-row items-center justify-between mb-2">
                  <Text
                    style={{ fontFamily: "SourceSans3-Medium" }}
                    className="text-neutral-normal"
                  >
                    Address Line 1
                  </Text>

                  <TouchableOpacity
                    onPress={handleLocateMe}
                    disabled={isLocating}
                    accessibilityRole="button"
                    accessibilityLabel="Locate me"
                    className="flex-row items-center gap-1"
                  >
                    {isLocating ? (
                      <ActivityIndicator size="small" color="#386B45" />
                    ) : (
                      <MaterialIcons
                        name="my-location"
                        size={20}
                        color="black"
                      />
                    )}
                    <Text
                      style={{ fontFamily: "SourceSans3-Medium" }}
                      className="text-neutral-dark"
                    >
                      Locate me
                    </Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={{ fontFamily: "SourceSans3-Medium" }}
                  className="border border-neutral-light-active p-3 rounded-lg focus:border-neutral-darker text-neutral-dark"
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
                  <TextInput
                    style={{ fontFamily: "SourceSans3-Medium" }}
                    className="border border-neutral-light-active p-3 rounded-lg focus:border-neutral-darker text-neutral-dark"
                    placeholder="State"
                    value={stateValue}
                    onChangeText={setStateValue}
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
                  value={zipCode}
                  onChangeText={setZipCode}
                />
              </View>

              {/* edit */}
              <ButtonPrimary
                onPress={handleUpdateProfile}
                title="Save Changes"
                isLoading={isLoading || isUpdating}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default CustomerProfileEditScreen;
