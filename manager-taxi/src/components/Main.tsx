import React from "react";
import { View } from "react-native";
import { stocksData } from "../types/types";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../hooks/auth-context";
import { ICategory, IRole, IStock } from "../types/interfaces";
import GenericList from "./generics/GenericList";
import RoleItem from "./items/RoleItem";
import CategoryItem from "./items/CategoryItem";
import StockItem from "./items/StockItem";

export default function Main({ data }: { data: stocksData }) {
  const { categories, roles, values } = data;
  const { user } = React.useContext(AuthContext);

  const [displayArray, setDisplayArray] = React.useState<string[]>([
    user?.roleId!,
  ]);
  const { t } = useTranslation();

  const clickHandler = (item: IRole | ICategory) => {
    const alreadyExists = displayArray.includes(item._id!);

    if (alreadyExists) {
      setDisplayArray((prev) => prev.filter((e) => e !== item._id!));
      return;
    }
    setDisplayArray((prev) => [...prev, item._id!]);
  };

  const isExpandHandler = (item: IRole) => {
    return displayArray.includes(item._id!);
  };

  const calcValues = (item: ICategory) => {
    const count = values.reduce(
      (counter, value) => counter + (value.categoryId === item._id ? 1 : 0),
      0
    );

    return count + " " + t("items");
  };

  const calcCategories = (item: IRole) => {
    const count = categories.reduce(
      (counter, category) => counter + (category.roleId === item._id ? 1 : 0),
      0
    );

    return count + " " + t("items");
  };

  const getRelevantValues = (item: ICategory) => {
    const data = values.filter((e) => e.categoryId === item._id);

    return (
      <GenericList
        data={data}
        keyExtractor={(item: IStock) => item._id!}
        RenderItem={StockItem}
      />
    );
  };

  const getRelevantCategories = (item: IRole) => {
    const data = categories.filter((e) => e.roleId === item._id);

    return (
      <GenericList
        data={data}
        onPressListItem={clickHandler}
        keyExtractor={(item: ICategory) => item._id!}
        RenderItem={CategoryItem}
        children={{
          getElement: getRelevantValues,
          isExpand: isExpandHandler,
        }}
        secondaryText={calcValues}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <GenericList
        data={roles}
        onPressListItem={clickHandler}
        keyExtractor={(item: IRole) => item._id!}
        RenderItem={RoleItem}
        children={{
          getElement: getRelevantCategories,
          isExpand: isExpandHandler,
        }}
        secondaryText={calcCategories}
      />
    </View>
  );
}
