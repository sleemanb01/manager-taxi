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

export default function Stocks() {
  const appData = useAppData();
  console.log("Stocks", appData.categories.length);

  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const addHandler = () => {
    navigation.navigate("NewStock", { appData });
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
