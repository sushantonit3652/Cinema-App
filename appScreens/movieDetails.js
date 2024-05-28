import React, { useEffect, useState } from "react";
import { View, Text, Image, ImageBackground, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "./styles";

const MovieDetails = ({ navigation , route}) => {
  const { movieId } = route.params;
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://192.168.1.33:3000/api/movies/details`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'movie-id': movieId // sending movieId in headers
          },
          body: JSON.stringify({ movieId }) // sending movieId in body
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        setMovieDetails(data);
      } catch (fetchError) {
        console.error("Error fetching movie details:", fetchError);
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

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
        <Text style={styles.errorText}>Error loading movie details: {error}</Text>
      </View>
    );
  }

  if (!movieDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No movie details available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.movieContainer}>
    <ImageBackground
      style={styles.movieDetail__background}
      resizeMode="cover"
      source={{ uri: movieDetails.poster }}
    ></ImageBackground>
    <View style={styles.movidetail__fottrbackround}>
      <View style={styles.movidetail__sciencebacground}>
        <Text style={styles.sciencetext}>{movieDetails.name}</Text>
        <Text style={styles.sciencetext}>Duration: {movieDetails.duration}</Text>
      </View>
      <View style={styles.movidetail__ditailbackground}>
        <View style={styles.movidetail__datebackground}>
          <Image source={require("../assets/calendr.png")}></Image>
          <View style={styles.moviedetails__relasebacground}>
            <Text style={styles.movidetail__relasetext}>Genre:</Text>
            <Text style={styles.movidetail__relasetext}>{movieDetails.genre}</Text>
          </View>
        </View>
        <View style={styles.movidetail__datebackground}>
          <Image source={require("../assets/movieIcon.png")}></Image>
          <View style={styles.moviedetails__relasebacground}>
            <Text style={styles.movidetail__relasetext}>
            {movieDetails.language}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate("videoScreen", { videoUrl: movieDetails.video })} // pass videoUrl here
        >
        <Text style={styles.nextButtonText}>Watch Movie</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
};

export default MovieDetails;
