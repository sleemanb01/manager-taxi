import { EReducerActionType, EValidatorType } from "./enums";
import {
  IAssignements,
  ICategory,
  IRole,
  IShift,
  IStock,
  IUser,
} from "./interfaces";

export type AuthCtx = {
  user: userWToken | undefined;
  updateUser: (user: userWToken) => void;
  login: (user: userWToken, saveToStorage: boolean) => void;
  logout: () => void;
};

export type Keys = {
  accessToken: string;
  refreshToken: string;
};

export type userWToken = IUser & Keys;

export type reducerInputState = {
  value: string;
  isTouched?: boolean;
  isValid: boolean;
};

export type reducerFormState = {
  inputs: {
    [id: string]: reducerInputState | undefined;
  };
  isValid: boolean;
};

export type reducerInputAction = {
  val: string;
  type: EReducerActionType;
  validators: EValidatorType[];
};

export type reducerFormAction = {
  type: EReducerActionType;
  input: reducerInputState | reducerFormState;
  inputId?: string;
};

export type StocksWCategories = {
  stocks: IStock[];
  categories: ICategory[];
};

export type HandlerFuncType = () => void;

export type StocksWActions = {
  values: IStock[];
  shift: IShift | null;
  displayArray: string[];
  clickHandler: (id: string) => void;
  addValue: (newStock: IStock) => void;
  addShift: (newShift: IShift) => void;
};

export type RootStackParamList = {
  Main: undefined;
  Attendance: undefined;
  Stocks: undefined;
  NewCategory: {
    roles: Array<IRole>;
  };
  NewStock: {
    roles: Array<IRole>;
    categories: Array<ICategory>;
    selected?: string;
  };
};

export type appData = {
  roles: Array<IRole>;
  categories: Array<ICategory>;
  addCategory: (updatedCategories: ICategory[]) => void;
};

// export type useAppData = appData & {
//   // setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
//   // updateDataInStorage: (x: ICategory[]) => void;
//   addCategory: (x: ICategory) => void;
// };

export type navigationParams = {
  to: keyof RootStackParamList;
  props: any;
};
