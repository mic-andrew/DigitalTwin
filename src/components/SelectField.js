import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

const SelectField = ({ 
  label, 
  value, 
  onValueChange, 
  items = [], 
  icon, 
  tooltip,
  placeholder
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedItem = items.find(item => item.value === value);
  const displayText = selectedItem ? selectedItem.label : placeholder;

  return (
    <View className="mb-4">
      <View className="flex-row items-center justify-between mb-1">
        <Text className="font-semibold">{label}</Text>
        {tooltip && (
          <TouchableOpacity onPress={() => alert(tooltip)}>
            <Icon name="information-circle-outline" size={20} color="#3B82F6" />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3"
        onPress={() => setModalVisible(true)}
      >
        {icon && (
          <View className="pr-2">
            <Icon name={icon} size={20} color="#3B82F6" />
          </View>
        )}
        <Text className={value ? "flex-1" : "flex-1 text-gray-400"}>
          {displayText}
        </Text>
        <Icon name="chevron-down-outline" size={20} color="#3B82F6" />
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white rounded-lg w-4/5 max-h-3/4 shadow-lg">
            <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
              <Text className="font-bold text-lg">{label}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <ScrollView className="max-h-96">
              {items.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="py-3 px-4 border-b border-gray-200"
                  onPress={() => {
                    onValueChange(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onValueChange: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  })),
  icon: PropTypes.string,
  tooltip: PropTypes.string,
  placeholder: PropTypes.string
};

SelectField.defaultProps = {
  items: [],
  value: '',
  placeholder: 'Select an option'
};

export default SelectField;