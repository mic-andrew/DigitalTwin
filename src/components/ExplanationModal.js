import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Modal, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

const ExplanationModal = ({ visible, onClose, explanation }) => {
  const [loading, setLoading] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setLoading(true);
      setDisplayedText('');
      setTimeout(() => {
        setLoading(false);
        streamText();
      }, 3000);
    }
  }, [visible]);

  const streamText = () => {
    let fullText = explanation.join(' ');
    let currentIndex = 0;
    
    const streamInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(prevText => prevText + fullText[currentIndex]);
        currentIndex++;
        scrollViewRef.current?.scrollToEnd({ animated: true });
      } else {
        clearInterval(streamInterval);
      }
    }, 20); // Adjust this value to control the speed of text streaming
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white rounded-lg p-6 w-11/12 max-w-md h-3/4">
          <Text className="text-xl font-bold mb-4">Test Explanation</Text>
          {loading ? (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#3B82F6" />
            </View>
          ) : (
            <ScrollView 
              ref={scrollViewRef}
              className="flex-1"
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <Text className="text-gray-700">{displayedText}</Text>
            </ScrollView>
          )}
          <Pressable
            className="bg-blue-500 rounded-md px-4 py-2 mt-4"
            onPress={onClose}
          >
            <Text className="text-white font-medium text-center">Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

ExplanationModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  explanation: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ExplanationModal;