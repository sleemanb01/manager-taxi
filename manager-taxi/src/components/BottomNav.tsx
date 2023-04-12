import React from "react";
import { useTranslation } from "react-i18next";
import { BottomNavigation } from "react-native-paper";
import { AuthContext } from "../hooks/auth-context";
import Attendance from "../pages/Attendance";
import Stocks from "../pages/Stocks";

export default function BottomNav() {
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
