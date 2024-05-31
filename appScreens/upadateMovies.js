import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios"; // Import Axios
import BASE_URL from "../backend/config";
const UpdateMovies = ({ route, navigation }) => {
  const { movie } = route.params;
  const [id, setId] = useState(movie.id);
  const [name, setName] = useState(movie.name);
  const [language, setLanguage] = useState(movie.language);
  const [duration, setDuration] = useState(movie.duration);
  const [genre, setGenre] = useState(movie.genre);
  const [poster, setPoster] = useState(movie.poster);
  const [description, setDescription] = useState(movie.description);
  const [video, setVideo] = useState(movie.video);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${BASE_URL}api/movies/${movie._id}`, {
        id,
        name,
        language,
        duration,
        genre,
        poster,
        description,
        video,
      });
      if (response.status === 200) {
        navigation.goBack();
      } else {
        console.error("Error updating movie");
      }
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.label}>Type:</Text>
        <TextInput style={styles.input} value={id} onChangeText={setId} />
        <Text style={styles.label}>Name:</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
        <Text style={styles.label}>Language:</Text>
        <TextInput
          style={styles.input}
          value={language}
          onChangeText={setLanguage}
        />
        <Text style={styles.label}>Duration:</Text>
        <TextInput
          style={styles.input}
          value={duration}
          onChangeText={setDuration}
        />
        <Text style={styles.label}>Genre:</Text>
        <TextInput style={styles.input} value={genre} onChangeText={setGenre} />
        <Text style={styles.label}>Poster:</Text>
        <TextInput
          style={styles.input}
          value={poster}
          onChangeText={setPoster}
        />
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />
        <Text style={styles.label}>Video:</Text>
        <TextInput style={styles.input} value={video} onChangeText={setVideo} />
        <Button title="Update Movie" onPress={handleUpdate} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default UpdateMovies;
