import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import BASE_URL from "../backend/config";

const MovieCard = ({ movie,navigation }) => (
  <TouchableOpacity
    style={styles.movieCard}
    onPress={() => navigation.navigate("movieDetails", { movieId: movie._id })}
  >
    <Image source={{ uri: movie.posterUrl }} style={styles.moviePoster} />
    <Text style={styles.movieTitle}>{movie.title}</Text>
  </TouchableOpacity>
);

const Hollywood = ({navigation}) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Hollywood Movies</Text>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.movieContainer}>
          {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie}  navigation={navigation}/>
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
});

export default Hollywood;
