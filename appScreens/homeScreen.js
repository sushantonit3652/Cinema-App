import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import {
  Image,
  TextInput,
  View,
  Text,
  FlatList,
  Button,
  ScrollView,
  SafeAreaView,
} from "react-native";
import styles from "./styles";

const HomeScreen = ({ navigation }) => {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "http://192.168.1.33:3000/api/movies/recent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // Optionally, you can send data in the request body if your backend expects it
            // body: JSON.stringify({ /* your data here */ }),
          }
        );
        console.log(response);

        const data = await response.json();

        setMovieList(data);
      } catch (error) {
        console.error("new error:", data);
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.homeScreencnt,
        { marginHorizontal: 10, marginVertical: "15%" },
      ]}
    >
      <View style={styles.home__searchbackground}>
        <Image
          style={styles.searchicon}
          source={require("../assets/searchicon.png")}
        ></Image>
        <TextInput
          style={styles.home__serchtextinput}
          placeholder="Search"
        ></TextInput>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.movieCard_cnt}>
          <Text style={styles.headerText}>Continue Watching</Text>
          {movieList.length > 0 ? (
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={movieList}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() =>
                    navigation.navigate("movieDetails", { movieId: item._id })
                  }
                >
                  <Image
                    source={{ uri: item.posterUrl }}
                    style={styles.poster}
                  />
                  <Text style={styles.home__moviename}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text>No movies found</Text>
          )}
        </View>
        <View>
          <Text style={styles.headerText}>Trending Movies</Text>
        </View>
        <View>
          <Text style={styles.headerText}>New Release</Text>
        </View>
        <View>
          <Text style={styles.headerText}>Full HD Movies</Text>
        </View>
        <View>
          <Text style={styles.headerText}>Up Comming</Text>
        </View>
        <View>
          <Text style={styles.headerText}>HBO</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
