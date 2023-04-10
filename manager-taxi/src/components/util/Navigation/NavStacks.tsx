import React from "react";
import { RootStackParamList } from "../../../types/types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

const Auth = React.lazy(() => import("../../../pages/Auth"));
const Main = React.lazy(() => import("../../../pages/Main"));
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
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={Main}
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
