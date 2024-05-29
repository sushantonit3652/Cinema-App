import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import axios from 'axios';
import BASE_URL from "../backend/config";
const DeleteMovies = ({ route, navigation }) => {
  const { movieId } = route.params;

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${BASE_URL}api/movies/${movieId}`);
      if (response.status === 200) {
        navigation.goBack();
      } else {
        console.error("Error deleting movie");
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Are you sure you want to delete this movie?</Text>
      <Text style={styles.movieId}>ID: {movieId}</Text>
      <Button title="Delete Movie" onPress={handleDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  movieId: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
  },
});

export default DeleteMovies;
