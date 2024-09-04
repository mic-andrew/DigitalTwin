import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';

const HelpSupportScreen = () => {
  const faqs = [
    { question: "How do I update my profile?", answer: "Go to the Profile screen and tap on 'Edit Profile'." },
    { question: "How to add health data?", answer: "Navigate to the Dashboard and tap on 'Add Health Data'." },
    // Add more FAQs as needed
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <Text className="text-2xl font-bold mb-6">Help & Support</Text>
        <Text className="text-lg font-semibold mb-4">Frequently Asked Questions</Text>
        {faqs.map((faq, index) => (
          <View key={index} className="mb-4">
            <Text className="font-bold">{faq.question}</Text>
            <Text>{faq.answer}</Text>
          </View>
        ))}
        <TouchableOpacity
          className="bg-blue-500 py-2 rounded-lg mt-6"
          onPress={() => Linking.openURL('mailto:support@example.com')}
        >
          <Text className="text-white text-center font-semibold">Contact Support</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HelpSupportScreen;