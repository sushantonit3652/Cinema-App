import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "./appScreens/start";
import Welcome from "./appScreens/welcome";
import Login from "./appScreens/login";
import HomeScreen from "./appScreens/homeScreen";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="start"
          component={Start}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="welcome"
          component={Welcome}
        />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="homeScreen" component={HomeScreen} />
     
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MyStack;
