import { Stack } from "expo-router";

export default function EmployeeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Employee Portal",
          headerStyle: { backgroundColor: "#10B981" },
          headerTintColor: "white",
        }}
      />
    </Stack>
  );
}
