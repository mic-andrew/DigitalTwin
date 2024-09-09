import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Modal,
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
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTest, setActiveTest] = useState(null);
  const [testResults, setTestResults] = useState({});
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

  const performTest = (testName) => {
    setActiveTest(testName);
    setModalVisible(true);
    // Simulate API call
    setTimeout(() => {
      const result = Math.random() < 0.5 ? "Positive" : "Negative";
      setTestResults(prev => ({ ...prev, [testName]: result }));
      setModalVisible(false);
    }, 3000);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  const healthTests = [
    { name: "Malaria", icon: "bug-outline", onPress: () => performTest("Malaria") },
    { name: "Typhoid", icon: "thermometer-outline", onPress: () => performTest("Typhoid") },
    { name: "Diabetes", icon: "water-outline", onPress: () => navigation.navigate("DiabetesTest") },
  ];

  return (
    <ScrollView 
      className="flex-1 bg-gray-50"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="p-6">
        <Text className="text-2xl font-bold my-8">Your Health Dashboard</Text>
        
        {healthData && (
          <View>
            {/* Health Overview */}
            <View className="bg-white rounded-lg p-4 mb-6 shadow">
              <Text className="text-lg font-semibold mb-2">Health Overview</Text>
              <View className="flex-row justify-between items-center">
                <Text>Overall Health Status:</Text>
                <View className="px-3 py-1 rounded-full bg-green-100">
                  <Text className="text-green-800 font-semibold">Good</Text>
                </View>
              </View>
            </View>

            {/* Quick Stats */}
            <View className="flex-row justify-between mb-6">
              <QuickStat title="Heart Rate" value={`${healthData.heartRate} bpm`} icon="heart-outline" color="#EF4444" />
              <QuickStat title="Blood Pressure" value={`${healthData.bloodPressure.systolic}/${healthData.bloodPressure.diastolic}`} icon="water-outline" color="#3B82F6" />
              <QuickStat title="Temperature" value={`${healthData.temperature}°C`} icon="thermometer-outline" color="#6366F1" />
            </View>
          </View>
        )}

        {/* Health Tests Section */}
        <View className="mb-6">
          <Text className="text-xl font-bold mb-4">Take Tests</Text>
          <View className="flex-row flex-wrap justify-between">
            {healthTests.map((test) => (
              <TouchableOpacity
                key={test.name}
                className="bg-white rounded-lg p-4 mb-4 shadow w-[48%]"
                onPress={test.onPress}
              >
                <Icon name={test.icon} size={24} color="#3B82F6" />
                <Text className="mt-2 font-semibold">{test.name}</Text>
                <Text className="text-sm text-gray-500">Tap to test</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Test Results Section */}
        {Object.keys(testResults).length > 0 && (
          <View className="mb-6">
            <Text className="text-xl font-bold mb-4">Test Results</Text>
            {Object.entries(testResults).map(([testName, result]) => (
              <View key={testName} className="bg-white rounded-lg p-4 mb-4 shadow">
                <Text className="font-semibold">{testName}</Text>
                <Text className={result === "Positive" ? "text-red-500" : "text-green-500"}>
                  Result: {result}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Actions */}
        <TouchableOpacity 
          className="bg-blue-500 py-4 px-4 rounded-lg flex-1 mr-2"
          onPress={navigateToAddData}
        >
          <Text className="text-white text-center font-semibold">Update Health Data</Text>
        </TouchableOpacity>
      </View>

      {/* Test Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white rounded-lg p-6 w-4/5">
            <Text className="text-xl font-bold mb-4">Performing {activeTest} Test</Text>
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text className="mt-4 text-center">Please wait while we process your test...</Text>
          </View>
        </View>
      </Modal>
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