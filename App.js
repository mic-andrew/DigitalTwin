import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/auth/LoginScreen";
import SignupScreen from "./src/screens/auth/SignupScreen";
import Toast from "react-native-toast-message";
import BottomTab from "./src/screens/Home/BottomTab";
import AddHealthDataScreen from "./src/screens/Home/AddHealthData";
import { HealthProvider } from "./src/context/Context";
import SettingsScreen from "./src/screens/Home/SettingsScreen";
import HelpSupportScreen from "./src/screens/Home/HelpSupportScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <HealthProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Main" component={BottomTab} />
          <Stack.Screen name="AddHealthData" component={AddHealthDataScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </HealthProvider>
  );
}
