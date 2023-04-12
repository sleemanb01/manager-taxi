import React from "react";
import { View } from "react-native";
import { useHttpClient } from "../../hooks/http-hook";
import { Loading } from "../../components/util/Loading";
import { ErrorModal } from "../../components/util/ErrorModal";
import { Input } from "../../components/util/UIElements/Input";
import { useTranslation } from "react-i18next";
import { reducerInputStateInitVal } from "../../hooks/useReducer";
import { useForm } from "../../hooks/form-hook";
import { EValidatorType } from "../../types/enums";
import ImagePickerEx from "../../components/util/UIElements/ImagePicker";
import { Dropdown } from "../../components/util/UIElements/DropDown";
import KeyBoardAvoid from "../../components/util/KeyBoardAvoid";
import MyButton from "../../components/Buttons/MyButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { navigationParams, RootStackParamList } from "../../types/types";
import HttpComponent from "../../components/generics/HttpComponent";
import eventEmitter from "../../util/eventEmitter";
import { DEFAULT_HEADERS, ENDPOINT_STOCKS } from "../../util/constants";
import { AuthContext } from "../../hooks/auth-context";
import { IStock } from "../../types/interfaces";

type Props = NativeStackScreenProps<RootStackParamList, "NewStock">;

export default function NewStock({ route, navigation }: Props) {
  const { roles, categories, selected } = route.params;
  const { t } = useTranslation();
  const { user } = React.useContext(AuthContext);

  const [formState, inputHandler] = useForm(
    {
      name: reducerInputStateInitVal,
      quantity: reducerInputStateInitVal,
    },
    false
  );
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [selectedId, setSelectedId] = React.useState<string | undefined>(
    undefined
  );

  React.useEffect(() => {
    if (selected) {
      setSelectedId(selected);
    }
  }, [selected]);

  const submitHandler = async () => {
    const DEFAULT_MIN_QUANTITY = 1;
    const newStock: IStock = {
      categoryId: selectedId,
      name: formState.inputs.name!.value,
      quantity: parseInt(formState.inputs.quantity!.value),
      minQuantity: DEFAULT_MIN_QUANTITY,
    };
    try {
      const res = await sendRequest(
        ENDPOINT_STOCKS,
        "POST",
        JSON.stringify(newStock),
        { Authorization: "Barer " + user?.accessToken, ...DEFAULT_HEADERS }
      );
      eventEmitter.notify("onStockAdd", res.stock);
      navigation.goBack();
    } catch (err) {}
  };

  const navigateTo: navigationParams = {
    to: "NewCategory",
    props: { roles },
  };

  return (
    <KeyBoardAvoid>
      <HttpComponent httpStatus={{ isLoading, error, clearError }}>
        <Dropdown
          title={t("chooseCategory")}
          setSelected={setSelectedId}
          selected={selectedId}
          arr={categories}
          navigateTo={navigateTo}
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
          pressHandler={submitHandler}
          text={t("add")}
          disabled={!!!selectedId || !formState.isValid}
        />
      </HttpComponent>
    </KeyBoardAvoid>
  );
}
