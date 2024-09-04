import { View, Text } from "react-native";
import React from "react";
import PropTypes from "prop-types";

const HealthCard = ({ title, value, icon }) => (
  <View className="bg-white rounded-lg p-4 mb-4 w-[48%] shadow">
    <View className="flex-row items-center mb-2">
      {icon}
      <Text className="font-semibold ml-2">{title}</Text>
    </View>
    <Text className="text-2xl font-bold">{value}</Text>
  </View>
);

export default HealthCard;

HealthCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};
