import React, { useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logo from "../../assets/images/jcn logo.jpg";

const LoginForm = ({ navigation }) => {
  const [formdata, setFormdata] = useState({
    UserId: "",
    Password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormdata((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = async () => {
    setLoading(true);
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

        try {
          await AsyncStorage.setItem("token", response.data.token);
          await AsyncStorage.setItem("userId", UserId);
          await AsyncStorage.setItem("password", Password);
        } catch (storageError) {
          console.error("Storage Error:", storageError);
          Alert.alert("Error", "Failed to save data locally.");
        }

        Alert.alert("Success", "Login successful!", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Home"),
          },
        ]);
      } else {
        Alert.alert("Error", "Invalid credentials");
      }
    } catch (error) {
      console.error("API Error:", error);
      Alert.alert("Error", "Failed to login");
    }
    setLoading(false);
  };

  // Login credentials: Username: krunal8264, Password: krunal2
  return (
    <View style={styles.container}>
      <View style={styles.logo_container}>
        <Image source={logo} alt="JCN_LOGO" style={styles.company_logo} />
      </View>
      <TextInput
        placeholder="UserId"
        placeholderTextColor="rgba(0, 0, 0, 0.2)"
        value={formdata.UserId}
        onChangeText={(text) => handleChange("UserId", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="rgba(0, 0, 0, 0.2)"
        value={formdata.Password}
        onChangeText={(text) => handleChange("Password", text)}
        style={styles.input}
        secureTextEntry
      />
      <Pressable onPress={handleLogin} style={styles.login_btn}>
        <Text style={styles.login_txt}>Login</Text>
      </Pressable>

      <View style={styles.line} />

      <View style={styles.bottom_tabs}>
        <Text
          style={styles.register_btn}
          onPress={() => navigation.navigate("Register")}
        >
          New User ? Sign Up
        </Text>
      </View>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#8c704d" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "white",
    paddingBottom: 600,
  },
  company_logo: {
    height: 120,
    width: 120,
  },
  logo_container: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 0.5,
    borderColor: "#999",
    padding: 10,
    marginBottom: 15,
    borderRadius: 30,
  },
  login_txt: {
    backgroundColor: "#e6b57a",
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    fontWeight: "bold",
  },
  login_btn: {
    margin: 10,
  },
  line: {
    borderWidth: 0.5,
    borderColor: "gray",
    marginVertical: 20,
    marginHorizontal: 10,
  },
  bottom_tabs: {
    margin: 10,
  },
  register_btn: {
    color: "#8c704d",
    borderWidth: 1,
    borderColor: "#8c704d",
    borderRadius: 30,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});

export default LoginForm;
