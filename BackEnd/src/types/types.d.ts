import { IRole } from "../models/role.model";

export type responseWToken = {
  id: string;
  name: string;
  phone: string;
  image: string;
  token: string;
  role: IRole["_id"];
};

export type AuthorizationRequest = Request<
  ParamsDictionary,
  any,
  any,
  ParsedQs,
  Record<string, any>
> & {
  headers: { authorization: string };
  userData: { userId: string };
  userData: responseWToken;
};

export type RequestWUser = Request<
  ParamsDictionary,
  any,
  any,
  ParsedQs,
  Record<string, any>
> & { userData: { userId: string } };

export type MulterRequest = Request<
  ParamsDictionary,
  any,
  any,
  ParsedQs,
  Record<string, any>
>;

export type S3ReturnType = {
  success: boolean;
  message: string;
  data?: string;
};

export type S3UResult = {
  Location: string;
  Key: string;
  Bucket: string;
};
