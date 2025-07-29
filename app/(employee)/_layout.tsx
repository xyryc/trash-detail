import { Tabs } from "expo-router";
import React from "react";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="problem" />
      <Tabs.Screen name="create" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};

export default TabLayout;
