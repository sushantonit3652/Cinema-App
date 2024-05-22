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


const Login = ({ navigation }) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        // Check if email or password is empty
        Alert.alert("Error", "Please fill in both email and password");
        return;
      }

      const response = await fetch("http://192.168.1.33:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        if (data.status === "ok") {
          // Navigate to the home screen or next screen on successful login
          navigation.navigate("welcome");
        } else if (data.status === "loginok") {
          // Navigate to the home screen or next screen on successful login
          navigation.navigate("homeScreen");
        } else if (data.status === "adminloginok") {
          // Navigate to the home screen or next screen on successful login
          navigation.navigate("adminPanel");
        } else {
          // Check if the error message is "Invalid password" and show an alert
          if (data.error === "Invalid password") {
            Alert.alert("Error", "Invalid password");
          } else {
            Alert.alert("Error", "Invalid credentials");
          }
        }
      } else if (response.status === 400) {
        Alert.alert("Error", "Invalid password");
      } else {
        const data = await response.json();

        console.error("Server Error:", response.status);
        console.error("Server Error:", data.error);
        Alert.alert("Error", "Server Error");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      Alert.alert("Error", "Internal server error");
    }
  };

  const showAlert = () => {
    Alert.alert("Alert", "Forget Password", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };

  const skipit = () => {
    Alert.alert("Alert", "Skip it", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };

  return (
    <View style={[styles.startContainer, { alignItems: "center" }]}>
      <ScrollView style={styles.startScroll}>
        <View style={styles.login__scroll}>
          <View style={styles.login__cinemacnt}>
            <Text style={styles.login__cinema}>Cinema+</Text>
            <Text style={styles.login__text}>Enter Your Data</Text>
          </View>
          <View style={styles.login__textinputcnt}>
            <View style={styles.login__inputcnt}>
              <Text>Email</Text>
              <TextInput
                xtInput
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
            <Text style={styles.login__forgetText} onPress={showAlert}>
              Forget Password
            </Text>
          </View>
          <View style={styles.login__buttoncnt}>
            <TouchableOpacity style={[styles.nextButton]} onPress={handleLogin}>
              <Text style={styles.nextButtonText}>Log in</Text>
            </TouchableOpacity>
            <View style={styles.login__skipit}>
              <Text style={styles.login__skipText}>
                Don't want to create an account
              </Text>
              <Text
                style={styles.login__skipLink}
                onPress={() => navigation.navigate("homeScreen")}
              >
                Skip it
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
