import React from "react";
import {StyleSheet, Text, View, Alert} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";

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
               fontSize: 24,
               color: colors.primary,
            }}
         >
            WhatToDo
         </Text>
         <Ionicons
            name={"trash"}
            size={30}
            color={colors.lightDanger}
            onPress={clearAllTodos}
            style={{paddingBottom: 8}}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   menuBar: {
      marginTop: 28,
      marginHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
   },
});
