import React from "react";
import { inputReducer } from "../../../hooks/useReducer";
import { EReducerActionType, EValidatorType } from "../../../types/enums";
import { reducerInputState } from "../../../types/types";
import { TextInput } from "react-native-paper";
import {
  KeyboardTypeOptions,
  View,
  Text,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
} from "react-native";

export function Input({
  id,
  label,
  element,
  keyboardType,
  placeHolder,
  rows,
  validators,
  errorText,
  onInput,
  initValue,
  initialIsValid,
}: {
  id?: string;
  label?: string;
  element?: string;
  keyboardType?: KeyboardTypeOptions;
  placeHolder?: string;
  rows?: number;
  validators: EValidatorType[];
  errorText: string;
  onInput: Function;
  initValue?: string;
  initialIsValid?: boolean;
}) {
  const reducerInputStateInitVal: reducerInputState = {
    value: initValue || "",
    isTouched: false,
    isValid: initialIsValid || false,
  };
  const [inputState, dispatch] = React.useReducer(
    inputReducer,
    reducerInputStateInitVal
  );

  const { value, isValid } = inputState;

  React.useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (
    event: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const action = {
      val: event.nativeEvent.text,
      type: EReducerActionType.CHNAGE,
      validators: validators,
    };
    dispatch(action);
  };

  const touchHandler = () => {
    const action = {
      val: inputState.value,
      type: EReducerActionType.TOUCH,
      validators: validators,
    };

    dispatch(action);
  };

  const currElement =
    element === "input" ? (
      <TextInput
        mode="outlined"
        id={id}
        keyboardType={keyboardType}
        placeholder={placeHolder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value as string}
      />
    ) : (
      <TextInput
        id={id}
        multiline
        numberOfLines={rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value as string}
      />
    );
  return (
    <View style={style.container}>
      <View style={style.inputLabelContainer}>
        <Text>{label}</Text>
      </View>
      {currElement}
      {!inputState.isValid && inputState.isTouched && (
        <View style={style.errorContainer}>
          <Text style={style.errorText}>{errorText}</Text>
        </View>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  inputLabelContainer: {
    alignItems: "flex-start",
  },
  errorContainer: {
    alignItems: "center",
  },
  errorText: {
    color: "red",
  },
});
