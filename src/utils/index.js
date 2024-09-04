import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    Alert.alert("Success", "All data has been cleared from local storage.");
  } catch (error) {
    console.error("Error clearing AsyncStorage:", error);
    Alert.alert("Error", "Failed to clear data from local storage.");
  }
};
