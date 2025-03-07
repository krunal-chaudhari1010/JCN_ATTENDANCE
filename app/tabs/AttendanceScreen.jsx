import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Modal } from 'react-native';
import * as Location from 'expo-location';

const AttendanceScreen = () => {
  const [inTime, setInTime] = useState(null);
  const [outTime, setOutTime] = useState(null);
  const [location, setLocation] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  const [leaveReason, setLeaveReason] = useState('');
  const [isLeaveModalVisible, setIsLeaveModalVisible] = useState(false);
  const [attendanceType, setAttendanceType] = useState(null); // Present, Work from Home, Leave

  useEffect(() => {
    const today = new Date().toLocaleDateString();
    setCurrentDate(today);
    loadAttendance(today);
  }, []);

  const loadAttendance = async (today) => {
    const storedAttendance = await AsyncStorage.getItem('attendanceHistory');
    const history = storedAttendance ? JSON.parse(storedAttendance) : [];

    // Find today's record
    const todayRecord = history.find((item) => item.date === today);
    if (todayRecord) {
      setInTime(todayRecord.inTime);
      setOutTime(todayRecord.outTime);
      setLocation(todayRecord.location);
      setAttendanceType(todayRecord.type);
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return null;
    }
    let locationData = await Location.getCurrentPositionAsync({});
    return `${locationData.coords.latitude}, ${locationData.coords.longitude}`;
  };

  const markIn = async (type) => {
    const now = new Date().toLocaleTimeString();
    const today = new Date().toLocaleDateString();
    const locationString = type === 'Work from Home' ? 'Remote' : await getLocation();

    const storedAttendance = await AsyncStorage.getItem('attendanceHistory');
    const history = storedAttendance ? JSON.parse(storedAttendance) : [];

    // Add today's record
    history.push({ date: today, inTime: now, outTime: null, location: locationString, type });

    await AsyncStorage.setItem('attendanceHistory', JSON.stringify(history));
    setInTime(now);
    setLocation(locationString);
    setAttendanceType(type);
  };

  const markOut = async () => {
    const now = new Date().toLocaleTimeString();
    const today = new Date().toLocaleDateString();

    const storedAttendance = await AsyncStorage.getItem('attendanceHistory');
    const history = storedAttendance ? JSON.parse(storedAttendance) : [];

    // Update today's record
    const updatedHistory = history.map((item) =>
      item.date === today ? { ...item, outTime: now } : item
    );

    await AsyncStorage.setItem('attendanceHistory', JSON.stringify(updatedHistory));
    setOutTime(now);
  };

  const applyLeave = async () => {
    const today = new Date().toLocaleDateString();

    const storedAttendance = await AsyncStorage.getItem('attendanceHistory');
    const history = storedAttendance ? JSON.parse(storedAttendance) : [];

    // Add leave record
    history.push({ date: today, type: 'Leave', reason: leaveReason });

    await AsyncStorage.setItem('attendanceHistory', JSON.stringify(history));
    setAttendanceType('Leave');
    setIsLeaveModalVisible(false);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Date: {currentDate}</Text>

      {!attendanceType ? (
        <>
          <Button title="Present (IN)" onPress={() => markIn('Present')} />
          <Button title="Work from Home" onPress={() => markIn('Work from Home')} />
          <Button title="Leave" onPress={() => setIsLeaveModalVisible(true)} />
        </>
      ) : attendanceType === 'Leave' ? (
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

      {/* Leave Modal */}
      <Modal visible={isLeaveModalVisible} transparent={true} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text>Enter Leave Reason:</Text>
            <TextInput value={leaveReason} onChangeText={setLeaveReason} style={{ borderWidth: 1, marginBottom: 10 }} />
            <Button title="Submit" onPress={applyLeave} />
            <Button title="Cancel" onPress={() => setIsLeaveModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AttendanceScreen;
