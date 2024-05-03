import React from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles";
const Start = ({ navigation }) => {
  return (
    <View style={styles.startContainer}>
      <View style={styles.startScroll}>
        <View style={styles.start__src}>
          <View style={styles.start__logoView}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["#D9004E", "#FF4387"]}
              style={styles.start__logoBg}
            >
              <Image
                source={require("../assets/camera.png")}
                resizeMode={"contain"}
                style={styles.start__logo}
              />
            </LinearGradient>
          </View>
          <View style={styles.start__logotextcontainer}>
            <Text style={styles.start__logotext}>Cinema+</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate("welcome")}
        >
          <Text style={styles.nextButtonText}>Get start</Text>
          <Text style={styles.nextButtonText}>Get start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Start;
