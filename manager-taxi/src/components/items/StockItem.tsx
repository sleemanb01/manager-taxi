import React from "react";
import { Pressable, View, Image } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { IStock } from "../../types/interfaces";

export default function StockItem({
  item,
  pressHandler,
  secondaryText,
}: {
  item: IStock;
  pressHandler?: (item: IStock) => void;
  secondaryText?: string;
}) {
  return (
    <Pressable onPress={() => (pressHandler ? pressHandler(item) : () => {})}>
      <View style={{ flex: 1, width: 150, height: 200, padding: 5 }}>
        <Card>
          <Card.Cover
            source={{ uri: "https://picsum.photos/700" }}
            resizeMode={`cover`}
            style={{
              marginBottom: 5,
              flexDirection: "column",
              height: "65%",
            }}
          />
          <Card.Content style={{ alignItems: "center" }}>
            <Text variant="bodyMedium">{item.name}</Text>
            <Text variant="titleLarge">{item.quantity}</Text>
          </Card.Content>
        </Card>
      </View>
    </Pressable>
  );
}
