import CustomHeader from "@/components/shared/CustomHeader";
import NotificationCard from "@/components/shared/NotificationCard";
import { useGetNotificationsQuery } from "@/store/slices/notificationApiSlice";
import { useState } from "react";
import { FlatList, RefreshControl, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Notification = () => {
  const {
    data: notifications,
    isLoading,
    refetch,
  } = useGetNotificationsQuery({});
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderItem = ({ item }: any) => (
    <NotificationCard
      notification={item}
      className={item.read ? "" : "bg-neutral-light"}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View className="px-6">
        <CustomHeader text="Notification" />
      </View>

      <FlatList
        data={notifications?.data || []}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          <Text className="text-center mt-4 text-gray-500">
            {isLoading ? "Loading..." : "No notifications"}
          </Text>
        }
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#10b981"]} // Android
            tintColor="#10b981" // iOS
          />
        }
      />
    </SafeAreaView>
  );
};

export default Notification;
