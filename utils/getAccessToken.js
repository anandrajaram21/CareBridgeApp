import AsyncStorage from "@react-native-async-storage/async-storage";

const getAccessToken = async () => {
  const refreshToken = await AsyncStorage.getItem("refreshToken");

  const url = "https://red-snow-8028.fly.dev/user/refresh";

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ refreshToken: refreshToken }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();
  console.log(json);

  return json.accessToken;
};

export default getAccessToken;
