import React, { useState, useEffect } from "react";
import {
  Image,
  TextInput,
  View,
  Text,
  FlatList,
  Button,
  ScrollView,
} from "react-native";
import styles from "./styles";
import MovieCard from "./MovieCard"; // Import MovieCard component

const HomeScreen = ({navigation }) => {
  const API_KEY = "7b6b90b7";
  const [movieList, setMovieList] = useState([]);

  const fetchData = async (searchString) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
      );
      const data = await response.json();
      console.log(data);
      if (data && data.Search) {
        setMovieList(data.Search);
      } else {
        setMovieList([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData("Avengers"); // Initial fetch with a default search string
  }, []); // Empty dependency array to run only once on component mount

  return (
    <View style={[styles.homeScreencnt, { marginHorizontal: 10 }]}>
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
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={movieList}
            keyExtractor={(item) => item.imdbID}
            renderItem={({ item }) => (
              <MovieCard
                title={item.Title}
                posterUrl={item.Poster}
              
              />
            )}
          />
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
    </View>
  );
};

export default HomeScreen;
