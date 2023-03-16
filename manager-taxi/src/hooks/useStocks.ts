import React from "react";
import { ICategory, IShift, IStock } from "../types/interfaces";
import { StocksWActions } from "../types/types";
import { ENDPOINT_STOCKS } from "../util/constants";
import { getCurrDay } from "../util/time";
import { useHttpClient } from "./http-hook";

export const useStocks = (): StocksWActions => {
  const [values, setValues] = React.useState<IStock[]>([]);
  const [displayArray, setDisplayArray] = React.useState<string[]>([]);
  const [categories, setCategories] = React.useState<ICategory[]>([]);
  const [shift, setShift] = React.useState<IShift | null>(null);

  const { sendRequest } = useHttpClient();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await sendRequest(
          ENDPOINT_STOCKS + "/" + new Date(getCurrDay())
        );
        const fetchedCategoris = res.categories;

        localStorage.setItem("categories", JSON.stringify(fetchedCategoris));
        setCategories(fetchedCategoris);
        setValues(res.stocks);
        const fetchedShift = res.shift;
        if (fetchedShift) {
          setShift(fetchedShift);
        }
      } catch (err) {}
    };
    fetchData();
  }, [sendRequest, setValues, setShift, setCategories]);

  const clickHandler = React.useCallback(
    (id: string) => {
      const alreadyExists = displayArray.includes(id);

      if (alreadyExists) {
        setDisplayArray((prev) => prev.filter((e) => e !== id));
        return;
      }

      setDisplayArray((prev) => [...prev, id]);

      const element = document.getElementById(`${id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
    [setDisplayArray, displayArray]
  );

  return {
    values,
    displayArray,
    categories,
    shift,
    setValues,
    clickHandler,
  };
};
