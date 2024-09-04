import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import PropTypes from "prop-types";

const ProfileOption = ({ icon, title, color = "#374151", onClick }) => (
  <TouchableOpacity
    className="flex-row items-center py-4 border-b border-gray-200"
    onPress={onClick}
  >
    <View className="mr-4">{icon}</View>
    <Text className="text-lg" style={{ color }}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default ProfileOption;

ProfileOption.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func,
};
