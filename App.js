import React from "react";
import {SafeAreaView, FlatList, StyleSheet} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ListItem from "./app/components/ListItem";
import MenuBar from "./app/components/MenuBar";
import BottomInputContainer from "./app/components/BottomInputContainer";

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
         <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{padding: 20, paddingBottom: 100}}
            data={todos}
            renderItem={({item}) => (
               <ListItem todo={item} todos={todos} setTodos={setTodos} />
            )}
         />
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
      backgroundColor: "white",
   },
});
