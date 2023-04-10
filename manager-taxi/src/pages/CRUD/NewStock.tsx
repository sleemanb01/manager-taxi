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

type Props = NativeStackScreenProps<RootStackParamList, "NewStock">;

export default function NewStock({ route, navigation }: Props) {
  const appData = route.params?.appData;
  console.log("New Stock ...", appData.categories.length);

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

  const submit = () => {
    navigation.pop();
  };

  const navigateTo: navigationParams = {
    to: "NewCategory",
    props: { appData },
  };

  const selectedParam = route.params.selected;
  React.useEffect(() => {
    if (selectedParam) {
      console.log("NewStock params", selectedParam);

      setSelected(selectedParam);
    }
  }, [selectedParam]);

  return (
    <KeyBoardAvoid>
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && <Loading />}
        <Dropdown
          title={t("chooseCategory")}
          setSelected={setSelected}
          selected={selected}
          arr={appData.categories}
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
          pressHandler={submit}
          text={t("add")}
          disabled={!!!selected || !formState.isValid}
        />
      </View>
    </KeyBoardAvoid>
  );
}
