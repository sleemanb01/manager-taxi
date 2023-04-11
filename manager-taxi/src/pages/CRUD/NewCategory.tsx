import React from "react";
import { useHttpClient } from "../../hooks/http-hook";
import { Input } from "../../components/util/UIElements/Input";
import { useTranslation } from "react-i18next";
import { reducerInputStateInitVal } from "../../hooks/useReducer";
import { useForm } from "../../hooks/form-hook";
import { EValidatorType } from "../../types/enums";
import { Dropdown } from "../../components/util/UIElements/DropDown";
import MyButton from "../../components/Buttons/MyButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/types";
import HttpComponent from "../../components/HttpComponent";
import { AuthContext } from "../../hooks/auth-context";
import { ENDPOINT_CATEGORIES, DEFAULT_HEADERS } from "../../util/constants";
import eventEmitter from "../../util/eventEmitter";

type Props = NativeStackScreenProps<RootStackParamList, "NewCategory">;

export default function NewCategory({ route }: Props) {
  const roles = route.params.roles;

  const { t } = useTranslation();

  const [formState, inputHandler] = useForm(
    {
      name: reducerInputStateInitVal,
    },
    false
  );
  const { isLoading, error, clearError, sendRequest } = useHttpClient();
  const [selected, setSelected] = React.useState<string | undefined>(undefined);
  const { user } = React.useContext(AuthContext);

  const submitHandler = async () => {
    const newCategory = {
      roleId: selected,
      name: formState.inputs.name!.value,
    };
    try {
      const res = await sendRequest(
        ENDPOINT_CATEGORIES,
        "POST",
        JSON.stringify(newCategory),
        { Authorization: "Barer " + user?.accessToken, ...DEFAULT_HEADERS }
      );
      eventEmitter.notify("onCategoryAdd", res.category);
    } catch (err) {}
  };

  return (
    <HttpComponent httpStatus={{ isLoading, error, clearError }}>
      <Dropdown
        title={t("chooseRole")}
        setSelected={setSelected}
        selected={selected}
        arr={roles}
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
      <MyButton
        pressHandler={submitHandler}
        text={t("add")}
        disabled={!!!selected || !formState.isValid}
      />
    </HttpComponent>
  );
}
