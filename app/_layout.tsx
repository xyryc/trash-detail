import { useColorScheme } from "@/hooks/useColorScheme";
import { store } from "@/store/store";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";
import "./global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    "SourceSans3-Regular": require("@/assets/fonts/SourceSans3-Regular.ttf"),
    "SourceSans3-Medium": require("@/assets/fonts/SourceSans3-Medium.ttf"),
    "SourceSans3-SemiBold": require("@/assets/fonts/SourceSans3-SemiBold.ttf"),
    "SourceSans3-Bold": require("@/assets/fonts/SourceSans3-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(admin)" />
          <Stack.Screen name="(employee)" />
          <Stack.Screen name="(customer)" />
        </Stack>

        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}
