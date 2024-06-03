import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import axios from "axios";
import BASE_URL from "../backend/config";

const MovieCard = ({ movie, navigation }) => (
  <TouchableOpacity
    style={styles.movieCard}
    onPress={() => navigation.navigate("movieDetails", { movieId: movie._id })}
  >
    <Image source={{ uri: movie.posterUrl }} style={styles.moviePoster} />
    <Text style={styles.movieTitle}>{movie.title}</Text>
  </TouchableOpacity>
);

const Bollywood = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.post(`${BASE_URL}api/movies/recent`, {
          type: "Bollywood",
          headers: {
            "Content-Type": "application/json",
          },
        });
        setMovies(
          response.data.filter((movie) => movie.type === "Bollywood")
        );
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Error fetching movies");
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    setFilteredMovies(
      movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, movies]);

  return (
    <SafeAreaView style={styles.container}>

<View style={styles.searchContainer}>
        <Image
          style={styles.searchIcon}
          source={require("../assets/searchicon.png")}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
      </View>

      <Text style={styles.headerText}>Bollywood Movies</Text>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.movieContainer}>
          {filteredMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} navigation={navigation} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  movieContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  movieCard: {
    width: "32%",
    marginVertical: 10,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  moviePoster: {
    width: "100%",
    height: 170,
    resizeMode: "cover",
  },
  movieTitle: {
    fontWeight: "600",
    marginHorizontal: 5,
    marginVertical: 3,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  searchInput: {
    flex: 1,
  },
});

export default Bollywood;
