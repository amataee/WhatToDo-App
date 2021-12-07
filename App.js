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

import ListItem from "./components/ListItem";
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
                  fontSize: 32,
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
            renderItem={({item}) => (
               <ListItem todo={item} todos={todos} setTodos={setTodos} />
            )}
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
                  maxLength={30}
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
   header: {
      marginTop: 32,
      marginHorizontal: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
   },
});
