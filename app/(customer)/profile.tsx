import ButtonSecondary from "@/components/shared/ButtonSecondary";
import CustomHeader from "@/components/shared/CustomHeader";
import {
  useGetLoggedInUserDataQuery,
  useLogoutMutation,
} from "@/store/slices/authApiSlice";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CustomerProfile = () => {
  const router = useRouter();
  const { data, isLoading } = useGetLoggedInUserDataQuery();
  const userData = data?.data;

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout().unwrap();
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="flex-1 px-6">
        {/* header */}
        <CustomHeader text="Profile" />

        {/* main content */}
        {isLoading ? (
          <View className="flex-1 justify-center">
            <ActivityIndicator size="large" color="#386B45" />
          </View>
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
                  style={{ fontFamily: "SourceSans3-Regular" }}
                  className="text-neutral-normal mb-2"
                >
                  Name
                </Text>
                <Text
                  style={{ fontFamily: "SourceSans3-SemiBold" }}
                  className="text-neutral-dark-active"
                >
                  {userData?.name}
                </Text>
              </View>

              {/* divider */}
              <View className="h-px bg-neutral-light-hover my-5" />

              {/* third row */}
              <View>
                <Text
                  style={{ fontFamily: "SourceSans3-Regular" }}
                  className="text-neutral-normal mb-2"
                >
                  Email
                </Text>
                <Text
                  style={{ fontFamily: "SourceSans3-SemiBold" }}
                  className="text-neutral-dark-active"
                >
                  {userData?.email}
                </Text>
              </View>

              {/* divider */}
              <View className="h-px bg-neutral-light-hover my-5" />

              {/* fourth row */}
              <View>
                <Text
                  style={{ fontFamily: "SourceSans3-Regular" }}
                  className="text-neutral-normal mb-2"
                >
                  Number
                </Text>
                {userData?.number ? (
                  <Text
                    style={{ fontFamily: "SourceSans3-SemiBold" }}
                    className="text-neutral-dark-active"
                  >
                    {userData?.number}
                  </Text>
                ) : (
                  <Text
                    style={{ fontFamily: "SourceSans3-SemiBold" }}
                    className="text-neutral-dark-active"
                  >
                    - - -
                  </Text>
                )}
              </View>

              {/* divider */}
              <View className="h-px bg-neutral-light-hover my-5" />

              {/* fifth row */}
              <View>
                <Text
                  style={{ fontFamily: "SourceSans3-Regular" }}
                  className="text-neutral-normal mb-2"
                >
                  Address Line 1
                </Text>

                {userData?.addressLane1 ? (
                  <Text
                    style={{ fontFamily: "SourceSans3-SemiBold" }}
                    className="text-neutral-dark-active"
                  >
                    {userData?.addressLane1}
                  </Text>
                ) : (
                  <Text
                    style={{ fontFamily: "SourceSans3-SemiBold" }}
                    className="text-neutral-dark-active"
                  >
                    - - -
                  </Text>
                )}
              </View>

              {/* divider */}
              <View className="h-px bg-neutral-light-hover my-5" />

              {/* sixth row */}
              <View>
                <View className="flex-row gap-1">
                  <Text
                    style={{ fontFamily: "SourceSans3-Regular" }}
                    className="text-neutral-normal mb-2"
                  >
                    Address Line 2
                  </Text>

                  <Text
                    style={{ fontFamily: "SourceSans3-Regular" }}
                    className="text-neutral-normal mb-2"
                  >
                    (optional)
                  </Text>
                </View>
                {userData?.addressLane2 ? (
                  <Text
                    style={{ fontFamily: "SourceSans3-SemiBold" }}
                    className="text-neutral-dark-active"
                  >
                    {userData?.addressLane2}
                  </Text>
                ) : (
                  <Text
                    style={{ fontFamily: "SourceSans3-SemiBold" }}
                    className="text-neutral-dark-active"
                  >
                    - - -
                  </Text>
                )}
              </View>

              {/* divider */}
              <View className="h-px bg-neutral-light-hover my-5" />

              {/* seventh row */}
              <View className="mb-5 flex-row justify-between pr-6">
                {/* city */}
                <View>
                  <Text
                    style={{ fontFamily: "SourceSans3-Regular" }}
                    className="text-neutral-normal mb-2"
                  >
                    City
                  </Text>
                  {userData?.city ? (
                    <Text
                      style={{ fontFamily: "SourceSans3-SemiBold" }}
                      className="text-neutral-dark-active"
                    >
                      {userData?.city}
                    </Text>
                  ) : (
                    <Text
                      style={{ fontFamily: "SourceSans3-SemiBold" }}
                      className="text-neutral-dark-active"
                    >
                      - - -
                    </Text>
                  )}
                </View>

                {/* state */}
                <View>
                  <Text
                    style={{ fontFamily: "SourceSans3-Regular" }}
                    className="text-neutral-normal mb-2"
                  >
                    State
                  </Text>
                  {userData?.state ? (
                    <Text
                      style={{ fontFamily: "SourceSans3-SemiBold" }}
                      className="text-neutral-dark-active"
                    >
                      {userData?.state}
                    </Text>
                  ) : (
                    <Text
                      style={{ fontFamily: "SourceSans3-SemiBold" }}
                      className="text-neutral-dark-active"
                    >
                      - - -
                    </Text>
                  )}
                </View>

                {/* zip code */}
                <View>
                  <Text
                    style={{ fontFamily: "SourceSans3-Regular" }}
                    className="text-neutral-normal mb-2"
                  >
                    ZIP Code
                  </Text>

                  {userData?.zipCode ? (
                    <Text
                      style={{ fontFamily: "SourceSans3-SemiBold" }}
                      className="text-neutral-dark-active"
                    >
                      {userData?.zipCode}
                    </Text>
                  ) : (
                    <Text
                      style={{ fontFamily: "SourceSans3-SemiBold" }}
                      className="text-neutral-dark-active"
                    >
                      - - -
                    </Text>
                  )}
                </View>
              </View>

              {/* edit */}
              <ButtonSecondary
                onPress={() => {
                  router.push(`/customer/profile/edit/${userData?._id}`);
                }}
                title="Edit"
                icon={<Octicons name="pencil" size={24} color="#2E323C" />}
              />
            </View>

            {/* logout */}
            <View className="mt-3">
              <ButtonSecondary
                title="Logout"
                onPress={handleLogout}
                icon={<MaterialIcons name="logout" size={24} color="black" />}
              />
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CustomerProfile;
