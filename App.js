import { View, SafeAreaView } from "react-native";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootSiblingParent } from "react-native-root-siblings";
import Home from "./components/Home";
import Request from "./components/Request";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RootSiblingParent>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Volunteers" component={Request} />
        </Stack.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
}
