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

export function Dropdown({
  title,
  arr,
  selected,
  setSelected,
}: {
  title: string;
  arr: any[];
  selected: any | undefined;
  setSelected: Function;
}) {
  const [visible, setVisible] = React.useState(false);
  const { t } = useTranslation();

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

  const newCategory = () => {
    console.log("go to new category");
  };

  function renderDropdown() {
    return (
      <View style={dropDownStyles.dropdownContainer}>
        {arr.length > 0 &&
          arr.map((curr, i) => (
            <Pressable key={i.toString()} onPress={() => pressHandler(i)}>
              <View style={dropDownStyles.button}>
                <Text>{curr.name}</Text>
              </View>
            </Pressable>
          ))}
        <Pressable key={"default"} onPress={newCategory}>
          <View style={dropDownStyles.button}>
            <Text>{t("newCategory")}</Text>
          </View>
        </Pressable>
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
