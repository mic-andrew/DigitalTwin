    import React, { useState } from 'react';
import {  Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InputField from '../../components/InputField';
import SelectField from '../../components/SelectField';
import { predictDiabetes } from '../../requests/predictionRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHealth } from '../../context/Context';
const DiabetesTestScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    hypertension: '',
    heart_disease: '',
    smoking_history: '',
    bmi: '',
    HbA1c_level: '',
    blood_glucose_level: '',
  });
  const [loading, setLoading] = useState(false);
const { updateHealthData } = useHealth();

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const errors = [];
    Object.entries(formData).forEach(([key, value]) => {
      if (value === '') {
        errors.push(`${key.replace('_', ' ')} is required`);
      }
    });
    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      Alert.alert('Validation Error', errors.join('\n'));
      return;
    }

    setLoading(true);
    try {
      const dataToSend = {
        ...formData,
        age: parseInt(formData.age),
        hypertension: parseInt(formData.hypertension),
        heart_disease: parseInt(formData.heart_disease),
        bmi: parseFloat(formData.bmi),
        HbA1c_level: parseFloat(formData.HbA1c_level),
        blood_glucose_level: parseFloat(formData.blood_glucose_level),
      };
      const response = await predictDiabetes(dataToSend);
      const {probability, explanation} = response || {};


      const testResult = {
        testName: 'Diabetes',
        date: new Date().toISOString(),
        result: { message: `Probability of diabetes: ${probability}%`, probability },
        explanation,
      };

      const existingResults = JSON.parse(await AsyncStorage.getItem('testResults')) || [];
      const updatedResults = [...existingResults, testResult];
      await AsyncStorage.setItem('testResults', JSON.stringify(updatedResults));

      // Update context
      updateHealthData(testResult);
      console.log("testResult",testResult);     

      setLoading(false);
      Alert.alert('Test Result', `The probability of you having diabetes is ${probability}%`);
      navigation.goBack();
    } catch (error) {
      console.log(error);
      setLoading(false);
      Alert.alert('Error', 'There was an error submitting your test. Please try again.');
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-6" contentContainerStyle={{ paddingBottom: 100 }}>
      <Text className="text-2xl font-bold mb-6">Diabetes Risk Assessment</Text>

      <SelectField
        label="Gender"
        value={formData.gender}
        onValueChange={(value) => updateField('gender', value)}
        items={[
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" }
        ]}
        icon="person-outline"
        tooltip="Please select your biological sex at birth"
        placeholder="Select Gender"
      />

      <InputField
        label="Age"
        value={formData.age}
        onChangeText={(value) => updateField('age', value)}
        keyboardType="numeric"
        icon="calendar-outline"
        tooltip="Your current age in years"
        placeholder="Enter your age"
      />

      <SelectField
        label="Hypertension"
        value={formData.hypertension}
        onValueChange={(value) => updateField('hypertension', value)}
        items={[
          { label: "No", value: "0" },
          { label: "Yes", value: "1" }
        ]}
        icon="fitness-outline"
        tooltip="Do you have hypertension?"
        placeholder="Select Hypertension Status"
      />

      <SelectField
        label="Heart Disease"
        value={formData.heart_disease}
        onValueChange={(value) => updateField('heart_disease', value)}
        items={[
          { label: "No", value: "0" },
          { label: "Yes", value: "1" }
        ]}
        icon="heart-outline"
        tooltip="Do you have any heart disease?"
        placeholder="Select Heart Disease Status"
      />

      <SelectField
        label="Smoking History"
        value={formData.smoking_history}
        onValueChange={(value) => updateField('smoking_history', value)}
        items={[
          { label: "Current", value: "current" },
          { label: "Former", value: "former" },
          { label: "Never", value: "never" },
          { label: "Ever", value: "ever" },
          { label: "Not Current", value: "not current" }
        ]}
        icon="flame-outline"
        tooltip="What is your smoking history?"
        placeholder="Select Smoking History"
      />

      <InputField
        label="BMI"
        value={formData.bmi}
        onChangeText={(value) => updateField('bmi', value)}
        keyboardType="numeric"
        icon="body-outline"
        tooltip="Body Mass Index (weight in kg / height in m²)"
        placeholder="Enter your BMI"
      />

      <InputField
        label="HbA1c Level"
        value={formData.HbA1c_level}
        onChangeText={(value) => updateField('HbA1c_level', value)}
        keyboardType="numeric"
        icon="flask-outline"
        tooltip="Glycated hemoglobin level in %"
        placeholder="Enter HbA1c level"
      />

      <InputField
        label="Blood Glucose Level"
        value={formData.blood_glucose_level}
        onChangeText={(value) => updateField('blood_glucose_level', value)}
        keyboardType="numeric"
        icon="water-outline"
        tooltip="Fasting blood glucose level in mg/dL"
        placeholder="Enter blood glucose level"
      />

      <TouchableOpacity
        className="bg-blue-500 py-4 px-6 rounded-lg mt-6"
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-center font-semibold">Submit Test</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DiabetesTestScreen;