import React from "react";
import { Pressable, Text } from "react-native";
import { BUTTONS } from "../../styles/BUTTONS";
import { FONTS } from "../../styles/FONTS";

export function PrimaryButton({
  text,
  onPress,
  disabled,
}: {
  text: string;
  onPress: Function;
  disabled?: boolean;
}) {
  return (
    <Pressable
      style={BUTTONS.mainBtn}
      onPress={(event) => onPress(event)}
      disabled={disabled}
    >
      <Text style={FONTS.btnBlackText}>{text}</Text>
    </Pressable>
  );
}
