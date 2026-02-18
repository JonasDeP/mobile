import { Image } from "expo-image";
import { Platform, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";


const COLORS = [
  "#f01f1f",
  "#10c719", 
  "#133dc5",
  "#a19f07",
  "#631597",
] as const;

const COLOR_NAMES = ["Rood", "Groen", "Blauw", "Geel", "Paars"] as const;

export default function HomeScreen() {
  const [colorIndex, setColorIndex] = useState<number>(0);

  const handleColorChange = () => {
  //cycle terug naar begin % COLORS.length = 5, dus als prevIndex 4 is, wordt het 0
    setColorIndex((prevIndex) => (prevIndex + 1) % COLORS.length);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.textBox, { backgroundColor: COLORS[colorIndex] }]}>
        <Text style={styles.colorText}>{COLOR_NAMES[colorIndex]}</Text>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleColorChange}>
        <Text style={styles.buttonText}>Volgende Kleur</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textBox: {
    width: 250,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 40,
  },
  colorText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  button: {
    backgroundColor: "#333333",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
