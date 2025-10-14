import ButtonSecondary from "@/components/shared/ButtonSecondary";
import CustomHeader from "@/components/shared/CustomHeader";
import { useGetUserByIdQuery } from "@/store/slices/adminApiSlice";
import { Octicons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AdminDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { data, isLoading, refetch } = useGetUserByIdQuery(id);
  const adminData = data?.data;

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  // console.log(adminData?.role);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="flex-1 px-6">
        {/* header */}
        <CustomHeader text="Admin Profile" />

        {/* main content */}
        {isLoading ? (
          <View className="flex-1 justify-center">
            <ActivityIndicator size="small" color="#386b45" />
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
                  Role
                </Text>
                <Text
                  style={{ fontFamily: "SourceSans3-SemiBold" }}
                  className="text-neutral-dark-active capitalize"
                >
                  {adminData?.role === "superadmin"
                    ? "Super Admin"
                    : adminData?.role}
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
                  Email
                </Text>
                <Text
                  style={{ fontFamily: "SourceSans3-SemiBold" }}
                  className="text-neutral-dark-active"
                >
                  {adminData.email}
                </Text>
              </View>

              {/* divider */}
              <View className="h-px bg-neutral-light-hover my-5" />

              {/* third row */}
              <View className="mb-5">
                <Text
                  style={{ fontFamily: "SourceSans3-Regular" }}
                  className="text-neutral-normal mb-2"
                >
                  Password
                </Text>
                <Text
                  style={{ fontFamily: "SourceSans3-SemiBold" }}
                  className="text-neutral-dark-active"
                >
                  {adminData?.password}
                </Text>
              </View>

              {/* edit */}
              <ButtonSecondary
                onPress={() => {
                  router.push(
                    `/(admin)/settings/admin/details/edit/${adminData._id}`
                  );
                }}
                title="Edit"
                icon={<Octicons name="pencil" size={24} color="#2E323C" />}
              />
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AdminDetails;
