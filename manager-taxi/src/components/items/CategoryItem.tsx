import React from "react";
import { IRole } from "../../types/interfaces";
import { Pressable } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";

export default function CategoryItem({
  item,
  pressHandler,
  secondaryText,
}: {
  item: IRole;
  pressHandler?: (item: IRole) => void;
  secondaryText?: string;
}) {
  return (
    // <List.Item
    //   onPress={() => (pressHandler ? pressHandler(item) : () => {})}
    //   title={item.name}
    //   description={secondaryText || ""}
    //   left={() => <Avatar.Icon size={50} icon="folder" />}
    // />
    <Pressable onPress={() => (pressHandler ? pressHandler(item) : () => {})}>
      <Card mode="contained" style={{ width: 100 }}>
        <Card.Content>
          <Text variant="titleLarge">{item.name}</Text>
          <Text variant="bodyMedium">{secondaryText}</Text>
        </Card.Content>
      </Card>
    </Pressable>
    // <Button
    //   style={{ width: 100 }}
    //   mode="contained-tonal"
    //   onPress={() => (pressHandler ? pressHandler(item) : () => {})}
    // >
    //   <View>
    //     <Text>{item.name}</Text>
    //     <Text>{secondaryText}</Text>
    //   </View>
    // </Button>
  );
}
