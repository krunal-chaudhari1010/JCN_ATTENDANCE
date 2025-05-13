import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  Image,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import logo from "../../assets/images/jcn logo.jpg";

const RegisterForm = ({ navigation }) => {
  const [formdata, setFormdata] = useState({
    UserId: "",
    Name: "",
    Email: "",
    Password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormdata((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = async () => {
    setLoading(true);
    const { UserId, Name, Email, Password } = formdata;

    if (!UserId || !Name || !Email || !Password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(
        "https://japps.jcntechnology.in/express/auth/user",
        formdata
      );

      if (response.status === 200 || response.status === 201) {
        Alert.alert("Success", "Registration completed!", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
          },
        ]);
        setFormdata({
          UserId: "",
          Name: "",
          Email: "",
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
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo_container}>
        <Image source={logo} alt="JCN_LOGO" style={styles.company_logo} />
      </View>

      <TextInput
        placeholder="Username"
        placeholderTextColor="rgba(0, 0, 0, 0.2)"
        value={formdata.UserId}
        onChangeText={(text) => handleChange("UserId", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Full Name"
        placeholderTextColor="rgba(0, 0, 0, 0.2)"
        value={formdata.Name}
        onChangeText={(text) => handleChange("Name", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="rgba(0, 0, 0, 0.2)"
        value={formdata.Email}
        onChangeText={(text) => handleChange("Email", text)}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="rgba(0, 0, 0, 0.2)"
        value={formdata.Password}
        onChangeText={(text) => handleChange("Password", text)}
        style={styles.input}
        secureTextEntry
      />

      <View style={styles.register_btn}>
        <Text style={styles.register_txt} onPress={handleRegister}>
          Register
        </Text>

        <Text style={styles.or_txt}>or</Text>

        <Text
          style={styles.login_btn2}
          onPress={() => navigation.navigate("Login")}
        >
          Already have an account? Login
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
    marginHorizontal: 10,
    marginVertical: -10,
  },
  login_btn1: {
    color: "black",
  },
  login_btn2: {
    color: "#8c704d",
    borderWidth: 1,
    borderColor: "#8c704d",
    borderRadius: 30,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  register_txt: {
    backgroundColor: "#e6b57a",
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    fontWeight: "bold",
  },
  register_btn: {
    // justifyContent: "center",
    // alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 30,
  },
  or_txt: {
    fontSize: 15,
    textAlign: "center",
    marginVertical: 25,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  
});

export default RegisterForm;
