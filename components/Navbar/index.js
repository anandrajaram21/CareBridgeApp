import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("refreshToken");
      if (token) {
        setLoggedIn(true);
      }
    };

    getToken();
  }, []);

  const logout = async () => {
    const token = await AsyncStorage.removeItem("refreshToken");
  };

  return (
    <SafeAreaView className="flex flex-row gap-5 justify-between items-center mx-5">
      <View>
        <Image
          source={require("./logo.png")}
          style={{ height: 120, width: 120, resizeMode: "contain" }}
        />
      </View>
      {loggedIn ? (
        <View>
          <TouchableOpacity className="text-4xl" onPress={() => logout()}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
}
