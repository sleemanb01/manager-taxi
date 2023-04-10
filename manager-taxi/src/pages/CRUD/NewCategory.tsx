import React from "react";
import { ICategory } from "../../types/interfaces";
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
import { CommonActions } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "NewCategory">;

export default function NewCategory({ route, navigation }: Props) {
  const appData = route.params?.appData;

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

  const addCategory = async (newCategory: ICategory) => {
    try {
      const res = await sendRequest(
        ENDPOINT_CATEGORIES,
        "POST",
        JSON.stringify(newCategory),
        { Authorization: "Barer " + user?.accessToken, ...DEFAULT_HEADERS }
      );
      const updatedCategories = [...appData.categories, res.category];
      // appData.updateDataInStorage(updatedCategories);
      // appData.setCategories((prev) => [...prev, newCategory]);
      appData.addCategory(res.category);
      // navigation.navigate("NewStock", { appData, selected: res.category._id });
      // navigation.dispatch({
      //   ...CommonActions.setParams({ selected: res.category._id }),
      //   source: "NewStock",
      // });
    } catch (err) {}
  };

  console.log("NewCategory......", appData.categories.length);

  React.useEffect(() => {
    console.log("NewCategory", appData);
  }, [appData]);

  const submitHandler = () => {
    const newCategory = {
      roleId: selected,
      name: formState.inputs.name!.value,
    };
    addCategory(newCategory);
  };

  return (
    <HttpComponent httpStatus={{ isLoading, error, clearError }}>
      <Dropdown
        title={t("chooseRole")}
        setSelected={setSelected}
        selected={selected}
        arr={appData.roles}
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
