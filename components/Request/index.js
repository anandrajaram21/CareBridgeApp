import getAccessToken from "../../utils/getAccessToken";
import {
  Button,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Toast from "react-native-root-toast";

const Item = ({ name, gender, phoneNumber, id, title, ngoId, category }) => {
  const confirmVolunteer = async (id) => {
    const token = await getAccessToken();
    const payload = {
      title: title,
      category: category,
      description: title,
      volID: id,
      ngo: ngoId,
    };
    const response = await fetch(
      "https://red-snow-8028.fly.dev/request/create",
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const json = await response.json();

    console.log(json);

    Toast.show("Volunteer Confirmed", {
      duration: Toast.durations.SHORT,
    });
  };
  return (
    <View className="flex flex-col mt-3 bg-white p-5 rounded-md">
      <View className="flex flex-row justify-between items-center gap-2">
        <Text className="font-bold text-lg">{name}</Text>
        <Text>{gender}</Text>
      </View>
      <View className="flex flex-row gap-2 items-center justify-between">
        <Text>{phoneNumber}</Text>
        <TouchableOpacity
          className="bg-blue-500 rounded-md p-2 mt-2"
          onPress={() => confirmVolunteer(id)}
        >
          <Text className="text-white text-center">Confirm Volunteer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function Request({ navigation, route }) {
  const [volunteers, setVolunteers] = useState(route.params.response.classify);
  return (
    <SafeAreaView>
      <Navbar />
      <View className="mx-8">
        <FlatList
          data={volunteers}
          renderItem={({ item }) => (
            <Item
              gender={item.gender}
              name={item.name}
              phoneNumber={item.phone}
              category={route.params.category}
              title={route.params.title}
              id={item.id}
              ngoId={item.ngo}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}
