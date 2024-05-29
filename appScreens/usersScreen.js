import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import axios from "axios"; // Import Axios
import BASE_URL from "../backend/config";
const UsersScreen = () => {
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${BASE_URL}api/UserInfo`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUserList(response.data);
      } catch (error) {
        setError("Error fetching user data");
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userCardContainer}>
        <Text style={styles.headerText}>User List</Text>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : userList.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={userList}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.userEmail}>{item.email}</Text>
                <Text style={styles.userPassword}>{item.password}</Text>
              </View>
            )}
          />
        ) : (
          <Text>No users found</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  userCardContainer: {
    width: "100%",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  userEmail: {
    fontSize: 18,
    fontWeight: "500",
  },
  userPassword: {
    fontSize: 14,
    color: "#555",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});

export default UsersScreen;
