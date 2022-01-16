import React, {Component} from "react";
import {
   StyleSheet,
   Text,
   View,
   Alert,
   Platform,
   AppRegistry,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {StackNavigator} from "react-navigation";

import colors from "../config/colors";

export default function MenuBar({todos, setTodos}) {
   // static navigationOptions =
   // {
   //    title: 'MainActivity',
   // };

   // FunctionToOpenSecondActivity = () => {
   //    this.props.navigation.navigate("Second");
   // };

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

   const Wait = () => {
      Alert.alert("Authentication not ready yet!", "", [
         {
            text: "OK, I'm waiting!",
         },
      ]);
   };

   return (
      <View style={styles.menuBar}>
         <Ionicons
            name={"person"}
            size={30}
            color={colors.light}
            onPress={Wait}
            style={{paddingBottom: 8}}
         />
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
            color={todos != 0 ? colors.danger : colors.lightDanger}
            onPress={clearAllTodos}
            style={{paddingBottom: 8}}
         />
      </View>
   );
}

const styles = StyleSheet.create({
   menuBar: {
      marginTop: Platform.OS === "android" ? 28 : 0,
      marginHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
   },
   MainContainer: {
      justifyContent: "center",
      flex: 1,
      margin: 10,
   },

   TextStyle: {
      fontSize: 23,
      textAlign: "center",
      color: "#000",
   },
});
