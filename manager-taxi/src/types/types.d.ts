import { EReducerActionType, EValidatorType } from "./enums";
import { IAssignements, ICategory, IShift, IStock, IUser } from "./interfaces";

export type AuthCtx = {
  user: userWToken | undefined;
  updateUser: (user: userWToken) => void;
  login: (user: userWToken) => void;
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
  displayArray: string[];
  categories: ICategory[];
  shift: IShift | null;
  setValues: Dispatch<SetStateAction<IStock[]>>;
  clickHandler: (id: string) => void;
};
