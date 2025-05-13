import { Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import SearchResults from "../Components/SearchResults";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Employees = ({ navigation }) => {
  const employees = [
    {
      id: "krunal2001",
      name: "Krunal Chaudhari",
      designation: "Mobile Application Developer",
    },
    {
      id: "kishan2222",
      name: "Kishan Parmar",
      designation: "Sr. Executive IT Support",
    },
    {
      id: "mayur3333",
      name: "Mayur Parmar",
      designation: "Sr. IT Officer",
    },
    {
      id: "dhruvi4444",
      name: "Dhruvi Mistry",
      designation: "Trainee - IT Infra",
    },
    {
      id: "arpan555",
      name: "Arpan Makwana",
      designation: "Trainee - IT Infra",
    },
  ];

  const [input, setInput] = useState("");
  const router = useRouter();

  // console.log(employees);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Ionicons
          onPress={() => router.back()}
          style={{ marginLeft: 10 }}
          name="arrow-back"
          size={24}
          color="black"
        />
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 3,
            height: 40,
            flex: 1,
          }}
        >
          <AntDesign
            style={{ marginLeft: 10 }}
            name="search1"
            size={20}
            color="black"
          />
          <TextInput
            value={input}
            onChangeText={(text) => setInput(text)}
            style={{ flex: 1 }}
            placeholder="Search"
          />
        </Pressable>
      </View>

      {employees.length > 0 ? (
        <SearchResults data={employees} input={input} setInput={setInput} />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No Data</Text>
          <Text>Press on the plus button and add your Employee</Text>
          <Pressable>
            <AntDesign
              style={{ marginTop: 30 }}
              name="pluscircle"
              size={24}
              color="black"
            />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default Employees;

const styles = StyleSheet.create({});
