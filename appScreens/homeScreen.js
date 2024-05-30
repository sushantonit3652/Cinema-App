import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  View,
  Text,
  FlatList,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import styles from "./styles";
import BASE_URL from "../backend/config";

const HomeScreen = ({ navigation }) => {
  const [movieList, setMovieList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.post(`${BASE_URL}api/movies/recent`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setMovieList(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  const filteredMovies = movieList.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView
      style={[
        styles.homeScreencnt,
        { marginHorizontal: 5, marginVertical: "10%" },
      ]}
    >
      <View style={styles.home__searchbackground}>
        <Image
          style={styles.searchicon}
          source={require("../assets/searchicon.png")}
        />
        <TextInput
          style={styles.home__serchtextinput}
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>

      <View style={styles.movieCard_cnt}>
        <Text style={styles.headerText}>All Movies</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={searchQuery.length > 0 ? filteredMovies : movieList}
          keyExtractor={(item) => item._id}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity
            
              onPress={() =>
                navigation.navigate("movieDetails", { movieId: item._id })
              }
            >
              <Image source={{ uri: item.posterUrl }} style={styles.poster} />
              <Text style={styles.home__moviename}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
