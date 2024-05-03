import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import styles from "./styles";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleLogin = () => {
    // Validate email and password
    if (email.trim() === "") {
      Alert.alert("Error", "Please enter your email");
      return;
    }
    if (password.trim() === "") {
      Alert.alert("Error", "Please enter your password");
      return;
    }

    // Perform login logic (e.g., send API request)
    // For demonstration purposes, just display the email and password
    Alert.alert("Login Details", `Email: ${email}\nPassword: ${password}`);

    // Clear input fields after login
    setEmail("");
    setPassword("");
  };

  const showAlert = () => {
    Alert.alert("Alert", "Forget Password", [
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
            {[...Array(2)].map((_, index) => (
              <View style={styles.login__inputcnt} key={index}>
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
            ))}
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
              <Text style={styles.login__skipLink}>Skip it</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
  
};

export default Login;
