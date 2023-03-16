import React from "react";
import { Pressable, Text } from "react-native";
import { BUTTONS } from "../../styles/BUTTONS";
import { FONTS } from "../../styles/FONTS";

export function PrimaryButton({
  text,
  onPress,
}: {
  text: string;
  onPress: Function;
}) {
  return (
    <Pressable style={BUTTONS.mainBtn} onPress={(event) => onPress(event)}>
      <Text style={FONTS.btnBlackText}>{text}</Text>
    </Pressable>
  );
}
