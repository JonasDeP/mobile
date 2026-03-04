import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

type PeopleEntity = {
  id: number;
  name: string;
};

type ItemProperties = {
  item: PeopleEntity;
  onPress: () => void;
  isSelected: boolean;
};

export default function App() {
  const [people, setPeople] = useState<PeopleEntity[]>([
    { id: 1, name: "Mario" },
    { id: 2, name: "Luigi" },
    { id: 3, name: "Peach" },
    { id: 4, name: "Toad" },
    { id: 5, name: "Bowser" },
    { id: 6, name: "Yoshi" },
    { id: 7, name: "Wario" },
    { id: 8, name: "Daisy" },
    { id: 9, name: "Donkey Kong" },
    { id: 10, name: "Waluigi" },
  ]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handlePress = (id: number, name: string) => {
    setSelectedId(id);
    Alert.alert(`Je hebt ${name} geselecteerd!`);
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <FlatList
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        data={people}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.item, selectedId === item.id && styles.itemSelected]}
            onPress={() => handlePress(item.id, item.name)}
          >
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        columnWrapperStyle={styles.columnWrapper}
      />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 10,
  },
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
    marginHorizontal: 5,
    aspectRatio: 1,
  },
  itemSelected: {
    backgroundColor: "#ff69b4",
    borderWidth: 3,
    borderColor: "#ff1493",
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
