import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";

export default function KeyBoardAvoid({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) {
  return (
    // <KeyboardAvoidingView style={{ flex: 1 }}>
    <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      {children}
    </Pressable>
    // {/* </KeyboardAvoidingView> */}
  );
}
