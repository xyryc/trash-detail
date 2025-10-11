// Notification.tsx
import CustomHeader from "@/components/shared/CustomHeader";
import NotificationCard from "@/components/shared/NotificationCard";
import {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
} from "@/store/slices/notificationApiSlice";
import { useState } from "react";
import { FlatList, RefreshControl, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Notification = () => {
  const {
    data: notifications,
    isLoading,
    refetch,
  } = useGetNotificationsQuery({});

  const [markAsRead] = useMarkAsReadMutation();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleNotificationPress = async (
    notificationId: string,
    isRead: boolean
  ) => {
    if (!isRead) {
      try {
        await markAsRead({ notificationId }).unwrap();
        // Force refetch immediately to update UI
        await refetch();
      } catch (error) {
        console.error("Failed to mark as read:", error);
      }
    }
  };

  const renderItem = ({ item }: any) => (
    <NotificationCard
      notification={item}
      className={item.read ? "" : "bg-neutral-light"}
      onPress={() => {
        console.log(item?._id);
        handleNotificationPress(item?._id, item.read);
      }}
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
            colors={["#10b981"]}
            tintColor="#10b981"
          />
        }
      />
    </SafeAreaView>
  );
};

export default Notification;
