// App.js
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./homeScreen";
import HollyWood from "./hollyWood";
import CategoryScreen from "./categoryScreen";
import BollywoodScreen from "./bollywood";
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true, // Ensure labels are shown
        tabBarStyle: {
          display: "flex",
          paddingBottom: 15, // Add padding

        },
        tabBarIcon: () => null, // Ensure no icon is rendered
      }}
    >
      <Tab.Screen
        name="Movies"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="HollyWood"
        component={HollyWood}
        options={{ headerShown: false }}
      />
    
      <Tab.Screen
        name="Bollywood"
        component={BollywoodScreen}
        options={{ headerShown: false }}
      />
        <Tab.Screen
        name="Categories"
        component={CategoryScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
