import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Import Screens
import AttendanceScreen from "../tabs/AttendanceScreen";
import ExpenseScreen from "../tabs/ExpenseScreen";
import TasksScreen from "../tabs/MyTasksScreen";
import Summary from "../tabs/Summary";
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Attendance') {
              iconName = focused ? 'clipboard-check' : 'clipboard-check-outline';
            } else if (route.name === 'Expense') {
              iconName = focused ? 'currency-usd' : 'currency-usd-off';
            } else if (route.name === 'MyTasks') {
              iconName = focused ? 'check-circle' : 'check-circle-outline';
            } else if (route.name === 'Report') {
              iconName = focused ? 'file-chart' : 'file-chart-outline';
            }

            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { paddingBottom: 10, height: 60 },
      })}
    >
      <Tab.Screen name="Attendance" component={AttendanceScreen} />
      <Tab.Screen name="Expense" component={ExpenseScreen} />
      <Tab.Screen name="MyTasks" component={TasksScreen} />
      <Tab.Screen name="Report" component={Summary} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
