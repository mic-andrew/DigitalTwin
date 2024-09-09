import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import DashboardScreen from "./DashboardScreen";
import NotificationsScreen from "./NotificationsScreen";
import HealthMetricsScreen from "./HealthMetricsScreen";
import ProfileScreen from "./ProfileScreen";
import ResultsScreen from "./ResultsScreen";

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Health Metrics") {
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          } else if (route.name === "Notifications") {
            iconName = focused ? "notifications" : "notifications-outline";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#3B82F6",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
        },
      })}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="Dashboard"
        component={DashboardScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={ProfileScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Health Metrics"
        component={HealthMetricsScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Notifications"
        component={NotificationsScreen}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Results"
        component={ResultsScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
