import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios"; // Import Axios
import BASE_URL from "../backend/config";
const MovieDetails = ({ navigation }) => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}api/movies`);
      setMovieList(response.data);
    } catch (error) {
      setError("Error fetching movies");
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchMovies();
    }
  }, [isFocused]);

  useEffect(() => {
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
    <SafeAreaView style={styles.movieContainer}>
      <View style={styles.movieCardContainer}>
        <Text style={styles.headerText}>Movies List</Text>
        {movieList.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={movieList}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.movieName}>{item.name}</Text>
                <Text style={styles.movieId}>ID: {item._id}</Text>
                <Text style={styles.movieGenre}>Language: {item.language}</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.updateButton}
                    onPress={() =>
                      navigation.navigate("updateMovies", {
                        movie: item,
                      })
                    }
                  >
                    <Text style={styles.buttonText}>Update</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() =>
                      navigation.navigate("deleteMovies", { movieId: item._id })
                    }
                  >
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noMoviesText}>No movies found</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  movieContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 10,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  updateButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
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
