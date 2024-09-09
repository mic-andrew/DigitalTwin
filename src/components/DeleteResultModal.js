import React from 'react';
import { View, Text, Modal, Pressable } from 'react-native';
import PropTypes from 'prop-types';

const DeleteResultModal = ({ visible, onClose, onConfirm }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="bg-white rounded-lg p-6 w-4/5 max-w-sm">
          <Text className="text-xl font-bold mb-4">Confirm Deletion</Text>
          <Text className="text-gray-700 mb-6">Are you sure you want to delete this test result?</Text>
          <View className="flex-row justify-end">
            <Pressable
              className="bg-gray-200 rounded-md px-4 py-2 mr-2"
              onPress={onClose}
            >
              <Text className="text-gray-700 font-medium">Cancel</Text>
            </Pressable>
            <Pressable
              className="bg-red-500 rounded-md px-4 py-2"
              onPress={onConfirm}
            >
              <Text className="text-white font-medium">Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteResultModal;

DeleteResultModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};
