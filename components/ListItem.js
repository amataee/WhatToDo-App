import React from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

import colors from "../app/config/colors";

export default function ListItem({todo, todos, setTodos}) {
   const markTodoComplete = (todoId) => {
      const newTodosItem = todos.map((item) => {
         if (item.id == todoId && item.completed == false) {
            return {...item, completed: true};
         } else if (item.id == todoId && item.completed == true) {
            return {...item, completed: false};
         }
         return item;
      });

      setTodos(newTodosItem);
   };

   const deleteTodo = (todoId) => {
      const newTodosItem = todos.filter((item) => item.id != todoId);
      setTodos(newTodosItem);
   };

   return (
      <View style={styles.listItem}>
         {!todo?.completed && (
            <TouchableOpacity onPress={() => markTodoComplete(todo.id)}>
               <View style={[styles.actionIcon]}>
                  <MaterialCommunityIcons
                     name="checkbox-blank-circle-outline"
                     size={30}
                     color={colors.green}
                  />
               </View>
            </TouchableOpacity>
         )}
         {todo?.completed && (
            <TouchableOpacity onPress={() => markTodoComplete(todo.id)}>
               <View style={[styles.actionIcon]}>
                  <MaterialCommunityIcons
                     name="checkbox-marked-circle-outline"
                     size={30}
                     color={colors.green}
                  />
               </View>
            </TouchableOpacity>
         )}
         <View style={{flex: 1, justifyContent: "center"}}>
            <Text
               style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  color: colors.primary,
                  marginHorizontal: 16,

                  textDecorationLine: todo?.completed ? "line-through" : "none",
               }}
            >
               {todo?.task}
            </Text>
         </View>
         <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
            <View style={styles.actionIcon}>
               <MaterialCommunityIcons
                  name="close"
                  size={30}
                  color={colors.grayBlue}
               />
            </View>
         </TouchableOpacity>
      </View>
   );
}

const styles = StyleSheet.create({
   listItem: {
      padding: 22,
      backgroundColor: colors.light,
      flexDirection: "row",
      borderRadius: 7,
      marginVertical: 10,
   },
   actionIcon: {
      height: 35,
      width: 35,
      justifyContent: "center",
      alignItems: "center",
   },
});
