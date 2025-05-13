import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AttendanceScreen = () => {
  const [name, setName] = useState("");
  const [currentDate, setCurrentDate] = useState(moment());

  useEffect(() => {
    const init = async () => {
      const userID = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get(
            "https://japps.jcntechnology.in/express/auth/user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const user = response.data.find((user) => user.UserId === userID);
          if (user) setName(user.Name);          
        } catch (error) {
          console.log("Error fetching user data:", error.response?.data || error);
        }
      }
    };
    init();
  }, []);

  const formatDate = (date) => date.format("MMMM D, YYYY");
  const formatTime = (date) => date.format("hh:mm A");

  const markAttendance = async (statusType) => {
    try {
      const key = "attendance";
      const existingData = await AsyncStorage.getItem(key);
      const attendanceList = existingData ? JSON.parse(existingData) : [];

      const newEntry = {
        employeeName: name,
        status: statusType,
        date: formatDate(moment()),
        time: formatTime(moment()),
      };

      attendanceList.push(newEntry);
      await AsyncStorage.setItem(key, JSON.stringify(attendanceList));

      Alert.alert("Marked", `${statusType} recorded for ${name}`);
    } catch (error) {
      console.log("Error saving attendance:", error);
      Alert.alert("Error", "Failed to mark attendance");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ alignItems: "center", marginVertical: 20 }}>
        <Text>{formatDate(currentDate)}</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <View style={styles.avatar}>
          <Text style={{ color: "white", fontSize: 16 }}>{name?.charAt(0)}</Text>
        </View>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>{name}</Text>
      </View>

      <View style={{ marginTop: 40, alignItems: "center" }}>
        <Pressable onPress={() => markAttendance("present-in")} style={styles.attendanceBtn}>
          <Text style={styles.submitText}>Present In</Text>
        </Pressable>
        <Pressable onPress={() => markAttendance("present-out")} style={[styles.attendanceBtn, { marginTop: 20 }]}>
          <Text style={styles.submitText}>Present Out</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: "#4b6cb7",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  attendanceBtn: {
    padding: 15,
    backgroundColor: "#00c6ff",
    borderRadius: 6,
    width: 200,
    alignItems: "center",
  },
  submitText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default AttendanceScreen;
