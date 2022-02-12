import React from "react";
import {StyleSheet, View, TouchableOpacity} from "react-native";

import colors from "../config/colors";
import AppTextInput from "./AppTextInput";
import AppIcon from "./AppIcon";

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
         setTextInput(null);
      }
   };

   return (
      <View style={styles.bottom}>
         <View style={styles.inputContainer}>
            <AppTextInput
               value={textInput}
               placeholder="Add Todo..."
               placeholderTextColor={colors.dark}
               selectionColor={colors.dark}
               onChangeText={(text) => setTextInput(text)}
               onEndEditing={addTodo}
               maxLength={50}
               style={{fontSize: 16}}
            />
         </View>
         <TouchableOpacity onPress={addTodo} style={styles.iconContainer}>
            <AppIcon name="add-outline" color={colors.white} size={30} />
         </TouchableOpacity>
      </View>
   );
}

const styles = StyleSheet.create({
   bottom: {
      position: "absolute",
      bottom: 4,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
   },
   inputContainer: {
      flex: 1,
      marginHorizontal: 4,
      marginVertical: 8,
   },
   iconContainer: {
      height: 50,
      width: 50,
      backgroundColor: colors.grayBlue,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
   },
});
