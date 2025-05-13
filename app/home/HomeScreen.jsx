import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Button,
  Alert,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Entypo, Ionicons, Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import company_logo from "../../assets/images/jcn logo.jpg";
import * as Device from "expo-device";
import axios from "axios";

const HomeScreen = ({ navigation }) => {
  const [token, setToken] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const init = async () => {
      const userID = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("token");

      if (token) {
        try {
          const response = await axios
            .get("https://japps.jcntechnology.in/express/auth/user", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              const username = res.data.find((user) => user.UserId === userID);
              if (username) {
                setName(username.Name);
                console.log(name);
              } else {
                console.log("User not found in fetched data");
              }
            });

          // console.log("User data:", response.data);
        } catch (error) {
          console.log(
            "Error fetching user data:",
            error.response?.data || error
          );
        }
      } else {
        console.log("No token found");
      }
    };
    init();
  }, []);

  // Device ID
  useEffect(() => {
    const getAndStoreDeviceId = async () => {
      try {
        const uniqueId =
          Device.osInternalBuildId ||
          Device.modelId ||
          Device.deviceName ||
          "unknown-device";

        await AsyncStorage.setItem("device_id", uniqueId);
        setDeviceId(uniqueId);
        console.log("Device ID stored:", uniqueId);
      } catch (error) {
        console.error("Error fetching or storing device ID:", error);
      }
    };

    getAndStoreDeviceId();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("token").then((res) => setToken(res));
  }, []);

  const router = useRouter();
  return (
    <ScrollView>
      <LinearGradient colors={["#e89b43", "#E9E4F0"]} style={{ flex: 1 }}>
        <View style={{ padding: 12 }}>
          <View style={styles.employee_management_system}>
            <Image source={company_logo} alt="logo" style={styles.logo} />

            <Text style={styles.employee_management_system_text}>
              JCN TECHNOLOGY PRIVATE LIMITED
            </Text>
            <Entypo name="lock" size={24} color="black" />
          </View>

          <View
            style={{
              marginVertical: 15,
              marginHorizontal: 5,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              Hello, {name}
            </Text>
          </View>

          {/* ---------------------------Upper Tabs------------------------ */}
          <View style={styles.employee_list_attendance_view}>
            <Pressable
              style={styles.employee_list_pressable}
              onPress={() => navigation.navigate("Employees")}
            >
              <View style={styles.employee_list_icon}>
                <Ionicons name="people-sharp" size={24} color="black" />
              </View>
              <Text style={styles.employee_list_text}>Employee List</Text>
            </Pressable>
            <Pressable
              style={styles.mark_attendance_pressable}
              onPress={() => navigation.navigate("Attendance")}
            >
              <View style={styles.mark_attendance_icon}>
                <Ionicons name="people-sharp" size={24} color="black" />
              </View>
              <Text style={styles.mark_attendance_text}>Mark Attendance</Text>
            </Pressable>
          </View>

          {/* --------------------------Middle Tabs------------------------- */}
          <View style={styles.tabs_view}>
            <Pressable style={styles.attendance_report_pressable}>
              <View style={styles.attendance_report_icon}>
                <Ionicons name="newspaper-outline" size={24} color="black" />
              </View>
              <Text style={styles.attendance_report_text}>
                Attendance Report
              </Text>
              <View style={styles.attendance_report_open_icon}>
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </Pressable>

            <Pressable
              style={styles.summary_report_pressable}
              onPress={() => navigation.navigate("Summary")}
            >
              <View style={styles.summmary_report_icon}>
                <Octicons name="repo-pull" size={24} color="black" />
              </View>
              <Text style={styles.summary_report_text}>Summary Report</Text>
              <View style={styles.summary_report_open_icon}>
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </Pressable>

            <Pressable style={styles.generate_report_pressable}>
              <View style={styles.generate_report_icon}>
                <Octicons name="report" size={24} color="black" />
              </View>
              <Text style={styles.generate_report_text}>
                All Generate Reports
              </Text>
              <View style={styles.generate_report_open_icon}>
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </Pressable>

            <Pressable style={styles.overtime_employees_pressable}>
              <View style={styles.overtime_employees_icon}>
                <Ionicons name="people" size={24} color="black" />
              </View>
              <Text style={styles.overtime_employees_text}>
                Overtime Employees
              </Text>
              <View style={styles.overtime_employees_open_icon}>
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </Pressable>
          </View>

          <Button
            title="logout"
            onPress={() => {
              AsyncStorage.removeItem("token");
              navigation.navigate("Login");
            }}
          />
        </View>
        <View style={{ padding: 20, marginTop: 50 }}>
          <Text>Device ID: {deviceId}</Text>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  employee_management_system: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  employee_management_system_text: { fontSize: 16, fontWeight: "900" },
  employee_list_attendance_view: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  employee_list_pressable: {
    backgroundColor: "#634625",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  employee_list_icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  employee_list_text: { marginTop: 7, fontWeight: "600" },
  mark_attendance_pressable: {
    backgroundColor: "#634625",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  mark_attendance_icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  mark_attendance_text: { marginTop: 7, fontWeight: "600" },
  tabs_view: {
    marginTop: 20,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 7,
  },
  attendance_report_pressable: {
    backgroundColor: "#e89b43",
    borderRadius: 6,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  attendance_report_icon: {
    padding: 7,
    width: 45,
    height: 45,
    borderRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  attendance_report_text: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  attendance_report_open_icon: {
    width: 35,
    height: 35,
    borderRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  summary_report_pressable: {
    backgroundColor: "#e89b43",
    borderRadius: 6,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  summmary_report_icon: {
    padding: 7,
    width: 45,
    height: 45,
    borderRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  summary_report_text: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  summary_report_open_icon: {
    width: 35,
    height: 35,
    borderRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  generate_report_pressable: {
    backgroundColor: "#e89b43",
    borderRadius: 6,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  generate_report_icon: {
    padding: 7,
    width: 45,
    height: 45,
    borderRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  generate_report_text: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  generate_report_open_icon: {
    width: 35,
    height: 35,
    borderRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  overtime_employees_pressable: {
    backgroundColor: "#e89b43",
    borderRadius: 6,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  overtime_employees_icon: {
    padding: 7,
    width: 45,
    height: 45,
    borderRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  overtime_employees_text: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  overtime_employees_open_icon: {
    width: 35,
    height: 35,
    borderRadius: 7,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
