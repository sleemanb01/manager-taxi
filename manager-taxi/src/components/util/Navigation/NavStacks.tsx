import React from "react";
import { useTranslation } from "react-i18next";
import { BottomNavigation } from "react-native-paper";

const Auth = React.lazy(() => import("../../../pages/Auth"));
const Stocks = React.lazy(() => import("../../../pages/Stocks"));
const Attendance = React.lazy(() => import("../../../pages/Attendance"));

export function AuthStack() {
  return <Auth />;
}

export function AuthenticatedStack() {
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
