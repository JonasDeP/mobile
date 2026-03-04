import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

type TodoItemProps = {
  id: string;
  text: string;
  onDelete: (id: string) => void;
};

const TodoItem = ({ id, text, onDelete }: TodoItemProps) => {
  return (
    <Pressable
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
      })}
      onPress={() => onDelete(id)}
    >
      <View style={styles.container}>
        <AntDesign name="delete" size={24} color="black" />
        <Text style={styles.text}>{text}</Text>
      </View>
    </Pressable>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 100,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 20,
    flexDirection: "row", // 👈 icon links, tekst rechts
    alignItems: "center", // verticaal centreren
    justifyContent: "center", // optioneel: alles in het midden
    gap: 10,
    marginVertical: 10,
  },
  text: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
