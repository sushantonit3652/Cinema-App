import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Image,
  TextInput,
  View,
  Text,
  FlatList,
  SafeAreaView,
  Dimensions,
  StyleSheet,
} from "react-native";
import axios from "axios";
import BASE_URL from "../backend/config";

const HomeScreen = ({ navigation }) => {
  const [movieList, setMovieList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.post(`${BASE_URL}api/movies/recent`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setMovieList(response.data);
        setFilteredMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredMovies(movieList);
    } else {
      const filtered = movieList.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.type.toLowerCase().includes(query.toLowerCase()) ||
        movie.genre.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
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
          placeholder="Search by name, type, or genre"
          onChangeText={handleSearch}
          value={searchQuery}
        />
      </View>

      <View style={styles.movieContainer}>
        <Text style={styles.headerText}>All Movies</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredMovies}
          keyExtractor={(item) => item._id}
          numColumns={3}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("movieDetails", { movieId: item._id })
              }
            >
              <View style={styles.movieCard}>
                <Image source={{ uri: item.posterUrl }} style={styles.moviePoster} />
                <Text style={styles.movieTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("window");
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
  searchInput: {
    flex: 1,
  },
  movieContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15,
    marginHorizontal:10,
    alignSelf:"flex-start"
  },
  movieCard: {
    width: (width - 60) / 3, // Adjust the width of movie cards to fit three in a row with margins
    margin: 8,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  moviePoster: {
    width: "100%",
    height: 170,
  },
  movieTitle: {
    fontWeight: "600",
    marginHorizontal: 5,
    marginVertical: 3,
   textAlign:"center"
  },
});

export default HomeScreen;
