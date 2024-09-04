import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert, RefreshControl } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);

  const loadNotifications = useCallback(async () => {
    try {
      const storedNotifications = await AsyncStorage.getItem("notifications");
      if (storedNotifications) {
        setNotifications(JSON.parse(storedNotifications));
      } else {
        // If no stored notifications, use default ones
        const defaultNotifications = [
          {
            id: 1,
            type: "appointment",
            message: "Upcoming appointment with Dr. Smith tomorrow at 2 PM",
            time: "1 hour ago",
            read: false,
            action: "View Details",
          },
          {
            id: 2,
            type: "medication",
            message: "Remember to take your evening medication",
            time: "3 hours ago",
            read: false,
            action: "Mark as Taken",
          },
          {
            id: 3,
            type: "health",
            message: "Your heart rate was higher than usual today",
            time: "5 hours ago",
            read: false,
            action: "View Report",
          },
        ];
        setNotifications(defaultNotifications);
        await AsyncStorage.setItem("notifications", JSON.stringify(defaultNotifications));
      }
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  useFocusEffect(
    useCallback(() => {
      loadNotifications();
    }, [loadNotifications])
  );

  const saveNotifications = async (updatedNotifications) => {
    try {
      await AsyncStorage.setItem("notifications", JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error("Error saving notifications:", error);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "appointment":
        return <Icon name="calendar-outline" size={24} color="#3B82F6" />;
      case "medication":
        return <Icon name="medical-outline" size={24} color="#10B981" />;
      case "health":
        return <Icon name="fitness-outline" size={24} color="#EF4444" />;
      default:
        return <Icon name="notifications-outline" size={24} color="#6B7280" />;
    }
  };

  const handleNotificationPress = (id) => {
    const updatedNotifications = notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    );
    setNotifications(updatedNotifications);
    saveNotifications(updatedNotifications);
  };

  const handleDismiss = (id) => {
    Alert.alert(
      "Dismiss Notification",
      "Are you sure you want to dismiss this notification?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Dismiss", 
          onPress: () => {
            const updatedNotifications = notifications.filter(notif => notif.id !== id);
            setNotifications(updatedNotifications);
            saveNotifications(updatedNotifications);
          }
        }
      ]
    );
  };

  const handleAction = (id, action) => {
    // Here you would typically navigate to the appropriate screen or perform an action
    Alert.alert("Action", `Performing action: ${action}`);
    handleNotificationPress(id);
  };

  const handleMarkAllRead = () => {
    const updatedNotifications = notifications.map(notif => ({ ...notif, read: true }));
    setNotifications(updatedNotifications);
    saveNotifications(updatedNotifications);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadNotifications();
    setRefreshing(false);
  }, [loadNotifications]);

  const filteredNotifications = notifications.filter(notif => {
    if (filter === "all") return true;
    if (filter === "unread") return !notif.read;
    return notif.type === filter;
  });

  const groupedNotifications = filteredNotifications.reduce((groups, notif) => {
    const date = new Date(notif.time);
    const dateString = date.toDateString();
    if (!groups[dateString]) {
      groups[dateString] = [];
    }
    groups[dateString].push(notif);
    return groups;
  }, {});

  return (
    <ScrollView 
      className="flex-1 bg-gray-50"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="p-6">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold">Notifications</Text>
          <TouchableOpacity onPress={handleMarkAllRead}>
            <Text className="text-blue-500 font-semibold">Mark All as Read</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between mb-4">
          <TouchableOpacity onPress={() => setFilter("all")}>
            <Text className={`font-semibold ${filter === "all" ? "text-blue-500" : "text-gray-500"}`}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilter("unread")}>
            <Text className={`font-semibold ${filter === "unread" ? "text-blue-500" : "text-gray-500"}`}>Unread</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilter("appointment")}>
            <Text className={`font-semibold ${filter === "appointment" ? "text-blue-500" : "text-gray-500"}`}>Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilter("medication")}>
            <Text className={`font-semibold ${filter === "medication" ? "text-blue-500" : "text-gray-500"}`}>Medication</Text>
          </TouchableOpacity>
        </View>
        {Object.entries(groupedNotifications).map(([date, notifs]) => (
          <View key={date}>
            <Text className="text-gray-500 font-semibold mt-4 mb-2">{date}</Text>
            {notifs.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                className={`bg-white rounded-lg p-4 mb-4 shadow ${notification.read ? "opacity-50" : ""}`}
                onPress={() => handleNotificationPress(notification.id)}
              >
                <View className="flex-row items-center justify-between mb-2">
                  <View className="flex-row items-center">
                    {getIcon(notification.type)}
                    <Text className="font-semibold ml-2">
                      {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => handleDismiss(notification.id)}>
                    <Icon name="close-outline" size={24} color="#6B7280" />
                  </TouchableOpacity>
                </View>
                <Text className="text-gray-700 mb-2">{notification.message}</Text>
                <Text className="text-gray-500 text-sm mb-2">{notification.time}</Text>
                {notification.action && (
                  <TouchableOpacity 
                    className="bg-blue-500 py-2 px-4 rounded-lg self-start"
                    onPress={() => handleAction(notification.id, notification.action)}
                  >
                    <Text className="text-white font-semibold">{notification.action}</Text>
                  </TouchableOpacity>
                )}
                {!notification.read && (
                  <View className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default NotificationsScreen;