import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, Alert, Modal, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import ProfileOption from "../../components/ProfileOptions";

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const data = await AsyncStorage.getItem("userData");
      if (data) {
        const parsedData = JSON.parse(data);
        setUserData(parsedData);
        setEditName(parsedData.name);
        setEditEmail(parsedData.email);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  const saveUserData = async (newData) => {
    try {
      await AsyncStorage.setItem("userData", JSON.stringify(newData));
      setUserData(newData);
    } catch (error) {
      console.error("Error saving user data:", error);
      Alert.alert("Error", "Failed to save user data. Please try again.");
    }
  };

  const handleEditProfile = () => {
    setIsEditModalVisible(true);
  };

  const handleSaveProfile = () => {
    const newUserData = { ...userData, name: editName, email: editEmail };
    saveUserData(newUserData);
    setIsEditModalVisible(false);
  };

  const handleSettings = () => {
    navigation.navigate("Settings");
  };

  const handleHelpSupport = () => {
    navigation.navigate("HelpSupport");
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert("Success", "You have been logged out and all data has been cleared.");
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out? This will clear all your data.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: clearStorage },
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="bg-blue-500 p-6 items-center">
        <Image
          source={{ uri: "https://via.placeholder.com/150" }}
          className="w-24 h-24 rounded-full mb-4"
        />
        <Text className="text-2xl font-bold text-white">
          {userData?.name || "User"}
        </Text>
        <Text className="text-white">
          {userData?.email || "user@example.com"}
        </Text>
      </View>
      <View className="p-6">
        <ProfileOption
          icon={<Icon name="person-outline" size={24} />}
          title="Edit Profile"
          onClick={handleEditProfile}
        />
        <ProfileOption
          icon={<Icon name="settings-outline" size={24} />}
          title="Settings"
          onClick={handleSettings}
        />
        <ProfileOption
          icon={<Icon name="help-circle-outline" size={24} />}
          title="Help & Support"
          onClick={handleHelpSupport}
        />
        <ProfileOption
          icon={<Icon name="log-out-outline" size={24} />}
          title="Log Out"
          color="#EF4444"
          onClick={handleLogout}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-6 rounded-lg w-5/6">
            <Text className="text-xl font-bold mb-4">Edit Profile</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-2 mb-4"
              placeholder="Name"
              value={editName}
              onChangeText={setEditName}
            />
            <TextInput
              className="border border-gray-300 rounded-lg p-2 mb-4"
              placeholder="Email"
              value={editEmail}
              onChangeText={setEditEmail}
              keyboardType="email-address"
            />
            <TouchableOpacity
              className="bg-blue-500 py-2 rounded-lg"
              onPress={handleSaveProfile}
            >
              <Text className="text-white text-center font-semibold">Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mt-2"
              onPress={() => setIsEditModalVisible(false)}
            >
              <Text className="text-blue-500 text-center">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ProfileScreen;