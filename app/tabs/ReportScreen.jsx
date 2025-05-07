import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReportScreen = () => {
  const [attendanceHistory, setAttendanceHistory] = useState([]);

  useEffect(() => {
    loadAttendanceHistory();
  }, []);

  const loadAttendanceHistory = async () => {
    const currentUser = JSON.parse(await AsyncStorage.getItem('currentUser'));
    if (currentUser) {
      const key = `attendanceHistory_${currentUser.email}`;
      const storedAttendance = await AsyncStorage.getItem(key);
      if (storedAttendance) {
        const history = JSON.parse(storedAttendance);
        setAttendanceHistory(history);
      }
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1 }}>
      <Text>Date: {item.date}</Text>
      <Text>Type: {item.type}</Text>

      {item.type === 'Present' || item.type === 'Work from Home' ? (
        <>
          <Text>IN: {item.inTime}</Text>
          <Text>OUT: {item.outTime || 'Not Marked'}</Text>
          <Text>Location: {item.location}</Text>
        </>
      ) : null}

      {item.type === 'Leave' && (
        <Text>Leave Reason: {item.reason || 'No reason provided'}</Text>
      )}
    </View>
  );

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Attendance Report</Text>
      <FlatList
        data={attendanceHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ReportScreen;
