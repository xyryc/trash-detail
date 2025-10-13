import { Stack } from "expo-router";
import React from "react";

const EmployeeLayout = () => {
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
        name="profile/support/start"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="profile/support/chat/[id]"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="create/progress"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="profile/edit/[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default EmployeeLayout;
