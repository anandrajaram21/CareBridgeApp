import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import Navbar from "../Navbar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSignup = async () => {
    const data = {
      email: email,
      password: password,
    };

    const url = "https://red-snow-8028.fly.dev/user/login";

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    console.log(json);

    await AsyncStorage.setItem("refreshToken", json.token);

    navigation.navigate("Home");
  };

  return (
    <SafeAreaView>
      <Navbar />
      <View className="mx-10">
        <Text className="text-xl">Email</Text>
        <TextInput
          onChangeText={handleEmailChange}
          value={email}
          className="h-10 border border-gray-400 rounded-md"
        />
        <View className="p-3"></View>
        <Text className="text-xl">Password</Text>
        <TextInput
          onChangeText={handlePasswordChange}
          value={password}
          textContentType="password"
          secureTextEntry={true}
          className="h-10 border border-gray-400 rounded-md"
        />
        <TouchableOpacity onPress={handleSignup}>
          <View className="bg-blue-700 rounded-md p-3 mt-3">
            <Text className="text-white text-center">Login</Text>
          </View>
        </TouchableOpacity>
        <View className="p-3"></View>
        <Text className="text-lg text-center">
          Don't have an account? Sign Up{" "}
          <Text
            className="text-blue-400 underline"
            onPress={() => navigation.navigate("Signup")}
          >
            here
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
