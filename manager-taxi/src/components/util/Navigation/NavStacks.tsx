import React from "react";
import { RootStackParamList } from "../../../types/types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

const Auth = React.lazy(() => import("../../../pages/Auth"));
const BottomNav = React.lazy(() => import("../../BottomNav"));
const Stocks = React.lazy(() => import("../../../pages/Stocks"));
const NewStock = React.lazy(() => import("../../../pages/CRUD/NewStock"));
const NewCategory = React.lazy(() => import("../../../pages/CRUD/NewCategory"));
const Attendance = React.lazy(() => import("../../../pages/Attendance"));

export function AuthStack() {
  return <Auth />;
}

export function AuthenticatedStack() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const { t } = useTranslation();

  return (
    <Stack.Navigator initialRouteName="BottomNav">
      <Stack.Screen
        name="BottomNav"
        component={BottomNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Attendance"
        component={Attendance}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Stocks"
        component={Stocks}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewStock"
        component={NewStock}
        options={{ headerTitle: t("NewStock"), headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name="NewCategory"
        component={NewCategory}
        options={{
          headerTitle: t("NewCategory"),
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
