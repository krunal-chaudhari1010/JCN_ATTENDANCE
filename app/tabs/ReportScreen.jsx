import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReportScreen = () => {
  const [attendanceHistory, setAttendanceHistory] = useState([]);

  useEffect(() => {
    loadAttendanceHistory();
  }, []);

  const loadAttendanceHistory = async () => {
    const history = await AsyncStorage.getItem('attendanceHistory');
    if (history) {
      setAttendanceHistory(JSON.parse(history));
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Attendance Report</Text>
      
      <FlatList
        data={attendanceHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          item ? (
            <View style={{ padding: 10, borderBottomWidth: 1 }}>
              <Text>Date: {item.date}</Text>
              <Text>IN: {item.inTime} - {item.inLocation}</Text>
              <Text>OUT: {item.outTime ? `${item.outTime} - ${item.outLocation}` : 'Not Marked'}</Text>
              {item.leaveReason !== undefined && item.leaveReason !== '' && (
                <Text>Leave Reason: {item.leaveReason}</Text>
              )}
              {item.workFromHome && <Text>Work from Home</Text>}
            </View>
          ) : null
        )}
      />
    </View>
  );
};

export default ReportScreen;