import React from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { getCurrDay } from "../util/time";
import { FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import { useAppData } from "../hooks/appData-hook";
import { ICategory } from "../types/interfaces";
import eventEmitter from "../util/eventEmitter";
import { useHttpClient } from "../hooks/http-hook";

export default function Stocks() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { categories, roles, addCategory } = useAppData(sendRequest);
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Stocks">>();

  React.useEffect(() => {
    eventEmitter.addListener("onCategoryAdd", categoryAddHandler);
    return () => {
      eventEmitter.removeListener("onCategoryAdd", categoryAddHandler);
    };
  }, []);

  const categoryAddHandler = async (newCategory: ICategory) => {
    const updatedCategories = [...categories, newCategory];
    await addCategory(updatedCategories);
    navigation.navigate("NewStock", {
      categories: updatedCategories,
      roles,
      selected: updatedCategories[updatedCategories.length - 1]._id,
    });
  };

  const addHandler = () => {
    navigation.navigate("NewStock", {
      categories,
      roles,
    });
  };

  return (
    <View style={styles.container}>
      <Appbar.Header elevated={true} mode={"small"}>
        <Appbar.Content title={t("Stocks")} />
        <Appbar.Content title={getCurrDay().slice(0, -11)} onPress={() => {}} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
      </Appbar.Header>
      <FAB icon="plus" style={styles.fab} onPress={addHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0,
  },
});
