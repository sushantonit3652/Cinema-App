import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "./appScreens/start";
import Welcome from "./appScreens/welcome";
import Login from "./appScreens/login";
import MovieDetails from "./appScreens/movieDetails";
import AdminPanel from "./appScreens/adminPanel";
import VideoScreen from "./appScreens/videoScreen";
import AddMovies from "./appScreens/addmovies";
import ViewMovies from "./appScreens/viewMovies";
import UsersScreen from "./appScreens/usersScreen";
import DeleteMovies from "./appScreens/deleteMovies";
import UpdateMovies from "./appScreens/upadateMovies";
import BottomTabs from "./appScreens/bottomTabs";
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
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="adminPanel"
          component={AdminPanel}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="addMovies"
          component={AddMovies}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="viewMovies"
          component={ViewMovies}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="updateMovies"
          component={UpdateMovies}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="deleteMovies"
          component={DeleteMovies}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="usersScreen"
          component={UsersScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="movieDetails"
          component={MovieDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="videoScreen"
          component={VideoScreen}
          options={{ headerShown: false ,}}
        />
        <Stack.Screen
          name="bottomTabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MyStack;
