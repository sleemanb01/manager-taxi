import React from "react";
import { IShift, IStock } from "../types/interfaces";
import { StocksWActions } from "../types/types";
import { ENDPOINT_STOCKS } from "../util/constants";
import { getCurrDay } from "../util/time";

export const useStocks = (
  sendRequest: (
    url: string,
    method?: string,
    body?: BodyInit | null,
    headers?: any
  ) => any
): StocksWActions => {
  const [values, setValues] = React.useState<IStock[]>([]);
  const [shift, setShift] = React.useState<IShift | null>(null);
  const [displayArray, setDisplayArray] = React.useState<string[]>([]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await sendRequest(
          ENDPOINT_STOCKS + "/" + new Date(getCurrDay())
        );
        setValues(res.stocks);
        const resShift = res.shift;
        if (resShift) {
          setShift(resShift);
        }
      } catch (err) {}
    };
    getData();
  }, [sendRequest, setValues, setShift]);

  const addValue = (newStock: IStock) => {
    setValues((prev) => [...prev, newStock]);
  };

  const addShift = (newShift: IShift) => {
    setShift(newShift);
  };

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
    shift,
    displayArray,
    clickHandler,
    addValue,
    addShift,
  };
};
