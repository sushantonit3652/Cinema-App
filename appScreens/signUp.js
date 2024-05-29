import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import styles from "./styles";
import BASE_URL from "../backend/config";
const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // State for Confirm Password

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
  };

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    const userData = {
      email,
      password,
      confirmPassword,
    };

    axios
      .post(`${BASE_URL}register`, userData)
      .then((res) => {
        if (res.data.status === "ok") {
          navigation.navigate("login");
        } else {
          Alert.alert("Registration failed", res.data.message);
        }
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.log("Response data:", error.response.data);
          console.log("Response status:", error.response.status);
          console.log("Response headers:", error.response.headers);
          Alert.alert("Error", error.response.data.message || "Server error");
        } else if (error.request) {
          // The request was made but no response was received
          console.log("Request data:", error.request);
          Alert.alert("Error", "No response from server");
        } else {
          // Something happened in setting up the request that triggered an error
          console.log("Error message:", error.message);
          Alert.alert("Error", error.message);
        }
      });
  };

  return (
    <View style={[styles.startContainer, { alignItems: "center" }]}>
      <ScrollView style={styles.startScroll}>
        <View style={styles.login__scroll}>
          <View style={styles.login__inputcnt}>
            <Text>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleEmailChange}
              value={email}
              placeholder="Email"
              keyboardType="email-address"
              textAlign="center"
            />
          </View>
          <View style={styles.login__inputcnt}>
            <Text>Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={handlePasswordChange}
              value={password}
              placeholder="Password"
              secureTextEntry
              textAlign="center"
            />
          </View>
          <View style={styles.login__inputcnt}>
            <Text>Confirm Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleConfirmPasswordChange}
              value={confirmPassword}
              placeholder="Confirm Password"
              secureTextEntry
              textAlign="center"
            />
          </View>
          <View style={styles.login__buttoncnt}>
            <TouchableOpacity
              style={[styles.nextButton]}
              onPress={handleSubmit}
            >
              <Text style={styles.nextButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;
