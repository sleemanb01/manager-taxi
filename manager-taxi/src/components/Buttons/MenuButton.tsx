import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Pressable, Image } from "react-native";
import { RootStackParamList } from "../../types/types";

export function MenuButton() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable>
      <Image source={require("../../../assets/menu.png")} />
    </Pressable>
  );
}
