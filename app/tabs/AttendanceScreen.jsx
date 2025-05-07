// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useState, useEffect } from "react";
// import { View, Text, Button, TextInput, Modal, Pressable } from "react-native";
// import * as Location from "expo-location";

// const AttendanceScreen = ({ navigation }) => {
//   const [inTime, setInTime] = useState(null);
//   const [outTime, setOutTime] = useState(null);
//   const [location, setLocation] = useState(null);
//   const [currentDate, setCurrentDate] = useState("");
//   const [leaveReason, setLeaveReason] = useState("");
//   const [isLeaveModalVisible, setIsLeaveModalVisible] = useState(false);
//   const [attendanceType, setAttendanceType] = useState(null);
//   const [currentEmail, setCurrentEmail] = useState("");

//   useEffect(() => {
//     const today = new Date().toLocaleDateString();
//     setCurrentDate(today);
//     loadCurrentUserAndAttendance(today);
//   }, []);

//   const loadCurrentUserAndAttendance = async (today) => {
//     const user = await AsyncStorage.getItem("currentUser");
//     if (user) {
//       const { email } = JSON.parse(user);
//       setCurrentEmail(email);
//       loadAttendance(today, email);
//     }
//   };

//   const loadAttendance = async (today, email) => {
//     const key = `attendanceHistory_${email}`;
//     const storedAttendance = await AsyncStorage.getItem(key);
//     const history = storedAttendance ? JSON.parse(storedAttendance) : [];

//     const todayRecord = history.find((item) => item.date === today);
//     if (todayRecord) {
//       setInTime(todayRecord.inTime);
//       setOutTime(todayRecord.outTime);
//       setLocation(todayRecord.location);
//       setAttendanceType(todayRecord.type);
//       if (todayRecord.reason) setLeaveReason(todayRecord.reason);
//     }
//   };

//   const getLocation = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== "granted") {
//       alert("Permission to access location was denied");
//       return null;
//     }
//     let locationData = await Location.getCurrentPositionAsync({});
//     return `${locationData.coords.latitude}, ${locationData.coords.longitude}`;
//   };

//   const markIn = async (type) => {
//     const now = new Date().toLocaleTimeString();
//     const today = new Date().toLocaleDateString();
//     const locationString =
//       type === "Work from Home" ? "Remote" : await getLocation();

//     const currentUser = JSON.parse(await AsyncStorage.getItem("currentUser"));
//     if (!currentUser) return;

//     const key = `attendanceHistory_${currentUser.email}`;
//     const storedAttendance = await AsyncStorage.getItem(key);
//     const history = storedAttendance ? JSON.parse(storedAttendance) : [];

//     const alreadyExists = history.find((item) => item.date === today);
//     if (alreadyExists) return; // Prevent duplicate

//     history.push({
//       date: today,
//       inTime: now,
//       outTime: null,
//       location: locationString,
//       type,
//     });

//     await AsyncStorage.setItem(key, JSON.stringify(history));
//     setInTime(now);
//     setLocation(locationString);
//     setAttendanceType(type);
//   };

//   const markOut = async () => {
//     const now = new Date().toLocaleTimeString();
//     const today = new Date().toLocaleDateString();

//     const key = `attendanceHistory_${currentEmail}`;
//     const storedAttendance = await AsyncStorage.getItem(key);
//     const history = storedAttendance ? JSON.parse(storedAttendance) : [];

//     const updatedHistory = history.map((item) =>
//       item.date === today ? { ...item, outTime: now } : item
//     );

//     await AsyncStorage.setItem(key, JSON.stringify(updatedHistory));
//     setOutTime(now);
//   };

//   const applyLeave = async () => {
//     const today = new Date().toLocaleDateString();
//     const key = `attendanceHistory_${currentEmail}`;

//     const storedAttendance = await AsyncStorage.getItem(key);
//     const history = storedAttendance ? JSON.parse(storedAttendance) : [];

//     const alreadyExists = history.find((item) => item.date === today);
//     if (alreadyExists) return; // Prevent duplicate

//     history.push({ date: today, type: "Leave", reason: leaveReason });

//     await AsyncStorage.setItem(key, JSON.stringify(history));
//     setAttendanceType("Leave");
//     setIsLeaveModalVisible(false);
//   };

//   // Logout handle function
//   const handleLogout = () => {
//     AsyncStorage.removeItem("token");
//     navigation.navigate("Login");
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
//         Date: {currentDate}
//       </Text>

//       {!attendanceType ? (
//         <>
//           <Button title="Present (IN)" onPress={() => markIn("Present")} />
//           <Button
//             title="Work from Home"
//             onPress={() => markIn("Work from Home")}
//           />
//           <Button title="Leave" onPress={() => setIsLeaveModalVisible(true)} />
//         </>
//       ) : attendanceType === "Leave" ? (
//         <Text>You are on Leave today. Reason: {leaveReason}</Text>
//       ) : (
//         <>
//           <Text>Attendance: {attendanceType}</Text>
//           <Text>IN Time: {inTime}</Text>
//           <Text>Location: {location}</Text>
//           {!outTime && <Button title="Mark OUT" onPress={markOut} />}
//           {outTime && <Text>OUT Time: {outTime}</Text>}
//         </>
//       )}
//       <Pressable onPress={handleLogout}>
//         <Text>Logout</Text>
//       </Pressable>

