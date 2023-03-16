export interface IRole {
  _id?: string;
  name: string;
}

export interface IUser {
  _id?: string;
  name?: string;
  phone: string;
  image?: string;
  role: IRole["_id"];
}

export interface IStock {
  _id?: string;
  categoryId: ICategory["_id"];
  name: string;
  quantity: number;
  image: string;
  minQuantity: number;
}

export interface ILack {
  stock: IStock;
  isCritical: boolean;
}

export interface ICategory {
  _id?: string;
  roleId: IRole["_id"];
  name: string;
}

export interface IUsage {
  stockId: IStock["_id"];
  quantity: number;
}

export interface IShift {
  _id?: string;
  date: Date;
  meat: number;
  bread: number;
  consumption: IUsage[];
  supply: IUsage[];
  workers: Array<IUser>;
}

export interface IAttendance {
  _id?: string;
  date: Date;
  startTime: string;
  endTime: string;
}
