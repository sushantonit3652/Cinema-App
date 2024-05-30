import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  View,
  Text,
  FlatList,
  SafeAreaView,
} from "react-native";
import axios from "axios";

const Bollywood = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Bollywood</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  searchInput: {
    flex: 1,
    height: 40,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  poster: {
    width: 50,
    height: 75,
    marginRight: 16,
  },
  movieTitle: {
    fontSize: 18,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Bollywood;
