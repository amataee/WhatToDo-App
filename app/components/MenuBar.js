import React from "react";
import {StyleSheet, Text, Alert} from "react-native";

import colors from "../config/colors";
import {SafeAreaView} from "react-native-safe-area-context";
import AppIcon from "./AppIcon";

export default function MenuBar({todos, setTodos}) {
   const clearAllTodos = () => {
      todos != 0
         ? Alert.alert("Delete All Todos?", "", [
              {
                 text: "No",
              },
              {
                 text: "Yes",
                 onPress: () => setTodos([]),
              },
           ])
         : null;
   };

   return (
      <SafeAreaView style={styles.menuBar}>
         <Text style={styles.title}>WhatToDo</Text>
         <AppIcon
            name={"trash"}
            size={30}
            color={todos != 0 ? colors.danger : colors.lightDanger}
            onPress={clearAllTodos}
            style={{paddingBottom: 8}}
         />
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   menuBar: {
      marginHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
   },
   title: {
      fontWeight: "bold",
      fontSize: 24,
      color: colors.primary,
   },
});
