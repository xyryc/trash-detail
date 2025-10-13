import { Stack } from "expo-router";
import React from "react";

const CustomerLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default CustomerLayout;
