import { Stack } from "expo-router";
import React from "react";

const CustomerLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* other screens */}
      <Stack.Screen name="profile/edit/[id]" options={{ headerShown: false }} />

      <Stack.Screen
        name="chatlist/[chat]/[id]"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default CustomerLayout;
