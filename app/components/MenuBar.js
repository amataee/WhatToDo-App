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
         {todos != 0 ? (
            <AppIcon
               name={"trash"}
               size={28}
               color={colors.danger}
               onPress={clearAllTodos}
            />
         ) : null}
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   menuBar: {
      marginHorizontal: 18,
      paddingVertical: 6,
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
