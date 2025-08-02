import { Link, Stack } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { theme } from "../../theme";

export default function CounterLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "counter",
          headerRight: () => (
            <Link href={"/counter/history"} asChild>
              <Pressable hitSlop={50}>
                <MaterialIcons
                  name="history"
                  size={24}
                  color={theme.colorGrey}
                />
              </Pressable>
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
