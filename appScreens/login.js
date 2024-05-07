import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from "react-native";
import axios from 'axios'; // Import Axios once
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

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.1.33/api/auth', {
        action: 'login',
        email,
        password,
      });
  
      console.log('Login attempt:', { email });
  
      if (response.data.message === 'Login successful') {
        console.log('Login successful:', { email });
        // Navigate to the next screen on successful login
        navigation.navigate('NextScreen');
      } else if (response.data.message === 'User not found') {
        console.log('User not found:', { email });
        // If user is not found, attempt to register
        handleRegister();
      } else {
        console.log('Error logging in:', response.data.message);
        // Handle other responses, such as incorrect password
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error', 'Internal server error');
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
              <Text style={styles.login__skipLink} onPress={skipit}>Skip it</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
