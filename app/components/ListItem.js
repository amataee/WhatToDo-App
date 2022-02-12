import React from "react";
import {StyleSheet, Text, View, TouchableOpacity, Modal} from "react-native";

import colors from "../config/colors";
import AppTextInput from "./AppTextInput";
import AppButton from "./AppButton";
import AppIcon from "./AppIcon";

export default function ListItem({todo, todos, setTodos}) {
   const [visible, setVisible] = React.useState(false);
   const [todoTitle, setTodoTitle] = React.useState(todo?.task);
   const [TodoTitleFromTextInput, setTodoTitleFromTextInput] = React.useState(
      todo?.task
   );

   const showModal = () => setVisible(true);
   const hideModal = () => setVisible(false);

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

   const editTodo = (todoId) => {
      const newTodosItem = todos.map((item) => {
         if (item.id == todoId) {
            return {...item, task: TodoTitleFromTextInput};
         }
         return item;
      });
      setTodos(newTodosItem);
   };

   return (
      <View style={styles.listItem}>
         {!todo?.completed && (
            <TouchableOpacity onPress={() => markTodoComplete(todo.id)}>
               <View style={[styles.actionIcon]}>
                  <AppIcon
                     name="ellipse-outline"
                     size={30}
                     color={colors.green}
                  />
               </View>
            </TouchableOpacity>
         )}
         {todo?.completed && (
            <TouchableOpacity onPress={() => markTodoComplete(todo.id)}>
               <View style={[styles.actionIcon]}>
                  <AppIcon
                     name="checkmark-circle-outline"
                     size={30}
                     color={colors.green}
                  />
               </View>
            </TouchableOpacity>
         )}
         <View style={{flex: 1, justifyContent: "center"}}>
            <TouchableOpacity onPress={showModal}>
               <Text
                  style={{
                     fontWeight: "bold",
                     fontSize: 18,
                     color: colors.primary,
                     marginHorizontal: 5,
                     textDecorationLine: todo?.completed
                        ? "line-through"
                        : "none",
                  }}
               >
                  {todoTitle}
               </Text>
            </TouchableOpacity>
         </View>
         <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
            <View style={styles.actionIcon}>
               <AppIcon name="close" size={30} color={colors.grayBlue} />
            </View>
         </TouchableOpacity>
         <Modal
            animationType="slide"
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modal}
         >
            <View
               style={{
                  alignItems: "center",
                  marginHorizontal: 18,
                  marginTop: 18,
               }}
            >
               <TouchableOpacity onPress={hideModal}>
                  <AppIcon
                     name="close"
                     size={42}
                     color={colors.grayBlue}
                     style={{marginTop: 16}}
                  />
               </TouchableOpacity>
               <View style={{marginTop: 18, width: "100%"}}>
                  <AppTextInput
                     focusable
                     onChangeText={(text) => setTodoTitleFromTextInput(text)}
                  >
                     {todoTitle}
                  </AppTextInput>
                  <AppButton
                     title={"DONE"}
                     icon={"checkmark-outline"}
                     onPress={() => {
                        setTodoTitle(TodoTitleFromTextInput);
                        editTodo(todo.id);
                        hideModal();
                     }}
                  />
               </View>
            </View>
         </Modal>
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
