import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Pressable, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useHealth } from '../../context/Context';
import DeleteResultModal from '../../components/DeleteResultModal';
import ExplanationModal from '../../components/ExplanationModal';

const ResultsScreen = () => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [explanationModalVisible, setExplanationModalVisible] = useState(false);
  const [selectedTestIndex, setSelectedTestIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentExplanationIndex, setCurrentExplanationIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { testResults } = useHealth();

  const saveTestResults = async (updatedResults) => {
    try {
      await AsyncStorage.setItem('testResults', JSON.stringify(updatedResults));
    } catch (error) {
      console.error('Error saving test results:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getIconName = (testName) => {
    switch (testName) {
      case 'Diabetes':
        return 'fitness-outline';
      default:
        return 'medical-outline';
    }
  };

  const handleDeletePress = (index) => {
    setSelectedTestIndex(index);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedTestIndex !== null) {
      const updatedResults = testResults?.filter((_, index) => index !== selectedTestIndex);
      saveTestResults(updatedResults);
      setDeleteModalVisible(false);
      setSelectedTestIndex(null);
    }
  };

  const handleExplanationPress = (index) => {
    setSelectedTestIndex(index);
    setExplanationModalVisible(true);
    setLoading(true);
    setCurrentExplanationIndex(0);
    setTimeout(() => {
      setLoading(false);
      showNextExplanation();
    }, 3000);
  };

  const showNextExplanation = () => {
    if (currentExplanationIndex < testResults[selectedTestIndex]?.explanation?.length) {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          setCurrentExplanationIndex(prevIndex => prevIndex + 1);
        }, 1000);
      });
    }
  };

  useEffect(() => {
    if (!loading && currentExplanationIndex < testResults[selectedTestIndex]?.explanation?.length) {
      showNextExplanation();
    }
  }, [currentExplanationIndex, loading]);

  if (testResults.length === 0) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Icon name="document-text-outline" size={60} color="#3B82F6" />
        <Text className="text-xl font-bold mt-4 text-center">No Test Results Yet</Text>
        <Text className="text-gray-600 mt-2 text-center">Take a health test to see your results here.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-4">Your Test Results</Text>
        {testResults?.map((test, index) => (
          <TouchableOpacity key={index} onPress={() => handleExplanationPress(index)}>
            <View className="bg-white rounded-lg shadow-md p-4 mb-4">
              <View className="flex-row justify-between items-center mb-2">
                <View className="flex-row items-center">
                  <Icon name={getIconName(test.testName)} size={24} color="#3B82F6" />
                  <Text className="text-lg font-semibold ml-2">{test.testName} Test</Text>
                </View>
                <TouchableOpacity onPress={() => handleDeletePress(index)}>
                  <Icon name="trash-outline" size={24} color="#EF4444" />
                </TouchableOpacity>
              </View>
              <Text className="text-gray-600 mb-2">Date: {formatDate(test.date)}</Text>
              <Text className="font-medium">Result: {test.result.message}</Text>
              <Text className="text-gray-700">Probability: {test.result.probability}%</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Delete Confirmation Modal */}
 
        <DeleteResultModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={handleDeleteConfirm}
      />        

      {/* Explanation Modal */}
        <ExplanationModal
        visible={explanationModalVisible}
        onClose={() => setExplanationModalVisible(false)}
        explanation={testResults[selectedTestIndex]?.explanation}
      />    
    </View>
  );
};

export default ResultsScreen;