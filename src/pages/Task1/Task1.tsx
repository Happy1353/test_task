import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TextInput, Text } from "react-native";

const cards = [150, 150, 200, 200, 100, 100];

export const Task1 = () => {
  const [containerWidth, setContainerWidth] = useState(300);

  const handleChangeWidth = (text: string) => {
    const width = text === "" ? 0 : parseInt(text);
    setContainerWidth(width);
  };

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <TextInput
            style={styles.input}
            value={containerWidth === 0 ? "" : containerWidth.toString()}
            onChangeText={handleChangeWidth}
            keyboardType="numeric"
        />
      {containerWidth >= 50 ? (
        <View style={[styles.container, { width: containerWidth }]}>
          {cards.map((height, index) => (
            <View
              key={index}
              style={[styles.card, { height }, index !== cards.length - 1 && { marginRight: 10 }]}
            />
          ))}
        </View>
      ) : (
        <Text style={styles.warning}>Ширина слишком маленькая</Text>
      )}
     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  card: {
    backgroundColor: "lightgray",
    marginBottom: 10,
    minWidth: 50, // Минимальная ширина карточки
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  warning: {
    marginTop: 10,
    color: "red",
    fontWeight: "bold",
  },
});
