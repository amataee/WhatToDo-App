import React from "react";
import {
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   Modal,
   Button,
} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";

import colors from "../config/colors";
import AppTextInput from "./AppTextInput";
import AppButton from "./AppButton";

export default function ListItem({todo, todos, setTodos}) {
   const [visible, setVisible] = React.useState(false);

   const showModal = () => setVisible(true);
   const hideModal = () => setVisible(false);
   const containerStyle = {backgroundColor: "gray", padding: 20};

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

   const [todoTitle, setTodoTitle] = React.useState(todo?.task);
   const [TodoTitleFromTextInput, setTodoTitleFromTextInput] = React.useState(
      todo?.task
   );

   const editTodo = (todoId) => {
      const newTodosItem = todos.map((item) => {
         if (item.id == todoId) {
            return {...item, task: todoTitle};
         }
         return item;
      });
      setTodos(newTodosItem);
      hideModal();
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
               <MaterialCommunityIcons
                  name="close"
                  size={30}
                  color={colors.grayBlue}
               />
            </View>
         </TouchableOpacity>
         <Modal
            animationType="slide"
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
         >
            <View
               style={{
                  alignItems: "center",
                  marginHorizontal: 18,
                  marginTop: 18,
               }}
            >
               <TouchableOpacity onPress={hideModal}>
                  <Ionicons name="close" size={42} color={colors.dark} />
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
                     onPress={() => {
                        setTodoTitle(TodoTitleFromTextInput);
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
   listItem: {
      padding: 16,
      backgroundColor: colors.light,
      flexDirection: "row",
      borderRadius: 12,
      marginVertical: 10,
   },
   actionIcon: {
      height: 35,
      width: 35,
      justifyContent: "center",
      alignItems: "center",
   },
   //modal,
   centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
   },
   modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
   },
   button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
   },
   buttonOpen: {
      backgroundColor: "#F194FF",
   },
   buttonClose: {
      backgroundColor: "#2196F3",
   },
   textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
   },
   modalText: {
      marginBottom: 15,
      textAlign: "center",
   },
});
