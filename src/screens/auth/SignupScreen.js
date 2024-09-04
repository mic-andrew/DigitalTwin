import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSignUp = async () => {
    setLoading(true);
    // Mock API call
    setTimeout(() => {
      setLoading(false);
      Toast.show({
        type: "success",
        text1: "Sign Up Successful",
        text2: "Welcome to Digital Twin Patient Model!",
      });
      // Navigate to Dashboard or main app screen
      // navigation.navigate('Dashboard');
    }, 5000);
  };

  return (
    <View className="flex-1 bg-white p-6 justify-center">
      <Text className="text-3xl font-bold mb-8 text-center text-blue-600">
        Sign Up
      </Text>
      <View className="space-y-4">
        <TextInput
          className="bg-gray-100 px-4 py-3 rounded-lg"
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          className="bg-gray-100 px-4 py-3 rounded-lg"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          className="bg-gray-100 px-4 py-3 rounded-lg"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          className={`bg-blue-500 py-3 rounded-lg ${
            loading ? "opacity-70" : ""
          }`}
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-semibold">
              Sign Up
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="mt-4"
        onPress={() => navigation.navigate("Login")}
      >
        <Text className="text-blue-500 text-center">
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
