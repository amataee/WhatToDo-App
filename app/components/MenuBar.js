import React from "react";
import {StyleSheet, Text, View, Alert} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

import colors from "../config/colors";

export default function MenuBar({todos, setTodos}) {
   const clearAllTodos = () => {
      if (todos != 0) {
         Alert.alert("Delete All Todos?", "", [
            {
               text: "No",
            },
            {
               text: "Yes",
               onPress: () => setTodos([]),
            },
         ]);
      }
   };

   return (
      <View style={styles.menuBar}>
         <Text
            style={{
               fontWeight: "bold",
               fontSize: 26,
               color: colors.black,
            }}
         >
            WhatToDo
         </Text>
         <MaterialCommunityIcons
            name="trash-can-outline"
            size={32}
            color={colors.lightDanger}
            onPress={clearAllTodos}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   menuBar: {
      marginTop: 32,
      marginHorizontal: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
   },
});
