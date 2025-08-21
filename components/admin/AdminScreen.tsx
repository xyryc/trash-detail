import { useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import AdminCard from "./AdminCard";

export const AdminScreen = ({ activeScreen, adminData }: any) => {
  const superAdmins = useMemo(() => {
    return adminData.filter((admin: any) => admin.role === "super");
  }, [adminData]);

  const regularAdmins = useMemo(() => {
    return adminData.filter((admin: any) => admin.role === "admin");
  }, [adminData]);

  return (
    <ScrollView
      className="flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* Super Admins Section */}
      {superAdmins.length > 0 && (
        <>
          <Text
            className="text-lg px-6"
            style={{ fontFamily: "SourceSans3-Regular" }}
          >
            Super Admins ({superAdmins.length})
          </Text>

          {superAdmins.map((item: any, index: string) => (
            <AdminCard
              key={`super-${item.id}-${index}`}
              activeScreen={activeScreen}
              item={item}
            />
          ))}
        </>
      )}

      {/* Regular Admins Section */}
      {regularAdmins.length > 0 && (
        <>
          <Text
            className="text-lg px-6 mt-6"
            style={{ fontFamily: "SourceSans3-Regular" }}
          >
            Admins ({regularAdmins.length})
          </Text>

          {regularAdmins.map((item: any, index: string) => (
            <AdminCard
              key={`admin-${item.id}-${index}`}
              activeScreen={activeScreen}
              item={item}
            />
          ))}
        </>
      )}

      {/* Empty State */}
      {superAdmins.length === 0 && regularAdmins.length === 0 && (
        <View className="flex-1 justify-center items-center py-20">
          <Text className="text-gray-500 text-lg">No admins found</Text>
        </View>
      )}
    </ScrollView>
  );
};
