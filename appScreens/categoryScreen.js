import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import axios from "axios";

import BASE_URL from "../backend/config";

const genres = [
  "Action",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Romance",
  "Thriller",
];

const colors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#FF33A6",
  "#FF8C33",
  "#FF5733",
  "#C70039",
];

const CategoryScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.post(`${BASE_URL}api/movies/recent`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setMovies(response.data);
        setFilteredMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    filterMovies();
  }, [searchText, selectedGenre, movies]);

  const filterMovies = () => {
    let filtered = movies;

    if (selectedGenre) {
      filtered = filtered.filter(
        (movie) => movie.genre && movie.genre.includes(selectedGenre)
      );
    }

    if (searchText) {
      filtered = filtered.filter(
        (movie) =>
          movie.title.toLowerCase().includes(searchText.toLowerCase()) ||
          movie.genre.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredMovies(filtered);
  };

  const handleGenrePress = (genre) => {
    setSelectedGenre(genre);
    setSearchText(genre); // Set search text to the selected genre
  };

  const renderGenre = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.genreButton,
        { backgroundColor: colors[index % colors.length] },
        selectedGenre === item && styles.selectedGenreButton,
      ]}
      onPress={() => handleGenrePress(item)}
    >
      <Text style={styles.genreText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderMovie = ({ item }) => {
    const screenWidth = Dimensions.get("window").width;
    const numColumns = 3;
    const itemWidth = (screenWidth - 20) / numColumns; // Adjust the 20 to your desired padding/margin

    return (
      <TouchableOpacity
        style={[styles.movieItem, { width: itemWidth }]}
        onPress={() =>
          navigation.navigate("movieDetails", { movieId: item._id })
        }
      >
        <Image source={{ uri: item.posterUrl }} style={styles.moviePoster} />
        <Text style={styles.movieTitle}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <View style={styles.genreContainer}>
        {genres.map((genre, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.genreButton,
              { backgroundColor: colors[index % colors.length] },
              selectedGenre === genre && styles.selectedGenreButton,
            ]}
            onPress={() => handleGenrePress(genre)}
          >
            <Text style={styles.genreText}>{genre}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredMovies}
        renderItem={renderMovie}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        } // Ensure keys are unique
        style={styles.movieList}
        numColumns={3} // Ensure 3 columns layout
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    marginVertical: 20,
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    fontSize: 16,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  genreButton: {
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 20,
    width: "30%",
    alignItems: "center",
  },
  selectedGenreButton: {
    borderWidth: 2,
    borderColor: "#000",
  },
  genreText: {
    fontSize: 16,
    color: "#fff",
  },
  movieList: {
    flex: 1,
  },
  movieItem: {
    padding: 10,
    alignItems: "center",
  },
  moviePoster: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    marginBottom: 5,
    borderRadius: 10,
  },
  movieTitle: {
    fontWeight: "600",
    marginHorizontal: 5,
    marginVertical: 3,
    textAlign: "center",
  },
});

export default CategoryScreen;