//       {/* Leave Modal */}
//       <Modal
//         visible={isLeaveModalVisible}
//         transparent={true}
//         animationType="slide"
//       >
//         <View
//           style={{
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
//             backgroundColor: "rgba(0,0,0,0.5)",
//           }}
//         >
//           <View
//             style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
//           >
//             <Text>Enter Leave Reason:</Text>
//             <TextInput
//               value={leaveReason}
//               onChangeText={setLeaveReason}
//               style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
//             />
//             <Button title="Submit" onPress={applyLeave} />
//             <Button
//               title="Cancel"
//               onPress={() => setIsLeaveModalVisible(false)}
//             />
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default AttendanceScreen;

import { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Modal,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AttendanceScreen = ({ navigation }) => {
  const [inTime, setInTime] = useState(null);
  const [outTime, setOutTime] = useState(null);
  const [location, setLocation] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [isLeaveModalVisible, setIsLeaveModalVisible] = useState(false);
  const [attendanceType, setAttendanceType] = useState(null);
  const [currentEmail, setCurrentEmail] = useState("");
  const [credentials, setCredentials] = useState({
    userID: "",
    password: "",
  });
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  // const loadCurrentUser = async () => {
  //   try {
  //     const userId = await AsyncStorage.getItem("userId");
  //     const password = await AsyncStorage.getItem("password");

  //     if (userId && password) {
  //       const data = { userID: userId, password: password };
  //       setCredentials(data);
  //       console.log("Loaded credentials:", data); // Log after loading
  //     } else {
  //       console.log("No stored credentials found");
  //     }
  //   } catch (error) {
  //     console.log("Error loading credentials:", error);
  //   }
  // };

  useEffect(() => {
    const init = async () => {
      const today = new Date().toLocaleDateString();
      setCurrentDate(today);

      // Load stored credentials
      const userId = await AsyncStorage.getItem("userId");
      const password = await AsyncStorage.getItem("password");
      const token = await AsyncStorage.getItem("token");

      if (userId && password) {
        const data = { userID: userId, password: password };
        setCredentials(data);
        console.log("Loaded credentials:", data);
      } else {
        console.log("No stored credentials found");
      }

      if (token) {
        try {
          const response = await axios
            .get("https://japps.jcntechnology.in/express/auth/user", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              setData(res.data);
              const username = res.data.find((user) => user.UserId === userId);
              if (username) {
                setName(username.Name);
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

  // const getLocation = async () => {
  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== "granted") {
  //     alert("Permission to access location was denied");
  //     return null;
  //   }
  //   let locationData = await Location.getCurrentPositionAsync({});
  //   return `${locationData.coords.latitude}, ${locationData.coords.longitude}`;
  // };
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return null;
    }

    let locationData = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = locationData.coords;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=22.2791946&lon=73.0944664&format=json`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (compatible; AttendanceApp/1.0; +http://yourdomain.com)",
          },
        }
      );
      const data = await response.json();
      const locationName = data.display_name || `${latitude}, ${longitude}`;
      return locationName;
    } catch (error) {
      console.error("Error fetching location name:", error);
      return `${latitude}, ${longitude}`;
    }
  };

  const markIn = async (type) => {
    const now = new Date().toLocaleTimeString();
    const locationString =
      type === "Work from Home" ? "Remote" : await getLocation();

    setInTime(now);
    setLocation(locationString);
    setAttendanceType(type);

    console.log("Marked in at:", locationString);
  };

  const markOut = () => {
    const now = new Date().toLocaleTimeString();
    setOutTime(now);
  };

  const applyLeave = () => {
    setAttendanceType("Leave");
    setIsLeaveModalVisible(false);
  };

  const handleLogout = () => {
    AsyncStorage.removeItem("token");
    navigation.navigate("Login");
    if (AsyncStorage.getItem("token")) {
      Alert.alert("Logout Successful");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Date: {currentDate}
      </Text>

      <View>
        <Text style={styles.name}>Hello, {name}</Text>
      </View>

      {!attendanceType ? (
        <>
          <Button title="Present (IN)" onPress={() => markIn("Present")} />
          <Button
            title="Work from Home"
            onPress={() => markIn("Work from Home")}
          />
          <Button title="Leave" onPress={() => setIsLeaveModalVisible(true)} />
        </>
      ) : attendanceType === "Leave" ? (
        <Text>You are on Leave today. Reason: {leaveReason}</Text>
      ) : (
        <>
          <Text>Attendance: {attendanceType}</Text>
          <Text>IN Time: {inTime}</Text>
          <Text>Location: {location}</Text>
          {!outTime && <Button title="Mark OUT" onPress={markOut} />}
          {outTime && <Text>OUT Time: {outTime}</Text>}
        </>
      )}
      <Pressable onPress={handleLogout}>
        <Text>Logout</Text>
      </Pressable>

      {/* Leave Modal */}
      <Modal
        visible={isLeaveModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
          >
            <Text>Enter Leave Reason:</Text>
            <TextInput
              value={leaveReason}
              onChangeText={setLeaveReason}
              style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
            />
            <Button title="Submit" onPress={applyLeave} />
            <Button
              title="Cancel"
              onPress={() => setIsLeaveModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AttendanceScreen;

const styles = StyleSheet.create({
  name: {
    fontWeight: "bold",
  },
});
