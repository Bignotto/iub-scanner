import React from "react";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";

import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/routes";

import {
  useFonts,
  Inconsolata_400Regular,
  Inconsolata_500Medium,
  Inconsolata_700Bold,
} from "@expo-google-fonts/inconsolata";

import theme from "./src/global/styles/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inconsolata_400Regular,
    Inconsolata_500Medium,
    Inconsolata_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Routes />
      </NavigationContainer>
    </ThemeProvider>
  );
}
