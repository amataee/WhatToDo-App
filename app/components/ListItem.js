import React from "react";
import {StyleSheet, TextInput, View, TouchableOpacity} from "react-native";

import colors from "../config/colors";
import AppIcon from "./AppIcon";

export default function ListItem({todo, todos, setTodos}) {
   const [todoTitle, setTodoTitle] = React.useState(todo?.task);
   const [TodoTitleFromTextInput, setTodoTitleFromTextInput] = React.useState(
      todo?.task
   );

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

   const editTodo = (todoId) => {
      const newTodosItem = todos.map((item) => {
         if (item.id == todoId) {
            return {...item, task: TodoTitleFromTextInput};
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
         <TouchableOpacity
            onPress={() => markTodoComplete(todo.id)}
            style={[styles.actionIcon]}
         >
            <AppIcon
               name={
                  !todo?.completed
                     ? "ellipse-outline"
                     : "checkmark-circle-outline"
               }
               size={30}
               color={colors.green}
            />
         </TouchableOpacity>
         <TextInput
            onChangeText={(text) => {
               setTodoTitleFromTextInput(text);
            }}
            onEndEditing={() => {
               setTodoTitle(TodoTitleFromTextInput);
               editTodo(todo.id);
            }}
            style={{
               fontWeight: "bold",
               fontSize: 18,
               color: colors.primary,
               marginHorizontal: 5,
               textDecorationLine: todo?.completed ? "line-through" : "none",
               flex: 1,
            }}
         >
            {todoTitle}
         </TextInput>
         <TouchableOpacity
            onPress={() => deleteTodo(todo.id)}
            style={styles.actionIcon}
         >
            <AppIcon name="close" size={30} color={colors.grayBlue} />
         </TouchableOpacity>
      </View>
   );
}

const styles = StyleSheet.create({
   actionIcon: {
      alignItems: "center",
      height: 35,
      justifyContent: "center",
      width: 35,
   },
   listItem: {
      backgroundColor: colors.light,
      borderRadius: 16,
      flexDirection: "row",
      marginVertical: 10,
      padding: 17,
   },
   modal: {
      backgroundColor: "gray",
      padding: 20,
   },
});
