import { View, Text } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "react-native";

const InputField = ({ label, value, onChangeText, keyboardType }) => (
  <View className="mb-4">
    <Text className="font-semibold mb-1">{label}</Text>
    <TextInput
      className="bg-gray-100 px-4 py-3 rounded-lg"
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  </View>
);

export default InputField;

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  keyboardType: PropTypes.string,
};
