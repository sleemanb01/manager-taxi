import React from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";

import { FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import { useAppData } from "../hooks/appData-hook";
import { ICategory, IStock } from "../types/interfaces";
import eventEmitter from "../util/eventEmitter";
import { useHttpClient } from "../hooks/http-hook";
import { useStocks } from "../hooks/stocks-hook";
import HttpComponent from "../components/generics/HttpComponent";
import AppBar from "../components/AppBar";
import Main from "../components/Main";

export default function Stocks() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const { categories, roles, addCategory } = useAppData(sendRequest);
  const { values, addValue, shift, addShift } = useStocks(sendRequest);
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Stocks">>();

  React.useEffect(() => {
    eventEmitter.addListener("onCategoryAdd", categoryAddHandler);
    eventEmitter.addListener("onStockAdd", addValue);
    return () => {
      eventEmitter.removeListener("onCategoryAdd", categoryAddHandler);
      eventEmitter.removeListener("onStockAdd", addValue);
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
    <View style={Stockstyles.container}>
      <AppBar title={t("Stocks")} />
      <HttpComponent httpStatus={{ isLoading, error, clearError }}>
        <Main data={{ categories, roles, values }} />
      </HttpComponent>
      <FAB icon="plus" style={Stockstyles.fab} onPress={addHandler} />
    </View>
  );
}

const Stockstyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    margin: 10,
  },
  fab: {
    position: "absolute",
    margin: 20,
    right: 0,
    bottom: 0,
  },
});
