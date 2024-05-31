import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import BASE_URL from "../backend/config";

const AddMovies = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    duration: "",
    genre: "",
    language: "",
    poster: "",
    description: "",
    video: "",
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${BASE_URL}movies`, formData);
      console.log("Response:", response.data);
      setFormData({
        id: "",
        name: "",
        duration: "",
        genre: "",
        language: "",
        poster: "",
        description: "",
        video: "",
      });
      // Show success message or navigate to another screen
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error Response:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error Request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error Message:", error.message);
      }
      // Handle error (e.g., show error message)
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.label}>Type:</Text>
        <TextInput
          style={styles.input}
          value={formData.id}
          onChangeText={(text) => handleChange("id", text)}
        />
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => handleChange("name", text)}
        />
        <Text style={styles.label}>Duration:</Text>
        <TextInput
          style={styles.input}
          value={formData.duration}
          onChangeText={(text) => handleChange("duration", text)}
        />
        <Text style={styles.label}>Genre:</Text>
        <TextInput
          style={styles.input}
          value={formData.genre}
          onChangeText={(text) => handleChange("genre", text)}
        />
        <Text style={styles.label}>Language:</Text>
        <TextInput
          style={styles.input}
          value={formData.language}
          onChangeText={(text) => handleChange("language", text)}
        />
        <Text style={styles.label}>Poster:</Text>
        <TextInput
          style={styles.input}
          value={formData.poster}
          onChangeText={(text) => handleChange("poster", text)}
        />
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.input}
          value={formData.description}
          onChangeText={(text) => handleChange("description", text)}
        />
        <Text style={styles.label}>Video:</Text>
        <TextInput
          style={styles.input}
          value={formData.video}
          onChangeText={(text) => handleChange("video", text)}
        />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default AddMovies;
