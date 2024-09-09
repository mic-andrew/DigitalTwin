import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/Ionicons";

const InputField = ({ 
  label, 
  value, 
  onChangeText, 
  keyboardType, 
  icon, 
  tooltip,
  secureTextEntry,
  placeholder
}) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <View className="mb-4">
      <View className="flex-row items-center justify-between mb-1">
        <Text className="font-semibold">{label}</Text>
        {tooltip && (
          <TouchableOpacity onPress={() => setShowTooltip(!showTooltip)}>
            <Icon name="information-circle-outline" size={20} color="#3B82F6" />
          </TouchableOpacity>
        )}
      </View>
      {showTooltip && (
        <Text className="text-sm text-gray-600 mb-2">{tooltip}</Text>
      )}
      <View className="flex-row items-center bg-gray-100 rounded-lg">
        {icon && (
          <View className="pl-3 pr-2">
            <Icon name={icon} size={20} color="#3B82F6" />
          </View>
        )}
        <TextInput
          className="flex-1 px-4 py-3"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
        />
      </View>
    </View>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  keyboardType: PropTypes.string,
  icon: PropTypes.string,
  tooltip: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  placeholder: PropTypes.string
};

export default InputField;