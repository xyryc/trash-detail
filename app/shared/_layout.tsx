import { Stack } from "expo-router";
import React from "react";

const SharedLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="notification" options={{ headerShown: false }} />
    </Stack>
  );
};

export default SharedLayout;
