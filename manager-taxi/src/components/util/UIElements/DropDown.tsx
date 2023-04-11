import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
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

  const pressHandler = (item: any) => {
    setSelected(item._id);
    closeHndler();
  };

  const newItem = () => {
    navigation.navigate(navigateTo!.to, navigateTo!.props);
  };

  function Item(item: any) {
    return (
      <Pressable onPress={() => pressHandler(item)}>
        <View style={dropDownStyles.button}>
          <Text>{item.name}</Text>
        </View>
      </Pressable>
    );
  }

  function renderDropdown() {
    return (
      <View style={dropDownStyles.dropdownContainer}>
        <FlatList
          data={arr}
          renderItem={({ item }) => Item(item)}
          keyExtractor={({ _id }) => _id}
        />
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

  React.useEffect(() => {
    if (selected) {
      setVisible(false);
    }
  }, [selected]);

  let label = title;
  if (selected) {
    const targert = arr.find((e) => e._id === selected);
    if (targert) {
      label = targert.name;
    }
  }

  return (
    <TouchableWithoutFeedback onPress={toggleDropdown}>
      <View style={dropDownStyles.headerContainer}>
        <Text>{label}</Text>
        <Image
          style={imageStyles.tinytinyLogo}
          source={require("../../../../assets/dropDownIcon.png")}
        />
        {visible && renderDropdown()}
      </View>
    </TouchableWithoutFeedback>
  );
}
