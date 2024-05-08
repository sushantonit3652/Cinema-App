import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios, { Axios } from "axios";
import styles from "./styles";

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
    // Function for handling Confirm Password changes
    setConfirmPassword(text);
  };

  function handelSubmit() {
    const userData = {
      email,
      password,
      confirmPassword,
    };
    axios
      .post("http://192.168.1.33:3000/register", userData)
      .then((res) => {
        console.log(res.data);

        if (res.data.status === "ok") {
          navigation.navigate("login");
        } else {
          console.log("Registration failed:", res.data.message);
        }
      })

      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }

  return (
    <View style={[styles.startContainer, { alignItems: "center" }]}>
      <ScrollView style={styles.startScroll}>
        <View style={styles.login__scroll}>
          {/* Existing code for login form */}
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
          {/* New TextInput for Confirm Password */}
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
          {/* Existing code for Forget Password, Login Button, and Skip Link */}
          <View style={styles.login__buttoncnt}>
            <TouchableOpacity
              style={[styles.nextButton]}
              onPress={handelSubmit}
            >
              <Text style={styles.nextButtonText}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;
