import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Reading from "../screens/Reading";

const { Navigator, Screen } = createStackNavigator();

export function Routes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="Reading" component={Reading} />
    </Navigator>
  );
}
