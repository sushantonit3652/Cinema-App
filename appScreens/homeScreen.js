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
import MovieCard from "./MovieCard"; // Import MovieCard component

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
        <View>
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
                  onPress={() => navigation.navigate("movieDetails")}
                >
                  <Image
                    source={{ uri: item.posterUrl }}
                    style={styles.poster}
                  />
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text>No movies found</Text>
          )}
        </View>
        <View>
          <Text style={styles.headerText}>Trending Movies</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={movieList}
            keyExtractor={(item) => item.imdbID}
            renderItem={({ item }) => (
              <MovieCard title={item.Title} posterUrl={item.Poster} />
            )}
          />
        </View>
        <View>
          <Text style={styles.headerText}>New Release</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={movieList}
            keyExtractor={(item) => item.imdbID}
            renderItem={({ item }) => (
              <MovieCard title={item.Title} posterUrl={item.Poster} />
            )}
          />
        </View>
        <View>
          <Text style={styles.headerText}>Full HD Movies</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={movieList}
            keyExtractor={(item) => item.imdbID}
            renderItem={({ item }) => (
              <MovieCard title={item.Title} posterUrl={item.Poster} />
            )}
          />
        </View>
        <View>
          <Text style={styles.headerText}>Up Comming</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={movieList}
            keyExtractor={(item) => item.imdbID}
            renderItem={({ item }) => (
              <MovieCard title={item.Title} posterUrl={item.Poster} />
            )}
          />
        </View>
        <View>
          <Text style={styles.headerText}>HBO</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={movieList}
            keyExtractor={(item) => item.imdbID}
            renderItem={({ item }) => (
              <MovieCard title={item.Title} posterUrl={item.Poster} />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
