// MovieCard.js
import React from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const MovieCard = ({title, posterUrl }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("movieDetails")}
    >
      <Image source={{ uri: posterUrl }} style={styles.poster} />
      {/* <Text style={styles.title}>{title}</Text> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  //   card: {
  //     backgroundColor: '#fff',
  //     borderRadius: 10,
  //     shadowColor: '#000',
  //     shadowOffset: { width: 0, height: 2 },
  //     shadowOpacity: 0.25,
  //     shadowRadius: 4,
  //
  //
  //     padding: 10,
  //   },
  poster: {
    width: 105,
    height: 180,
    resizeMode: "cover",
    borderRadius: 10,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MovieCard;
