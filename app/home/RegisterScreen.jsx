import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import { launchImageLibrary } from 'react-native-image-picker';


const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);


  const selectImage = async () => {
    // Request permission first
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
  
    // Open Image Picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    console.log('Image Picker Result:', result);
  
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };
  
  

  const handleRegister = async () => {
    const user = {
      fullName,
      birthday,
      gender,
      email,
      mobile,
      password,
      profileImage,
    };
    await AsyncStorage.setItem("user", JSON.stringify(user));
    alert("Registration successful! Please login.");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={selectImage} style={styles.imagePicker}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Text>Select Profile Image</Text>
        )}
      </TouchableOpacity>

      <Text>Full Name:</Text>
      <TextInput
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />
      <Text>Birthday:</Text>
      <TextInput
        value={birthday}
        onChangeText={setBirthday}
        style={styles.input}
      />
      <Text>Gender:</Text>
      <TextInput value={gender} onChangeText={setGender} style={styles.input} />
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} />
      <Text>Mobile:</Text>
      <TextInput value={mobile} onChangeText={setMobile} style={styles.input} />
      <Text>Password:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default RegisterScreen;
