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
exports.getData = void 0;
const http_error_1 = require("../models/http-error");
const category_model_1 = __importDefault(require("../models/category.model"));
const enums_1 = require("../types/enums");
const messages_1 = require("../util/messages");
const role_model_1 = __importDefault(require("../models/role.model"));
const mongoose_1 = __importDefault(require("mongoose"));
/* ************************************************************** */
const internalError = new http_error_1.HttpError(messages_1.ERROR_INTERNAL_SERVER, enums_1.HTTP_RESPONSE_STATUS.Internal_Server_Error);
/* ************************************************************** */
const getData = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let categories = [];
    let roles = [];
    try {
        const sess = yield mongoose_1.default.startSession();
        sess.startTransaction();
        categories = yield category_model_1.default.find();
        roles = yield role_model_1.default.find();
        sess.commitTransaction();
    }
    catch (_a) {
        return next(internalError);
    }
    res.status(enums_1.HTTP_RESPONSE_STATUS.OK).json({
        categories: categories,
        roles: roles,
    });
});
exports.getData = getData;
