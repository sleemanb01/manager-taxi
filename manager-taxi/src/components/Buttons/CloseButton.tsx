import React from "react";
import { Image, Pressable } from "react-native";
import { BUTTONS } from "../../styles/BUTTONS";
import { imageStyles } from "../../styles/STYLES";

export function CloseButton({ onPress }: { onPress: Function }) {
  return (
    <Pressable style={BUTTONS.closeBtn} onPress={() => onPress()}>
      <Image
        style={imageStyles.tinytinyResizedLogo}
        source={require("../../../assets/Close_white.png")}
      />
    </Pressable>
  );
}
