import { QueryClientProvider } from "@tanstack/react-query";
import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import { Stack } from "expo-router/stack";
import * as SplashScreen from "expo-splash-screen";
// import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

import "@/global.css";

import { useRestoreSession } from "@/features/auth/hooks/use-restore-session";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { queryClient } from "@/infrastructure/query/query-client";

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const status = useAuthStore((state) => state.status);
  useRestoreSession();

  if (status !== "hydrating") void SplashScreen.hideAsync();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        {/* <StatusBar animated style="auto" /> */}
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(app)" />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
