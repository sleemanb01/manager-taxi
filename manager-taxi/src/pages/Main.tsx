import React from "react";
import { useTranslation } from "react-i18next";
import { BottomNavigation } from "react-native-paper";
import Attendance from "./Attendance";
import Stocks from "./Stocks";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../hooks/auth-context";

export default function Main() {
  const { t } = useTranslation();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "Attendance", title: t("Attendance"), focusedIcon: "history" },
    {
      key: "Stocks",
      title: t("Stocks"),
      focusedIcon: "application-cog",
      unfocusedIcon: "application-edit",
    },
  ]);

  // const { logout } = React.useContext(AuthContext);

  // React.useEffect(() => {
  //   logout();
  // }, []);

  const renderScene = BottomNavigation.SceneMap({
    Stocks,
    Attendance,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
