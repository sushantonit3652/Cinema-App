import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const MovieDetails = ({ navigation }) => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://192.168.1.33:3000/api/movies");
        const data = await response.json();
        setMovieList(data);
      } catch (error) {
        setError("Error fetching movies");
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.movieContainer}>
      <View style={styles.movieCardContainer}>
        <Text style={styles.headerText}>Movies List</Text>
        {movieList.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={movieList}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  navigation.navigate("MovieDetails", { movieId: item._id })
                }
              >
                <Text style={styles.movieName}>{item.name}</Text>
                <Text style={styles.movieId}>ID: {item._id}</Text>
                <Text style={styles.movieGenre}>language: {item.language}</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={styles.noMoviesText}>No movies found</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  movieContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  movieCardContainer: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  movieName: {
    fontSize: 18,
    fontWeight: "500",
  },
  movieId: {
    fontSize: 14,
    color: "#555",
  },
  movieGenre: {
    fontSize: 14,
    color: "#555",
  },
  noMoviesText: {
    fontSize: 16,
    color: "red",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});

export default MovieDetails;
