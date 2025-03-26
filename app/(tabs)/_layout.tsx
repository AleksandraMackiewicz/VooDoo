// app/_layout.tsx
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Swipe" }} />
      <Stack.Screen name="MatchesScreen" options={{ title: "MatchesScreen" }} />
    </Stack>
  );
}