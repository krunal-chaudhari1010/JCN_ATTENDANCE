import React, { useEffect, useState } from "react";
import { View, Text, Button, Alert, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomTabs from "../navigation/BottomTabs";

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState({ fullName: "", email: "" });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const userData = await AsyncStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => {
          await AsyncStorage.removeItem("loggedIn");
          navigation.replace("Login");
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={
            user.profileImage
              ? { uri: user.profileImage }
              : require("../../assets/images/profile.png")
          }
          style={styles.profileImage}
        />

        <View>
          <Text style={styles.userName}>{user.fullName || "User"}</Text>
          <Text style={styles.userEmail}>
            {user.email || "user@example.com"}
          </Text>
        </View>
        <Button title="Logout" onPress={handleLogout} color="red" />
      </View>

      <BottomTabs />
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
    color: "gray",
  },
});

export default HomeScreen;
