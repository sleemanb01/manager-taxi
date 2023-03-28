"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokens = exports.login = exports.getUsers = void 0;
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const http_error_1 = require("../models/http-error");
const enums_1 = require("../types/enums");
const messages_1 = require("../util/messages");
/* ************************************************************** */
const SECRET_KEY = process.env.JWT_KEY;
const SECRET_REFRESH_KEY = process.env.JWT_REFRESH_KEY;
const TOKEN_EXPIRATION = "24h";
const TOKEN_REFRESH_EXPIRATION = "7d";
const internalError = new http_error_1.HttpError(messages_1.ERROR_INTERNAL_SERVER, enums_1.HTTP_RESPONSE_STATUS.Internal_Server_Error);
/* ************************************************************** */
const getUsers = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let users;
    try {
        users = yield user_model_1.default.find({});
    }
    catch (_a) {
        return next(internalError);
    }
    res.status(enums_1.HTTP_RESPONSE_STATUS.OK).json({ users: users });
});
exports.getUsers = getUsers;
/* ************************************************************** */
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new http_error_1.HttpError(messages_1.ERROR_INVALID_INPUTS, enums_1.HTTP_RESPONSE_STATUS.Unprocessable_Entity));
    }
    const { phone } = req.body;
    let targetUser;
    try {
        targetUser = yield user_model_1.default.findOne({ phone });
    }
    catch (_b) {
        return next(internalError);
    }
    if (!targetUser) {
        const error = new http_error_1.HttpError(messages_1.ERROR_INVALID_CREDENTIALS, enums_1.HTTP_RESPONSE_STATUS.Forbidden);
        return next(error);
    }
    let accessToken, refreshToken;
    try {
        accessToken = jsonwebtoken_1.default.sign({ userId: targetUser.id, phone: targetUser.phone }, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
        refreshToken = jsonwebtoken_1.default.sign({ userId: targetUser.id, accessToken }, SECRET_REFRESH_KEY, {
            expiresIn: TOKEN_REFRESH_EXPIRATION,
        });
    }
    catch (_c) {
        return next(internalError);
    }
    const ret = {
        id: targetUser.id,
        name: targetUser.name,
        phone: targetUser.phone,
        image: targetUser.image,
        role: targetUser.role,
        accessToken,
        refreshToken,
    };
    res.status(enums_1.HTTP_RESPONSE_STATUS.OK).json(ret);
});
exports.login = login;
/* ************************************************************** */
const refreshTokens = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
        if (!token) {
            throw new Error();
        }
        let accessToken, refreshToken;
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_KEY);
        const userId = decodedToken.userId;
        let targetUser;
        try {
            targetUser = yield user_model_1.default.findOne({ userId });
        }
        catch (_d) {
            return next(internalError);
        }
        if (!targetUser) {
            const error = new http_error_1.HttpError(messages_1.ERROR_INVALID_CREDENTIALS, enums_1.HTTP_RESPONSE_STATUS.Forbidden);
            return next(error);
        }
        accessToken = jsonwebtoken_1.default.sign({ userId, phone: targetUser.phone }, SECRET_KEY, {
            expiresIn: TOKEN_EXPIRATION,
        });
        refreshToken = jsonwebtoken_1.default.sign({ accessToken }, SECRET_REFRESH_KEY, {
            expiresIn: TOKEN_REFRESH_EXPIRATION,
        });
        const ret = { accessToken, refreshToken };
        res.status(enums_1.HTTP_RESPONSE_STATUS.OK).json(ret);
    }
    catch (_e) {
        const error = new http_error_1.HttpError(messages_1.ERROR_UNAUTHORIZED, enums_1.HTTP_RESPONSE_STATUS.Forbidden);
        return next(error);
    }
});
exports.refreshTokens = refreshTokens;
