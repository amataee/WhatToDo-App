import React from "react";
import {StyleSheet, View} from "react-native";

import colors from "../config/colors";
import AppTextInput from "./AppTextInput";
import AppIcon from "./AppIcon";
import {TouchableOpacity} from "react-native-gesture-handler";

export default function BottomInputContainer({
   todos,
   setTodos,
   textInput,
   setTextInput,
}) {
   const addTodo = () => {
      if (textInput != null) {
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
               multiline={true}
               maxHeight={50}
               onChangeText={(text) => setTextInput(text)}
               onEndEditing={addTodo}
               placeholder="Add Todo..."
               style={{flex: 1}}
               value={textInput}
            />
         </View>
         <TouchableOpacity onPress={addTodo} style={styles.iconContainer}>
            <AppIcon
               name={"add-outline"}
               size={30}
               color={colors.white}
            ></AppIcon>
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
