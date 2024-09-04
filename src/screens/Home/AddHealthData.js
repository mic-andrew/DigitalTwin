import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import InputField from "../../components/InputField";
import Toast from "react-native-toast-message";
import { useHealth } from "../../context/Context";

const AddHealthDataScreen = () => {
  const [heartRate, setHeartRate] = useState("");
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [respiratoryRate, setRespiratoryRate] = useState("");
  const [weight, setWeight] = useState("");
  const [temperature, setTemperature] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const { triggerUpdate } = useHealth();

  const saveHealthData = async () => {
    setLoading(true);
    const healthData = {
      heartRate: parseInt(heartRate),
      bloodPressure: {
        systolic: parseInt(systolic),
        diastolic: parseInt(diastolic),
      },
      respiratoryRate: parseInt(respiratoryRate),
      weight: parseFloat(weight),
      temperature: parseFloat(temperature),
    };

    try {
      // Simulate a 3-second delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      await AsyncStorage.setItem("healthData", JSON.stringify(healthData));

      // Trigger an update in the DashboardScreen
      triggerUpdate();

      Toast.show({
        type: "success",
        text1: "Health Data Saved",
        text2: "Your health data has been successfully saved.",
      });

      navigation.goBack();
    } catch (error) {
      console.error("Error saving health data:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to save health data. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-6 mt-8">
      <Text className="text-2xl font-bold mb-6">Add Your Health Data</Text>
      <View className="space-y-4">
        <InputField
          label="Heart Rate (bpm)"
          value={heartRate}
          onChangeText={setHeartRate}
          keyboardType="numeric"
        />
        <InputField
          label="Blood Pressure (Systolic)"
          value={systolic}
          onChangeText={setSystolic}
          keyboardType="numeric"
        />
        <InputField
          label="Blood Pressure (Diastolic)"
          value={diastolic}
          onChangeText={setDiastolic}
          keyboardType="numeric"
        />
        <InputField
          label="Respiratory Rate (bpm)"
          value={respiratoryRate}
          onChangeText={setRespiratoryRate}
          keyboardType="numeric"
        />
        <InputField
          label="Weight (kg)"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />
        <InputField
          label="Temperature (°C)"
          value={temperature}
          onChangeText={setTemperature}
          keyboardType="numeric"
        />
        <TouchableOpacity
          className={`bg-blue-500 py-3 rounded-lg mt-6 ${
            loading ? "opacity-50" : ""
          }`}
          onPress={saveHealthData}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-semibold">
              Save Health Data
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddHealthDataScreen;
