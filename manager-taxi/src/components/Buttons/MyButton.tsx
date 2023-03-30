import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

export default function MyButton({
  text,
  disabled,
  pressHandler,
}: {
  text: String;
  disabled?: boolean;
  pressHandler: () => void;
}) {
  return (
    <Button mode="contained" disabled={disabled} onPress={pressHandler}>
      {text}
    </Button>
  );
}
