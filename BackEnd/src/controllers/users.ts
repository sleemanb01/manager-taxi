import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User, { IUser } from "../models/user.model";
import { HttpError } from "../models/http-error";
import { HTTP_RESPONSE_STATUS } from "../types/enums";
import {
  ERROR_EMAIL_EXIST,
  ERROR_INTERNAL_SERVER,
  ERROR_INVALID_CREDENTIALS,
  ERROR_INVALID_INPUTS,
  ERROR_UNAUTHORIZED,
} from "../util/messages";
import { responseWToken } from "../types/types";

/* ************************************************************** */

const SECRET_KEY = process.env.JWT_KEY as string;
const TOKEN_EXPIRATION = "12h";

const internalError = new HttpError(
  ERROR_INTERNAL_SERVER,
  HTTP_RESPONSE_STATUS.Internal_Server_Error
);

/* ************************************************************** */

export const getUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  let users;
  try {
    users = await User.find({});
  } catch {
    return next(internalError);
  }

  res.status(HTTP_RESPONSE_STATUS.OK).json({ users: users });
};

/* ************************************************************** */

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        ERROR_INVALID_INPUTS,
        HTTP_RESPONSE_STATUS.Unprocessable_Entity
      )
    );
  }

  const { phone } = req.body;

  let targetUser: IUser | null;

  try {
    targetUser = await User.findOne({ phone });
  } catch {
    return next(internalError);
  }

  if (!targetUser) {
    const error = new HttpError(
      ERROR_INVALID_CREDENTIALS,
      HTTP_RESPONSE_STATUS.Forbidden
    );

    return next(error);
  }

  let token;

  try {
    token = jwt.sign(
      { userId: targetUser.id, phone: targetUser.phone },
      SECRET_KEY,
      { expiresIn: TOKEN_EXPIRATION }
    );
  } catch {
    return next(internalError);
  }

  const ret: responseWToken = {
    id: targetUser.id,
    name: targetUser.name!,
    phone: targetUser.phone,
    image: targetUser.image!,
    role: targetUser.role,
    token,
  };

  res.status(HTTP_RESPONSE_STATUS.OK).json(ret);
};
