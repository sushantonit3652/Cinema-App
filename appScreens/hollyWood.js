import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  TextInput, // Import TextInput for the search bar
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

const Hollywood = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.post(`${BASE_URL}api/movies/recent`, {
          type: "Hollywood",
          headers: {
            "Content-Type": "application/json",
          },
        });
        setMovies(response.data.filter((movie) => movie.type === "Hollywood"));
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Error fetching movies");
      }
    };
    fetchMovies();
  }, []);

  // Function to handle search input
  const handleSearchInput = (text) => {
    setSearchTerm(text);
  };

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
          onChangeText={handleSearchInput}
          value={searchTerm}
        />
      </View>
    
      <Text style={styles.headerText}>Hollywood Movies</Text>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.movieContainer}>
          {movies
            .filter((movie) =>
              movie.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                navigation={navigation}
              />
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

export default Hollywood;
