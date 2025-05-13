import React, { useEffect, useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpdateScreen = ({ navigation }) => {
  useEffect(() => {
    AsyncStorage.getItem("token");
  }, []);

  const [formdata, setFormdata] = useState({
    UserId: "",
    Name: "",
    Password: "",
  });

  const handleChange = (field, value) => {
    setFormdata((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = async () => {
    const { UserId, Name, Password } = formdata;

    if (!UserId || !Name || !Password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const response = await axios.put(
        "https://japps.jcntechnology.in/express/auth/user",
        formdata
      );

      if (response.status === 200 || response.status === 201) {
        Alert.alert("Success", "Profile Update Successfully!", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
          },
        ]);

        setFormdata({
          UserId: "",
          Name: "",
          Password: "",
        });
      } else {
        Alert.alert("Error", "Something went wrong");
      }
    } catch (error) {
      console.error("API Error:", error);
      Alert.alert(
        "API Error",
        error?.response?.data?.message || "Failed to register"
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={formdata.UserId}
        onChangeText={(text) => handleChange("UserId", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Full Name"
        value={formdata.Name}
        onChangeText={(text) => handleChange("Name", text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={formdata.Password}
        onChangeText={(text) => handleChange("Password", text)}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Update" onPress={handleRegister} />
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
});

export default UpdateScreen;
