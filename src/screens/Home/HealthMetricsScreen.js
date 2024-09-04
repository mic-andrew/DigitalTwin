import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import MetricCard from "../../components/MetricCard";
import { useHealth } from "../../context/Context";

const HealthMetricsScreen = () => {
  const [healthData, setHealthData] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newValue, setNewValue] = useState("");
  
  const { updateTrigger, triggerUpdate } = useHealth();

  useEffect(() => {
    loadHealthData();
  }, [updateTrigger]);

  const loadHealthData = async () => {
    try {
      const data = await AsyncStorage.getItem("healthData");
      if (data) {
        setHealthData(JSON.parse(data));
      }
    } catch (error) {
      console.error("Error loading health data:", error);
    }
  };

  const saveHealthData = async (updatedData) => {
    try {
      await AsyncStorage.setItem("healthData", JSON.stringify(updatedData));
      setHealthData(updatedData);
      triggerUpdate();
    } catch (error) {
      console.error("Error saving health data:", error);
    }
  };

  const handleMetricPress = (metric) => {
    setSelectedMetric(metric);
    setIsModalVisible(true);
    setNewValue(healthData[metric]?.toString() || "");
  };

  const handleSaveMetric = () => {
    if (!newValue.trim()) {
      Alert.alert("Error", "Please enter a valid value.");
      return;
    }

    let updatedData = { ...healthData };
    if (selectedMetric === "bloodPressure") {
      const [systolic, diastolic] = newValue.split("/");
      updatedData.bloodPressure = {
        systolic: parseInt(systolic),
        diastolic: parseInt(diastolic)
      };
    } else {
      updatedData[selectedMetric] = parseFloat(newValue);
    }

    saveHealthData(updatedData);
    setIsModalVisible(false);
  };

  const mockChartData = [
    { name: "Mon", value: 65 },
    { name: "Tue", value: 68 },
    { name: "Wed", value: 67 },
    { name: "Thu", value: 70 },
    { name: "Fri", value: 72 },
    { name: "Sat", value: 69 },
    { name: "Sun", value: 71 },
  ];

  const getMetricInfo = (metric) => {
    switch (metric) {
      case "heartRate":
        return { title: "Heart Rate", unit: "bpm", icon: "heart-outline", color: "#EF4444" };
      case "bloodPressure":
        return { title: "Blood Pressure", unit: "mmHg", icon: "water-outline", color: "#3B82F6" };
      case "respiratoryRate":
        return { title: "Respiratory Rate", unit: "bpm", icon: "pulse-outline", color: "#10B981" };
      case "weight":
        return { title: "Weight", unit: "kg", icon: "body-outline", color: "#F59E0B" };
      case "temperature":
        return { title: "Temperature", unit: "°C", icon: "thermometer-outline", color: "#6366F1" };
      default:
        return {};
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <Text className="text-2xl font-bold mb-6">Health Metrics</Text>
        {["heartRate", "bloodPressure", "respiratoryRate", "weight", "temperature"].map((metric) => {
          const { title, unit, icon, color } = getMetricInfo(metric);
          let value = healthData?.[metric] || "--";
          if (metric === "bloodPressure") {
            value = healthData?.bloodPressure ? `${healthData.bloodPressure.systolic}/${healthData.bloodPressure.diastolic}` : "--/--";
          }
          return (
            <TouchableOpacity key={metric} onPress={() => handleMetricPress(metric)}>
              <MetricCard
                title={title}
                value={`${value} ${unit}`}
                icon={<Icon name={icon} size={24} color={color} />}
                data={mockChartData}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-6 rounded-lg w-5/6">
            <Text className="text-xl font-bold mb-4">{getMetricInfo(selectedMetric)?.title}</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-2 mb-4"
              placeholder={`Enter new ${getMetricInfo(selectedMetric)?.title}`}
              value={newValue}
              onChangeText={setNewValue}
              keyboardType="numeric"
            />
            <TouchableOpacity
              className="bg-blue-500 py-2 rounded-lg mb-2"
              onPress={handleSaveMetric}
            >
              <Text className="text-white text-center font-semibold">Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gray-300 py-2 rounded-lg"
              onPress={() => setIsModalVisible(false)}
            >
              <Text className="text-center font-semibold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default HealthMetricsScreen;