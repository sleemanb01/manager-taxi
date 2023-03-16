import React from "react";
import { Image, Pressable } from "react-native";
import { Badge } from "react-native-paper";

export function NotificationButton() {
  return (
    <Pressable
      onPress={async () => {
        console.log("notification pressed");
      }}
    >
      <Image source={require("../../../assets/Combined_Shape.png")} />
      {/* <Badge>3</Badge> */}
    </Pressable>
  );
}
