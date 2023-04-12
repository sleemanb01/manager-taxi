import React from "react";
import { IRole } from "../../types/interfaces";
import { Text } from "react-native";
import { List, Avatar } from "react-native-paper";

export default function RoleItem({
  item,
  pressHandler,
  secondaryText,
}: {
  item: IRole;
  pressHandler?: (item: IRole) => void;
  secondaryText?: string;
}) {
  return (
    <List.Item
      onPress={() => (pressHandler ? pressHandler(item) : () => {})}
      title={item.name}
      description={secondaryText || ""}
      left={() => <Avatar.Icon size={50} icon="folder" />}
    />
  );
}
