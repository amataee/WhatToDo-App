import React from "react";
import {StyleSheet, View, TextInput, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";

import colors from "../config/colors";

export default function BottomInputContainer({
   todos,
   setTodos,
   textInput,
   setTextInput,
}) {
   const addTodo = () => {
      if (textInput != "") {
         const newTodo = {
            id: Math.random(),
            task: textInput,
            completed: false,
         };
         setTodos([...todos, newTodo]);
         setTextInput("");
      }
   };

   return (
      <View style={styles.bottom}>
         <View style={styles.inputContainer}>
            <TextInput
               value={textInput}
               placeholder="Add Todo..."
               placeholderTextColor={colors.dark}
               selectionColor={colors.dark}
               onChangeText={(text) => setTextInput(text)}
               onEndEditing={addTodo}
               maxLength={50}
            />
         </View>
         <TouchableOpacity onPress={addTodo}>
            <View style={styles.iconContainer}>
               <Ionicons name="add-outline" color={colors.white} size={30} />
            </View>
         </TouchableOpacity>
      </View>
   );
}

const styles = StyleSheet.create({
   bottom: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
   },
   inputContainer: {
      height: 50,
      paddingHorizontal: 20,
      backgroundColor: colors.medium,
      flex: 1,
      marginVertical: 20,
      marginRight: 20,
      borderRadius: 20,
      justifyContent: "center",
   },
   iconContainer: {
      height: 50,
      width: 50,
      backgroundColor: colors.grayBlue,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
   },
});
