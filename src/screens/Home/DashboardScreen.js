import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { useHealth } from "../../context/Context";
import PropTypes from "prop-types";

const DashboardScreen = () => {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const { updateTrigger } = useHealth();

  const loadHealthData = async () => {
    try {
      const data = await AsyncStorage.getItem("healthData");
      if (data) {
        setHealthData(JSON.parse(data));
      }
      setLoading(false);
    } catch (error) {
      console.error("Error loading health data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHealthData();
  }, [updateTrigger]);

  useFocusEffect(
    React.useCallback(() => {
      loadHealthData();
    }, [])
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadHealthData().then(() => setRefreshing(false));
  }, []);

  const navigateToAddData = () => {
    navigation.navigate("AddHealthData");
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (!healthData) {
    return (
      <View className="flex-1 justify-center items-center p-6">
        <Text className="text-2xl font-bold mb-4 text-center">
          Welcome to Your Health Dashboard
        </Text>
          <Text className="text-lg mb-8 text-center text-gray-600">
          Let&apos;s get started by adding your health data
        </Text>
        <TouchableOpacity
          className="bg-blue-500 py-3 px-6 rounded-lg"
          onPress={navigateToAddData}
        >
          <Text className="text-white text-center font-semibold">
            Add Health Data
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const getHealthStatus = () => {
    // This is a simple example. You'd want to implement more sophisticated logic based on health guidelines.
    const heartRateNormal = healthData.heartRate >= 60 && healthData.heartRate <= 100;
    const bpNormal = healthData.bloodPressure.systolic < 120 && healthData.bloodPressure.diastolic < 80;
    const tempNormal = healthData.temperature >= 36.1 && healthData.temperature <= 37.2;

    if (heartRateNormal && bpNormal && tempNormal) {
      return { status: "Good", color: "#10B981" };
    } else if (!heartRateNormal && !bpNormal && !tempNormal) {
      return { status: "Needs Attention", color: "#EF4444" };
    } else {
      return { status: "Fair", color: "#F59E0B" };
    }
  };

  const healthStatus = getHealthStatus();

  const healthTips = [
    "Stay hydrated! Aim for 8 glasses of water a day.",
    "Take a 10-minute walk to boost your mood and energy.",
    "Practice deep breathing for 5 minutes to reduce stress.",
    "Eat a rainbow of fruits and vegetables for optimal nutrition.",
    "Get 7-9 hours of sleep for better overall health.",
  ];

  const todaysTip = healthTips[Math.floor(Math.random() * healthTips.length)];

  return (
    <ScrollView 
      className="flex-1 bg-gray-50"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="p-6">
        <Text className="text-2xl font-bold my-8">Your Health Dashboard</Text>
        
        {/* Health Overview */}
        <View className="bg-white rounded-lg p-4 mb-6 shadow">
          <Text className="text-lg font-semibold mb-2">Health Overview</Text>
          <View className="flex-row justify-between items-center">
            <Text>Overall Health Status:</Text>
            <View className={`px-3 py-1 rounded-full bg-${healthStatus.color}-100`}>
              <Text className={`text-${healthStatus.color}-800 font-semibold`}>{healthStatus.status}</Text>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View className="flex-row justify-between mb-6">
          <QuickStat title="Heart Rate" value={`${healthData.heartRate} bpm`} icon="heart-outline" color="#EF4444" />
          <QuickStat title="Blood Pressure" value={`${healthData.bloodPressure.systolic}/${healthData.bloodPressure.diastolic}`} icon="water-outline" color="#3B82F6" />
          <QuickStat title="Temperature" value={`${healthData.temperature}°C`} icon="thermometer-outline" color="#6366F1" />
        </View>

        {/* Daily Insight */}
        <View className="bg-blue-50 rounded-lg p-4 mb-6">
          <Text className="text-lg font-semibold mb-2">Daily Health Tip</Text>
          <Text>{todaysTip}</Text>
        </View>

        {/* Actions */}
        <View className="flex-row justify-between mb-6">
          {/* <TouchableOpacity 
            className="bg-blue-500 py-2 px-4 rounded-lg flex-1 mr-2"
            onPress={() => navigation.navigate("HealthMetrics")}
          >
            <Text className="text-white text-center font-semibold">View Detailed Metrics</Text>
          </TouchableOpacity> */}
          <TouchableOpacity 
            className="bg-blue-500 py-4 px-4 rounded-lg flex-1 mr-2"
            onPress={navigateToAddData}
          >
            <Text className="text-white text-center font-semibold">Update Health Data</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const QuickStat = ({ title, value, icon, color }) => (
  <View className="bg-white rounded-lg p-3 shadow flex-1 mx-1 items-center">
    <Icon name={icon} size={24} color={color} />
    <Text className="text-xs mt-1">{title}</Text>
    <Text className="font-semibold">{value}</Text>
  </View>
);

QuickStat.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
};

export default DashboardScreen;