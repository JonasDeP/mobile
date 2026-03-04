import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

type MyTextInputProperties = {
  caption: string;
  placeholder?: string;
  value: string;
  onChangeText: (value: string) => void;
  isNumeric?: boolean;
};

const MyTextInput = ({
  caption,
  placeholder,
  value,
  onChangeText,
  isNumeric = false,
}: MyTextInputProperties) => {
  const [focused, setFocused] = useState(false);

  return (
    <View>
      <Text style={styles.label}>{caption}</Text>
      <TextInput
        style={[styles.input, { borderColor: focused ? "blue" : "gray" }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={isNumeric ? "numeric" : "default"}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
};

export default function App() {
  const [name, setName] = useState("Jan");
  const [age, setAge] = useState("24");

  const namechangehandler = (value: string) => {
    setName(value);
  };
  const agechangehandler = (value: string) => {
    setAge(value);
  };

  return (
    <SafeAreaProvider style={styles.form}>
      <MyTextInput
        caption="Naam:"
        value={name}
        onChangeText={namechangehandler}
        placeholder="Voer naam in"
      />

      <MyTextInput
        caption="Leeftijd:"
        value={age}
        onChangeText={agechangehandler}
        placeholder="Voer leeftijd in"
        isNumeric
      />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  form: { flex: 1, padding: 20, justifyContent: "center" },
  label: { fontSize: 25, fontWeight: "500" },
  input: {
    fontSize: 15,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    margin: 8,
  },
});
