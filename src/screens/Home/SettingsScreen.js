import React, { useState } from 'react';
import { View, Text, Switch, ScrollView } from 'react-native';

const SettingsScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <Text className="text-2xl font-bold mb-6">Settings</Text>
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg">Enable Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
          />
        </View>
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg">Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
          />
        </View>
        {/* Add more settings options here */}
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;