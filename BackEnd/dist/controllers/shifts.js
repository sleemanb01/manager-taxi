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
exports.updateShift = exports.addShift = exports.getShifts = exports.getShift = void 0;
const express_validator_1 = require("express-validator");
const http_error_1 = require("../models/http-error");
const enums_1 = require("../types/enums");
const messages_1 = require("../util/messages");
const shift_model_1 = __importDefault(require("../models/shift.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
/* ************************************************************** */
const internalError = new http_error_1.HttpError(messages_1.ERROR_INTERNAL_SERVER, enums_1.HTTP_RESPONSE_STATUS.Internal_Server_Error);
/* ************************************************************** */
const getShift = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const date = req.params.shiftDate;
    let shift;
    try {
        shift = yield shift_model_1.default.findOne({ date: date });
    }
    catch (_a) {
        return next(internalError);
    }
    if (!shift) {
        return next(new http_error_1.HttpError(messages_1.ERROR_INVALID_DATA, enums_1.HTTP_RESPONSE_STATUS.Not_Found));
    }
    res.status(enums_1.HTTP_RESPONSE_STATUS.OK).json({ shift: shift });
});
exports.getShift = getShift;
/* ************************************************************** */
const getShifts = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let shifts = [];
    try {
        shifts = yield shift_model_1.default.find();
    }
    catch (_b) {
        return next(internalError);
    }
    res.status(enums_1.HTTP_RESPONSE_STATUS.OK).json({
        categories: shifts,
    });
});
exports.getShifts = getShifts;
/* ************************************************************** */
const addShift = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new http_error_1.HttpError(messages_1.ERROR_INVALID_INPUTS, enums_1.HTTP_RESPONSE_STATUS.Unprocessable_Entity));
    }
    const { date, bread, meat } = req.body;
    const creatorId = req.userData.userId;
    let targetUser;
    try {
        targetUser = yield user_model_1.default.findById(creatorId);
    }
    catch (_c) {
        return next(internalError);
    }
    if (!targetUser) {
        const error = new http_error_1.HttpError(messages_1.ERROR_UNAUTHORIZED, enums_1.HTTP_RESPONSE_STATUS.Unauthorized);
        return next(error);
    }
    let alreadyOpened;
    try {
        alreadyOpened = yield shift_model_1.default.findOne({ date: date });
    }
    catch (_d) {
        return next(internalError);
    }
    if (alreadyOpened) {
        return next(new http_error_1.HttpError(messages_1.ERROR_EXISTS, enums_1.HTTP_RESPONSE_STATUS.Bad_Request));
    }
    const newShift = new shift_model_1.default({
        date,
        bread,
        meat,
        usages: [],
    });
    try {
        yield newShift.save();
    }
    catch (_e) {
        return next(internalError);
    }
    res.status(enums_1.HTTP_RESPONSE_STATUS.Created).json({ shift: newShift });
});
exports.addShift = addShift;
/* ************************************************************** */
const updateShift = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new http_error_1.HttpError(messages_1.ERROR_INVALID_INPUTS, enums_1.HTTP_RESPONSE_STATUS.Unprocessable_Entity));
    }
    const { meat, bread } = req.body;
    const shiftId = req.params.CategoryId;
    let shift;
    try {
        shift = yield shift_model_1.default.findById(shiftId);
    }
    catch (_f) {
        return next(internalError);
    }
    if (!shift) {
        return next(new http_error_1.HttpError(messages_1.ERROR_INVALID_DATA, enums_1.HTTP_RESPONSE_STATUS.Not_Found));
    }
    shift = shift;
    shift.bread = bread;
    shift.meat = meat;
    try {
        yield shift.save();
    }
    catch (_g) {
        return next(internalError);
    }
    res
        .status(enums_1.HTTP_RESPONSE_STATUS.OK)
        .json({ shift: shift.toObject({ getters: true }) });
});
exports.updateShift = updateShift;
