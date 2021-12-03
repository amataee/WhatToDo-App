import React from "react";
import {
   StyleSheet,
   SafeAreaView,
   View,
   TextInput,
   Text,
   FlatList,
   TouchableOpacity,
   Alert,
} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "./app/config/colors";

export default function App() {
   const [todos, setTodos] = React.useState([]);
   const [textInput, setTextInput] = React.useState("");

   React.useEffect(() => {
      getTodosFromUserDevice();
   }, []);

   React.useEffect(() => {
      saveTodoToUserDevice(todos);
   }, [todos]);

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

   const saveTodoToUserDevice = async (todos) => {
      try {
         const stringifyTodos = JSON.stringify(todos);
         await AsyncStorage.setItem("todos", stringifyTodos);
      } catch (error) {
         console.log(error);
      }
   };

   const getTodosFromUserDevice = async () => {
      try {
         const todos = await AsyncStorage.getItem("todos");
         if (todos != null) {
            setTodos(JSON.parse(todos));
         }
      } catch (error) {
         console.log(error);
      }
   };

   const markTodoComplete = (todoId) => {
      const newTodosItem = todos.map((item) => {
         if (item.id == todoId) {
            return {...item, completed: true};
         }
         return item;
      });

      setTodos(newTodosItem);
   };

   const deleteTodo = (todoId) => {
      const newTodosItem = todos.filter((item) => item.id != todoId);
      setTodos(newTodosItem);
   };

   const clearAllTodos = () => {
      if (todos != 0) {
         Alert.alert("Are you sure?", "delete all?", [
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

   const ListItem = ({todo}) => {
      return (
         <View style={styles.listItem}>
            <View style={{flex: 1}}>
               <Text
                  style={{
                     fontWeight: "bold",
                     fontSize: 18,
                     color: colors.primary,
                     textDecorationLine: todo?.completed
                        ? "line-through"
                        : "none",
                  }}
               >
                  {todo?.task}
               </Text>
            </View>
            {!todo?.completed && (
               <TouchableOpacity onPress={() => markTodoComplete(todo.id)}>
                  <View style={[styles.actionIcon]}>
                     <MaterialCommunityIcons
                        name="check"
                        size={24}
                        color={colors.green}
                     />
                  </View>
               </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
               <View style={styles.actionIcon}>
                  <MaterialCommunityIcons
                     name="close"
                     size={24}
                     color={colors.grayBlue}
                  />
               </View>
            </TouchableOpacity>
         </View>
      );
   };

   return (
      <SafeAreaView
         style={{
            flex: 1,
            backgroundColor: "white",
         }}
      >
         <View style={styles.header}>
            <Text
               style={{
                  fontWeight: "bold",
                  fontSize: 28,
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
         <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{padding: 20, paddingBottom: 100}}
            data={todos}
            renderItem={({item}) => <ListItem todo={item} />}
         />

         <View style={styles.footer}>
            <View style={styles.inputContainer}>
               <TextInput
                  value={textInput}
                  placeholder="Add Todo..."
                  placeholderTextColor={colors.dark}
                  selectionColor={colors.dark}
                  onChangeText={(text) => setTextInput(text)}
                  onEndEditing={addTodo}
               />
            </View>
            <TouchableOpacity onPress={addTodo}>
               <View style={styles.iconContainer}>
                  <MaterialCommunityIcons
                     name="plus"
                     color={colors.white}
                     size={30}
                  />
               </View>
            </TouchableOpacity>
         </View>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   footer: {
      position: "absolute",
      bottom: 10,
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
      borderRadius: 15,
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
   listItem: {
      padding: 16,
      backgroundColor: colors.light,
      flexDirection: "row",
      borderRadius: 7,
      marginVertical: 10,
   },
   actionIcon: {
      height: 25,
      width: 25,
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 5,
      borderRadius: 3,
   },
   header: {
      marginTop: 32,
      marginHorizontal: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
   },
});
