import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Scanner from "../screens/Scanner";

const { Navigator, Screen } = createStackNavigator();

export function Routes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="Scanner" component={Scanner} />
    </Navigator>
  );
}
