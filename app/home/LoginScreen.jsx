import React, { useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginForm = ({ navigation }) => {
  const [formdata, setFormdata] = useState({
    UserId: "",
    Password: "",
  });

  const handleChange = (field, value) => {
    setFormdata((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = async () => {
    const { UserId, Password } = formdata;

    if (!UserId || !Password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(
        "https://japps.jcntechnology.in/express/auth/login",
        { UserId, Password }
      );

      if (response.status === 200 && response.data.token) {
        await AsyncStorage.setItem("token", response.data.token);
        await AsyncStorage.setItem('userId', UserId);
        await AsyncStorage.setItem('password', Password);
        

        Alert.alert("Success", "Login successful!", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Attendance"),
          },
        ]);
      } else {
        Alert.alert("Error", "Invalid credentials");
      }
    } catch (error) {
      console.error("API Error:", error);
      Alert.alert("Error", "Failed to login");
    }
  };

  // Login credentials: Username: krunal8264, Password: krunal2
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="UserId"
        value={formdata.UserId}
        onChangeText={(text) => handleChange("UserId", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={formdata.Password}
        onChangeText={(text) => handleChange("Password", text)}
        style={styles.input}
        secureTextEntry
      />
      <Pressable onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <View style={styles.bottomButtons}>
        <Pressable
          onPress={() => navigation.navigate("Register")}
          style={styles.register}
        >
          <Text style={styles.registeration}>Create an account</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("UpdateProfile")}>
          <Text style={styles.update}>Update Profile</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  register: {
    // padding: 10,
    borderRadius: 5,
  },

  registeration: {
    color: "#b87b21",
    fontWeight: "bold",
    // textAlign: "center",
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  update: {
    color: "#b87b21",
    fontWeight: "bold",
  },
});

export default LoginForm;
