import React, { useState } from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";

type AddtodoProps = {
  applyhandler: (todoText: string) => void;
};

export default function Addtodo({ applyhandler }: AddtodoProps) {
  const [text, setText] = useState("");

  const submitHandler = () => {
    if (text.trim().length === 0) return;

    applyhandler(text);
    setText("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="new todo"
        onChangeText={setText}
        style={styles.input}
        value={text}
      />

      <Pressable style={styles.button} onPress={submitHandler}>
        <Text style={styles.buttonText}>Add todo</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "coral",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
