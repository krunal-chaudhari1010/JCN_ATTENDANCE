import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const isLoggedIn = await AsyncStorage.getItem('loggedIn');
    if (isLoggedIn === 'true') {
      navigation.replace('Home'); // Redirect to Home when ready
    }
  };

  const handleLogin = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.email === email && user.password === password) {
        await AsyncStorage.setItem('loggedIn', 'true');
        navigation.replace('Home');
      } else {
        alert('Invalid credentials');
      }
    } else {
      alert('No user found, please register.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <TextInput value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 10 }} />
      <Text>Password:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, marginBottom: 10 }} />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={{ color: 'blue', marginTop: 10 }}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
