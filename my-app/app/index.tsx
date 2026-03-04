import { useState } from "react";
import {
  StyleSheet,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/header";
import TodoItem from "@/components/todoItem";
import Addtodo from "@/components/Addtodo";
import uuid from "react-native-uuid";

type TodoEntity = {
  id: string;
  description: string;
};

export default function Index() {
  const [todos, setTodos] = useState<TodoEntity[]>([
    { id: uuid.v4() as string, description: "App design voltooien" },
    { id: uuid.v4() as string, description: "Database opgezet" },
    { id: uuid.v4() as string, description: "API integratie" },
    { id: uuid.v4() as string, description: "Testen en debugging" },
    { id: uuid.v4() as string, description: "Deployment voorbereiden" },
  ]);

  const deleteHandler = (idToDelete: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== idToDelete));
  };

  const addHandler = (todoText: string) => {
    if (todoText.length > 3) {
      setTodos((prev) => [
        {
          id: uuid.v4() as string,
          description: todoText,
        },
        ...prev,
      ]);
    } else {
      Alert.alert("Oops", "todos must be over 3 chars long.", [
        { text: "Understood", onPress: () => console.log("Alert closed") },
      ]);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            console.log("keyboard dismissed");
          }}
        >
          <View style={{ flex: 1 }}>
            <Header title={"Todo's"} />

            <Addtodo applyhandler={addHandler} />

            <FlatList
              contentContainerStyle={styles.listContent}
              data={todos}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TodoItem
                  id={item.id}
                  text={item.description}
                  onDelete={deleteHandler}
                />
              )}
            />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContent: {
    alignItems: "center",
    paddingVertical: 20,
  },
});
