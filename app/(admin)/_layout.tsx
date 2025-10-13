import { Stack } from "expo-router";
import React from "react";

const AdminLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* other screens */}
      <Stack.Screen
        name="problem/details/[id]"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="problem/details/edit/[id]"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="chatlist/thread/[type]/[id]"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="chatlist/[chat]/[id]"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="settings/invitation/[id]"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="settings/customer/details/[id]"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="settings/employee/details/[id]"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="settings/admin/details/[id]"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="settings/customer/details/edit/[id]"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="settings/employee/details/edit/[id]"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="settings/admin/details/edit/[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default AdminLayout;
