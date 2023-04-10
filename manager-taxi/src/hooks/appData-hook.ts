import AsyncStorage from "@react-native-async-storage/async-storage";
import { useHttpClient } from "./http-hook";
import { appData } from "../types/types";
import {
  DEFAULT_HEADERS,
  ENDPOINT_CATEGORIES,
  ENDPOINT_DATA,
} from "../util/constants";
import React from "react";
import { ICategory, IRole } from "../types/interfaces";
import { AuthContext } from "./auth-context";

export const useAppData = () => {
  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const [roles, setRoles] = React.useState<IRole[]>([]);

  const { sendRequest } = useHttpClient();

  const getData = React.useCallback(async () => {
    let ret = null;
    const storedData = await AsyncStorage.getItem("appData");
    // await AsyncStorage.removeItem("appData");
    // console.log("app Data...", storedData);
    if (!storedData) {
      try {
        const res = await sendRequest(ENDPOINT_DATA);
        await AsyncStorage.setItem("appData", JSON.stringify(res));
        ret = res;
      } catch {
        console.log("error");
      }
    } else {
      const data = JSON.parse(storedData);
      ret = data;
    }
    return ret;
  }, [sendRequest]);

  const addCategory = (NewCategory: ICategory) => {
    setCategories((prev) => [...prev, NewCategory]);
  };

  const updateDataInStorage = async (updatedCategories: ICategory[]) => {
    await AsyncStorage.setItem(
      "appData",
      JSON.stringify({ categories: updatedCategories, roles })
    );
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

  React.useEffect(() => {
    (async () => {
      try {
        const data = await getData();
        // console.log("useAppData", data);

        setCategories(data.categories);
        setRoles(data.roles);
      } catch {}
    })();
  }, [getData]);

  return { categories, roles, setCategories, updateDataInStorage, addCategory };
};
