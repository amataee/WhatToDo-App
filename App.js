import React from "react";
import {SafeAreaView, FlatList, StyleSheet, Text} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ListItem from "./app/components/ListItem";
import MenuBar from "./app/components/MenuBar";
import BottomInputContainer from "./app/components/BottomInputContainer";
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

   const saveTodoToUserDevice = async (todos) => {
      const stringifyTodos = JSON.stringify(todos);
      await AsyncStorage.setItem("todos", stringifyTodos);
   };

   const getTodosFromUserDevice = async () => {
      const todos = await AsyncStorage.getItem("todos");
      if (todos != null) {
         setTodos(JSON.parse(todos));
      }
   };

   return (
      <SafeAreaView style={styles.container}>
         <MenuBar todos={todos} setTodos={setTodos} />
         {todos == 0 ? (
            <Text style={styles.noTodosText}>There's no ToDo!</Text>
         ) : (
            <FlatList
               showsVerticalScrollIndicator={false}
               contentContainerStyle={styles.flatList}
               data={todos}
               renderItem={({item}) => (
                  <ListItem todo={item} todos={todos} setTodos={setTodos} />
               )}
            />
         )}
         <BottomInputContainer
            todos={todos}
            setTodos={setTodos}
            textInput={textInput}
            setTextInput={setTextInput}
         />
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: colors.white,
   },
   flatList: {
      padding: 16,
      paddingBottom: 100,
   },
   noTodosText: {
      alignSelf: "center",
      marginTop: 32,
      fontSize: 26,
      fontWeight: "bold",
      color: colors.darkGrayBlue,
   },
});
