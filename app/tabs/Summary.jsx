import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DataTable } from "react-native-paper";

const Summary = () => {
  return (
    <View>
      <View>
        <Text>Krunal</Text>
      </View>

      <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Present</DataTable.Title>
            <DataTable.Title>Present</DataTable.Title>
            <DataTable.Title>Present</DataTable.Title>
            <DataTable.Title>Present</DataTable.Title>
          </DataTable.Header>
        </DataTable>
        <DataTable.Row>
          <DataTable.Cell>1</DataTable.Cell>
          <DataTable.Cell>1</DataTable.Cell>
          <DataTable.Cell>1</DataTable.Cell>
          <DataTable.Cell>1</DataTable.Cell>
        </DataTable.Row>
      </View>
    </View>
  );
};

export default Summary;

const styles = StyleSheet.create({});
