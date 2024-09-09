import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';

const HealthContext = createContext();

export const HealthProvider = ({ children }) => {
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    loadTestResults();
  }, []);

  const loadTestResults = async () => {
    try {
      const results = await AsyncStorage.getItem('testResults');
      if (results) {
        setTestResults(JSON.parse(results));
      }
    } catch (error) {
      console.error('Error loading test results:', error);
    }
  };

  const triggerUpdate = () => {
    setUpdateTrigger((prev) => prev + 1);
  };

  const updateHealthData = (newTestResult) => {
    setTestResults(prevResults => [...prevResults, newTestResult]);
    triggerUpdate();
  };

  return (
    <HealthContext.Provider value={{ updateTrigger, triggerUpdate, testResults, updateHealthData }}>
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => useContext(HealthContext);

HealthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};