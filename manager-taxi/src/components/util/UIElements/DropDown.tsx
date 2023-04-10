import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { dropDownStyles, imageStyles } from "../../../styles/STYLES";
import { ICategory } from "../../../types/interfaces";
import { navigationParams, RootStackParamList } from "../../../types/types";

export function Dropdown({
  title,
  arr,
  selected,
  setSelected,
  navigateTo,
}: {
  title: string;
  arr: any[];
  selected?: any;
  setSelected: Function;
  navigateTo?: navigationParams;
}) {
  const [visible, setVisible] = React.useState(false);
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const closeHndler = () => {
    setVisible(false);
  };

  const pressHandler = (i: number) => {
    setSelected(arr[i]);
    closeHndler();
  };

  const newItem = () => {
    // console.log("go to new Item");
    // navigateToNew();
    // navigation.navigate("NewCategory", { addCategory });

    navigation.navigate(navigateTo!.to, navigateTo!.props);
  };

  function renderDropdown() {
    return (
      <View style={dropDownStyles.dropdownContainer}>
        {arr &&
          arr.length > 0 &&
          arr.map((curr, i) => (
            <Pressable key={i.toString()} onPress={() => pressHandler(i)}>
              <View style={dropDownStyles.button}>
                <Text>{curr.name}</Text>
              </View>
            </Pressable>
          ))}
        {navigateTo && (
          <Pressable key={"default"} onPress={newItem}>
            <View style={dropDownStyles.button}>
              <Text>{t("addNew")}</Text>
            </View>
          </Pressable>
        )}
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={toggleDropdown}>
      <View style={dropDownStyles.headerContainer}>
        <Text>{selected ? selected.name : title}</Text>
        <Image
          style={imageStyles.tinytinyLogo}
          source={require("../../../../assets/dropDownIcon.png")}
        />
        {visible && renderDropdown()}
      </View>
    </TouchableWithoutFeedback>
  );
}
