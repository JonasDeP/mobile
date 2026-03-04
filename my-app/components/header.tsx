import React from "react";
import { View, Text, StyleSheet } from "react-native";

type Props = {
  title?: string;
};

export default function Header({ title = "Mijn App" }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 30,
    paddingHorizontal: 16,
    backgroundColor: "coral",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "800",
  },
});
