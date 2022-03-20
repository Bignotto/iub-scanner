import React from "react";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";

import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/routes";

import {
  useFonts as useInconsolata,
  Inconsolata_400Regular,
  Inconsolata_500Medium,
  Inconsolata_700Bold,
} from "@expo-google-fonts/inconsolata";

import {
  useFonts as useRoboto,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
} from "@expo-google-fonts/roboto";

import theme from "./src/global/styles/theme";
import { ScanProvider } from "./src/hooks/scan";

export default function App() {
  const [inconsolataFont] = useInconsolata({
    Inconsolata_400Regular,
    Inconsolata_500Medium,
    Inconsolata_700Bold,
  });

  const [robotoFont] = useRoboto({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black,
  });

  if (!inconsolataFont || !robotoFont) {
    return <AppLoading />;
  }
  return (
    <ThemeProvider theme={theme}>
      <ScanProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Routes />
        </NavigationContainer>
      </ScanProvider>
    </ThemeProvider>
  );
}
