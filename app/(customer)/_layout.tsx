import { Stack } from "expo-router";

export default function CustomerLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "ReadCircle",
          headerStyle: { backgroundColor: "#3B82F6" },
          headerTintColor: "white",
        }}
      />
    </Stack>
  );
}
