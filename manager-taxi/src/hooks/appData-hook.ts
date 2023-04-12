import AsyncStorage from "@react-native-async-storage/async-storage";
import { useHttpClient } from "./http-hook";
import {
  DEFAULT_HEADERS,
  ENDPOINT_CATEGORIES,
  ENDPOINT_DATA,
} from "../util/constants";
import React from "react";
import { ICategory, IRole } from "../types/interfaces";
import { AuthContext } from "./auth-context";

export const useAppData = (
  sendRequest: (
    url: string,
    method?: string,
    body?: BodyInit | null,
    headers?: any
  ) => any
) => {
  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const [roles, setRoles] = React.useState<IRole[]>([]);

  React.useEffect(() => {
    const getData = async () => {
      // const storedData = await AsyncStorage.getItem("appData");
      // if (!storedData) {
      try {
        const res = await sendRequest(ENDPOINT_DATA);
        // await AsyncStorage.setItem("appData", JSON.stringify(res));
        setCategories(res.categories);
        setRoles(res.roles);
      } catch {
        console.log("error");
      }
      // } else {
      //   const data = JSON.parse(storedData);
      //   setCategories(data.categories);
      //   setRoles(data.roles);
      // }
    };
    getData();
  }, []);

  const addCategory = async (updatedCategories: ICategory[]) => {
    // await AsyncStorage.setItem(
    //   "appData",
    //   JSON.stringify({ categories: updatedCategories, roles })
    // );
    setCategories(updatedCategories);
  };

  const removeCategory = async (deletedId: string) => {
    const { user } = React.useContext(AuthContext);
    try {
      await sendRequest(
        ENDPOINT_CATEGORIES,
        "DELETE",
        JSON.stringify(deletedId),
        { Authorization: "Barer " + user?.accessToken, ...DEFAULT_HEADERS }
      );
      const updatedCategories = categories.filter((e) => e._id !== deletedId);
      setCategories(updatedCategories);
    } catch {
      console.log("error");
    }
  };

  return { categories, roles, addCategory };
};
