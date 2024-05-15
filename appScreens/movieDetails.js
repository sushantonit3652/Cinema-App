import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";

const MovieDetails = ({navigation}) => {
  return (
    <View style={styles.movieContainer}>
      <ImageBackground
        style={styles.movieDetail__background}
        resizeMode="cover"
        source={require("../assets/moviebackground.png")}
      ></ImageBackground>
      <View style={styles.movidetail__fottrbackround}>
        <View style={styles.movidetail__sciencebacground}>
          <Text style={styles.sciencetext}>Science fiction</Text>
          <Text style={styles.sciencetext}>Duration: 195 min</Text>
        </View>
        <View style={styles.movidetail__ditailbackground}>
          <View style={styles.movidetail__datebackground}>
            <Image source={require("../assets/calendr.png")}></Image>
            <View style={styles.moviedetails__relasebacground}>
              <Text style={styles.movidetail__relasetext}>Relase date:</Text>
              <Text style={styles.movidetail__relasetext}>14 Nov 2022</Text>
            </View>
          </View>
          <View style={styles.movidetail__datebackground}>
            <Image source={require("../assets/movieIcon.png")}></Image>
            <View style={styles.moviedetails__relasebacground}>
              <Text style={styles.movidetail__relasetext}>
                Dubbed(Hindi,{"\n"} English)
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.nextButton}
          // onPress={() => navigation.navigate("videoPlayer")}
        >
          <Text style={styles.nextButtonText}>Watch Movie</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default MovieDetails;
