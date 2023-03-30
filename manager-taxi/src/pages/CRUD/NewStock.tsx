import React from "react";
import { ICategory, IStock } from "../../types/interfaces";
import { View, Text } from "react-native";
import { useHttpClient } from "../../hooks/http-hook";
import { Loading } from "../../components/util/Loading";
import { ErrorModal } from "../../components/util/ErrorModal";
import { Input } from "../../components/util/UIElements/Input";
import { useTranslation } from "react-i18next";
import { reducerInputStateInitVal } from "../../hooks/useReducer";
import { useForm } from "../../hooks/form-hook";
import { EValidatorType } from "../../types/enums";
import { PrimaryButton } from "../../components/Buttons/PrimaryButton";
import ImagePickerEx from "../../components/util/UIElements/ImagePicker";
import { Dropdown } from "../../components/util/UIElements/DropDown";
import KeyBoardAvoid from "../../components/util/KeyBoardAvoid";
import { Button } from "react-native-paper";
import MyButton from "../../components/Buttons/MyButton";

export default function NewStock() {
  const { t } = useTranslation();
  const [formState, inputHandler] = useForm(
    {
      name: reducerInputStateInitVal,
      quantity: reducerInputStateInitVal,
      image: reducerInputStateInitVal,
    },
    false
  );
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [selected, setSelected] = React.useState<string | undefined>(undefined);

  const submit = () => {};

  const newCategory = t("newCategory");
  const category: ICategory = { _id: "1", name: "hi", roleId: "1" };
  const categoriesNames = [category];

  return (
    <KeyBoardAvoid>
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && <Loading />}
        <Dropdown
          title={t("chooseCategory")}
          setSelected={setSelected}
          selected={selected}
          arr={[]}
        />
        <Input
          id="name"
          element="input"
          keyboardType="default"
          label={t("name")}
          validators={[EValidatorType.REQUIRE]}
          errorText={t("error-text-required")}
          onInput={inputHandler}
        />
        <Input
          id="quantity"
          element="input"
          keyboardType="numeric"
          label={t("quantity")}
          validators={[EValidatorType.MIN, EValidatorType.MAX]}
          errorText={t("error-number")}
          onInput={inputHandler}
        />
        <ImagePickerEx />
        <MyButton
          pressHandler={submit}
          text={t("add")}
          disabled={!!!selected || !formState.isValid}
        />
      </View>
    </KeyBoardAvoid>
  );
}
