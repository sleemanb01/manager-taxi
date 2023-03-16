import { t } from "i18next";
import React from "react";
import { Pressable, Text } from "react-native";
import { BUTTONS } from "../../styles/BUTTONS";
import { FONTS } from "../../styles/FONTS";

export function WhiteUButton({
  onPress,
  text,
}: {
  onPress: Function;
  text: string;
}) {
  return (
    <Pressable style={BUTTONS.whiteU} onPress={() => onPress()}>
      <Text style={FONTS.btnBlackText}>{text}</Text>
    </Pressable>
  );
}
